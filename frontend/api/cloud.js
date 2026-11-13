import { FieldValue } from 'firebase-admin/firestore';
import { admin } from '../server/admin.js';
import { membership, grade } from '../server/policy.js';
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST required' });
  try {
    const bearer = req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
    if (!bearer) return res.status(401).json({ error: 'Authentication required' });
    const { auth, db } = admin();
    let token;
    try { token = await auth.verifyIdToken(bearer, true); } catch { return res.status(401).json({ error: 'Invalid or expired session' }); }
    const actor = membership(token);
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body || JSON.stringify(body).length > 16000) return res.status(400).json({ error: 'Invalid request' });
    if (body.action === 'gradeQuiz') {
      if (!/^[\w-]{1,100}$/.test(String(body.quizId)) || !/^[\w-]{1,100}$/.test(body.attemptId || '')) return res.status(400).json({ error: 'Invalid quiz or attempt ID' });
      const key = await db.doc(`quizKeys/${body.quizId}`).get();
      const quiz = await db.doc(`quizzes/${body.quizId}`).get();
      if (!key.exists || !quiz.exists || quiz.data().published !== true) return res.status(404).json({ error: 'Quiz is not published' });
      const result = grade(key.data(), body.answers);
      const ref = db.doc(`quizResults/${actor.userId}_${body.attemptId}`);
      const progressRef = db.doc(`learningProgress/${actor.userId}_${body.quizId}`);
      const saved = await db.runTransaction(async tx => {
        const existing = await tx.get(ref);
        if (existing.exists) {
          if (existing.data().schoolId !== actor.schoolId || existing.data().quizId !== String(body.quizId)) throw Object.assign(new Error('Attempt conflict'), { status: 409 });
          return existing.data();
        }
        const progress = await tx.get(progressRef);
        const data = { userId: actor.userId, schoolId: actor.schoolId, quizId: String(body.quizId), ...result, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() };
        tx.create(ref, data);
        tx.set(progressRef, { userId: actor.userId, schoolId: actor.schoolId, moduleId: Number(body.quizId), completed: true, createdAt: progress.exists ? progress.data().createdAt : FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
        return data;
      });
      return res.status(200).json({ score: saved.score, total: saved.total, percent: saved.percent });
    }
    // Staff can assign students/teachers only in their own school. Administrator bootstrap is CLI-only.
    if (body.action === 'assignRole') {
      if (actor.role !== 'administrator') return res.status(403).json({ error: 'Administrator required' });
      if (!['student', 'teacher'].includes(body.role) || typeof body.uid !== 'string' || body.uid === actor.userId) return res.status(400).json({ error: 'Invalid assignment' });
      const target = await auth.getUser(body.uid);
      if (target.customClaims?.schoolId && target.customClaims.schoolId !== actor.schoolId) return res.status(403).json({ error: 'Cross-school assignment denied' });
      if (target.customClaims?.role === 'administrator') return res.status(403).json({ error: 'Administrator changes require project owner' });
      await auth.setCustomUserClaims(body.uid, { ...target.customClaims, role: body.role, schoolId: actor.schoolId });
      await db.runTransaction(async tx => {
        const profile = db.doc(`users/${body.uid}`);
        const old = await tx.get(profile);
        tx.set(profile, { ...(old.exists ? old.data() : { displayName: target.displayName || '', createdAt: FieldValue.serverTimestamp() }), userId: body.uid, schoolId: actor.schoolId, role: body.role, updatedAt: FieldValue.serverTimestamp() });
      });
      return res.status(200).json({ ok: true });
    }
    return res.status(400).json({ error: 'Unknown action' });
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.status ? error.message : 'Cloud operation failed. Check server configuration.' });
  }
}
