# RakshakApp

**Current live app: https://rakshakapp-cloud.vercel.app/** — deployed to the owner's Vercel account on 14 November 2026, connected to Firebase `rakshakapp-cloud`. See [deployment and plain-language explanation](docs/PUBLISHED.md). The original domain below was not accessible from this Vercel account and has not been modified.

Current local setup: connected and verified against the owner's new Firebase project `rakshakapp-cloud`. Run `cd frontend && npm run dev:full` for frontend + backend at http://localhost:8081. See [current setup](docs/LOCAL_RUN.md) and [live verification](docs/SETUP_VERIFICATION.md). The original deployment details below describe the earlier implementation checkpoint.

School disaster preparedness for students, teachers and administrators, extending the existing React/Vite application with Firebase Authentication, Cloud Firestore and a trusted Vercel Node backend.

Existing deployment: [rakshakapp.vercel.app](https://rakshakapp.vercel.app/) · Existing Firebase project: `punjab-prepared-ecosystem`.

This branch prepares the cloud upgrade locally. It has not been deployed, merged, seeded against production or given production secrets. The existing deployment may still run the earlier application.

## Implemented source

- Existing Punjab district map, multilingual reading content, Kaplay game, virtual drill instructions, voice tools, themes and navigation retained.
- Google/email-password Firebase login, protected routes and trusted student/teacher/administrator school claims.
- School alerts with Firestore CRUD and real-time student delivery.
- Cloud learning progress, published quiz questions, backend grading, saved quiz history and live staff statistics.
- Shared drill schedules/participation and persisted self-reported game scores/badges.
- Private school SOS requests, administrator status updates and location deletion. No emergency dispatch integration is claimed.
- School risk advisories, activity PDF exports, rules/indexes and reviewed provisioning scripts.

The guide chatbot uses local multilingual guidelines and browser voice APIs. PostgreSQL, Twilio, OpenAI and Whisper were described in the old README but were not implemented in the inspected application. They are not dependencies of this upgrade.

## Run and verify

Use Node 22 or 24. From `frontend`:

```sh
npm ci
cp .env.example .env.local
# Fill public Firebase config; keep private credentials server-only.
npm run dev
npm run build
npm run typecheck
npm test
# With Java 21+ on PATH; uses demo-rakshak only:
npm run test:rules
```

`npm run dev` runs the frontend. Use Vercel dev for the same-origin `/api/cloud` function; grading requires backend configuration. Unassigned new users cannot access school records until a trusted owner/admin assigns membership. Follow [deployment instructions](docs/DEPLOYMENT.md), including approved rules/indexes, catalog seeding, demo UID provisioning and authorized domains, before attempting a cloud demonstration.

## Source layout

```text
frontend/src/         Existing React UI and cloud services
frontend/api/         Authenticated Vercel function
frontend/server/      Private backend helpers and seed curriculum keys
frontend/scripts/     Explicit create-if-missing catalog and membership provisioning
frontend/tests/       Auth, routing, backend and emulator tests
firestore.rules       Least-privilege school/user access
firestore.indexes.json
firebase.json         Rules, indexes and emulator configuration
docs/                 Audit, report, architecture, schema and demo
```

## Documentation

- [Baseline audit](docs/AUDIT.md)
- [Cloud architecture and diagram](docs/CLOUD_ARCHITECTURE.md)
- [Database schema](docs/DATABASE_SCHEMA.md)
- [Security and limitations](docs/SECURITY.md)
- [Setup and deployment](docs/DEPLOYMENT.md)
- [Cloud Computing project report](docs/PROJECT_REPORT.md)
- [Demonstration script](docs/DEMO_SCRIPT.md)
- [Requirement checklist and manual steps](docs/REQUIREMENTS.md)
- [Actual testing results](docs/TESTING.md)

Current dashboards summarize at most 100 recent records per collection. Game scores/drill duration are self-reported. No uptime, configured backup, emergency response or certification guarantee is made. Future scope includes personalized AI education, AR drills, IoT sensors and mobile apps.

Developed by Team RakshakApp. Historical project recognition remains recorded in [the baseline README](docs/README_BASELINE.md).
