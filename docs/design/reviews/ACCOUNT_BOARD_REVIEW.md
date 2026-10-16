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

## Current state — S3

The owner’s complete-folder deck request supersedes the S1/S2 tab-strip and Stack/Grid model. This is an ordinary extension of the existing enamel world. S3 is implemented locally; source checkpoint is `763db1db7802f9ea011e83016bce57a1c8bd39b3`, final checks passed and the independent finish reviewer returned **ship** with no material fixes; S3 push/PR-head reconciliation remains PENDING. Earlier ship verdicts and remote SHAs below are historical S1/S2 evidence. See [S3](../../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md).

## S1 current state — historical and SUPERSEDED presentation

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

## File manifest

- Created source: `src/providers.js`, `src/account-display.js`, `src/account-board.js`, `src/styles/accounts.css`; tests: `tests/account-board.test.mjs`.
- Modified source: `index.html`, `src/app.js`, `src/blue-screens.js`, `src/fixtures.js`, `src/i18n.js`, `src/icons.js`, `src/wallet.js`.
- Created vault records: Provider Catalog, this review, task, session and final receipt. Updated existing Home/Wallet, design tokens/specification/components/screen map/data contracts, Design Hub, decisions/history, start page/dashboard and prior vault-task current status.

## S2 follow-up critique and verification

Independent pre-refinement design review scored25/40 (3/3/3/2/3/2/3/2/2/2). It identified staggered edges, mobile clutter, unavailable profile creation and generic provider identity. All were addressed in this scoped refinement. Questions skipped: the owner supplied explicit direction and implementation authorization. Technical B ran once:zero detector findings; its fresh tab confirmed validation/draft/focus/route behavior. Actual automated results:30tests,367keys,12browsergroups,20responsivecases/no horizontal overflow,13loadedimages and13matching source/destination SHA256 pairs. The final narrow module measures291px high and has12px boundary gap toRecent Transactions. Captures are local ignored artifacts/account-refinement, separate from the S1 baseline and original reference. Fresh finish reviewer returned **ship** with no material fixes after inspecting all29 variant captures plus canonical mobile/desktop. Documenter comparison is recorded at closeout. Physical-device,screen-reader,actual200–400%zoom/cross-browser certification remain open. Source adds account-profile.js and13PNGs/provenanceREADME; modifies account-board/display,providers,app,wallet,i18n,accounts.css and tests. No unrelated screen redesign.

-2026-10-16 — [Account Board S2](../../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S2.md).

### S2 final screenshot inventory

Local `artifacts/account-refinement/` contains Stack/Grid at320,360,390,430,768,820,1024,1280,1440,1920px; dark-mobile.png,english-mobile.png,profile-add.png,profile-paotang.png,profile-options-bottom.png,profile-on-home.png,profile-detail.png,wallet-mobile.png,provider-catalog.png. The options-bottom file intentionally shows the scrolled lower form. Final captures settle the post-apply toast before profile/Home/Wallet evidence. The detector ran once before the final compact-header markup adjustment; source syntax, unit and functional checks passed again afterward. No overlay was injected.

### S2 documenter result

Fresh documenter directly compared four requested captures and source: ordinary extension of the incumbent enamel system, no scoped fixes. DESIGN.md and system sidecar were preserved. Preexisting documentation format/coverage gaps and absent sidecar remain unmodified.


## S3 dated addendum — 2026-10-16

Authority: owner attachment `892553f0-0076-4b38-94ac-703e530edd72/Pasted text.txt`, “Real Overlapping Folder Stack & Gesture Redesign.” All six accounts now render the same complete provider/name/currency/balance/reference/detail component. Native pointer handling moves existing DOM cards through requestAnimationFrame transforms; 260ms vertical touch grip hold, direct horizontal touch and desktop drag settle with a 240ms cubic ease-out. Cancel/below-threshold restores source. Bounded keyboard/buttons/wheel preserve browser boundary/Ctrl release; normal folder-body scrolling remains native. Whole inactive-card selection overlays retain selection/detail separation. Settings is the sole mode preference and preserves selected ID.

### S3 critique and finish disposition

Method: dual-agent (A: `account_deck_design_a`; B: `account_deck_technical_b`). A completed before detector evidence entered the synthesis. The bundled detector scanned `src/account-board.js`, `src/screens.js` and `src/app.js` once; no ignore list or overlay injection was used. The runtime controller and CSS were covered by source/browser review. Questions skipped: the owner provided the correction and implementation direction. Each assessment closed its own browser contexts; the owner-review preview remains running intentionally.

The parent’s independent preimplementation Nielsen assessment scored 20/40, with individual scores 2/2/2/2/2/3/1/2/3/1. The main failure was the full-folder metaphor: decorative strip tabs and a static featured panel did not satisfy real occlusion or continuous direct manipulation. S3 replaces those with complete shared folders, same-node continuous gesture transforms, Settings-only mode selection and bounded native controls. Fresh independent finish disposition is **ship**, material fixes **None**, after reviewing both modes, continuous frames/source/metrics, Settings, narrow typography/material/ground and preserved shell. No final numeric Nielsen rescore or physical-device/screen-reader certification is claimed.

