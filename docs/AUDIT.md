# Baseline audit

Inspected before implementation; production configuration and data are unverified.

| Requirement | Existing implementation | Missing work |
|---|---|---|
| Education and responsive frontend | React/Vite school disaster curriculum, Tailwind UI, Punjab Leaflet map | Preserve styling; fix game overflow |
| Backend | backend/m.jsx is empty | Authenticated Vercel API |
| Authentication | Firebase Google and email/password AuthContext | Claims and auth error handling |
| Authorization | ProtectedRoute exists but App does not use it | Route guards, trusted roles, school isolation, rules |
| Firestore/CRUD | No database initialization or rules | Services, indexes, validated CRUD |
| Learning | ProgressContext uses device localStorage | User-specific cloud progress |
| Quizzes | ModuleDetail grades public bundled answers | Private server keys and saved results/history |
| Games | Kaplay score in memory | Persist self-reported progress and clean up canvas |
| Drills | Two separate in-memory timelines, unrestricted teacher toggle | Shared schedules, participation and role checks |
| Alerts | Admin React state only | Persistent CRUD and realtime student delivery |
| Analytics | Hardcoded counters and charts | School-scoped database statistics |
| SOS | Simulated dispatch and false help-is-coming text | Private school request and truthful status |
| Chat and voice | Local multilingual guidelines and browser speech APIs | Preserve; no external AI integration exists |
| Deployment | Relative Vite assets, no Vercel configuration | SPA/API routing and environment documentation |
| Tests and reports | No test commands or cloud report | Security emulator tests, UI/API tests, report and demo |

Static curriculum, geography, translations, drill instructions and theme settings can remain local. No production data has been read, migrated or deleted. Files affected are the feature paths above plus new `frontend/api`, `frontend/server`, cloud services, Firebase configuration, tests and documentation. See REQUIREMENTS.md for final verification status.
