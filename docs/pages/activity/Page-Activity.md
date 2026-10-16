---
id: PAGE-activity
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-16
up: ../Pages-Hub.md
related:
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../design/SCREEN_MAP.md
  - ../../design/UI_DATA_CONTRACTS.md
tasks: [TASK-GS-UI-BASELINE-001]
---
# Activity

## Current state

A mock October 2026 activity view in [screens.js](../../../src/screens.js), with income/expense summaries, search, kind filters, day grouping, needs-details samples, and a detail sheet.

## Purpose and rules

- Show a day-grouped ledger and help the user find incomplete entries [DECIDED].
- Own-account transfers are visible but excluded from income/expense totals [DECIDED].

## Sections and details

No Level-3 notes exist yet.

## Data and engines used

Synthetic transactions only; no production ledger or search service exists.

## States and edge cases

The prototype exposes sample, empty, loading, error, unavailable, and no-search-results states.

## Decisions and open questions

Production edit, void, attachment, and ownership behavior remains [OPEN].

## Change log

- 2026-10-16 — Added from the current Activity prototype.
