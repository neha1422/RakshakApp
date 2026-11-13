# Assignment implementation checklist

Status means code implemented locally, not deployed or verified against production. All external configuration remains subject to owner review.

| # | Requirement | Implementation evidence | Verification / remaining step |
|---|---|---|---|
| 1 | Education real-world problem | Existing school disaster curriculum; PROJECT_REPORT.md | Source inspected |
| 2 | Responsive frontend | Existing responsive Tailwind UI retained; GamePage overflow fixed | Build; live mobile visual review pending |
| 3 | Functional cloud backend | frontend/api/cloud.js, server/admin.js | Mocked API authorization/grade tests; live IAM/env pending |
| 4 | Firebase Authentication | context/AuthContext.tsx retains Google and email/password | Auth state/route tests; provider/domain config pending |
| 5 | Firestore NoSQL | lib/cloud.ts; DATABASE_SCHEMA.md; seed/provision scripts | Emulator operations tested; owner setup pending |
| 6 | Secure roles | ProtectedRoute.tsx; custom claims; firestore.rules; provision.mjs | Negative authorization and isolation tests |
| 7 | Real-time sync | useCloud.ts, LiveAlerts.tsx, admin result feeds | Cross-client emulator alert test; live demo pending |
| 8 | Scalability | Bounded school/user queries, indexes, cursor helper | Source and build; capacity/load tests not performed |
| 9 | Availability considerations | CLOUD_ARCHITECTURE.md | Provider settings/backups/SLA unverified |
| 10 | Public Vercel deployment | Existing target retained; frontend/vercel.json | Prepared only; deployment approval/configuration required |
| 11 | Queries and CRUD | Alerts create/read/edit/delete; SOS updates; progress/results | Emulator alert CRUD/privacy tests |
| 12 | Source and docs | Existing repository branch; README and docs | Local review-ready changes |
| 13 | Architecture diagram | Mermaid in CLOUD_ARCHITECTURE.md | Included in source report links |
| 14 | Security | firestore.rules, backend checks, SECURITY.md, env example | Emulator and backend negative tests; dependency caveats |
| 15 | Demo-ready functionality | DEMO_SCRIPT.md; school alerts/quiz/history/drills/game/SOS | Requires cloud setup, catalog and test UIDs |
| 16 | Limits and future scope | PROJECT_REPORT.md and SECURITY.md | Implemented versus proposed separated |

## Feature-specific changes

- Learning: ProgressContext cloud persistence; ModuleDetail published questions and backend grading.
- Quizzes: private server keys, validated answers, idempotent grade/result transaction, QuizHistory.
- Games: existing Kaplay flow and assets retained; completion persistence and engine cleanup.
- Drills: shared Firestore schedules/results; trusted teacher view and scheduling.
- Administration: live recent-record counters/charts, role assignment, SOS inbox, activity PDF.
- Map: existing Punjab district reference layers retained; school advisory feed.
- SOS: private location CRUD and honest school-only status.
- Guide/voice: existing offline guideline lookup/browser speech retained.

## Manual configuration checklist

- Review production data compatibility before replacing rules.
- Confirm existing Firebase database/location and public web app config.
- Confirm providers and allowed Vercel domains.
- Configure backend service-account variables and least-privilege IAM.
- Approve/deploy rules and indexes; wait for ready indexes.
- Approve/create missing catalog docs; validate public/private quiz pairs.
- Provision synthetic student, teacher and administrator UIDs in a demo school.
- Verify token refresh, preview API, two-browser live flow and mobile UI.
- Review dependency advisories, monitoring, budget, privacy and retention needs.
- Explicitly approve production deployment/promotion. No deployment or merge occurred in this work.
