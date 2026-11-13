import firestore from '@google-cloud/firestore';
const { v1 } = firestore;
import { readFileSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';
const projectId = process.env.FIREBASE_PROJECT_ID;
if (projectId !== 'rakshakapp-cloud' || !process.argv.includes('--confirm')) throw new Error('This reviewed setup command targets rakshakapp-cloud only; pass --confirm.');
const client = new v1.FirestoreAdminClient({ projectId, credentials: { client_email: process.env.FIREBASE_CLIENT_EMAIL, private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') } });
const { indexes } = JSON.parse(readFileSync('../firestore.indexes.json', 'utf8'));
let created = 0, existing = 0;
for (const index of indexes) {
  let attempts = 0;
  while (true) {
  try {
    await client.createIndex({ parent: `projects/${projectId}/databases/(default)/collectionGroups/${index.collectionGroup}`, index: { queryScope: index.queryScope, fields: index.fields } });
    created++;
    break;
  } catch (e) {
    if (e.code === 6) { existing++; break; }
    if (e.code === 7 && attempts++ < 8) { console.log('Waiting 20 seconds for the approved index-management role to propagate…'); await delay(20000); continue; }
    throw e;
  }
  }
}
console.log(JSON.stringify({ projectId, indexBuildsRequested: created, alreadyExisting: existing }));
await client.close();
