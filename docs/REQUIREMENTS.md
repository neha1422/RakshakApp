# Cloud Computing assignment — implemented evidence

Current app: https://rakshakapp-cloud.vercel.app/ · Firebase: `rakshakapp-cloud` · Source: `feat/cloud-full-stack`.
Verified implementation/deployment checkpoint: 14 November 2026. This table distinguishes working features from design considerations and unconfigured future work.

| # | Assignment requirement | Evidence to show | Status and limits |
|---|---|---|---|
| 1 | Education-domain real-world problem | School disaster curriculum, modules and quizzes; PROJECT_REPORT.md | Implemented educational platform |
| 2 | Responsive frontend | Existing responsive React/Tailwind layouts, app on a phone-sized browser | Design retained; exhaustive device/accessibility audit not performed |
| 3 | Functional cloud backend | `frontend/api/cloud.js`; deployed authenticated grading | Real production grading/persistence verified |
| 4 | Firebase Authentication | Console → Authentication → Users / Sign-in method | Google and email/password enabled; production Google login verified |
| 5 | Cloud Firestore | Console → Firestore → Data; `lib/cloud.ts` | Real cloud catalog, profiles, progress and results present |
| 6 | Secure role-based access | Custom claims, ProtectedRoute, `firestore.rules`, trusted assignment | Student/teacher/administrator and school boundaries implemented; negative emulator tests |
| 7 | Real-time synchronization | `useCloud.ts`, `LiveAlerts.tsx`, live staff result feeds | Real independent-client alert delivery verified; classroom two-browser script supplied |
| 8 | Scalability | Sixteen index shapes, bounded listeners, filtered queries, cursor history | Implemented design choices; no load capacity claim |
| 9 | High availability considerations | CLOUD_ARCHITECTURE.md and report | Managed providers discussed; no configured backup, SLA or recovery guarantee |
| 10 | Public deployment on Vercel | Public HTTPS URL; Vercel Ready production deployment | Deployed under owner-approved new hosting project |
| 11 | Database queries and CRUD | Alerts create/read/edit/delete; SOS status changes; saved progress | Rules emulator CRUD tests; live saved results and queries verified |
| 12 | Source and documentation | GitHub branch, README, schema, report, setup and teacher guide | Published source; branch remains separate from main |
| 13 | Cloud architecture diagram | README SVG and Mermaid; `docs/assets/cloud-architecture.svg` | Included with flow explanation |
| 14 | Security considerations | Rules, server checks, private Vercel Secrets, SECURITY.md | Private client key read denied; credential excluded from frontend build; broader operational controls remain future work |
| 15 | Demonstration-ready functionality | Teacher guide, demo script, live app, assigned admin, labelled setup student/results | Configured cloud available; create/assign a separate login for a human two-browser student demo |
| 16 | Limitations and future enhancements | README and PROJECT_REPORT.md | Implemented versus future scope separated |

## Feature-to-source mapping

| Feature | Relevant files |
|---|---|
| Login and roles | `frontend/src/context/AuthContext.tsx`, `components/ProtectedRoute.tsx`, `frontend/scripts/provision.mjs` |
| Cloud SDK and queries | `frontend/src/lib/cloud.ts`, `hooks/useCloud.ts`, `firestore.indexes.json` |
| Modules and quizzes | `frontend/src/modules/ModuleDetail.tsx`, `modules/ProgressContext.tsx`, `components/QuizHistory.tsx`, `frontend/api/cloud.js`, `frontend/server/policy.js` |
| Alerts and staff statistics | `frontend/src/pages/MassAlerts.tsx`, `MassAlertHistory.tsx`, `AdminDashboard.tsx`, `components/LiveAlerts.tsx` |
| Game | `frontend/src/game/main.js`, `pages/GamePage.tsx` |
| SOS and administration | `frontend/src/pages/SOSAlertModal.tsx`, `components/SchoolAdminTools.tsx` |
| Map and guide tools | `frontend/src/pages/RiskMapPage.tsx`, `components/chatbot`, `hooks/useEmergencyTools.ts` |
| Deployment and rules | `frontend/vercel.json`, `frontend/.vercelignore`, `firestore.rules`, `firebase.json` |

## Remaining review and future work

A broader mobile/accessibility audit, dependency and lint remediation, load testing, App Check/rate limiting, monitoring, retention, backups and recovery exercises remain operational work. Teacher/student roles exist in code; a new human demo login still needs trusted school assignment. No SQL database, external generative AI, Twilio dispatch, live weather feed, AR or IoT integration is claimed.

The original resources were left intact. With explicit owner approval, the existing app was connected to new Firebase project `rakshakapp-cloud` and a new Vercel URL in the owner's account. Initial audit/testing documents preserve historical checkpoints; README, PUBLISHED.md and this table describe the current deployment.
