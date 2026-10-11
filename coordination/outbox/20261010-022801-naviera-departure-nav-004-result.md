# NAV-004 result — truthful departure no-data

Author: naviera-departure
Assignment: [NAV-004](../assignments/NAV-004.md)
Recipient: coordinator
Kind: implementation result / evidence
Dependencies: accepted NAV-001; no published voyage input
Requested result: coordinator review against NAV-004 acceptance
State: submitted; acceptance pending

## Changed files

- [Routes.astro](../../src/components/sections/Routes.astro): only two departure-summary lines changed. Replaces 72h/countdown and Tuesday 06:00 with “Fecha de salida no publicada” / “Consulta una fecha confirmada con nuestro equipo.” Font size adjusted for readable sentence rather than numeric counter; existing summary heading/style retained.
- src/scripts/departure.js deleted: synthetic recurrence/timer removed, with no unused no-op module retained.
- [main.js](../../src/scripts/main.js): removed sole departure import and init call; other feature wiring unchanged.
- [tests/departure.test.js](../../tests/departure.test.js): one narrow regression checks no-data summary, no number/Tuesday/time/countdown ID and no initializer wiring.
- Required graphify-out generated graph/HTML/report, labels/signature, manifest/cache artifacts updated; curated backup remains at graphify-out/2026-10-10/ (graph.json, GRAPH_REPORT.md, manifest.json, .graphify_labels.json, cost.json).
- This result and [review request](../inbox/20261010-022801-naviera-departure-nav-004-review.md) created. No shared status, assignments, dashboard or audit edit.

## Verification evidence

Installed Python Graphify queried before source changes. Read issued assignment/shared inputs and accepted design; applied narrow TDD and verification guidance.

Regression red: copied current pre-edit Routes/main/departure plus regression into isolated /var/folders/rc/bmhmyp3j54b_c6lvqgwcfghc0000gn/T/nav-004-old-jzchmj71. Node test exits 1 on old 72h/Tuesday summary missing no-data text. Final regression version rerun against same isolated old files also fails on that expected assertion. No live source was reverted.

Regression green: npm test exits 0, **3 passed / 0 failed** (two existing data checks plus new departure regression). npm run build exits 0, one static page built. git diff --check passes.

Browser: locally served production /naviera/; installed bundled Playwright Chromium, no install. Eight combinations **all pass**: America/Santiago and Pacific/Auckland × 1440px and 390px × JS enabled and disabled. Each summary displays identical no-data sentence and no countdown element, fabricated number or Tuesday/time. Summary bounds fit viewport; JS-enabled pages report zero page errors after load. JS-disabled confirms HTML itself is honest. Narrow screenshot review confirms sentence/paragraph readability at both sizes:

- /tmp/nav-004-desktop.png
- /tmp/nav-004-mobile.png

First browser assertion was adjusted for CSS uppercase rendering of the existing heading; product code did not change to satisfy this check.

Source/tests/dashboard hash comparison against pre-edit baseline confirms only owned Routes/main/departure changed plus new regression. Prior Footer edits and all dashboard files unchanged. Whole Git diff still includes prior Footer work; it is not this assignment's change.

Graphify update exits 0: **188 nodes, 244 edges, 16 communities**. It reports 19 Astro files with syntax/partial-extraction warnings plus changed community-label warning (13 saved labels to 16 communities). This limits graph extraction fidelity; successful Astro build independently verifies the product compiles. No installation or LLM relabel was attempted. Existing curated backup directory remains present.

## Limits

This fixes only departure widget behavior without selecting schedule facts, feeds, backend or configuration. Other static schedule/service/operational claims remain pending operator validation and unchanged. No live operations/API/deployment validation; no commit/push/deploy. Local preview stopped after verification. Screenshots and browser scripts are temporary artifacts outside the repository. Completion awaits coordinator review.
