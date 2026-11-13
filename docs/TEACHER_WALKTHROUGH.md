# Explain RakshakApp to your teacher

## Start with this short explanation

“RakshakApp is an Education-domain disaster preparedness application for schools. Students learn safety through multilingual modules, quizzes, games and practice drills. Vercel hosts the website and trusted backend. Firebase Authentication handles login, while Cloud Firestore stores progress, results and school alerts. Signed roles and school identifiers control access. When an administrator sends an alert, Firestore updates the student's screen in real time. Quiz grading runs on the server, and the result stays saved after a refresh.”

Open the live application: https://rakshakapp-cloud.vercel.app/
Open Firebase Console: https://console.firebase.google.com/project/rakshakapp-cloud/overview

## Before class

- Use the Google account that owns RakshakApp Cloud to open the Console. The application administrator account and project-owner Console permissions serve different purposes.
- Confirm the Console project name is **RakshakApp Cloud** and ID is **rakshakapp-cloud**, not the old project.
- Use an assigned student login in a different browser/profile. Ordinary signups have no school access until trusted assignment.
- Keep passwords, service-account JSON, private keys and secret environment-variable values off the projector.
- Keep README architecture, app dashboard, Authentication and Firestore tabs ready.

## 1. Show Authentication: who can sign in?

In Console, open Security → Authentication. If navigation changes, use its product search for Authentication.

1. **Users:** point to a login and its UID. The UID is a unique account identifier.
2. **Sign-in method:** show Google and Email/Password enabled.
3. **Settings → Authorized domains:** show `rakshakapp-cloud.vercel.app` as an approved sign-in domain.

Say: “Authentication proves who the person is. It is not the database of quiz results.”

A user may exist in Authentication before receiving a Firestore school profile. This explains why the Auth user count may differ from the `users` collection count.

## 2. Show Firestore: what is stored?

Open Databases & Storage → Firestore → `(default)` database → **Data**.

| Open this collection | Show these fields | Explain it this way |
|---|---|---|
| `schools` | name / ID | “This identifies a school.” |
| `users` | userId, schoolId, displayName, role | “This is application profile information linked to the login UID.” |
| `quizzes` | questions, published, moduleId | “Students load published questions from the cloud.” |
| `quizResults` | quizId, score, total, percent, userId, schoolId, createdAt | “This is a grade saved by the trusted backend.” |
| `learningProgress` | moduleId, completed, userId, schoolId | “This is why progress survives a refresh.” |
| `alerts` after sending a demo alert | emergency, message, active, schoolId, timestamps | “The alert is a real database record.” |

Say: “Firestore uses collections, documents and fields. A collection is a group of records; a document is one record; fields hold its values.”

Collections with zero documents may not appear in the Data tab. For example, `drills` or `sosRequests` can appear only after the relevant feature saves its first record. Do not create fake records just to make every collection name visible.

Private `quizKeys` are grading data. A Console owner can see them through administrative IAM access; a student app client is denied access by Security Rules. Showing a key in the owner Console is not a test of student permissions.

## 3. Show real-time synchronization

1. Browser/profile A: log in as the assigned administrator and open Admin Dashboard → Mass Alerts.
2. Browser/profile B: log in as the assigned student and open Overview.
3. A creates a clearly labelled classroom demo alert with a disaster type and short message.
4. B receives it without refreshing.
5. Open Firestore → Data → `alerts` and show the saved document.
6. In alert history, edit that same demo message and watch the student's screen change. Delete only the demonstration alert when finished.

Say: “The application subscribes using `onSnapshot()`. Firestore sends authorized changes to the listener. The app removes listeners when a screen closes or the user's identity changes.”

## 4. Show persistence and the backend

1. B opens a module and starts its cloud-loaded quiz.
2. B submits all answers; the backend calculates and saves the grade.
3. Show the result in B's quiz history.
4. Refresh B; show that the history remains.
5. Open Firestore → `quizResults` and identify the new record using its userId and timestamp.
6. Show A's staff dashboard updating its recent-record count/chart.

