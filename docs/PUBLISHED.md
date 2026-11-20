# RakshakApp: published deployment

Public URL: https://rakshakapp-cloud.vercel.app/

Vercel project: `neha-mongias-projects/rakshakapp-cloud`.
Firebase project: `rakshakapp-cloud`.
GitHub repository: https://github.com/neha1422/RakshakApp
Review branch: `feat/cloud-full-stack` (no merge to main).

The owner explicitly approved publishing this existing app under their own Vercel account with a new URL because the original Vercel project was inaccessible. No new frontend was designed. The original deployment and original Firebase project were not modified.

## What was done

1. Kept the existing app and added the cloud database connections, trusted roles, live alerts and server-side quiz grading.
2. Created and configured the owner-approved Firebase project, enabled Google/email-password login, created Firestore in Mumbai, published school-isolated rules and built 16 query indexes.
3. Seeded eight learning modules and quizzes, and assigned the owner's existing Google account as an administrator of demo-school.
4. Created the owner-approved Vercel hosting project, selected Vite and Node 24, and uploaded the existing frontend/API source.
5. Stored six public Firebase web settings as Vercel Config values and three backend-only settings as server Secrets. Local environment files and credentials are excluded from source uploads and Git.
6. Published production and authorized its exact public domain in Firebase for Google login.
7. Verified the production backend with real Firebase tokens: live alert delivery, server grading (5/5), saved result readable by its student and denial of private answer-key access. The verification script removes only its own disposable alert; its labelled demo student/result remain for the classroom demo.

## What happens when someone uses it

1. Vercel sends the website pages to the visitor's browser.
2. Firebase Authentication handles Google or email/password sign-in.
3. Trusted role and school claims determine which parts of the app the person can use. New signups need a trusted school assignment before accessing school data.
4. Firestore stores alerts, learning progress, scores and private school SOS requests. Security Rules check who can read or change each record.
5. Quiz submissions go to the Vercel backend, which verifies the login, checks private answer keys and saves the grade. Private credentials never belong in browser code.
6. Firestore listeners automatically update authorized screens when alerts or results change.

The guideline chatbot is local multilingual guidance; voice uses browser speech APIs. SOS sends a private school request and does not dispatch emergency services. Current staff statistics summarize the latest 100 records, not lifetime or certified readiness metrics.

## Deploy updates later

From the existing frontend folder, after reviewing changes:

```sh
npm run build
npm run typecheck
npm test
npx vercel@latest login
npx vercel@latest deploy --prod --scope neha-mongias-projects
```

Use the existing linked hosting project. If setting up another checkout, run `npx vercel@latest link --yes --project rakshakapp-cloud --scope neha-mongias-projects` from frontend first. Configure any changed production values through Vercel Environment Variables; a redeployment is needed for changed public build values. Do not commit `.env.local` or private key JSON files.

This deployment uploads local source through the CLI. It does not require merging the review branch or automatically connect GitHub pushes to Vercel. Follow normal review before merging or enabling automatic deployments. Dependency advisories, baseline lint findings and performance limits remain recorded in TESTING.md; this is an educational demonstration, not a certified emergency service.
