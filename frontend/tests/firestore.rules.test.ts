import { beforeAll, afterAll, beforeEach, describe, it, expect } from 'vitest';
import { initializeTestEnvironment, assertSucceeds, assertFails, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { readFileSync } from 'node:fs';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, query, where, orderBy, limit, getDocs, onSnapshot, serverTimestamp } from 'firebase/firestore';
const enabled = !!process.env.FIRESTORE_EMULATOR_HOST;
describe.skipIf(!enabled)('Firestore permissions and synchronization', () => {
  let env: RulesTestEnvironment;
  const ctx = (uid:string, role='student', schoolId='a') => env.authenticatedContext(uid,{role,schoolId}).firestore();
  const record = (uid='student', schoolId='a') => ({userId:uid,schoolId,createdAt:serverTimestamp(),updatedAt:serverTimestamp()});
  beforeAll(async () => { env=await initializeTestEnvironment({projectId:'demo-rakshak',firestore:{host:'127.0.0.1',port:8085,rules:readFileSync('../firestore.rules','utf8')}}); });
  beforeEach(async () => { await env.clearFirestore(); });
  afterAll(async () => { await env.cleanup(); });
  it('enforces administrator alert CRUD and school boundaries', async () => {
    const data={...record('admin'),emergency:'Fire',message:'Evacuate',active:true};
    await assertFails(setDoc(doc(ctx('student'),'alerts/x'),data));
    await assertSucceeds(setDoc(doc(ctx('admin','administrator'),'alerts/x'),data));
    await assertSucceeds(getDoc(doc(ctx('student'),'alerts/x')));
    await assertFails(getDoc(doc(ctx('other','student','b'),'alerts/x')));
    await assertFails(getDoc(doc(env.unauthenticatedContext().firestore(),'alerts/x')));
    await assertSucceeds(updateDoc(doc(ctx('admin','administrator'),'alerts/x'),{message:'Updated',updatedAt:serverTimestamp()}));
    await assertSucceeds(deleteDoc(doc(ctx('admin','administrator'),'alerts/x')));
  });
  it('denies forged grades, role escalation and answer key reads', async () => {
    await assertFails(setDoc(doc(ctx('student'),'quizResults/fake'),{...record(),score:100}));
    await assertFails(setDoc(doc(ctx('student'),'users/student'),{...record(),role:'administrator'}));
    await assertFails(getDoc(doc(ctx('admin','administrator'),'quizKeys/1')));
  });
  it('persists private progress and isolates other students', async () => {
    await assertSucceeds(setDoc(doc(ctx('student'),'learningProgress/student_1'),{...record(),moduleId:1,completed:true}));
    expect((await getDoc(doc(ctx('student'),'learningProgress/student_1'))).data()?.completed).toBe(true);
    await assertFails(getDoc(doc(ctx('other'),'learningProgress/student_1')));
    await assertSucceeds(getDoc(doc(ctx('teacher','teacher'),'learningProgress/student_1')));
    await assertFails(getDoc(doc(ctx('teacher','teacher','b'),'learningProgress/student_1')));
  });
  it('delivers a new alert to another client without refresh and cleans up listener', async () => {
    const q=query(collection(ctx('student'),'alerts'),where('schoolId','==','a'),orderBy('createdAt','desc'),limit(100));
    let stop: () => void = () => {};
    let ready: () => void = () => {};
    const initialized = new Promise<void>(resolve => { ready = resolve; });
    const received=new Promise<void>((resolve,reject) => {stop=onSnapshot(q,s => { ready(); if(s.docs.some(d=>d.id==='live'))resolve();},reject);});
    try { await initialized; await setDoc(doc(ctx('admin','administrator'),'alerts/live'),{...record('admin'),emergency:'Flood',message:'Move up',active:true}); await received; } finally {stop();}
  });
  it('retains backend results across clients and exposes only authorized school queries', async () => {
    await env.withSecurityRulesDisabled(async c => {await setDoc(doc(c.firestore(),'quizResults/attempt'),{...record(),quizId:'1',score:2,total:3,percent:67});});
    expect((await getDoc(doc(ctx('student'),'quizResults/attempt'))).data()?.score).toBe(2);
    const teacher=query(collection(ctx('teacher','teacher'),'quizResults'),where('schoolId','==','a'),orderBy('createdAt','desc'),limit(100));
    expect((await assertSucceeds(getDocs(teacher))).size).toBe(1);
    await assertFails(getDoc(doc(ctx('other'),'quizResults/attempt')));
  });
  it('protects SOS locations from teachers and other schools', async () => {
    await assertSucceeds(setDoc(doc(ctx('student'),'sosRequests/sos'),{...record(),latitude:30,longitude:75,accuracy:10,status:'pending'}));
    await assertFails(getDoc(doc(ctx('teacher','teacher'),'sosRequests/sos')));
    await assertSucceeds(getDoc(doc(ctx('admin','administrator'),'sosRequests/sos')));
    await assertFails(getDoc(doc(ctx('admin','administrator','b'),'sosRequests/sos')));
  });
  it('denies access to retired virtual drill collections for all client roles', async () => {
    await env.withSecurityRulesDisabled(async c => {
      await setDoc(doc(c.firestore(),'drills/retired'),{schoolId:'a',userId:'student'});
      await setDoc(doc(c.firestore(),'drillResults/retired'),{schoolId:'a',userId:'student'});
    });
    for (const [uid, role] of [['student','student'],['teacher','teacher'],['admin','administrator']]) {
      for (const name of ['drills','drillResults']) {
        await assertFails(getDoc(doc(ctx(uid,role),`${name}/retired`)));
        await assertFails(setDoc(doc(ctx(uid,role),`${name}/new`),{...record(uid)}));
      }
    }
  });
  it('validates game score bounds and owner isolation', async () => {
    const result={...record(),gameId:'disaster-quest',score:4,total:3,badge:'completed'};
    await assertFails(setDoc(doc(ctx('student'),'gameProgress/score'),result));
    await assertSucceeds(setDoc(doc(ctx('student'),'gameProgress/score'),{...result,score:2}));
    await assertFails(getDoc(doc(ctx('other'),'gameProgress/score')));
  });
  it('allows profile name changes but denies membership changes even on existing profiles', async () => {
    await env.withSecurityRulesDisabled(async c=>{await setDoc(doc(c.firestore(),'users/student'),{...record(),role:'student',displayName:'Demo'});});
    await assertSucceeds(updateDoc(doc(ctx('student'),'users/student'),{displayName:'Learner',updatedAt:serverTimestamp()}));
    await assertFails(updateDoc(doc(ctx('student'),'users/student'),{role:'administrator',updatedAt:serverTimestamp()}));
    await assertFails(updateDoc(doc(ctx('student'),'users/student'),{schoolId:'b',updatedAt:serverTimestamp()}));
  });
});