Say: “A temporary React variable would disappear on refresh. This result remains because it was stored in Firestore. The browser sends answers and an ID token to the Vercel backend, which verifies the user and grades against private keys.”

The automated setup created a clearly named demo student and test result. Those are setup evidence, not an assessment of real pupils. Your own demonstration creates additional records, so counts and averages change.

## 5. Show security

Open Firestore → **Rules**. Point out:

- Membership requires a signed Firebase token with an allowed role and schoolId.
- Private records require the owner or authorized staff from that same school.
- Student clients cannot create authoritative quiz results or read private grading keys.
- Teachers cannot read other people's SOS locations.
- Unspecified collection access is denied.

Say: “The frontend guard controls navigation, but the database rules enforce access even if someone bypasses the UI. The Admin SDK bypasses those rules, so backend authorization is separately required.”

Roles come from trusted custom claims, not a dropdown a student can choose or a profile field they can edit. After trusted role changes, sign out and back in to refresh the token.

For proof, show the emulator test results for other-student, unauthenticated and cross-school denial. Do not use the owner Console to imitate a student; the Console has administrative access.

## 6. Show indexes, deployment and source

- **Firestore → Indexes:** show the built school/user/timestamp query definitions. Indexes support the app's filtered and sorted queries.
- **Firestore → Usage:** shows reads/writes/quota activity; it does not prove backups or uptime guarantees.
- **Vercel:** open the `rakshakapp-cloud` project and its Ready production deployment. Show the public URL and Node backend. If discussing environment settings, show names only.
- **GitHub:** open `neha1422/RakshakApp`, select `feat/cloud-full-stack`, and show README, `frontend/api/cloud.js`, `firestore.rules`, `firestore.indexes.json` and tests. This branch is separate from main.

## How to create student/teacher demo access

1. Register a separate account through the app, choosing your own password, or use its Google login.
2. Copy the new UID from Console → Authentication → Users.
3. In the administrator dashboard, enter the UID and select Student or Teacher.
4. Choose Assign within school. The trusted backend assigns membership within the administrator's school.
5. Sign that new account out/in. Use a separate browser profile for simultaneous testing.

The browser cannot create administrator privileges. Initial administrator provisioning is a trusted project-owner operation.

## Likely questions and clear answers

| Teacher asks | Suggested answer |
|---|---|
| Why is this an Education project? | It teaches school disaster safety and tracks learning/practice, serving students and teachers. |
| What is the database? | Cloud Firestore, a managed NoSQL document database in Firebase. |
| Where is the backend? | A Node function on Vercel at `/api/cloud`, plus permitted Firebase SDK operations protected by rules. |
| Why both client SDK and server API? | Routine permitted data uses rules; privileged grading and role assignment require trusted server checks. |
| What proves cloud persistence? | A saved Firestore result remains after refreshing and is visible to authorized clients. |
| What proves real time? | Another client's alert view updates without refreshing through `onSnapshot()`. |
| Can a student choose administrator? | No. Trusted claims are set through authorized backend/owner operations. |
| How do schools stay separate? | schoolId comes from the trusted token; queries and rules enforce the school boundary. |
| How does it scale? | Managed hosting/database, stateless backend, indexes, bounded queries, pagination and listener cleanup; load capacity was not measured. |
| Is it always available? | Managed providers support the design, but outages, quotas and network conditions remain; no guaranteed uptime or configured backup is claimed. |
| Is the chatbot generative AI? | No; the current guide uses local multilingual safety guidelines and browser voice APIs. |
| Does SOS call an ambulance? | No. It records a private school request; external emergency dispatch is not integrated. |
| Are game/drill results authoritative? | They are self-reported educational practice. Module quiz grading is server-authoritative. |
| What is future scope? | AI personalization, AR drills, IoT sensors, mobile apps and stronger operations/reporting. |

## Assignment evidence

Use REQUIREMENTS.md to walk through all sixteen requirements. Use README for architecture, DATABASE_SCHEMA.md for fields/permissions, SECURITY.md for limitations, TESTING.md for historical command results and PUBLISHED.md for verified production deployment. Explain limitations candidly; do not describe future ideas as working integrations.
