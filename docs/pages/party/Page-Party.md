---
id: PAGE-party
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-18
up: ../Pages-Hub.md
related:
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../design/SCREEN_MAP.md
  - ../../project/OPEN_QUESTIONS.md
  - ../../design/ONBOARDING_HOME_V2_ROADMAP.md
tasks: [TASK-GS-UI-BASELINE-001, TASK-FLOATING-ISLAND-NAVIGATION, TASK-GS-PLAN-005, TASK-GS-UI-HOME-V2-S1]
---
# Party

## Current state

A private synthetic habit-status showcase in [screens.js](../../../src/screens.js), with level/XP, streak/freezes, badges, weekly ranking, members, invite explanation, feed, and visibility switches. It shows no account or transaction details.

[Compact Home S2](../../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md) adds an independent explicit dated habit presentation, not a new Party engine. Home sample streak 3 / weekly XP 80 is distinct from existing Party aggregate streak 7 / XP 1240; no check-in modifies Party samples or canonical user stats. M7 must supply authoritative statistics before M8 Party reads aggregate-only authorized views. Current login/app-open qualifies no day or XP; the alternative login-reward proposal remains OPEN. No new Party/Family/leaderboard/friends flow is implemented.

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
- 2026-10-17 — Planned Leaderboard, Friends, Group creation, and Visibility specifications documented for [TASK-GS-PLAN-005, TASK-GS-UI-HOME-V2-S1](../../worklog/10-Tasks/TASK-GS-PLAN-005.md).

- 2026-10-18 — Clarified aggregate-only M7/M8 dependency and independent synthetic Home habit values for [Home S2](../../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md).
