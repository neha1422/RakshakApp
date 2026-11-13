import { disasters } from '../server/catalog/disasters';
import { admin } from '../server/admin.js';
import { FieldValue } from 'firebase-admin/firestore';
// Explicit execution only. Creates missing catalog documents; never overwrites.
if (!process.argv.includes('--confirm')) throw new Error('Review docs/DEPLOYMENT.md then pass --confirm. This writes to the configured Firebase project.');
const { db } = admin();
for (const module of disasters) {
  const id = String(module.id);
  const questions = module.quiz.map(({ answerIndex, ...question }) => question);
  for (const [name, data] of [
    ['learningModules', { ...module, quiz: questions }],
    ['quizzes', { moduleId: module.id, questions, published: true }],
    ['quizKeys', { answerKey: module.quiz.map(q => q.answerIndex), optionCounts: module.quiz.map(q => q.options.en.length) }],
  ] as const) {
    const ref = db.doc(`${name}/${id}`);
    await db.runTransaction(async tx => { if (!(await tx.get(ref)).exists) tx.create(ref, { ...data, createdAt: FieldValue.serverTimestamp() }); });
  }
}
console.log('Missing catalog documents created; existing documents preserved.');
