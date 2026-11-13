# Database schema

Firestore Standard document collections. All private school records carry `schoolId`, `userId`, `createdAt`, `updatedAt`. Timestamps are server-generated Firestore Timestamps. Existing drill schedule strings are retained as ISO dates for UI compatibility. Document IDs are opaque except deterministic progress/result IDs.

| Collection | Fields beyond common metadata | Access |
|---|---|---|
| users | displayName, role | Owner or own-school staff read; owner edits displayName only; trusted backend provisions membership |
| schools | name, createdAt | Own school read; owner CLI creates |
| learningModules | id, multilingual title/description/content, image, public quiz questions | Members read; owner seeds |
| learningProgress | moduleId, completed | Owner writes own completion; same-school staff read |
| quizzes | moduleId, questions, published | Members read published questions; owner seeds |
| quizKeys | answerKey, optionCounts | Admin SDK only; completely denied to client SDK |
| quizResults | quizId, score, total, percent | Server writes; owner and same-school staff read |
| alerts | emergency, message, active | School members read; school administrators create/edit/delete |
| drills | topic, title, startedAt, completion_time | School members read; staff create/delete |
| drillResults | drillId, completedAt, durationSeconds | Student creates own one-per-drill result; school staff read |
| gameProgress | gameId, score, total, badge | Owner creates; school staff read; self-reported educational scores |
| sosRequests | latitude, longitude, accuracy, status | Owner creates/reads/deletes; own-school administrators read, acknowledge, resolve, delete; teachers denied |
| riskInformation | district, note | School members read; administrator creates/deletes |

`learningProgress/{uid}_{moduleId}` is idempotent completion state. `drillResults/{uid}_{drillId}` prevents repeated participation records. `quizResults/{uid}_{attemptId}` is created transactionally by the grading endpoint; retrying the same attempt returns the existing score. Quiz answers are not stored with student results to reduce unnecessary data collection. Quiz keys belong in private backend data; they are absent from frontend source and build output. The repository remains educational source, so knowing the source curriculum answers is not prevented; this is not a high-stakes examination system.

## Query patterns

`where(schoolId == claim.schoolId)`, optionally `where(userId == auth.uid)`, `orderBy(createdAt, desc)`, `limit(100)`. `firestore.indexes.json` contains both forms for each live school collection. Rules are not filters: omitting the school/user condition can cause permission denial. Cursor pagination uses `startAfter(lastDocument)` in `lib/cloud.ts`.

CRUD is demonstrated by alerts (create, read, edit, delete) and SOS status updates/deletion. Learning, quizzes, games and drill results preserve historical records rather than exposing destructive student edits. Catalog data is seeded with create-if-missing transactions; no existing document is overwritten by the seed script. Deploying these rules can change access to existing collections, so review compatibility and test against emulator exports before approving production deployment.
