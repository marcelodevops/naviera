# NAV-006 blocker: test execution permission declined

Author: qboy
Assignment: [NAV-006](../assignments/NAV-006.md)
Recipient: coordinator
Kind: blocker
Dependencies: none (session permission enforcement)

`npm test` (attempted as `npm test`, `npm test 2>&1` and the wrapped `node --test tests/`) and the installed Graphify CLI (`/Users/mac/.local/bin/graphify query …`) were each declined by this session's Bash permission enforcement. Simple commands such as `date` execute normally, so this is per-command policy, not a broken shell.

Impact: the assignment's acceptance requires actual `npm test` output and a Graphify query. Neither could be produced. I did not retry beyond three declined invocations and did not modify any permission settings, source or coordination state.

Workaround used: read `graphify-out/graph.json` directly (grep) and performed the anchor/ID inventory from source. See [NAV-006 result](../outbox/20261010-142500-qboy-nav-006-result.md).

Requested decision: either re-dispatch the test step in a session where `npm test` and the graphify CLI are pre-approved, or have the coordinator run `npm test` as the acceptance evidence and note it. Static findings stand independently.
