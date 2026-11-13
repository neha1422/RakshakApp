import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
export function admin() {
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_PROJECT_ID || 'punjab-prepared-ecosystem';
    if (!['punjab-prepared-ecosystem', 'rakshakapp-cloud'].includes(projectId) && !projectId.startsWith('demo-')) throw new Error('Unexpected Firebase project');
    const emulator = process.env.FIRESTORE_EMULATOR_HOST && process.env.FIREBASE_AUTH_EMULATOR_HOST;
    initializeApp(emulator ? { projectId } : { projectId, credential: cert({ projectId, clientEmail: process.env.FIREBASE_CLIENT_EMAIL, privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') }) });
  }
  return { auth: getAuth(), db: getFirestore() };
}
