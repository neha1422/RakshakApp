import { admin } from '../server/admin.js';
import { FieldValue } from 'firebase-admin/firestore';
const [uid, schoolId, role, confirm] = process.argv.slice(2);
if (!uid || !/^[\w-]{1,100}$/.test(schoolId || '') || !['student','teacher','administrator'].includes(role) || confirm !== '--confirm') throw new Error('Usage: npm run provision -- EXISTING_UID SCHOOL_ID student|teacher|administrator --confirm');
const { auth, db } = admin();
const user = await auth.getUser(uid);
if (user.customClaims?.schoolId && user.customClaims.schoolId !== schoolId) throw new Error('Refusing to move an existing school membership. Use a reviewed migration.');
if (user.customClaims?.role && user.customClaims.role !== role) throw new Error('Refusing to overwrite an existing role. Use a reviewed role change.');
await db.runTransaction(async tx => {
  const school = db.doc(`schools/${schoolId}`), profile = db.doc(`users/${uid}`);
  const [s, p] = await Promise.all([tx.get(school), tx.get(profile)]);
  if (!s.exists) tx.create(school, { name: schoolId, createdAt: FieldValue.serverTimestamp() });
  if (!p.exists) tx.create(profile, { userId: uid, schoolId, role, displayName: user.displayName || '', createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
});
await auth.setCustomUserClaims(uid, { ...user.customClaims, schoolId, role });
console.log('Membership provisioned. Sign out and back in to refresh claims.');
