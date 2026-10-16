---
id: PAGE-party
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
tasks: [TASK-GS-UI-BASELINE-001, TASK-FLOATING-ISLAND-NAVIGATION, TASK-GS-PLAN-005]
---
# Party

## Current state

A private synthetic habit-status showcase in [screens.js](../../../src/screens.js), with level/XP, streak/freezes, badges, weekly ranking, members, invite explanation, feed, and visibility switches. It shows no account or transaction details.

## Purpose and rules

- Party shares habit status and friendly ranking rather than one shared financial pot [DECIDED].
- Visibility levels are Private, Status only, and Full [DECIDED].
- Whether Full can ever include itemized data remains [OPEN]; source recommendation is never.
- Separate leaderboards and friends views expand from Party under [ONBOARDING_HOME_V2_ROADMAP.md](../../design/ONBOARDING_HOME_V2_ROADMAP.md) [DESIGNED].

## Sections and details

- Planned Leaderboard Page (`#leaderboard`): Global and My Friends tabs, age category filtering, period selection.
- Planned Friends Page (`#friends`): Search by exact name / 6-digit code, friend requests, friend list.
- Planned Group Creation: Overlays for creating a custom friend Party (`#party/create`) or household Family (`#family/create`).
- Planned Visibility Settings: Granular controls for 3 visibility tiers, spending board opt-in, and per-figure sharing.

## Data and engines used

Synthetic members and habits only. Production party authorization and field allowlists are not implemented.

## States and edge cases

Real invites, membership changes, and delivery failures are [OPEN].

## Decisions and open questions

- Mobile Party lives inside More under [D23](../../project/DECISIONS.md#d23--responsive-primary-navigation).
- Spending ranking metric, age bands, and group model (Party vs Family) are tracked in [Open Questions](../../project/OPEN_QUESTIONS.md).

## Change log

- 2026-10-16 — Added from the current Party prototype.
- 2026-10-17 — Planned Leaderboard, Friends, Group creation, and Visibility specifications documented for [TASK-GS-PLAN-005](../../worklog/10-Tasks/TASK-GS-PLAN-005.md).
