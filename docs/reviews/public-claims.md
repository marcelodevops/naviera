# NAV-001 — public claim inventory

Author: naviera-audit
Assignment: [NAV-001](../../coordination/assignments/NAV-001.md)
Recipient: coordinator
Kind: source audit / proposed next slice
Dependencies: current repository source and existing proposal only
Requested decision: review inventory and authorize only the proposed footer slice
Status: submitted; coordinator acceptance pending
Reviewed: 2026-10-10

This is a source inventory, not a validation of the operator. No operator records, approvals, policy certificates, customer consents or service agreements were found in the reviewed inputs and repository file inventory. Their absence does **not** prove any commercial claim false. “No evidence” below means no corroborating operator evidence in these inputs; hardcoded copy itself is not corroboration. The existing operational plan remains a proposal.

## Business confirmations

All paths below are relative to the repository root; line numbers refer to the reviewed source.

| Category / source | Visible claim | Value source / operator evidence | Required confirmation |
|---|---|---|---|
| Routes: src/components/sections/Routes.astro:16–22,29–34,41–47,58; src/components/layout/Footer.astro:34–36; src/data/estimator.js:3 | Valparaíso, San Antonio, Arica → Rapa Nui/Hanga Roa; principal ports; 3,700 km; warehouse and last mile | Literal template strings and estimator origin table; no evidence | Operating owner confirms available origins, route direction/distance and destination services. |
| Schedules: src/components/sections/Hero.astro:26,106; Routes.astro:21–22,33–34,73–75; FAQ.astro:7; src/data/estimator.js:1 | Weekly Valparaíso departure; 2 departures/week Valparaíso, 1 San Antonio; 4/4.5 days; Tuesday 06:00; 4–5 days navigation; FAQ 6–8 days door-to-door versus estimator 7–10 days Valparaíso | Literal copy and timing table, no published voyage record or operator evidence | Confirm frequency, transit ranges, inclusions, time zone and published voyages; reconcile differing total estimates without choosing a new number from code. |
| Operational updates: src/components/layout/Ticker.astro:4–14,18–28; TopBar.astro:21 | New Arica route / Tuesday departure; TAINA IV departed with 68 containers; 120+ pallets delivered; new refrigerated storage; operations normal | Repeated hardcoded strings, no timestamps/events or operator evidence | Confirm events/service and freshness/ownership before presenting them as current operational facts. |
| Vessels: src/components/sections/Fleet.astro:11–18,22,28; WhyTaina.astro:12–13,20; Hero.astro:99,113 | 8 active owned vessels; Ro-Ro/general cargo; 520 TEU; 99.2% compliance; 15 years; ISM certification | Literal claims; fleet photograph uses picsum seed URL rather than a documented operator asset; no evidence | Confirm owned/chartered fleet, capacity scope, dated compliance denominator, history, certification and approved vessel imagery. |
| Insurance: src/components/sections/FAQ.astro:18–19; WhyTaina.astro:33–34; src/components/layout/Footer.astro:71 | Basic maritime insurance on all cargo; optional all-risk per declared value; integrated insurance / total door-to-door coverage | Literal copy; insurance link is #; no policy/terms evidence | Operator confirms insurer, coverage, exclusions, limits, claims procedure and approved terms. |
| Response SLA: src/components/sections/Contact.astro:13,16; Hero.astro:82; Process.astro:8; FAQ.astro:11; src/scripts/estimator.js:65 | Quote/proposal in under two hours; FAQ qualifies business hours | Literal copy; no staffing calendar or measured response data | Confirm calendar, service definition, owner and coverage; do not infer achievable SLA from frontend submission. Hero line 82 is currently in hidden success markup. |
| Contacts: src/components/layout/TopBar.astro:8–12; Footer.astro:52–61,67; Contact.astro:15–17; src/scripts/forms.js:24 | +56 32 210 8800; cargo@taina.cl; weekdays 08:00–18:00; Terminal 2 Valparaíso; Atamu Tekena s/n Hanga Roa; TAINA Chile SpA | Literal strings/mailto/tel targets; no ownership/reachability evidence | Confirm monitored mailbox, phone, office addresses, hours/time zone and legal identity. Source only establishes link targets, not contact availability. |
| Metrics: src/components/sections/Volume.astro:8–11,16–20; Hero.astro:92,99,113; Fleet.astro:17 | 12,400 pallets/year (hero 12,000+); 840 containers/year; 3,500 tonnes/month; 156 sailings/year; cargo shares 38/27/20/10/5%; 99.2% compliance | Literal data-count targets, percentages and copy; no dated measurement records | Confirm reporting period, units, denominators, measurement source and publication permission. Animation does not make values operational data. |
| Testimonials: src/components/sections/Testimonials.astro:4–12,19–20,25–34,40–49,55–64,70–76 | Eight named client companies; three five-star quotes attributed to Roberto Mendoza, Carolina López and Patricio Tuki; 40 monthly pallets, 3 projects, real-time tracking | Literal company array, star loops and quote strings; no consent/source evidence | Confirm relationships, verbatim attribution, rating origin and publication consent; do not present fictional fixtures as verified endorsements. |
| Service scope: src/components/sections/Services.astro:17,25,33,41; Routes.astro:19,31,44–47; FAQ.astro:23; src/scripts/estimator.js:10–14; src/data/estimator.js:2 | Pallet packaging; FCL 20/40/reefer; LCL from 1 m³, weekly consolidation; project cargo; 800m² owned warehouse, online inventory, delivery anywhere on island; monitoring 24/7; customs stages; Ro-Ro vehicles and priority stowage | Literal sections, stage definitions and cargo notes; no operational evidence; README says protected staff workflow absent | Confirm enabled cargo/services, facilities, inventory access, geographic limits and whether customs applies; do not infer live inventory from marketing text. |

