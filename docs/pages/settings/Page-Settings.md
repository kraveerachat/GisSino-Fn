---
id: PAGE-settings
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-17
up: ../Pages-Hub.md
related:
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../design/SCREEN_MAP.md
  - ../../project/OPEN_QUESTIONS.md
  - ../../design/ONBOARDING_HOME_V2_ROADMAP.md
tasks: [TASK-GS-UI-BASELINE-001, TASK-GS-PLAN-005]
---
# Settings

## Current state

A mock settings page in [screens.js](../../../src/screens.js), with theme, language, profile, currency/FX, categories, notifications, privacy, security, and installation explanations.

## Purpose and rules

- Thai is the primary product language; light default and dark mode are [PROPOSED].
- Settings is reached through the profile/avatar rather than primary mobile navigation [DECIDED].
- Current controls change preview state or open explanatory content only.

## Sections and details

No Level-3 notes exist yet.

## Data and engines used

Session memory only. Account, security, notification, FX, and installation services are not implemented.

## States and edge cases

Persistence, validation against a backend, and failure recovery remain [OPEN].

## Decisions and open questions

Provider and infrastructure choices are tracked in [Open Questions](../../project/OPEN_QUESTIONS.md).

## Change log

- 2026-10-16 — Added from the current Settings prototype.
- 2026-10-17 — Cross-linked with planned roadmap specifications for [TASK-GS-PLAN-005](../../worklog/10-Tasks/TASK-GS-PLAN-005.md).
