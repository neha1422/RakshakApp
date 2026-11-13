# Completed cloud setup — 14 November 2026

> Historical verification checkpoint. For the current public deployment and classroom evidence, see README.md, PUBLISHED.md and TEACHER_WALKTHROUGH.md. Later deployment does not change which commands were run at this checkpoint.

The existing app now runs locally against the owner's newly authorized Firebase project `rakshakapp-cloud`.

## Completed

- Private service-account credentials installed in Git-ignored `.env.local`, owner-only file access. Downloaded source key also restricted to the owner.
- Firebase Authentication and Firestore connection verified.
- Reviewed Firestore rules published and read back to verify the membership rules are active.
- Eight learning modules, eight published quizzes and eight private quiz-key documents created without overwriting existing data.
- All sixteen configured indexed query shapes verified as available after Google completed index building.
- Owner's existing Google login provisioned as administrator of `demo-school`; refreshed Google sign-in verified in the browser.
- Temporary Cloud Datastore Index Admin permission granted with explicit approval, used to request indexes, then removed. IAM console confirmed only the service account's original roles remain.
- Combined frontend/backend server running at http://localhost:8081 using `npm run dev:full`.

## Real cloud verification

Executed `node --env-file=.env.local scripts/verify-cloud.mjs --confirm` successfully:

- Administrator client created a clearly labelled disposable demo alert.
- Independent student client received it through a live Firestore listener without refresh.
- Authenticated student submitted a quiz through the running local `/api/cloud` backend.
- Backend graded 5/5; persisted result was read through the student Firestore client.
- Student client read of private quiz answer keys was denied.
- Only the script's disposable alert was removed afterward. One labelled setup demo student and its quiz attempt remain for demonstration.

The browser administrator dashboard then displayed one real quiz attempt, a 100% recent-record average and no index errors. These figures describe the setup demonstration, not an institutional readiness assessment.

## Local checks

- `npm test`: 16 passed; nine emulator tests skipped in this non-emulator run (previous emulator run is recorded in TESTING.md).
- `npm run build`: passed; existing large-bundle warning remains.
- Private-key marker and private-key fragment absent from generated frontend build assets.
- Local frontend HTTP 200 and unauthenticated backend HTTP 401 verified.
- Local runner/index/verification script syntax checks and Git whitespace check passed.

The Firebase CLI's initial deployment path lacked service-usage permission. Rules were successfully published through Firebase's supported Admin Security Rules API; index creation used the approved temporary index-only role. No extra service-usage or general project-owner permission was granted to the backend.

This completes local frontend/backend operation with real cloud persistence. No Git push, merge, public Vercel deployment, billing upgrade or change to the original `punjab-prepared-ecosystem` project occurred. Prior lint/dependency limitations remain described in TESTING.md.