## Source-verifiable technical behavior

| Category / exact source | Observed behavior | Correction or limit |
|---|---|---|
| Countdown: src/scripts/departure.js:5–17; Routes.astro:74–75 | Browser constructs next Tuesday 06:00 using local Date setters and advances one week; initial HTML says 72h. No voyage input. | Synthetic recurrence cannot establish the next published departure; requires removal/no-data behavior or an approved dated voyage input. No replacement departure is inferred here. |
| Route graphic: Routes.astro:63–69 | Constant 70% marker says “En tránsito”. | No position/event input; label as illustration or show only verified event data in a later authorized task. |
| Placeholder actions: src/components/layout/Footer.astro:20,23,26,34–36,42–45,69–71 | LinkedIn/Instagram/Facebook, three routes, four services and terms/privacy/insurance anchors all target #. | Clicking offers no named destination. Existing section IDs rutas and servicios are present (Routes.astro:5; Services.astro:5). Safe first slice below. |
| Demo tracking: src/components/sections/Tracking.astro:32–33; src/data/demo/shipments.js:1; src/scripts/tracking.js:125–145; src/services/api.js:5–13 | Four fictional records are explicitly labeled demo without API configuration. Configured API hides examples and changes notice; errors render an error, with no fallback to demo. | Keep demo distinction. No live API behavior verified. Unknown demo references still use “no corresponde a un envío activo” (tracking.js:33–39), although lookup only covers demo records. BL terminology (FAQ.astro:15; TopBar.astro:17) does not prove legally issued BLs. Percentage is stage-index arithmetic (tracking.js:53,96–100), not observed journey completion. |
| Quote boundary: src/scripts/forms.js:39–53; src/services/api.js:16–24; README.md | Without API, opens email and asks user to send; configured API treats any HTTP ok as received and resets form, with no parsed receipt. | Frontend HTTP success does not independently prove durable intake. No backend implementation/availability established; preserving honest email wording needs no invented receipt. |

## Exactly one recommended next slice: make footer destinations truthful

Proposed ownership: **src/components/layout/Footer.astro only**. Change route anchors from # to existing #rutas and service anchors to existing #servicios. Render the existing social and legal/insurance labels as noninteractive content until approved destinations exist; preserve their wording and the contact details. Do not invent external URLs, legal text, route availability or insurance terms.

Dependencies: coordinator approval of this slice and current existing section IDs. No operator facts, backend, framework or provider choice is needed: destination existence is verifiable from source. This fixes unavailable actions while leaving business validation to its owners.

Acceptance checks:

1. All three route actions navigate to rutas and all four service actions to servicios in the built /naviera page.
2. Social/terms/privacy/insurance labels have no link/button role, href or keyboard tab stop; no footer href="#" remains.
3. Browser keyboard/click checks show available section navigation; mobile footer remains readable; names/contact copy unchanged.
4. Production build succeeds; diff touches Footer.astro only (plus the required Graphify update artifacts under inherited instructions, to be explicitly authorized in that follow-up assignment). Existing two data tests remain passing but do not establish footer behavior.

## Verification and limits

Queried installed Python Graphify first (/Users/mac/.local/bin/graphify), then read source directly because graph locations are navigation aids rather than operator evidence. Read AGENTS, RULES, STATUS, NAV-001, README, proposal and tests/data.test.js; inspected numbered source and repository file list. Existing tests cover four demo timelines and estimator key coverage, not commercial claims, live backend or public navigation. This documentation-only assignment changes no source; no application tests/build/browser run was required or claimed. External contacts, actual service operations, deployments and live API remain unverified. Three owned files only are submitted; acceptance remains with the coordinator.