### Fresh documentation comparison

Compared `src/account-board.js`, `src/account-deck.js`, `src/app.js`, `src/screens.js` and `src/styles/accounts.css` directly with `PRODUCT.md`, root `DESIGN.md` and `.impeccable/account-deck-direction.md`. Inspected ignored local `artifacts/account-deck/diagnostic-full.png` (1440px desktop), `vertical-390.png`, `horizontal-390.png`, `settings-390.png` and `dark-en-390.png`.

Verdict: **ordinary extension verified; no scoped design-system fixes**. The captures retain the sky/cobalt enamel shell, navy folders, curved shoulder, contained provider artwork, tabular balance hierarchy, directional contact shadows and graphite/amber dark shell. Narrow vertical composition shows two genuinely occluded complete rear folders; horizontal composition reveals neighboring complete cards within the track. Settings owns the native select; the Home header has no mode control or instruction paragraph. The wide vertical companion selector and existing Home/Wallet/profile flow remain coherent with the incumbent Operate surface. This comparison is not the independent finish reviewer’s final disposition.

Root `DESIGN.md` was preserved; `.impeccable/design.json` remains absent. Preexisting missing token frontmatter/sidecar and historical source-document availability wording in root design/product context were reported and left untouched, as required by the scoped document handoff. No visual-world replacement or new system authority is implied.

### Actual evidence at documentation checkpoint

- `artifacts/account-deck/functional.json`: 24 passed functional/browser groups, `errors: []`. Groups include six complete cards, continuous native vertical/horizontal tracking on the same DOM nodes, early-hold cancellation, below-threshold restore, pointer cancellation, folder-body scroll, desktop drag, accumulated/throttled wheel and boundary/Ctrl release, bounded keyboard, Settings ID preservation, explicit/active-only double activation detail, reduced motion, concealment, profile validation/Paotang/Wallet context, existing Add, reload reset and failed-logo fallback.
- The same file records 18 responsive mode captures: vertical/horizontal at 320/360/390/430/820 portrait, 1024 landscape and 1280/1440/1920px, without horizontal page overflow. Measured six-card geometry is 160px high at 320–430px and 164px at the remaining widths. Vertical exposure is 24/28px according to component width with at most two/three rear folders.
- `artifacts/account-deck/detector.json`: `[]`, one parent/technical pass, zero findings. It was not rerun by the documenter. Inline markup style attributes were removed; runtime transforms remain component-local style properties.
- `artifacts/account-deck/console-confirm-b.json`: fresh 1440×1000 browser check records empty console, page-error and failed-request arrays after the CSP fix; selected `daily`, vertical, idle. This supersedes earlier diagnostic CSP errors for that confirmation gate.
- Parent-confirmed final source checks: `npm run check` PASS, 375 keys per locale; `npm test` PASS, 34 tests; source `git diff --check` PASS. Source checkpoint `763db1db7802f9ea011e83016bce57a1c8bd39b3`. Later CSP markup assertion passed all 13 Account Board tests; test checkpoint is `e98171295ae32ab7409a31bb51484d44467da867`. No UI edits followed the captures. Supplemental `selection-extra.json` directly records 5 more passed groups with zero errors (29 functional groups across both files).

S3 source boundary: new `src/account-deck.js`; modified `src/account-board.js`, `src/app.js`, `src/screens.js`, `src/i18n.js`, `src/styles/accounts.css` and `tests/account-board.test.mjs`. No asset changes; 13 provider logos, profile form, Wallet adapter and financial fixtures/contracts continue from S2. Physical-device, screen-reader, actual zoom and cross-browser certification remain unverified.

- 2026-10-16 — [S3 session](../../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md): current design contract and fresh documentation comparison; fresh reviewer **ship**, delivery synchronization pending.

### S3 visual and motion inventory

Ignored local `artifacts/account-deck/` retains `vertical-<width>.png` and `horizontal-<width>.png` for all nine widths above (exact viewport captures), `vertical-mid-drag.png`, `vertical-settled.png`, `horizontal-mid-drag.png`, `horizontal-settled.png`, `settings-390.png`, `dark-en-390.png`, `dark-en-1440.png`, `reduced-motion.png`, `sidebar-collapsed.png` and the valid additional desktop `diagnostic-full.png`. The canonical reviewer packet uses `.impeccable/review/mobile.png` and `desktop.png`. Early full-page compositor captures displaced the desktop margin despite correct measured layout; they were replaced by valid viewport captures, without a shell source change. Independent B additionally inspected 390×844 and the desktop diagnostic includes 1440×900.

`account-deck-interactions.webm` records actual Chromium gesture/regression execution, including both modes. Native touch input and multiple midgesture displacement samples establish movement before release; static frames alone were not used to claim animation verification. This is an emulated Chromium recording, not physical-device evidence. Earlier S1/S2 artifacts and the supplied Pinterest reference remain separate from current-build evidence.
