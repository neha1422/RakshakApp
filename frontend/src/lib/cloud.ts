import { getFirestore, collection, query, where, orderBy, limit, onSnapshot, addDoc, doc, runTransaction, updateDoc, deleteDoc, serverTimestamp, getDocs, startAfter, QueryDocumentSnapshot, QueryConstraint, DocumentData } from 'firebase/firestore';
import app, { auth } from './firebase';
export const db = getFirestore(app);
export interface CloudRecord extends DocumentData { id: string }
export function identity() {
  if (!auth.currentUser) throw new Error('Sign in first.');
  return auth.currentUser;
}
export async function api(action: string, body: object) {
  const token = await identity().getIdToken();
  const response = await fetch('/api/cloud', { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ action, ...body }) });
  const data = await response.json().catch(() => ({ error: 'Backend unavailable. Run with Vercel dev or configure the deployment.' }));
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
}
export function listen(name: string, schoolId: string, uid: string | null, next: (rows: CloudRecord[]) => void, error: (e: Error) => void) {
  const filters = [where('schoolId', '==', schoolId)];
  if (uid) filters.push(where('userId', '==', uid));
  return onSnapshot(query(collection(db, name), ...filters, orderBy('createdAt', 'desc'), limit(100)), snapshot => next(snapshot.docs.map(d => ({ ...d.data(), id: d.id }))), error);
}
// Bounded cursor pagination for history exports; pass the final document into the next call.
export async function page(name: string, schoolId: string, uid: string | null, cursor?: QueryDocumentSnapshot) {
  const filters: QueryConstraint[] = [where('schoolId', '==', schoolId)];
  if (uid) filters.push(where('userId', '==', uid));
  filters.push(orderBy('createdAt', 'desc'), limit(100));
  if (cursor) filters.push(startAfter(cursor));
  return getDocs(query(collection(db, name), ...filters));
}
export async function create(name: string, schoolId: string, values: object) {
  return addDoc(collection(db, name), { ...values, schoolId, userId: identity().uid, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
}
export async function saveProgress(schoolId: string, moduleId: number) {
  const userId = identity().uid;
  const ref = doc(db, 'learningProgress', `${userId}_${moduleId}`);
  await runTransaction(db, async tx => {
    const old = await tx.get(ref);
    if (old.exists()) tx.update(ref, { completed: true, updatedAt: serverTimestamp() });
    else tx.set(ref, { schoolId, userId, moduleId, completed: true, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  });
}
export const editRecord = (name: string, id: string, values: object) => updateDoc(doc(db, name, id), { ...values, updatedAt: serverTimestamp() });
export const removeRecord = (name: string, id: string) => deleteDoc(doc(db, name, id));
