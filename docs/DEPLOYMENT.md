# Current setup and deployment guide

Live app: https://rakshakapp-cloud.vercel.app/
Vercel project: `neha-mongias-projects/rakshakapp-cloud`.
Firebase project: `rakshakapp-cloud`; Firestore Standard `(default)`, Mumbai (`asia-south1`).

The owner explicitly approved this new cloud target because the original resources were inaccessible to the signed-in accounts. The application code and design were preserved. The original Firebase/Vercel resources were not changed. The production app is already deployed; you do not need to repeat the initial setup to use it.

## Use the published app

Open the public URL and sign in. The owner's assigned Google login is administrator for demo-school. New registrations are initially unassigned: an administrator must assign Student/Teacher membership through the trusted backend before school data is accessible. See TEACHER_WALKTHROUGH.md for those steps.

## Run the same app locally

Use Node 22 or 24. From the repository's frontend folder:

```sh
npm ci
# Fresh checkout only: copy .env.example to .env.local, then fill its values.
npm run dev:full
```

Open http://localhost:8081. The runner loads `.env.local` and serves frontend plus the same API handler. `npm run dev` starts the frontend only. Avoid overwriting your working `.env.local`.

Six public settings identify the Firebase web application: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`. Get them from the existing Firebase web app's Project settings. Public web configuration does not grant database privileges.

Three server settings configure the trusted backend: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`. Keep them in ignored local configuration and Vercel server Secrets. Never prefix private credentials with VITE_, commit a service-account JSON, or show a private key in a presentation. Literal private-key newline escapes are normalized by the backend.

## Publish reviewed code updates

1. Make changes on a separate branch and inspect the diff. Keep environment files, `.vercel` metadata and credentials out of Git.
2. From frontend, run the checks:

```sh
npm run build
npm run typecheck
npm test
# Java 21+ required; deliberately uses demo-rakshak, not live data:
npm run test:rules
```

3. Sign in and link the existing Vercel project if this checkout is not already linked:

```sh
npx vercel@latest login
npx vercel@latest link --yes --project rakshakapp-cloud --scope neha-mongias-projects
```

4. Review Vercel Environment Variables. Public web values are Config; the three backend values are server Secrets. Production is configured; additional preview environments need their own reviewed configuration.
5. Publish to production when approved:

```sh
npx vercel@latest deploy --prod --scope neha-mongias-projects
```

6. Wait for Ready. Verify the public page, direct dashboard-route refresh, Google login, cloud results and the API. Production domain `rakshakapp-cloud.vercel.app` is already in Firebase Authentication's authorized domains. A different public hostname must also be authorized.

The CLI uploads frontend as the application root. Vercel uses Vite, Node 24, `npm run build`, output `dist`, and `frontend/api/cloud.js`; dashboard/auth SPA routes are handled by `frontend/vercel.json`. Source upload exclusions are in `frontend/.vercelignore`.

GitHub pushes do not currently auto-deploy this project. This deployment used the CLI, and the source branch was pushed separately. No merge to main or automatic Git integration is required for this workflow.

## Database rules, indexes and catalog maintenance

The current rules are published, all sixteen query index shapes are ready, and eight module/quiz/key sets are seeded. Do not repeat these writes just to demonstrate the database.

For future reviewed rules/index changes, use an appropriately authorized owner CLI session or approved SDK setup operation. From the repository root, an owner CLI workflow is:

```sh
./frontend/node_modules/.bin/firebase login
./frontend/node_modules/.bin/firebase deploy --only firestore:rules,firestore:indexes --project rakshakapp-cloud
```

The backend service account does not retain the temporary index-management role used during setup. An account that can read/write application data need not be allowed to manage indexes or Google Cloud service APIs. Do not broaden credentials merely to make a deployment command succeed.

`seed-catalog.ts` creates missing catalog documents without overwriting existing ones. `provision.mjs` assigns existing Auth UIDs and refuses changing an established role/school. Both require explicitly loaded backend configuration and `--confirm`; treat them as trusted operator tools, not student actions.

## What was verified and what remains

Production Google login, backend quiz grading, persisted student result, real independent-client alerts, private answer-key denial, indexed queries, build and type checks were verified. See PUBLISHED.md and SETUP_VERIFICATION.md for details. The earlier TESTING.md records initial unit/emulator results and baseline limitations.

Backups, monitoring, App Check enforcement, rate limits, retention, load capacity and guaranteed availability are not configured or claimed. Firebase Spark and Vercel Hobby impose quotas; review current provider usage and plan requirements before institutional operation. No Cloud Functions service is needed for this implementation because Vercel supplies the privileged backend.
