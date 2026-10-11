# NAV-005 blocker: runtime verification commands blocked by worker tool policy

Author: qboy
Assignment: [NAV-005](../assignments/NAV-005.md)
Recipient: Eiren / coordinator
Kind: blocker
Dependencies: same session permission behavior recorded in [NAV-006 test-execution blocker](20261010-141414-qboy-nav-006-blocker-test-execution.md)

## What happened

This qboy session's tool policy denies repo-touching execution. Each of these returned the same
"Allow Bash to run …" approval gate that was not granted, so no command produced output:

- `git status` / `git diff --stat` / `git diff --check` (both `cd`-prefixed and `git -C <path>`)
- `npm test` and the direct `node --test <abs path>` runner
- `npm run build`
- `/Users/mac/.local/bin/graphify query …` and `graphify update .`
- any bundled-Playwright / dev-server launch (Astro preview, port 4321)

Non-repo utilities still run in this session (for example `date` and `wc -l` succeeded), which is why
this matches the earlier NAV-006 blocker rather than a total shell loss.

## Consequence for NAV-005

The bounded navigation fixes are implemented and statically cross-checked with Read/Grep, but they are
**runtime-unverified by me**: I could not reproduce before/after at 390px and desktop, run the test
suite, build, or `git diff --check`. Acceptance requires runtime evidence, so I am requesting
coordinator supplementation.

## Checks I need the coordinator (or pip) to run from the repo root

1. `npm test` — expect the 3 prior suites (data, departure) plus the new `tests/navigation.test.js`
   (4 source-invariant assertions) to pass.
2. `npm run build` — expect exit 0, one static page.
3. `git diff --check` — expect no whitespace errors on the four changed files.
4. `/Users/mac/.local/bin/graphify update .` — record warnings separately (NAV-002/NAV-004 saw 19 Astro
   partial-extraction warnings; exit 0 expected).
5. Playwright at **390x844** and **1440x900**, re-running the exact NAV-008 cases:
   - Closed menu: with menu closed, focus the toggle and press Tab. `document.activeElement` must NOT be a
     `#mobileMenu` link; the menu should be non-focusable and the 18px closed strip invisible
     (`visibility: hidden`).
   - Toggle ARIA: `#menuToggle` reflects `aria-expanded` true/false and label "Abrir/Cerrar menú";
     `aria-controls="mobileMenu"`.
   - Anchor clearance: navigate to `#rutas`; section top should settle below the pill (target
     `scroll-padding-top` = 152px mobile / 126px ≥768px) and the "Cobertura de rutas" label must be clear of
     the fixed header.
   - Focus clearance: Shift+Tab to the footer brand after scrolling footer to top; brand should land below
     the closed-header edge (focus scroll-into-view honors `scroll-padding-top`).
   - Console: click each brand `href="#"`; expect no `SyntaxError` from `querySelector('#')`.
   - Regression: footer eight anchors, six nav destinations reachable, no horizontal overflow.

## Limits

I did not fabricate any command output. Changed files and static reasoning are in the linked result. No
install, commit, push, or deploy. If policy for this session is intentionally read/edit-only, please keep
it and run the checks above; I will not retry denied commands in a loop.
