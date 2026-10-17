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
  - ../20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md
---
# TASK-GS-UI-HOME-V2-S1 — Compact Home and gamified habit preview

## Current state — S2 owner revision

RUNTIME VERIFIED, awaiting owner review. Continue the existing `task/gs-ui-home-v2-s1` and [Draft PR #7](https://github.com/kraveerachat/GisSino-Fn/pull/7); do not create another PR or receipt. Parent startup audit verified OPEN/DRAFT, correct head branch and HEAD `173b1d124371edd7108b60f3298eb6fcb4acf191`, with main `bb27e2812789346fc322d4bad3fc6d847ed3823d`. S2 source checkpoint `292f346b814d41775d2a569d3ed31bef390040ce` is committed/pushed. Checks545keys/66tests and corrected browser70cases/26captures/16functional checks pass; errors[]/issues[]. Parent scoped finish PASS follows two independent-review findings corrected and parent-verified. Docs checkpoint `10239a1598883a88eb749f53d5dc72a5a55634d5` is pushed and was verified equal to local HEAD, remote task branch and PR7 head. PR7 is OPEN/DRAFT with updated title/body; main remains `bb27e2812789346fc322d4bad3fc6d847ed3823d`. A status-only reconciliation commit follows this checkpoint and is verified again before handoff. Historical S1 checks do not verify the owner revision.

The owner's “Compact Home & Gamified Streak” brief authorizes source/docs/checkpoints on this task branch only. Production mutation, merge, deletion, AEGIS and unrelated screen implementation remain out of scope. Preserve CLOSED [S1](../20-Sessions/TASK-GS-UI-HOME-V2-S1-S1.md) and the [immutable receipt](../90-Receipts/20261018-TASK-GS-UI-HOME-V2-S1-FINAL.md) byte-for-byte. New dated [S2](../20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md) records the follow-up; the original closed delivery is retained below as history.

## S2 approved behavior

- Before (historical S1): Today → Safe/Nearest → Streak → Accounts → Recent → monthly line. After the preserved header/hero/actions: **Accounts first → compact conditional Today → compact Safe → gamified habit summary/calendar → Recent last**. No Home monthly UI or standalone nearest tile; underlying data/helpers remain.
- Existing Account Board renderer/controller/styles/assets/overlap/gestures/selection/detail/Add/Settings modes are protected. Only its surrounding position changes.
- Today excludes bills; needs-details and pending/at-risk habits use existing Activity/Add. Bell sheet shows deduplicated synthetic overdue/due ≤3 days notices and Bills/empty states; no real delivery/read tracking.
- Safe uses existing integer-minor currency isolation, true negative and balance masking. No new financial engine or mutation.
- Two-zone habit card: explicit synthetic streak/weekly XP/freezes and ring, then 21-day internally scrollable timeline with non-color day statuses and roving keyboard focus. Proposed weekly metric is unique qualifying Bangkok Monday-Sunday active dates /7 rounded; sample4/7=57%. Frozen/future dates never count as qualifying active dates.
- Add and Home share existing No spending today sheet: explicit simulated confirmation, date-keyed page-lifetime idempotency and configurable synthetic10XP illustration. App-open/login grants nothing; no actual financial/Party/user-stats write, storage or automatic popup.
- Future M7 owns daily authoritative state/XP/caps/dedupe/rollover/badges/weekly XP/first-visit/popup shown-state; M6 owns delivery/preferences/quiet hours; M8 reads aggregates only. Exact third-reference fidelity is unverified because that image was absent from supplied attachment files.

## Complete system inventory and dependencies

The canonical [18-system, eight-column inventory](../../pages/home/Page-Home.md#feature-and-system-inventory) is part of this task worklog and distinguishes current mock UI, real logic, milestone, decision status and PR/deferred scope. It covers Total Balance; Account Board; Today; Safe; bell notices; Recent; monthly destination; calendar; streak; freeze; weekly%; XP; check-in; first-day welcome; reward popup; idempotency; Party aggregates; reminders/quiet hours. Do not treat deferred rows as implemented.

M2 ledger/accounts → M3 Activity → M5 obligations → M6 reminders → M7 habits → M8 Party remain the canonical dependencies. M7 backlog and authorization/midnight/duplicate test requirements are in [architecture §7.7](../../architecture/SYSTEM_ARCHITECTURE.md#77-habits-streaks-xp-badges-stats).

## S2 gates and open decisions

| Gate | Current evidence |
|---|---|
| Authority/repository | Parent verified same unmerged Draft PR7/task branch at startup; scope below D30 |
| Source and focused tests | Nine files at pushed `292f346b814d41775d2a569d3ed31bef390040ce`; exact manifest in S2 |
| `npm run check` / `npm test` | Parent reports PASS545 locale keys and full66/66; initial assertion/access failures corrected before final green run |
| Seven-size browser/light-dark/TH-EN | Final corrected70cases/26captures/16functional checks, errors[]/issues[]; all seven sizes, TH/EN and light/dark; exact local capture manifest in S2 |
| Independent design/technical/finish review | A prepatch31/40/noP0P1; A/B timelineP2 and B Add-focusP2 fixed/parent-verified. Detector once afterA []0. Parent scoped finish PASS; independent postpatch review not claimed |
| Vault checks/protected bytes | Direct strict utility69notes/69IDs/max3clicks, zero new errors; exactly3 inherited findings;18-row/eight-column inventory; protected Git diff/normalized content unchanged |
| Source/docs commits and push/PR head equality | Source `292f346b814d41775d2a569d3ed31bef390040ce` pushed; docs `10239a1598883a88eb749f53d5dc72a5a55634d5` pushed and verified local/remote/PR equal; same OPEN/DRAFT PR7, title/body updated |
| Production / merge | NOT PERFORMED / HUMAN ONLY |

[D30](../../project/DECISIONS.md#d30--compact-home-and-gamified-habit-preview) supersedes D29's Home presentation only. **OPEN:** monthly summary final destination (Activity vs Wallet), automatic login/app-open XP conflicting with current qualification, primary-party policy Q8. Proposed weekly Home ring does not replace canonical stats. No new Wallet/Summary/Party flow, authentication, ledger/habit database, notification service, bank sync or OCR.

## Sessions and S2 touches

| Session | State | Purpose |
|---|---|---|
| [S1](../20-Sessions/TASK-GS-UI-HOME-V2-S1-S1.md) | CLOSED, unchanged | Historical initial foundation and immutable receipt |
| [S2](../20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md) | RUNTIME VERIFIED | Owner Compact Home/gamified revision on same Draft PR7 |

Touches: [Home](../../pages/home/Page-Home.md), [Party](../../pages/party/Page-Party.md), [Activity](../../pages/activity/Page-Activity.md), [Settings](../../pages/settings/Page-Settings.md), [Pages Hub](../../pages/Pages-Hub.md), [architecture](../../architecture/SYSTEM_ARCHITECTURE.md), [UI spec](../../design/UI_DESIGN_SPEC.md), [Data Contracts](../../design/UI_DATA_CONTRACTS.md), [Tokens](../../design/DESIGN_TOKENS.md), [Components](../../design/COMPONENT_INVENTORY.md), [Screen Map](../../design/SCREEN_MAP.md), [Decisions](../../project/DECISIONS.md), [Open Questions](../../project/OPEN_QUESTIONS.md), [History](../../project/PROJECT_HISTORY.md), [Start](../../START_HERE.md), [Dashboard](../00-Index/Task-Dashboard.md).

## Historical S1 closed delivery — superseded presentation only

Everything below records the original S1 checkpoint. Its layout, counts and pending-action language are historical and do not describe S2. The CLOSED session and receipt remain untouched.

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
