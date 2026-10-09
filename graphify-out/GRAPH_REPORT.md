# Graph Report - naviera  (2026-10-08)

## Corpus Check
- Corpus is ~6,618 words - fits in a single context window. You may not need a graph.

## Summary
- 30 nodes · 36 edges · 5 communities
- Extraction: 86% EXTRACTED · 11% INFERRED · 3% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Page Shell and CDN Stack
- Tracker and Estimator Interactivity
- Quote Forms (mailto)
- Departure Countdown
- Demo Shipment Data Freshness

## God Nodes (most connected - your core abstractions)
1. `TAINA — Maritime Cargo Landing Page (index.html)` - 13 edges
2. `renderTracker(bl)` - 5 edges
3. `estBtn click handler (time estimator render)` - 4 edges
4. `handleForm(fId, sId, bTxt)` - 3 edges
5. `refreshDates() (IIFE, demo date shifter)` - 3 edges
6. `nextDeparture()` - 3 edges
7. `shipments (demo BL dataset, 4 shipments)` - 3 edges
8. `Section: Rastrear/Estimador tabs (#tracker)` - 3 edges
9. `Section: Contacto (#contacto)` - 3 edges
10. `uCd() countdown updater` - 2 edges

## Surprising Connections (you probably didn't know these)
- `quickQuoteForm (hero quick-quote form)` --references--> `TAINA — Maritime Cargo Landing Page (index.html)`  [EXTRACTED]
  index.html → index.html  _Bridges community 0 → community 2_
- `TAINA — Maritime Cargo Landing Page (index.html)` --references--> `Section: Clientes/testimonios + marquee (#clientes)`  [EXTRACTED]
  index.html → index.html  _Bridges community 0 → community 4_
- `TAINA — Maritime Cargo Landing Page (index.html)` --references--> `Section: Rutas (#rutas)`  [EXTRACTED]
  index.html → index.html  _Bridges community 0 → community 3_
- `TAINA — Maritime Cargo Landing Page (index.html)` --references--> `Section: Servicios (#servicios)`  [EXTRACTED]
  index.html → index.html  _Bridges community 0 → community 1_
- `renderTracker(bl)` --shares_data_with--> `sc (stage status color/style map)`  [EXTRACTED]
  index.html → index.html  _Bridges community 1 → community 4_

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Demo BL tracking pipeline (dataset → date-shift → render)** — index_shipments, index_refreshdates, index_rendertracker, index_tracker_button_handler, index_sc [EXTRACTED 1.00]
- **Backend-less quote capture via mailto** — index_handleform, index_quickquotefrom, index_quotefrom, index_mailto_quote_delivery [EXTRACTED 1.00]
- **Zero-build static stack (Tailwind CDN, Iconify, picsum, Manrope)** — index_taina_landing_page, index_tailwindcss_cdn, index_iconify_cdn, index_picsum_cdn, index_manrope_font [EXTRACTED 1.00]

## Communities (5 total, 0 thin omitted)

### Community 0 - "Page Shell and CDN Stack"
Cohesion: 0.22
Nodes (9): Section: FAQ (#faq), Section: Flota (#flota), Iconify web components CDN (lucide icons), Manrope Google Font, picsum.photos placeholder imagery, IntersectionObserver scroll animations (reveal + count-up), Tailwind CSS CDN (cdn.tailwindcss.com), TAINA — Maritime Cargo Landing Page (index.html) (+1 more)

### Community 1 - "Tracker and Estimator Interactivity"
Cohesion: 0.33
Nodes (7): estBtn click handler (time estimator render), renderTracker(bl), Section: Servicios (#servicios), td (transit-time dataset by origin port), tn (cargo-type estimator notes dataset), trackerBtn click/Enter handler, Section: Rastrear/Estimador tabs (#tracker)

### Community 2 - "Quote Forms (mailto)"
Cohesion: 0.50
Nodes (5): Section: Contacto (#contacto), handleForm(fId, sId, bTxt), Mailto-only quote delivery (no backend; prices sent exclusively by email), quickQuoteForm (hero quick-quote form), quoteForm (contact section quote form)

### Community 3 - "Departure Countdown"
Cohesion: 0.40
Nodes (5): #countdown element (next departure timer), nextDeparture(), Section: Rutas (#rutas), Client-side demo data with date-shifting illusion of liveness, uCd() countdown updater

### Community 4 - "Demo Shipment Data Freshness"
Cohesion: 0.50
Nodes (4): Section: Clientes/testimonios + marquee (#clientes), refreshDates() (IIFE, demo date shifter), sc (stage status color/style map), shipments (demo BL dataset, 4 shipments)

## Ambiguous Edges - Review These
- `refreshDates() (IIFE, demo date shifter)` → `sc (stage status color/style map)`  [AMBIGUOUS]
  index.html · relation: conceptually_related_to

## Knowledge Gaps
- **10 isolated node(s):** `toggleFaq(item)`, `tn (cargo-type estimator notes dataset)`, `trackerBtn click/Enter handler`, `#countdown element (next departure timer)`, `IntersectionObserver scroll animations (reveal + count-up)` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 10 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `refreshDates() (IIFE, demo date shifter)` and `sc (stage status color/style map)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `TAINA — Maritime Cargo Landing Page (index.html)` connect `Page Shell and CDN Stack` to `Tracker and Estimator Interactivity`, `Quote Forms (mailto)`, `Departure Countdown`, `Demo Shipment Data Freshness`?**
  _High betweenness centrality (0.778) - this node is a cross-community bridge._
- **Why does `Section: Rastrear/Estimador tabs (#tracker)` connect `Tracker and Estimator Interactivity` to `Page Shell and CDN Stack`?**
  _High betweenness centrality (0.209) - this node is a cross-community bridge._
- **Why does `Section: Rutas (#rutas)` connect `Departure Countdown` to `Page Shell and CDN Stack`?**
  _High betweenness centrality (0.191) - this node is a cross-community bridge._
- **What connects `toggleFaq(item)`, `tn (cargo-type estimator notes dataset)`, `trackerBtn click/Enter handler` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._