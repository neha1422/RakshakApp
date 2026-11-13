# Current local setup

On 14 November 2026, the owner explicitly selected connecting the same app to a new Firebase project because the signed-in account could not access the original project.

- New project: `rakshakapp-cloud` / RakshakApp Cloud, Spark plan.
- Web app: RakshakApp Web; public configuration saved to ignored `frontend/.env.local`.
- Firestore: default Standard database, `asia-south1` (Mumbai), initialized in production mode (deny by default).
- Authentication: email/password and Google providers enabled; localhost was already an authorized domain.
- Private backend key: installed in Git-ignored `frontend/.env.local` with owner-only file permissions; no private key is committed or included in frontend code.
- Reviewed Firestore rules published through Firebase Admin Security Rules API. Eight module/quiz/key sets seeded without overwriting existing documents.
- The owner's existing Google login is administrator for `demo-school`; sign out/in after role changes.
- All sixteen indexed query shapes verified ready. The temporary Cloud Datastore Index Admin role was removed after the build requests were accepted; the backend's original roles remain.
- Live setup verification is run with `node --env-file=.env.local scripts/verify-cloud.mjs --confirm`. It waits for indexed queries, uses a clearly named setup demo student, saves one quiz attempt, tests real client alert delivery and key privacy, then removes only its disposable alert.

Run both existing frontend and backend locally, without Vercel login:

```sh
cd frontend
npm run dev:full
```

Open http://localhost:8081. This command loads `.env.local`, serves Vite and the existing `/api/cloud` handler on one local-only server, and uses the real configured Firebase cloud project. It is not an emulator or a public deployment. Stop it with Control+C.

Verified: frontend HTTP 200; backend without a token HTTP 401; Auth and Firestore backend connection; eight seeded quizzes/private keys; published rules; refreshed Google login with school assignment; administrator route. See SETUP_VERIFICATION.md for final live test results.

The older report/deployment documentation describes the original target and the previous implementation checkpoint. For the new project, use explicit project ID `rakshakapp-cloud` for approved setup operations. No change was made to the original project's resources or the public Vercel deployment.
