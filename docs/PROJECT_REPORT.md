# RakshakApp: cloud-based school disaster preparedness

## Problem statement and domain

Schools need repeatable disaster education, accessible safety guidance and visibility into student participation. Printed instructions and occasional drills provide limited progress tracking and do not synchronize school advisories across devices. RakshakApp addresses this education-domain problem through the existing Punjab-focused disaster curriculum, interactive learning, games and school administration.

Target users are students learning disaster safety, teachers monitoring practice and school administrators publishing advisories and managing school membership. The objective is to extend the existing interface with cloud persistence and secure multi-school access while preserving its navigation, visual design, map, translations, game.

## Existing system limitations

The audited code already had Firebase Google/email-password sign-in, but route protection was unused. There was no Firestore implementation, backend API, security rules or indexes. Learning progress used shared-device localStorage. Quizzes graded public bundled answers in the browser. Alerts, drill timelines and scores were in-memory; dashboards displayed mock figures. SOS simulated transmission and incorrectly promised help. The README described PostgreSQL, Twilio, Whisper and OpenAI integrations that were not implemented in the inspected source. The audit is recorded in AUDIT.md.

## Proposed and implemented cloud solution

The existing React/Vite frontend now uses Firestore as its primary persistence layer, Firebase Auth custom claims for school/role membership and a Vercel Node API for trusted quiz grading and role assignment. No SQL database or additional application project is introduced. The owner approved connecting the same existing app to Firebase `rakshakapp-cloud` and publishing it at https://rakshakapp-cloud.vercel.app/ because the original resources were inaccessible from the signed-in accounts. The original cloud resources were left unchanged.

The architecture diagram and service boundaries are in [CLOUD_ARCHITECTURE.md](CLOUD_ARCHITECTURE.md). Static frontend assets are served by Vercel; browsers communicate with Firebase Auth, authorized Firestore SDK operations and the same-origin `/api/cloud` backend. The backend uses Firebase Admin SDK only after identity and membership checks.

## Database design

Collections cover users, schools, alerts, learningModules, learningProgress, quizzes, quizResults, gameProgress and sosRequests. Additional private quizKeys hold grading answers; riskInformation holds school-specific map advisories. User and school identifiers isolate records and server timestamps support ordered queries. Deterministic progress/result identifiers and transactional attempt writes avoid duplicate submissions. DATABASE_SCHEMA.md documents fields, access, indexes and query patterns.

## Frontend and backend

Existing learning pages retain their multilingual reading and quiz layout. Questions load from published Firestore quizzes; the backend validates submitted indexes against private keys, calculates scores and atomically saves results/completion. Results remain after refresh and appear in student history and authorized staff statistics. Existing game completion now saves a score/badge; this is labeled self-reported rather than secure assessment.

School alerts support actual create/read/update/delete operations. Existing admin history and charts use cloud data. The Punjab map keeps static district reference data and adds configurable school advisories. The SOS modal saves a private school request, provides record deletion and shows truthful school status. It does not dispatch emergency services.

The multilingual guide bot remains local guideline lookup, and voice recognition/synthesis uses browser capabilities. No external LLM, Whisper, Twilio messaging or IoT feed is claimed. Future private integrations must use a trusted backend.

## Authentication and authorization

Google and email/password login methods are retained. `onIdTokenChanged` loads trusted role/school claims; route guards require authentication and staff claims where appropriate. Firestore Rules enforce actual school and owner permissions independently of the UI. Unassigned signup users cannot grant themselves a role. The project-owner provisioning script operates only on existing Auth UIDs, preserves existing records and refuses overwriting an existing role or school. The web role endpoint cannot create administrators or move members across schools.

## Real-time synchronization

`onSnapshot` listeners deliver school alerts and changes to educational results without refresh. Listeners are bounded, filtered and cleaned up on identity/school changes and unmount. Errors and offline status are visible. The required demonstration is an administrator creating a school alert, a student receiving it in another browser, completion of a securely graded quiz, persistence after refresh and automatic staff dashboard updates. Automated emulator tests cover the alert/result data permissions and listener path; real independent-client cloud alert delivery and production backend grading/persistence were subsequently verified. A classroom two-browser walkthrough is supplied for human demonstration.

## Scalability and high availability

Cloud-friendly choices include managed Auth/Firestore, stateless server operations, indexed school/user queries, bounded feeds, cursor retrieval, asynchronous loading and listener cleanup. Current analytics explicitly summarize the latest 100 records. Large schools need aggregate counters, reporting jobs and retention policies rather than unlimited live queries. Large existing game images and frontend chunks remain a performance limitation.

Vercel and Firebase provide managed infrastructure, but the Firestore location is verified as Mumbai (`asia-south1`) and sixteen query index shapes were tested. SLA eligibility, configured backups, monitoring and recovery remain unverified. No guaranteed uptime, configured multi-region redundancy or backups are claimed. An educational app must not be the sole channel for emergency instructions. High availability planning includes tested fallback school communication, budget/usage alerts, region review and recovery exercises.

## Security considerations

Least-privilege rules prevent cross-school private reads, forged quiz result writes, public answer-key reads and self-assigned membership. Sensitive locations are limited to their owner and school administrators; teachers are denied. Secrets remain backend-only and environment examples contain no credentials. Token lifecycle, rate limiting, App Check, consent and retention limitations are documented in SECURITY.md. Authentication does not prove that self-reported game scores or physical safety are true.

## Testing and deployment

For the classroom explanation and exact Console evidence, see [TEACHER_WALKTHROUGH.md](TEACHER_WALKTHROUGH.md). Current deployment status is in PUBLISHED.md; historical tests are distinguished from later cloud verification.

TESTING.md records commands actually run, pass/fail counts and limitations. Tests cover authentication state, protected routes, trusted backend grading/authorization, listener cleanup, Firestore CRUD, alert synchronization, result persistence, unauthorized access and school isolation. Emulator tests use `demo-rakshak`; no production account/data is required. A production build is necessary but does not validate live secrets, domains, IAM or provider setup.

DEPLOYMENT.md describes the existing Vercel project, public Firebase configuration, private backend variables, Auth authorized domains, rules/index deployment, safe catalog creation and demo account provisioning. Production deployment, server Secrets, rules/index configuration and catalog seeding were subsequently completed with owner approval. Google login was verified on the public domain. The source is published on the separate `feat/cloud-full-stack` branch, without merging main. DEMO_SCRIPT.md supplies the classroom walkthrough; REQUIREMENTS.md maps every assignment requirement to source and remaining verification.

## Limitations

- Core production cloud configuration and live backend/data-flow checks are complete. Broader device, accessibility, load, recovery and institutional acceptance testing remain future verification work.
- Teacher/admin totals are a recent bounded sample, not a certified institutional readiness measure.
- Game scores and reading completion are self-reported; there is no anti-cheat or physical safety verification.
- School SOS is not monitored emergency dispatch; no guaranteed response, SMS or external contact integration exists.
- Browser speech/geolocation permissions and available voices vary by device. Tiles require a network connection.
- No audit-log pipeline, automated retention, backup, App Check enforcement or application rate limiting is configured.
- Dependency advisories and baseline lint findings are recorded for review; passing functional tests does not certify production security.
- Public repository curriculum makes quiz answers discoverable to determined students; the backend prevents forged stored scores, not examination cheating.

## Future enhancements

Future scope includes AI-guided personalized disaster education through a secure backend, AR drills, IoT hazard sensors, native mobile applications, authoritative assessment question rotation, server-aggregated analytics, accessibility review, formal institutional data governance, monitoring, backups and tested recovery procedures. These are proposals, not implemented capabilities.
