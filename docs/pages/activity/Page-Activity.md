---
id: PAGE-activity
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-17
up: ../Pages-Hub.md
related:
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../design/SCREEN_MAP.md
  - ../../design/UI_DATA_CONTRACTS.md
  - ../../design/ONBOARDING_HOME_V2_ROADMAP.md
tasks: [TASK-GS-UI-BASELINE-001, TASK-GS-PLAN-005]
---
# Activity

## Current state

A mock October 2026 activity view in [screens.js](../../../src/screens.js), with income/expense summaries, search, kind filters, day grouping, needs-details samples, and a detail sheet.

## Purpose and rules

- Show a day-grouped ledger and help the user find incomplete entries [DECIDED].
- Own-account transfers are visible but excluded from income/expense totals [DECIDED].
- Provide a deep-dive Summary tab for month analysis without cluttering Home [DESIGNED].

## Sections and details

- Planned Summary Tab (`#activity/summary`): Receives the full monthly income/expense summary, 7-day spending chart, and future category breakdown moved off Home under [ONBOARDING_HOME_V2_ROADMAP.md](../../design/ONBOARDING_HOME_V2_ROADMAP.md).

## Data and engines used

Synthetic transactions only; no production ledger or search service exists.

## States and edge cases

The prototype exposes sample, empty, loading, error, unavailable, and no-search-results states.

## Decisions and open questions

Production edit, void, attachment, and ownership behavior remains [OPEN].

## Change log

- 2026-10-16 — Added from the current Activity prototype.
- 2026-10-17 — Planned Activity Summary tab documented for [TASK-GS-PLAN-005](../../worklog/10-Tasks/TASK-GS-PLAN-005.md).
