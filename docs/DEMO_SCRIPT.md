# Demonstration script

Prerequisites: approved deployment/configuration, seeded catalog, assigned student/teacher/administrator demo UIDs in one synthetic school, plus another-school UID for negative checks. Use fake locations. Do not call emergency numbers during the demo.

1. Open administrator account in browser A and student in browser B (separate profiles/incognito). Show Firebase Auth identity and trusted role/school claims without exposing private keys.
2. In A open Admin Dashboard → Mass Alerts. Choose Flood and create a short school preparedness message. Show its new Firestore document. B's Overview live school alerts must update without refreshing.
3. Edit the alert in history and observe the changed message in B. Delete only the newly created demo alert and observe its removal. Avoid deleting pre-existing records.
4. In B open a learning module, switch EN/HI/PA, read and complete its quiz. Questions load from published Firestore documents; submitted answer indexes go to the authenticated backend. Show saved authoritative score and learning completion.
5. Refresh B; show quiz history and persisted progress. Open a teacher/admin dashboard and observe the new quiz attempt and updated recent-record average automatically. Explain that charts show latest 100 school records, not a lifetime institutional score.
6. Staff schedules an earthquake/fire/flood drill. Student opens the latest drill, runs existing instructions, finishes and saves participation. Staff sees result and reported elapsed time. Explain self-reporting limits.
7. Finish the existing game. Refresh Overview and show persisted score/badge. This score is self-reported, unlike server-graded module quizzes.
8. Open Punjab map and demonstrate static district filters plus an administrator-added school advisory. Preserve existing district geography/reference data.
9. Demonstrate the guideline chatbot and multilingual browser speech assistant. They are local guideline lookup/browser speech features; no external LLM integration is claimed.
10. Optionally submit a synthetic SOS school request. Administrator sees the private inbox and can acknowledge, resolve and delete the demo location. Explain that no emergency services are dispatched.
11. Show student staff-route denial. Show automated emulator assertions for cross-school denial and other-student private record denial. Never test destructive unauthorized writes against production data.
12. Open architecture diagram, schema, security notes, test record, limitations and future scope. Export the school activity PDF and explain it is not a formal compliance certification.

Expected failure states: unassigned school shows setup notice; unpublished quiz stays disabled; unavailable backend shows retryable grading error without marking completion; offline state warns changes are unconfirmed; listener errors are visible. Do not report an expected demo outcome as observed until it actually happens on the configured deployment.
