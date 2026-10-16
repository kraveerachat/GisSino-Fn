---
id: PAGE-bills
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-16
up: ../Pages-Hub.md
related:
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../design/SCREEN_MAP.md
  - ../../project/DECISIONS.md
tasks: [TASK-GS-UI-BASELINE-001, TASK-FLOATING-ISLAND-NAVIGATION]
---
# Bills

## Current state

A synthetic October 2026 calendar/list in [screens.js](../../../src/screens.js), covering cards, monthly bills, installments, subscriptions, status badges, and details.

## Purpose and rules

- Summarize obligations and reduce payment surprises [DECIDED].
- Subscription entries post automatically in the proposed future system [DECIDED].
- Current actions do not post or mark real obligations paid.

## Sections and details

No Level-3 notes exist yet.

## Data and engines used

Synthetic fixtures only. The future subscription, reminder, and ledger engines remain architecture proposals.

## States and edge cases

Empty, loading, error, unavailable, and narrow agenda states exist as previews.

## Decisions and open questions

Mobile Bills lives inside More under [D23](../../project/DECISIONS.md#d23--responsive-primary-navigation).

## Change log

- 2026-10-16 — Added from the current Bills prototype.
