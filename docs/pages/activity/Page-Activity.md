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
tasks: [TASK-GS-UI-BASELINE-001, TASK-GS-PLAN-005, TASK-GS-UI-HOME-V2-S1]
---
# Activity

## Current state

A mock October 2026 activity view in [screens.js](../../../src/screens.js), with income/expense summaries, search, kind filters, day grouping, needs-details samples, and a detail sheet.

Home S2 still links needs-details/Recent View all to existing Activity without claiming automatic filtering. Activity source and its current summary behavior are unchanged by this task; retained monthly fixtures/utilities are not deleted. M2 ledger and M3 Activity supply future authorized entry/analysis events, with M7 owning qualifying habit rewards.

## Purpose and rules

- Show a day-grouped ledger and help the user find incomplete entries [DECIDED].
- Own-account transfers are visible but excluded from income/expense totals [DECIDED].
- Monthly income/expense analysis remains a canonical planned Activity responsibility. The separate Summary-tab design is unimplemented; the final Home-removed summary destination is now OPEN (Activity vs Wallet) under D30.

## Sections and details

- Historical planned Summary Tab (`#activity/summary`): the [roadmap](../../design/ONBOARDING_HOME_V2_ROADMAP.md) proposed moving full month analysis/chart here. D30 removes Home monthly UI without implementing that route or relocating anything to Wallet. Final destination requires owner confirmation in [Open Questions](../../project/OPEN_QUESTIONS.md).

## Data and engines used

Synthetic transactions only; no production ledger or search service exists.

## States and edge cases

The prototype exposes sample, empty, loading, error, unavailable, and no-search-results states.

## Decisions and open questions

Production edit, void, attachment, and ownership behavior remains [OPEN].

## Change log

- 2026-10-16 — Added from the current Activity prototype.
- 2026-10-17 — Planned Activity Summary tab documented for [TASK-GS-PLAN-005, TASK-GS-UI-HOME-V2-S1](../../worklog/10-Tasks/TASK-GS-PLAN-005.md).

- 2026-10-18 — Recorded OPEN monthly destination and preserved existing Activity responsibility/source for [Home S2](../../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md).
