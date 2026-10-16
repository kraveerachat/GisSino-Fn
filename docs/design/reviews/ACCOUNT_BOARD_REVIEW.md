---
id: REVIEW-ACCOUNT-BOARD
type: design
level: 2
status: CURRENT
updated: 2026-10-16
up: ../Design-Hub.md
related:
  - ../PROVIDER_CATALOG.md
  - ../../worklog/10-Tasks/TASK-GS-UI-ACCOUNT-BOARD-001.md
---
# Account Board design and verification

## Current state

Code-led extension of the existing Blue Glossy Enamel world. The supplied stacked payment-card image informed folder overlap, rounded tabs, depth and compact composition only. No card network branding or unsupported banking controls were introduced. Independent finish reviewer returned ship for the scored fixes: selected-balance clearance and inactive-tab hierarchy. This verdict covers those fixes, not a new whole-surface accessibility certification.

## Critique provenance and refinement

Independent Assessment A reviewed source and first captures before the parent saw detector findings. Initial Nielsen scores were 3/3/3/3/3/3/3/2/3/2 = 28/40. Strengths: clear folder silhouette, readable featured amount, direct desktop selection. Material findings: excess peeks, context masking suffix, long BAAC compact label, and an overriding short link label. Refinements: one rear tab on narrow containers and two on wide containers, context plus suffix, truthful BAAC short label with full detail identity, linked name/provider and described balance/reference. This initial score is not a rescore of the final build. Questions skipped: the owner already authorized implementation and selected compact folders; the work proceeded through verification.

Independent Assessment B scanned six changed markup JavaScript targets exactly once with Impeccable: exit 0, JSON [], zero findings. Mutable browser injection was unavailable, so no detector overlay is claimed. It verified routes, focus, concealment and fallbacks. Native desktop link dragging cancelled swipe selection; `draggable=false` fixed it and a real headless mouse drag subsequently selected savings. Browser touch swipes and vertical scrolling were separately checked.

## Finish review

The fresh reviewer initially required more compact narrow Stack and clearer inactive-tab hierarchy. First correction resolved tab hierarchy but left insufficient balance clearance at 320/360px. A second targeted spacing correction preserved type and 44px controls. Final verdict: **ship** for the scored fixes; amounts clear the island by approximately 28px at 320 and 18px at 360 in the reviewed captures. No material regression was visible in that correction. Wide layouts were unchanged.

## Responsive evidence

All dimensions below are rendered Chromium CSS pixels, not physical-device claims. Each width has Stack and Grid captures, with zero horizontal page overflow. One column is deliberately used for 320/360px grids; two at 390/430px; three for the tablet/desktop containers. Tablet Stack places the featured folder next to direct account selection when container width permits. Desktop preserves the surrounding sidebar and support column.

| Viewport | Stack/Grid | Evidence files in ignored local artifacts/account-board |
|---|---|---|
| 320×800 | PASS | stack-320.png / grid-320.png |
| 360×800 | PASS | stack-360.png / grid-360.png |
| 390×844 | PASS | stack-390.png / grid-390.png |
| 430×932 | PASS | stack-430.png / grid-430.png |
| 768×1024 | PASS | stack-768.png / grid-768.png |
| 820×1180 | PASS | stack-820.png / grid-820.png |
| 1024×768 | PASS | stack-1024.png / grid-1024.png |
| 1280×800 | PASS | stack-1280.png / grid-1280.png |
| 1440×900 | PASS | stack-1440.png / grid-1440.png |
| 1920×1080 | PASS | stack-1920.png / grid-1920.png |

Additional captures: dark-mobile.png, dark-desktop.png, wallet-mobile.png, detail-mobile.png, forced-colors.png, grayscale.png, edge-long-text-320.png. Full-page files begin at document top; detail is a modal viewport capture. Local screenshots are kept separate from original references and are not committed as unnecessary large artifacts.

## Functional and automated checks

- `npm run check`: PASS — syntax, 342-key Thai/English parity, local assets, catalog-only Thai copy.
- `npm test`: PASS — 25/25; 8 new tests cover provider fallback, fixture totals/types, selection/wrapping, swipe threshold, concealed output, missing/USD values, escaping, states and route parsing.
- Browser 15 groups: default/buttons, keyboard wrap/focus, tab selection without opening, detail routing/dismissal/row focus, Back, detail-to-detail queued-close safety, hidden balances, all simulated states/recovery/focus, unavailable Add Account, existing Add, touch swipe, vertical scroll, desktop sidebar, English/dark and reduced motion. No page errors.
- Additional native mouse drag: PASS. Long-name/large-amount grid at 320px: no horizontal page overflow.

## Accessibility and remaining limits

Semantic links/buttons, visible selection, native modal keyboard containment, Escape, focus return, live position status, 44px control targets, text identity beyond color, reduced motion and forced-color boundaries are implemented. Hidden values do not appear in folder/accessibility descriptions, Wallet rows or account detail. Screen-reader announcements, physical iOS/iPad/Android devices, actual browser zoom at 200–400%, and the full cross-browser matrix were not tested. Forced-color/grayscale captures are visual evidence, not certification. Provider-logo rights and exact corporate colors remain VERIFY; see [Provider Catalog](../PROVIDER_CATALOG.md).

## Change log

- 2026-10-16 — Recorded source, research, independent critique, bounded capture rounds and actual verification for [TASK-GS-UI-ACCOUNT-BOARD-001](../../worklog/10-Tasks/TASK-GS-UI-ACCOUNT-BOARD-001.md).


## Design documentation comparison

Fresh documenter confirmed this is an extension of the incumbent visual world: navy folders preserve the existing sky/cobalt and graphite/amber shells. Final captures match the single inactive narrow tab plus selected provider shelf. DESIGN.md and its system files were preserved. Missing token frontmatter and absent `.impeccable/design.json` were identified as preexisting drift and were not repaired as a side effect. No new visual-world approval is implied.
