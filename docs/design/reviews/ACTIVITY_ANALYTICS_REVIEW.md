---
id: DESIGN-REVIEW-ACTIVITY-ANALYTICS
type: design
level: 2
status: CURRENT
updated: 2026-10-18
up: ../Design-Hub.md
related:
  - ../../pages/activity/Page-Activity.md
  - ../UI_DATA_CONTRACTS.md
  - ../COMPONENT_INVENTORY.md
  - ../../worklog/10-Tasks/TASK-GS-UI-ACTIVITY-V2-S1.md
  - ../../worklog/20-Sessions/TASK-GS-UI-ACTIVITY-V2-S1-S1.md
---
# Activity monthly analytics review

## Current state

RUNTIME VERIFIED for the tested scope. Required checks, final browser matrix/functions/edge cases, 200% text enlargement and measured text contrast pass. Final independent A is **SHIP for owner review**, after four final captures, without a rescore. Source `ae9c611c68c081ef6686353b33539cbc7980d453` is committed/pushed in new [Draft PR9](https://github.com/kraveerachat/GisSino-Fn/pull/9), verified OPEN/DRAFT MERGEABLE/CLEAN against main. Implementation delivery is CLOSED; final documentation checkpoint/head reconciliation follows and owner review remains pending; no acceptance/merge/production claim. [Task](../../worklog/10-Tasks/TASK-GS-UI-ACTIVITY-V2-S1.md), [S1](../../worklog/20-Sessions/TASK-GS-UI-ACTIVITY-V2-S1-S1.md), [D33](../../project/DECISIONS.md#d33--embedded-activity-monthly-analytics).

## Before, after and purpose

The original Activity view displayed two separate income/expense cards above search, type filters and five relative-day transactions. Its illustrative monthly totals did not derive from those rows. The revision embeds one compact monthly donut with labelled net and income/expense shares, followed by maximum four leading expense categories and a shared native dialog for the complete fourteen-category catalog. Search/type chips still affect the list only; full-month analytics remains stable. No Summary route/tab is introduced.

Activity-only dated synthetic records preserve the original five identities/amounts, add seven October expenses and reconcile every displayed financial total. Home/Wallet/shared fixtures remain unchanged. The existing porcelain/enamel shell, shared SVG ring geometry, exact money formatting, native sheet, navigation and global Add are reused.

## Review images

The parent copied these five final screenshots unchanged into the review folder. Documenter verified all five files exist. Final A inspected four final captures; no image editing is performed.

| Context | Capture |
|---|---|
| Thai/light phone, 390 × 844 | [Phone](activity-analytics/final-th-light-phone.png) |
| Thai/light tablet, 820 × 1180 | [Tablet](activity-analytics/final-th-light-tablet.png) |
| Thai/light desktop, 1440 × 1000 | [Desktop](activity-analytics/final-th-light-desktop.png) |
| English/dark phone | [Dark phone](activity-analytics/final-en-dark-phone.png) |
| English/light full category dialog | [Category dialog](activity-analytics/final-en-light-modal.png) |

## Source and financial contract

`activity-data.js` exports twelve explicit dated synthetic records and fourteen stable category IDs. Existing coffee 85, market 640, train 120 plus housing 8,500/bill 1,250/entertainment 350/family 1,600/shopping 1,290/health 900/education 505 give **THB 15,240 expenses**. Salary is **THB 42,000**. Own transfer **THB 5,000** remains list-only.

- `movement = income + expense = 57,240`; donut shares are income/movement and expense/movement: **73.4% / 26.6%**.
- `net = income - expense = 26,760`, explicitly labelled in the center.
- `categoryShare = categoryExpense / eligibleExpense × 100`; categories partition the same expense total. Top four: housing 8,500, shopping 1,930, family 1,600, bill 1,250. Category shares never use the movement denominator.
- `activityShares` uses integer/BigInt largest remainder at one decimal place, stable input-order ties and validated full partitions summing 100.0%; zero movement has no fabricated percentages.

Only eligible `income`/`expense` in the selected Asia/Bangkok month/currency count. `activityEligible` rejects voided status, card-payment/adjustment kind, own-transfer/reversal markers, refund/card-payment/liability-settlement purposes and `refund_return`. Source-ID duplicates count once; fingerprints include classification fields, and conflicting records make all currency totals unknown across the projection, regardless of the first duplicate's currency/date or input order. Catalog names never confer accounting semantics.

Amounts are validated safe nonnegative integer minor units, aggregated through BigInt and formatted exactly. THB/USD remain separate without FX. Unknown/invalid/unsafe amounts, impossible dates or unsupported currency suppress financial figures/proportional geometry rather than imply zero. Date-only entries display no invented time. Hidden mode removes amounts/shares/ring sectors/bar geometry and accessible value leaks in both page and dialog. Only coherent October 2026 is selectable; no fake historical month statistics.

## Verification and corrections

| Check | Actual evidence | State |
|---|---|---|
| Required static check | Parent executed `npm run check`: 637 matching TH/EN keys | PASS |
| Tests | Parent executed `npm test`: 102/102, including 18 focused Activity tests | PASS |
| Normal responsive matrix | Documenter inspected `artifacts/activity-v2/browser-final.json`: 32 cases = 8 viewport sizes × 2 locales × 2 themes | PASS; no page overflow, clipped elements or wrapped financial values |
| Viewports | 320×800,360×800,390×844,430×932,820×1180,1180×820,1440×1000,1920×1080 | Chromium emulation only |
| Functional checks | Same artifact: 12 named checks cover CSP-compatible bars; filters/search/recovery;14 categories; title focus/Tab containment/sticky close/Escape/return focus; original/new details; privacy/AX; October-only; all preview states; Home/Wallet/Bills/Activity; reduced motion | PASS; `errors:[]` |
| Financial/date/focus review | Parent reports B findings corrected: classification fingerprints/global cross-currency/date conflict guards, voided/card-payment/adjustment exclusions, invalid/date-only time and disclosure/focus behavior | Corrected; final A SHIP for owner review |
| Visual review findings | Parent reports A found blocked inline bar styles and money wrapping; source now uses SVG rect width attributes compatible with CSP and scoped nowrap | Corrected; final A SHIP after four final captures, no rescore |
| Exactly-once detector | Inspected `detector.json` is `[]`; parent reports one invocation, exit 0, no overlay server | No detector findings |
| 200% text enlargement | Inspected final browser artifact:390px viewport/390px scrollWidth, no clipped elements | PASS for CSS text enlargement; not actual browser/OS zoom |
| Edge scenarios | Same artifact:zero/income-only/expense-only/mixed-currency/invalid/negative-net; six cases, no NaN/invalid geometry/overflow | PASS |
| Accessibility supplement | Inspected `accessibility-final.json`: conservative computed text minimum5.175:1 light/4.775:1 dark including placeholder; failures[]; CSP[]; Add and preview-focus checks true. Parent verifies both-theme14-row sheet bottom/sticky header | PASS for measured scope |
| Source Git/PR | Parent verified ae9c611c68c081ef6686353b33539cbc7980d453 committed/pushed and equal to new Draft PR9 head;OPEN/DRAFT MERGEABLE/CLEAN | Source REMOTE_PUSHED;final docs checkpoint/owner review pending |

First browser evidence and intermediate text-overflow failures are historical. The final browser artifact now completes successfully with 32 layouts,12 named functional checks, six edge scenarios and 200% text enlargement. The separate accessibility artifact confirms measured contrast/CSP/Add/preview-focus checks. Local ignored artifacts contain machine-specific diagnostics and are not published raw logs.

## Full changed-file manifest

Runtime/tests (8): `index.html`; `src/app.js`; `src/screens.js`; `src/i18n.js`; new `src/activity-data.js`; new `src/activity.js`; new `src/styles/activity.css`; new `tests/activity.test.mjs`.

Markdown documentation (20): `docs/START_HERE.md`; `docs/architecture/SYSTEM_ARCHITECTURE.md`; `docs/design/UI_DESIGN_SPEC.md`; `docs/design/UI_DATA_CONTRACTS.md`; `docs/design/COMPONENT_INVENTORY.md`; `docs/design/DESIGN_TOKENS.md`; `docs/design/SCREEN_MAP.md`; `docs/design/ONBOARDING_HOME_V2_ROADMAP.md`; `docs/design/Design-Hub.md`; this review; `docs/pages/Pages-Hub.md`; `docs/pages/activity/Page-Activity.md`; `docs/project/DECISIONS.md`; `docs/project/OPEN_QUESTIONS.md`; `docs/project/PROJECT_HISTORY.md`; `docs/project/HOME_AND_LEADERBOARD_SPEC.md`; `docs/worklog/00-Index/Task-Dashboard.md`; `docs/worklog/10-Tasks/TASK-GS-UI-ACTIVITY-V2-S1.md`; `docs/worklog/20-Sessions/TASK-GS-UI-ACTIVITY-V2-S1-S1.md`; `docs/worklog/90-Receipts/20261018-224320-TASK-GS-UI-ACTIVITY-V2-S1-FINAL.md`.

Review image copies (5): the five existing PNGs linked above under `docs/design/reviews/activity-analytics/`. Ignored local design context (2): `.ui-craft/brief.md`, `.ui-craft/tokens.md`. Ignored browser/detector artifacts are supporting local evidence and are not committed implementation files. Final manifest is20 Markdown docs,8 runtime/test paths and5 PNGs =33 paths. One [immutable receipt](../../worklog/90-Receipts/20261018-224320-TASK-GS-UI-ACTIVITY-V2-S1-FINAL.md) records pushed source/evidence;parent final docs commit/push/head reconciliation follows.

## Limits and future production work

M2/M3 must supply authenticated owned ledger/category/query adapters and final refund/reversal/adjustment/settlement/linked-record policies. S1 excludes explicit markers and preserves required zero catalog entries; it does not implement production accounting. Other months require coherent dated records. No backend, persistence, bank sync, posting, FX provider, network service, chart dependency or AEGIS/infrastructure change.

Physical-device testing, iOS/Safari/cross-browser behavior, actual screen-reader use and actual browser/OS zoom remain unverified. Chromium AX inspection and CSS text enlargement are bounded checks, not certification. Owner visual acceptance and merge remain human gates.

## Change log

- 2026-10-18 — Created source/evidence review with passed required checks/normal matrix and explicit pending text-enlargement/final-delivery gates. Earlier sessions/receipts preserved.

- 2026-10-18 — Final102-test/637-key,32-layout/12-functional/six-edge/200% text/contrast evidence passes; final A SHIP for owner review, no rescore. Git/PR/receipt pending.

Final amount hardening: invalid negative/fractional/missing/unsafe raw transaction amounts render Not recorded without income/expense direction prefix in both rows and details. Valid negative monthly net remains meaningful;the additional focused case brings totals to102 tests/18 Activity. Normal fixture/screenshots unchanged.

## Run notes

Review target source slug: `src` / Activity; ignore list: none. A completed baseline review before the exactly-once detector; final A received no B outputs. B inspected source independently; all reported financial/date/focus issues and later global-conflict residual were corrected with focused tests. Detector ran once with zero findings. No overlay injection/browser connector was available; no overlay or overlay live-server was started, so no overlay cleanup was needed. Diagnostic scripts/raw artifacts remain ignored for traceability; five normal review PNGs were copied without editing. Parent verified origin/main remains at base90a81e8 and protected shared fixtures/Wallet/Home files are unchanged.

Final vault audit:80 notes/80 unique IDs,maximum3 clicks;all five images and one Activity receipt resolve. No new issue;four inherited metadata/provider-link issues remain unchanged. Full whitespace check passes;20 Markdown closeout paths are included in the final documentation commit; the owner handoff records final Git head equality.

Latest pushed source head: `b92cf237a54ed364fda4fdb48b81b98e6c2188bf`,after feature checkpoint `ae9c611c68c081ef6686353b33539cbc7980d453`. Salary search now matches its visible Income category rather than Other;existing focused-test assertion added,required637-key/102-test checks rerun PASS. No UI/screenshot change. Immutable receipt remains at its actual ae9c611 checkpoint;final docs commit/push/head reconciliation follows.
