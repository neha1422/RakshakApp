import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';
import { admin } from '../server/admin.js';
import { FieldValue } from 'firebase-admin/firestore';
import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, orderBy, limit, onSnapshot, addDoc, serverTimestamp, deleteDoc, getDoc, doc, terminate } from 'firebase/firestore';
if (process.env.FIREBASE_PROJECT_ID !== 'rakshakapp-cloud' || !process.argv.includes('--confirm')) throw new Error('Explicit rakshakapp-cloud verification requires --confirm.');
const { auth, db } = admin();
const definitions = JSON.parse(readFileSync('../firestore.indexes.json','utf8')).indexes;
for (let attempt = 0; ; attempt++) {
  try {
    for (const index of definitions) {
      let probe = db.collection(index.collectionGroup).where('schoolId','==','demo-school');
      if (index.fields.some(f => f.fieldPath === 'userId')) probe = probe.where('userId','==','__setup_index_probe__');
      await probe.orderBy('createdAt','desc').limit(1).get();
    }
    console.log('All required indexed query shapes are ready.'); break;
  } catch (e) {
    if (e.code !== 9 || attempt >= 15) throw e;
    console.log('Waiting 20 seconds for Firestore index builds…'); await delay(20000);
  }
}
const uid = 'rakshak-setup-demo-student';
let student;
try { student = await auth.getUser(uid); } catch (e) { if (e.code !== 'auth/user-not-found') throw e; student = await auth.createUser({ uid, displayName: 'Setup Demo Student' }); }
if (student.customClaims?.schoolId && student.customClaims.schoolId !== 'demo-school') throw new Error('Unexpected demo user membership');
await auth.setCustomUserClaims(uid, { role: 'student', schoolId: 'demo-school' });
const profile = db.doc(`users/${uid}`);
if (!(await profile.get()).exists) await profile.create({ userId: uid, schoolId: 'demo-school', role: 'student', displayName: 'Setup Demo Student', createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
const owner = (await auth.listUsers(1000)).users.find(user => user.customClaims?.role === 'administrator' && user.customClaims?.schoolId === 'demo-school');
if (!owner) throw new Error('Provision a demo-school administrator first.');
assert.equal(owner.customClaims?.role, 'administrator');
const config = { apiKey: process.env.VITE_FIREBASE_API_KEY, projectId: process.env.FIREBASE_PROJECT_ID, authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN };
const studentApp = initializeApp(config, 'setup-student'), adminApp = initializeApp(config, 'setup-admin');
const studentAuth = getAuth(studentApp), adminAuth = getAuth(adminApp);
let stop = () => {}, alertRef;
const studentDb = getFirestore(studentApp), adminDb = getFirestore(adminApp);
try {
  await signInWithCustomToken(studentAuth, await auth.createCustomToken(uid));
  await signInWithCustomToken(adminAuth, await auth.createCustomToken(owner.uid));
  let ready, received, fail;
  const initialized = new Promise(resolve => { ready = resolve; });
  const delivered = new Promise((resolve, reject) => { received = resolve; fail = reject; });
  // Attach rejection handling before listener errors can arrive.
  delivered.catch(() => {});
  const label = `Setup verification ${randomUUID()}`;
  stop = onSnapshot(query(collection(studentDb, 'alerts'), where('schoolId', '==', 'demo-school'), orderBy('createdAt', 'desc'), limit(100)), snapshot => { ready(); if (snapshot.docs.some(d => d.data().message === label)) received(); }, e => { ready(); fail(e); });
  await initialized;
  alertRef = await addDoc(collection(adminDb, 'alerts'), { schoolId: 'demo-school', userId: owner.uid, emergency: 'Demo', message: label, active: true, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  let timeout;
  try { await Promise.race([delivered, new Promise((_,reject) => { timeout = setTimeout(() => reject(new Error('Live alert delivery timed out')), 20000); })]); } finally { clearTimeout(timeout); }
  const key = (await db.doc('quizKeys/1').get()).data();
  const attemptId = `setup_${randomUUID()}`;
  const base = process.env.RAKSHAK_VERIFY_URL || 'http://localhost:8081';
  if (!['http://localhost:8081','https://rakshakapp-cloud.vercel.app'].includes(base)) throw new Error('Unapproved verification destination');
  const response = await fetch(`${base}/api/cloud`, { method:'POST', headers:{'Content-Type':'application/json',Authorization:`Bearer ${await studentAuth.currentUser.getIdToken()}`}, body:JSON.stringify({action:'gradeQuiz',quizId:'1',attemptId,answers:key.answerKey}) });
  const result = await response.json(); assert.equal(response.status, 200, JSON.stringify(result)); assert.equal(result.score, key.answerKey.length);
  const saved = await getDoc(doc(studentDb, 'quizResults', `${uid}_${attemptId}`)); assert.equal(saved.data().score, result.score);
  let denied = false;
  try { await getDoc(doc(studentDb,'quizKeys','1')); } catch(e) { denied = e.code === 'permission-denied'; }
  assert.equal(denied, true);
  console.log(JSON.stringify({project:'rakshakapp-cloud',realtimeAlertDelivered:true,backendGrading:true,resultPersistedAndClientReadable:true,studentAnswerKeyReadDenied:true,score:result.score,total:result.total,demoStudentUid:uid}));
} finally {
  stop();
  if (alertRef) await deleteDoc(alertRef); // Only this script's disposable verification alert.
  await Promise.all([signOut(studentAuth),signOut(adminAuth)]);
  await Promise.all([terminate(studentDb),terminate(adminDb)]);
  await Promise.all([deleteApp(studentApp),deleteApp(adminApp)]);
}
