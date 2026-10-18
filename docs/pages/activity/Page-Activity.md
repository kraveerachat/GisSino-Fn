---
id: PAGE-activity
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-18
up: ../Pages-Hub.md
related:
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../design/SCREEN_MAP.md
  - ../../design/UI_DATA_CONTRACTS.md
  - ../../design/ONBOARDING_HOME_V2_ROADMAP.md
tasks: [TASK-GS-UI-BASELINE-001, TASK-GS-PLAN-005, TASK-GS-UI-HOME-V2-S1, TASK-GS-UI-ACTIVITY-V2-S1]
---
# Activity

## Current state

[Activity v2 S1](../../worklog/10-Tasks/TASK-GS-UI-ACTIVITY-V2-S1.md) is RUNTIME VERIFIED for tested scope: monthly income/expense donut and maximum four leading expense categories are embedded directly in existing `#activity`; all fourteen catalog categories open in the shared native dialog. Source is implemented; required checks (637 locale keys/102 tests) and normal32-case/12-check browser evidence pass. 200% text enlargement/contrast and final independent SHIP now pass; latest source b92cf23 is pushed in [Draft PR9](https://github.com/kraveerachat/GisSino-Fn/pull/9);implementation delivery CLOSED,owner review pending in [S1](../../worklog/20-Sessions/TASK-GS-UI-ACTIVITY-V2-S1-S1.md). Existing [screens.js](../../../src/screens.js) provides the baseline search/type chips, dated list, needs-details and transaction details. Header/navigation/Add remain shared.

## Purpose and rules

- Selected-month income/expense analytics stays with the user's own transactions. Only coherent October 2026 is available; no invented history.
- Net center means income minus expense. Donut shares use combined income+expense movement; category shares use eligible expense only. Zero movement has no fabricated ratio.
- Up to four positive categories sort descending; View all opens selected month/expense total and all fourteen labels/icons/colors/amounts/shares/bars, positive first and neutral zero rows after.
- Own transfers remain list-only. Savings/investment, refund and card-settlement labels never create expense semantics. Unknown category uses Other; unknown money stays unavailable. THB/USD remain separate without FX.
- Search/type chips filter list only; analytics stays full-month. Hidden mode removes amounts/shares/proportional geometry and accessible leaks.

## Data and engines used

Activity-only dated synthetic records preserve original five identities/amounts and add seven October expenses, reconciling THB 42,000 income/15,240 expense/26,760 net. Shared Home/Wallet data is unchanged. [Data contracts](../../design/UI_DATA_CONTRACTS.md), [Architecture](../../architecture/SYSTEM_ARCHITECTURE.md#82-activity). M2/M3 own future authorized ledger/category queries; no production ledger/search/edit/posting/history service exists.

## States and interactions

Retain sample, empty, loading, error, unavailable and no-search-results. Handle income-only/expense-only/zero/unknown/month-unavailable/currency/privacy states honestly. Existing native dialog provides title, initial focus, Escape/background exclusion, confined scroll and trigger focus restoration. TH/EN use shared catalogs; Thai dates use BE and English Gregorian with Asia/Bangkok months. Themes, responsive navigation and reduced motion remain required; no results claimed before evidence.

## Decisions and deferred design

[D33](../../project/DECISIONS.md#d33--embedded-activity-monthly-analytics) settles embedded Activity placement for this UI slice. Historical [roadmap](../../design/ONBOARDING_HOME_V2_ROADMAP.md) `#activity/summary` remains deferred/unimplemented. D30 destination question is superseded only for current Activity analytics; Home Q10/Safe placement and production refund/reversal/settlement policy stay [OPEN](../../project/OPEN_QUESTIONS.md). Home links do not claim automatic needs-details filtering.

## Change log

- 2026-10-16 — Added from original Activity prototype.
- 2026-10-17 — Roadmap proposed separate Activity Summary tab; planning retained.
- 2026-10-18 — Home S2 retained Activity responsibility while monthly destination was OPEN.
- 2026-10-18 — D33/Activity v2 S1 supersedes proposed tab placement with embedded donut/top-four preview/full-catalog dialog; implementation/verification pending.

- 2026-10-18 — Required checks and normal browser/function checks pass; 200% text/contrast/final SHIP pass; Git/owner review pending. [Review](../../design/reviews/ACTIVITY_ANALYTICS_REVIEW.md).
