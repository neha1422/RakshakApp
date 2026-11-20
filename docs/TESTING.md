# Verification record — 14 November 2026

> Historical verification checkpoint. For the current public deployment and classroom evidence, see README.md, PUBLISHED.md and TEACHER_WALKTHROUGH.md. Later deployment does not change which commands were run at this checkpoint.

Executed locally on macOS arm64, Node 25.9.0/npm 11.12.1. The project deployment recommendation is Node 22 or 24; the host emitted engine warnings. A temporary Temurin Java 21 runtime was used for emulator tests because system Java was absent. Firebase CLI 15.36.x downloaded Firestore emulator 1.22.0. Vitest 4.1.12 was used for final tests.

| Command, from frontend | Actual result |
|---|---|
| npm install / npm audit fix | Dependencies installed; compatible fixes applied; patched new test tools and PDF library |
| npm run build | Passed; 3,106 modules transformed. Large chunk and existing large game-image performance warnings remain |
| npm run typecheck | Passed |
| npm test | Passed: 16 tests in five files. Nine emulator tests skipped in this non-emulator run, then executed separately below |
| npm run test:rules (Java 21 on PATH) | Passed: all nine Firestore emulator tests, demo-rakshak only |
| git diff --check | Passed |
| npm run lint | Failed: 33 errors, 13 warnings, including existing explicit-any, empty-block and config require findings. Not claimed clean |
| npm audit | Advisories remain; final install reported 37 (30 moderate, 7 high), zero critical. Audit counts can change as the advisory database changes |

The critical jsPDF advisory was addressed by updating the existing PDF dependency. No forced whole-tree major upgrade was applied. Remaining advisory families include the existing frontend/framework/toolchain dependencies and transitive Firebase tooling; assess reachability and upgrade compatibility before institutional production use. Functional tests do not establish that vulnerable dependencies are safe.

## Test coverage

- AuthContext: signed school/role loading, signout state clearing, token failure and unsubscribe.
- ProtectedRoute: unauthenticated redirect, loading, student denial, permitted teacher and missing-school denial.
- Backend policy/API: required valid session and membership, private-key grading, malformed answers, authoritative score persistence, attempt retry, self/escalated/cross-school role denial.
- Cloud hook: school/user query constraints, listener result propagation and cleanup on membership change/unmount.
- Emulator: administrator alert CRUD, unauthenticated/cross-school denial, forged-grade and role-write denial, private key denial, persisted progress, other-student privacy, realtime cross-client alert delivery, backend-created results readable across authorized clients, staff school query isolation, SOS privacy, denial of retired drill collection access, score bounds and profile membership immutability.

An early realtime test timed out because it wrote before establishing listener readiness; the test now waits for its initial snapshot, then creates the alert and observes the changed snapshot. Final runs pass. This does not constitute a production browser demonstration.

## Not run or not verified

Live Firebase provider/domain login, Vercel function deployment/IAM, actual deployed indexes/rules, production two-browser demo, visual mobile QA, load/chaos testing, backup restore and live PDF download were not verified. Public deployment retrieval through the available web tool failed. No production credentials, seed writes, account changes, merges or deployments were made. Follow DEPLOYMENT.md and DEMO_SCRIPT.md after approval.
