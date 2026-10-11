# Local coordination snapshot

Run with Python 3; no installation or server required:

```sh
python3 coordination/dashboard/build.py --repo /Users/mac/ops/repos/naviera --output /Users/mac/Documents/Codex/2026-10-09/agent-coordination/outputs/naviera-dashboard.html
```

Open the exported HTML locally. Search, state filters and task selection work offline. Rebuild after coordinator decisions to refresh the snapshot. The page cannot dispatch workers or change records.

Assignments provide task identity, owner and dependencies. The current STATUS assignments table overrides assignment state when present. Unknown states remain visible. Inbox/outbox evidence matches the explicit Assignment metadata; baseline reports are excluded from task counts. An inbox message is resolved/reviewed only when STATUS names its file in a link followed by an affirmative reviewed, accepted or resolved disposition, with no pending, unresolved or negated wording on that line. Unmatched messages remain pending. The full status record remains available for context and limits.

Inputs are read only. All embedded record content is displayed as text; JSON escapes HTML delimiters. Records are sorted by path and the export includes its UTC snapshot time. No remote assets, requests or persistence.
