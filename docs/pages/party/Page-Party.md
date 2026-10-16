---
id: PAGE-party
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-16
up: ../Pages-Hub.md
related:
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../design/SCREEN_MAP.md
  - ../../project/OPEN_QUESTIONS.md
tasks: [TASK-GS-UI-BASELINE-001, TASK-FLOATING-ISLAND-NAVIGATION]
---
# Party

## Current state

A private synthetic habit-status showcase in [screens.js](../../../src/screens.js), with level/XP, streak/freezes, badges, weekly ranking, members, invite explanation, feed, and visibility switches. It shows no account or transaction details.

## Purpose and rules

- Party shares habit status and friendly ranking rather than one shared financial pot [DECIDED].
- Visibility levels are Private, Status only, and Full [DECIDED].
- Whether Full can ever include itemized data remains [OPEN]; source recommendation is never.

## Sections and details

No Level-3 notes exist yet.

## Data and engines used

Synthetic members and habits only. Production party authorization and field allowlists are not implemented.

## States and edge cases

Real invites, membership changes, and delivery failures are [OPEN].

## Decisions and open questions

Mobile Party lives inside More under [D23](../../project/DECISIONS.md#d23--responsive-primary-navigation).

## Change log

- 2026-10-16 — Added from the current Party prototype.
