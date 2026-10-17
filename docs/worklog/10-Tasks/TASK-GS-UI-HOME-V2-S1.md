---
id: TASK-GS-UI-HOME-V2-S1
type: task
level: log
status: RUNTIME VERIFIED
updated: 2026-10-18
up: ../00-Index/Task-Dashboard.md
related:
  - ../../pages/home/Page-Home.md
  - ../../pages/settings/Page-Settings.md
  - ../../design/UI_DESIGN_SPEC.md
  - ../../design/UI_DATA_CONTRACTS.md
  - ../../design/SCREEN_MAP.md
  - ../../project/DECISIONS.md
  - ../../project/OPEN_QUESTIONS.md
  - ../20-Sessions/TASK-GS-UI-HOME-V2-S1-S3.md
---
# TASK-GS-UI-HOME-V2-S1 — Seven-day due list and missing activity days

## Current state — S3 owner revision

RUNTIME VERIFIED, awaiting owner review. Existing task/gs-ui-home-v2-s1 and [Draft PR7](https://github.com/kraveerachat/GisSino-Fn/pull/7), no new PR/receipt. Parent verified clean startup/local/remote/PR HEAD bcc3073795e75e5c13d31c828d2d3bb6a5a00740, OPEN/DRAFT and unchanged main bb27e2812789346fc322d4bad3fc6d847ed3823d. Parent check PASS 550 keys/tests 70/70; final browser84 cases/19 captures/11 groups errors[]issues[]; A32/40 Good / no findings, B no material findings, detector[] once and parent finish PASS. Source 6f1a252d5bcc3c5c7fa95693c4d9bd650dc98324 committed/pushed. Docs checkpoint/final local-remote-PR equality pending parent reconciliation. Historical S1/S2 does not verify S3.

## S3 approved behavior

- Before S2: Accounts → Today → Safe → habits → Recent. After preserved top cover: **Accounts → conditional seven-day Due soon → existing habits/missing days → Recent last**.
- Remove Safe Home rendering only. Retain exact minor-unit/currency-isolated math/formatter/fixtures/scenarios/financial tests; future Wallet placement OPEN. No Today/nearest/monthly Home UI.
- Due soon: valid unpaid overdue/today/+7 inclusive against selected Bangkok time; exclude paid/invalid/+8/duplicates. Stable date/ID; dedupe same ID or name/date/currency/amount. Max4 category/title/status/short-date rows, no inner scroll, hidden empty; existing Bill details and View all Bills, no filter claim.
- Seven-day Home information differs from unchanged bell<=3 days and canonical T-3/due/overdue production reminders. No dispatch/preferences/delivery changes.
- Missing means strictly past current-week nonactive/completed dates, including frozen, excluding pending today/future. First-missing focus reuses calendar; frozen remains blue/snowflake/no-activity and selected status atomic; zero missing positive.
- Preserve Account Board source/assets/geometry/gestures/Settings, streak/XP/4/7 ring/timeline keyboard/touch, freeze model, shared check-in/idempotent illustrative reward/reduced motion. No app-open/login award, persistent habits/finance/reminders or Wallet redesign.

## Inventory, gates and open decisions

The canonical [18-system/eight-column inventory](../../pages/home/Page-Home.md#feature-and-system-inventory) distinguishes current UI from deferred real engines. M2 ledger → M3 Activity → M5 obligations → M6 reminders → M7 habits → M8 Party boundaries and [M7 backlog](../../architecture/SYSTEM_ARCHITECTURE.md#77-habits-streaks-xp-badges-stats) remain unchanged.

| Gate | Actual S3 evidence |
|---|---|
| Authority/repository | Parent verified same OPEN/DRAFT PR7/task branch at clean bcc3073 |
| Source | Seven exact source/test files at pushed 6f1a252d5bcc3c5c7fa95693c4d9bd650dc98324; manifest S3 |
| Check | Parent reports PASS 550 locale keys |
| Tests / browser / independent review | Parent full70/70 tests; actual84 browser cases/19 captures/11 functional groups; A32/40 Good / no findings, B no material findings; detector once[]; parent final visual finish PASS |
| Vault / protected bytes | Direct strict checker70 notes/70 IDs/max 3 clicks; exactly 3 inherited findings/zero new; inventory18 rows / 8 columns, protected normalized content unchanged, history append-only, whitespace pass |
| Commit/push/PR equality | Source 6f1a252d5bcc3c5c7fa95693c4d9bd650dc98324 pushed; docs checkpoint/final equality pending parent reconciliation |
| Production / merge | NOT PERFORMED / HUMAN ONLY |

[D31](../../project/DECISIONS.md#d31--seven-day-home-due-list-and-missing-activity-days) supersedes only corresponding D30 presentation. OPEN: future Safe Wallet placement, monthly Activity-vs-Wallet destination, conflicting login/app-open XP proposal and primary-partyQ8. Current rules still exclude app-open XP.

## Sessions and S3 touches

| Session | State | Purpose |
|---|---|---|
| [S1](../20-Sessions/TASK-GS-UI-HOME-V2-S1-S1.md) | CLOSED unchanged | Historical foundation and immutable receipt |
| [S2](../20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md) | Historical RUNTIME VERIFIED unchanged | Compact Home/gamified delivery at startup bcc3073 |
| [S3](../20-Sessions/TASK-GS-UI-HOME-V2-S1-S3.md) | RUNTIME VERIFIED | Seven-day due list, Home Safe removal and missing-day presentation |

Touches: [Home](../../pages/home/Page-Home.md), [Pages Hub](../../pages/Pages-Hub.md), [architecture](../../architecture/SYSTEM_ARCHITECTURE.md), [UI spec](../../design/UI_DESIGN_SPEC.md), [Data Contracts](../../design/UI_DATA_CONTRACTS.md), [Tokens](../../design/DESIGN_TOKENS.md), [Components](../../design/COMPONENT_INVENTORY.md), [Screen Map](../../design/SCREEN_MAP.md), [Decisions](../../project/DECISIONS.md), [Open Questions](../../project/OPEN_QUESTIONS.md), [History](../../project/PROJECT_HISTORY.md), [Start](../../START_HERE.md), [Dashboard](../00-Index/Task-Dashboard.md), this task and new S3. Party/Activity/Settings and historical records remain unchanged.

## Historical S2 delivery

Source292f346b814d41775d2a569d3ed31bef390040ce, docs10239a1598883a88eb749f53d5dc72a5a55634d5 and handoffbcc3073795e75e5c13d31c828d2d3bb6a5a00740 remain historical. S2's545keys/66tests/70cases/26captures, review corrections and exact manifests remain in its untouched session; D30 remains in decision history. CLOSED S1 and immutable receipt remain untouched. No new receipt for this open-PR continuation.

## Historical S1 closed delivery — superseded presentation only

Everything below records the original S1 checkpoint. Its layout, counts and pending-action language are historical and do not describe S3. The CLOSED session and receipt remain untouched.

### Current state

Implementation delivery is CLOSED after source/docs push and verified checkpoint `3f0eda384c288d974c340b16ffd3ade9dba46ed9` matched local HEAD, remote task branch and PR #7 head. Receipt-inclusive status commit follows this checkpoint. PR #7 remains OPEN/DRAFT, base main, head task/gs-ui-home-v2-s1; owner acceptance/merge remains pending. S1 runtime/test source exists on new branch `task/gs-ui-home-v2-s1`, based on merged latest main `bb27e2812789346fc322d4bad3fc6d847ed3823d`. Source checkpoint `0e7e40f07cafd62103406e1eab06db3b384b6726` is pushed and matched local/remote/PR head; final finish is SHIP. New [Draft PR #7](https://github.com/kraveerachat/GisSino-Fn/pull/7) is OPEN/DRAFT, base main, head task/gs-ui-home-v2-s1. Documentation checkpoint and immutable receipt are recorded below. PR title: `feat(ui): implement Home v2 daily overview foundation`. [Session S1](../20-Sessions/TASK-GS-UI-HOME-V2-S1-S1.md) records the verified delivery evidence.

Parent verified planning [PR #5](https://github.com/kraveerachat/GisSino-Fn/pull/5) merged at `7fb1685c8b8e40faf07ef9354be920f4706be92c` and Welcome [PR #6](https://github.com/kraveerachat/GisSino-Fn/pull/6) merged at the base above. Closed planning/Welcome/Account Board tasks, sessions and receipts are protected historical records, not reopened. Their merge state is reconciled only in current indexes/living notes and a new append-only history entry.

### Objective and authority

Implement only the owner-approved first Home v2 slice in the existing vanilla JavaScript prototype. The owner brief, merged [roadmap](../../design/ONBOARDING_HOME_V2_ROADMAP.md), [Home/Leaderboard source specification](../../project/HOME_AND_LEADERBOARD_SPEC.md), [Project Guide](../../project/PROJECT_GUIDE.md), [architecture](../../architecture/SYSTEM_ARCHITECTURE.md) and [D29](../../project/DECISIONS.md#d29--home-v2-s1-daily-overview-scope) define scope. The owner confirmed first two Today categories plus expansion. Preserve the blue/porcelain design, Thai-first/light-dark behavior, navigation and complete Account Board.

### Source behavior and boundaries

- Order: greeting/header, existing hero, existing quick actions, synthetic Bangkok disclosure, Today, Safe/Nearest tiles, Streak, unchanged My Accounts, Recent Transactions, compact monthly line.
- Today supports due within three days/overdue, streak at risk, needs-details, and missing qualifying activity after threshold. It renders nothing when empty; first two categories plus native disclosure show the rest. Existing Bills/Activity/Add destinations imply no filter/highlight/save.
- Read-only synthetic projection: fixed default `2026-10-18T10:00` Bangkok, fixture/projection reminder default `20:00`, Home-only Settings scenarios and datetime. Actionable sets `2026-10-23T20:30`. Scenario overrides do not mutate Bills/Activity/financial fixtures; Settings discloses this boundary.
- Safe to Spend uses nonarchived bank/ewallet/cash minor balances minus unpaid current-month minor obligations per currency: THB `11,685,000 - 1,275,000 = 10,410,000` (104,100). Shortfall fixture is `-8,765,000` (-87,650), with text indication. THB/USD remain separate with no FX; invalid/missing/unsafe amounts stay unavailable.
- Nearest is earliest valid unpaid obligation across months, including overdue; title/amount/date/day status and empty state link to Bills. Streak/freezes remain sample 7/2; rank 2 appears only with explicit synthetic party context. Primary-party rule remains OPEN.
- Account Board renderer/controller/styles/providers/gestures/profile/detail/Settings mode controls remain unchanged. Existing surrounding Home sections move. Monthly is an illustrative October THB 15,240 line to `#activity`; chart/full summary removed from Home, Summary route not implemented.

Out of scope: Activity Summary, Global/Friends/spending leaderboards, Friends, Party/Family creation, new screens/financial engines/APIs/database/authentication/persistence, bank sync/OCR and AEGIS/production infrastructure. No merge, deletion, rename or new hub/folder is authorized here.

### Acceptance and remaining gates

- [x] Read owner/repository sources; inspect/reuse current components and record file plan.
- [x] Implement the scoped source behavior and deterministic fixtures with TH/EN copy.
- [x] Add focused tests for conditional/empty/actionable Today, true shortfall, ordering, no party rank, valid routes, Account Board markup, i18n and disclosure.
- [x] Parent final `npm run check` PASS 513 keys/locale and full `npm test` PASS 64/64 after assertion and money/copy fixes.
- [x] Corrected explicit-viewport browser matrix: 84 cases / 26 captures / 10 functional groups, errors[] / issues[]; seven required sizes, TH/EN, light/dark and five scenarios.
- [x] Independent A/B review, any fixes/rechecks, prescribed detector and final finish assessment.
- [x] Docs health: 67 notes/67 IDs/max three clicks, no new link/frontmatter/parent errors; one inherited closed-planning broken-link exception preserved. All 28 protected files unchanged; previous history body retained; 15-doc manifest and whitespace checked.
- [x] Commit/push and create/verify one new Draft PR; reconcile exact SHAs/URL and real state.
- [x] Create one final immutable task receipt only after verified delivery; preserve all previous receipts.

### Gate dashboard

| Gate | State | Evidence / limitation |
|---|---|---|
| Plan / authority | PASS | Owner's S1 brief; first-two-plus-expand confirmation; latest-main/merged dependency audit supplied by parent |
| Source | VERIFIED | Eight runtime/test paths at `0e7e40f07cafd62103406e1eab06db3b384b6726`, pushed |
| Local checks | PASS (parent executed) | Parent final PASS 513 locale keys and 64/64 tests after assertion and money/copy fixes; 12 Home tests included |
| Browser | PASS (parent executed; artifact inspected) | Corrected explicit-viewport `qa.json`: 84 cases/26 captures/10 groups, errors[]/issues[]; synthetic-touch deck B checks both modes |
| Independent review / detector / finish | PASS | A 29/40 with no P0/P1; one scoped correction batch; B reports no additional correctness/security findings and synthetic-touch deck both modes passed; exactly one post-A detector []/exit 0; B final PNG resolved; finish SHIP |
| Documentation | VERIFIED WITH INHERITED EXCEPTIONS | 15 docs written and checked; 67 notes/67 IDs at docs checkpoint; receipt raises count to68. No new health errors; three inherited strict-check findings documented below |
| Source/docs commit / push / Draft PR | VERIFIED | Docs checkpoint `3f0eda384c288d974c340b16ffd3ade9dba46ed9` matched local/remote/PR7 head; OPEN/DRAFT, base main, correct task branch/title |
| Production | N/A | Mock UI only; no production action |
| Final receipt / closeout | CLOSED | One immutable receipt follows verified docs checkpoint; owner review/merge pending |

### Exact manifest

Runtime/tests (8): `src/blue-screens.js`, `src/screens.js`, `src/app.js`, `src/fixtures.js`, `src/i18n.js`, `src/styles/blue.css`, new `src/home-overview.js`, new `tests/home-overview.test.mjs`.

Documentation (16 including receipt): `docs/START_HERE.md`; `docs/pages/Pages-Hub.md`; `docs/pages/home/Page-Home.md`; `docs/pages/settings/Page-Settings.md`; `docs/design/UI_DESIGN_SPEC.md`; `docs/design/UI_DATA_CONTRACTS.md`; `docs/design/DESIGN_TOKENS.md`; `docs/design/COMPONENT_INVENTORY.md`; `docs/design/SCREEN_MAP.md`; `docs/project/DECISIONS.md`; `docs/project/OPEN_QUESTIONS.md`; `docs/project/PROJECT_HISTORY.md`; `docs/worklog/00-Index/Task-Dashboard.md`; new `docs/worklog/10-Tasks/TASK-GS-UI-HOME-V2-S1.md`; new `docs/worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S1.md`. The sixteenth docs file is the [final receipt](../90-Receipts/20261018-TASK-GS-UI-HOME-V2-S1-FINAL.md).

### Sessions and touches

| Session | Goal | State | Source SHA | Docs SHA |
|---|---|---|---|---|
| [S1](../20-Sessions/TASK-GS-UI-HOME-V2-S1-S1.md) | Approved Home foundation, verification and new Draft PR delivery | CLOSED | `0e7e40f07cafd62103406e1eab06db3b384b6726` | `3f0eda384c288d974c340b16ffd3ade9dba46ed9` |

Touches: [Home](../../pages/home/Page-Home.md), [Settings](../../pages/settings/Page-Settings.md), [Pages Hub](../../pages/Pages-Hub.md), [UI spec](../../design/UI_DESIGN_SPEC.md), [Data Contracts](../../design/UI_DATA_CONTRACTS.md), [Tokens](../../design/DESIGN_TOKENS.md), [Components](../../design/COMPONENT_INVENTORY.md), [Screen Map](../../design/SCREEN_MAP.md), [Decisions](../../project/DECISIONS.md), [Open Questions](../../project/OPEN_QUESTIONS.md), [History](../../project/PROJECT_HISTORY.md), [Start](../../START_HERE.md), [Dashboard](../00-Index/Task-Dashboard.md).

### Review and evidence cautions

Parent reports A scored 29/40 with no P0/P1: P2 English 390px money wrapping, P3 grammar and 320px metadata density. One correction batch adopted narrow currency symbols, smaller responsive Home-only money type, English count/singular due copy and nonshrinking metadata. B found no additional correctness/security issue and passed synthetic-pointer touch deck checks in both modes. Parent detector ran exactly once after A with `[]` / exit 0 in ignored `artifacts/home-v2-s1/detector.json`. The first matrix used an incorrect viewport setup; `qa-invalid-viewport.json` is invalid historical evidence and its claimed counts must not be used. Corrected `qa.json` now records 84 cases, 26 captures and ten functional groups with errors[]/issues[]; the documenter inspected its content, explicit `setViewportSize` script and capture PNG widths. Parent directly viewed final mobile light, English dark 390px, desktop light and tablet portrait; standard English money no longer splits. B directly viewed the final English 390px dark PNG and resolved its money-wrap finding; final B open material count is zero. Independent finish returned SHIP with all 26 captures valid and no material fixes.

### Vault verification and inherited exception

Executed the existing Welcome read-only vault utility against this checkout, writing only ignored `artifacts/home-v2-s1/vault-health-documenter.json`. Result: 67 notes/67 unique IDs/max three clicks; one error is inherited: protected CLOSED `TASK-GS-PLAN-005-S2.md` has a relative `PROVIDER_CATALOG.md` link that does not resolve from its session folder. Parent explicitly directed preservation/reporting, so the closed record remains byte-for-byte unchanged. New/changed notes introduce no broken path, parent-list omission or frontmatter/ID error. All 28 protected task/session/receipt/roadmap/source-spec/feature files match their pre-doc SHA-256 hashes. Earlier Project History body is retained with new dated entries only; all 15 modified/new docs have clean whitespace and no personal filesystem paths.

### Open decisions, limitations and next action

Q8 primary party remains OPEN. Bills highlighting/Activity prefilter and Activity Summary are later follow-ups; monthly amount is illustrative, live reminders/qualification and ledger-backed totals belong to future engines. Physical devices/iPad, screen readers, cross-browser and production behavior cannot be inferred from Chromium viewport/source tests. Owner reviews existing Draft PR #7. Preserve S1 boundaries; S2/primary-party/engine work requires its scheduled task.

### Verified source and final review checkpoint

Source `0e7e40f07cafd62103406e1eab06db3b384b6726` was committed/pushed and matched local HEAD, remote task branch and [PR #7](https://github.com/kraveerachat/GisSino-Fn/pull/7) head. PR is OPEN/DRAFT, base main, head task/gs-ui-home-v2-s1, correct requested title, attached to chat. Final independent finish SHIP: all 26 captures opened/valid, no material fixes. B final image check resolved EN390 money wrap, zero open material findings. Root context drift inherited/outside scope; critique snapshot/trend29/40 persisted locally and temporary body removed. Final docs checkpoint and immutable receipt follow this verified source checkpoint.

### Final closeout and immutable receipt

Implementation delivery is CLOSED after source/docs push and verified checkpoint `3f0eda384c288d974c340b16ffd3ade9dba46ed9` matched local HEAD, remote task branch and PR #7 head. Receipt-inclusive status commit follows this checkpoint. PR #7 remains OPEN/DRAFT, base main, head task/gs-ui-home-v2-s1; owner acceptance/merge remains pending.

Parent strict vault check: 68 notes/68 unique IDs/max 3 clicks after receipt, zero new errors. Three inherited findings remain unchanged: roadmap related-count 9, Auth related-count 9 (maximum 8), and closed planning S2 broken PROVIDER_CATALOG.md link. The earlier documenter utility reported only the broken link; the stricter parent utility also validates related-count. Protected planning/history are not rewritten. Whitespace and protected-path comparison pass. Source `0e7e40f07cafd62103406e1eab06db3b384b6726`; verified docs checkpoint `3f0eda384c288d974c340b16ffd3ade9dba46ed9`. [Final receipt](../90-Receipts/20261018-TASK-GS-UI-HOME-V2-S1-FINAL.md) records the checkpoint and complete evidence; no further receipt edits. Final local/remote/PR SHA equality and clean tree are checked after this status commit. Preview port 4180 stays available for owner review.
