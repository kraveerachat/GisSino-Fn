---
id: PAGE-more
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-16
up: ../Pages-Hub.md
related:
  - ../../design/SCREEN_MAP.md
  - ../../project/DECISIONS.md
  - ../bills/Page-Bills.md
  - ../party/Page-Party.md
tasks: [TASK-FLOATING-ISLAND-NAVIGATION]
---
# More

## Current state

A native mobile popover implemented in [navigation.js](../../../src/navigation.js). It contains Bills and Party, highlights the current child, and is mutually exclusive with the Add dialog.

## Purpose and rules

More keeps the primary mobile island focused while retaining Bills and Party access [DECIDED].

## Sections and details

No Level-3 notes exist yet.

## Data and engines used

Navigation state only; no financial data is owned by this surface.

## States and edge cases

Close, toggle, outside click, Escape, and tab-away dismissal are implemented in the prototype.

## Decisions and open questions

The composition is defined by [D23](../../project/DECISIONS.md#d23--responsive-primary-navigation).

## Change log

- 2026-10-16 — Added from the current More popover.
