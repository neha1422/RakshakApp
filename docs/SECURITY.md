# Security

Firebase Auth establishes identity. Only signed custom claims `role: student|teacher|administrator` and `schoolId` authorize school operations. Signup never accepts a role or school from the browser. An unassigned account can sign in and read local educational content but cannot access school data. Project owners provision existing Auth UIDs with the explicit CLI; administrators can assign students or teachers in their own school through the verified backend. Existing administrators cannot be changed by the web endpoint, and cross-school changes are rejected.

Firestore Rules deny unspecified access, validate allowed fields, limit strings and coordinates, prevent school/user identity changes and deny direct result/answer-key writes. SOS locations are visible only to their owner and own-school administrators. Teachers can see educational participation, not emergency coordinates. API authorization must be maintained separately because Firebase Admin SDK bypasses rules. Backend failures return generic configuration errors without credentials or request contents.

Private keys exist only in server environment variables or an authorized operator's local environment. `VITE_*` values are compiled into the frontend; Firebase web configuration is public identification, not database authorization. Never put a service account JSON, private key, or external AI credential into frontend source. The current chatbot uses local multilingual guidelines and voice uses browser APIs; there is no external generative AI secret to configure.

Role claims refresh on token refresh/sign-in. After provisioning, sign out and back in. Removing access requires a reviewed trusted operation, token revocation and consideration of Firestore's token validity window. Do not promise immediate removal of all client access simply by changing a role. Use additional live membership checks if immediate revocation becomes an institutional requirement.

## Abuse and privacy limits

Client game scores are self-reported and not suitable for rewards or certification. Completion of reading can be self-marked; quiz grades remain server-authoritative. Alerts and SOS writes are authenticated but are not globally rate-limited. Before public institutional operation, configure App Check/enforcement where supported, server-side quotas/rate limiting, audit retention, access reviews, consent, SOS deletion policy, monitoring and credential rotation. These controls are future operational work, not claimed as configured.

The app records school requests; it does not contact emergency dispatch or guarantee monitoring. Do not put real minors' locations in a classroom demonstration. Use synthetic data. Users/admins can delete SOS location records; backups and log retention, if later configured, require separate lifecycle policies.

Run `npm run test:rules` against demo-rakshak only. Tests assert unauthenticated, other-student and cross-school denial, grade forgery denial, key secrecy, alert CRUD, real-time delivery and SOS privacy. See TESTING.md for actual execution results. Dependency advisories must also be reviewed before production.
