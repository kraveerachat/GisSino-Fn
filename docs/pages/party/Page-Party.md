---
id: PAGE-party
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-26
up: ../Pages-Hub.md
related:
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../design/SCREEN_MAP.md
  - ../../project/OPEN_QUESTIONS.md
  - ../../design/ONBOARDING_HOME_V2_ROADMAP.md
tasks: [TASK-GS-UI-BASELINE-001, TASK-FLOATING-ISLAND-NAVIGATION, TASK-GS-PLAN-005, TASK-GS-UI-HOME-V2-S1, TASK-GS-UI-PARTY-V2-S1]
---
# Party

## GS-UI-PARTY-V2-S1 current preview (2026-10-26)

The current `#party` design preview retains the approved personal level/XP, streak/freezes, badges, aggregate feed and visibility action. It now shows compact Friends Weekly Ranking then synthetic Global Ranking, plus a Friends card opening an accessible Search/Requests/Friends sheet. The explanatory privacy card is removed; its privacy controls remain. See [Party review](../../design/reviews/PARTY_V2_REVIEW.md) and [task](../../worklog/10-Tasks/TASK-GS-UI-PARTY-V2-S1.md).

- Friends includes only accepted, eligible relationships plus the viewer when eligible. Global includes all explicitly opted-in eligible sample participants, including qualifying friends. Private, ranking-opted-out, blocked and missing-weekly-metric people are unranked.
- Both boards use sample weekly XP for the current Asia/Bangkok Monday–Sunday week; lifetime XP never substitutes for it. Top three render inline; eligible extra rows appear through View all. The sample period and values are demonstration data, not live M7 output.
- Search requires an exact username or six-digit code. No result, self, invalid-code and unavailable states are explicit. Requests/accept/decline change only page memory and reset on refresh. Up to three clearly synthetic suggestions exclude accepted, pending, private and blocked people.
- No finance records, account details or itemized transactions enter this Party preview. The sample data lives in [party-preview.js](../../../src/party-preview.js) and rendering in [party-ui.js](../../../src/party-ui.js); original fixtures remain for other screens. The existing Home habit link continues to `#party`.
- The standalone `#leaderboard` and `#friends` routes, public audience policy, real search/discoverability, persistent invitations, authorization and cross-user access controls remain future M7/M8 work. [D34](../../project/DECISIONS.md#d34--party-friends-and-global-preview) records the preview scope; [Open Questions](../../project/OPEN_QUESTIONS.md) retain production gates.

## Current state

Historical baseline: a private synthetic habit-status showcase in [screens.js](../../../src/screens.js), with level/XP, streak/freezes, badges, one weekly ranking, members, invite explanation, feed, and visibility switches. It showed no account or transaction details. The current preview behavior is specified above.

[Compact Home S2](../../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md) adds an independent explicit dated habit presentation, not a new Party engine. Home sample streak 3 / weekly XP 80 is distinct from Party sample streak 7 / lifetime XP 1240; no check-in modifies Party samples or canonical user stats. M7 must supply authoritative statistics before M8 Party reads aggregate-only authorized views. Current login/app-open qualifies no day or XP; the alternative login-reward proposal remains OPEN. The Friends popup and ranking boards above are synthetic UI only; no production Party/Family/leaderboard/friends service exists.

## Purpose and rules

- Party shares habit status and friendly ranking rather than one shared financial pot [DECIDED].
- Visibility levels are Private, Status only, and Full [DECIDED].
- Whether Full can ever include itemized data remains [OPEN]; source recommendation is never.
- Separate leaderboards and friends views expand from Party under [ONBOARDING_HOME_V2_ROADMAP.md](../../design/ONBOARDING_HOME_V2_ROADMAP.md) [DESIGNED].

## Sections and details

- Planned standalone Leaderboard Page (`#leaderboard`): Global and My Friends tabs, age category filtering, period selection; this is separate from the current Party preview boards.
- Planned standalone Friends Page (`#friends`): persistent exact lookup, friend requests, friend list; this is separate from the current Party popup.
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
- 2026-10-26 — Added Friends/Global weekly XP preview, transient exact-match friend flow and limited synthetic suggestions; retained production policy gates.
