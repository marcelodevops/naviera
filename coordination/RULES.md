# Coordination rules

1. One coordinator owns this file, assignments and STATUS.md. Workers propose changes in inbox; they do not redefine the approach.
2. Every assignment specifies objective, inputs, dependencies, owned files, required output and acceptance criteria. No assignment means no worker implementation.
3. Workers read these rules, STATUS.md and their assignment before starting. Preserve others' edits and stay inside ownership.
4. Questions, blockers and review requests go in inbox; results and evidence go in outbox. Create new Markdown files named YYYYMMDD-HHMMSS-agent-topic.md; add a suffix if needed. Never overwrite another message.
5. Every message identifies author, assignment, recipient, kind, dependencies and requested decision or result. Results include changed files, verification evidence and limitations.
6. The coordinator reads pending messages, resolves dependencies, records decisions and message paths in STATUS.md, updates assignments and explicitly dispatches authorized follow-up. Files alone do not wake agents.
7. Keep messages in place. STATUS.md records pending/resolved/reviewed disposition.
8. Completion requires coordinator review against acceptance criteria. Worker-reported completion alone is not acceptance.
9. The user keeps talking naturally to the coordinator. Escalate only genuine user decisions; handle routine handoffs without asking the user to carry messages.
10. Use one agreed approach. Record approval or changes in STATUS.md before dependent work. Existing proposals are context, not automatically approved implementation scope.
