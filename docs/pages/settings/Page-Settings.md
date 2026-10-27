---
id: PAGE-settings
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-27
up: ../Pages-Hub.md
related:
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../design/SCREEN_MAP.md
  - ../../project/OPEN_QUESTIONS.md
  - ../../design/ONBOARDING_HOME_V2_ROADMAP.md
tasks: [TASK-GS-UI-BASELINE-001, TASK-GS-PLAN-005, TASK-GS-UI-HOME-V2-S1]
---
# Settings

## Current state

Batch A extends the current sample app with installable shell support, offline disclosure and explicit refresh/update protection. Settings and #setup/install reuse one iPhone/iPad/Android/desktop guide. Installation prompts are hidden in standalone. The explicit confirmed sample entry gates proactive install offers; no real entry is saved and offline financial writes remain unavailable. See [PWA task](../../worklog/10-Tasks/TASK-GS-WP09-10-PWA.md) and [review](../../design/reviews/PWA_SHELL_REVIEW.md); Batch A is locally/browser verified; Draft delivery/owner review pending. Earlier owner-merge-pending prose is historical: Welcome PR #6 and dashboard PRs #9–#11 are already merged.

A mock settings page in [screens.js](../../../src/screens.js), with theme, language, profile, currency/FX, categories, notifications, privacy, security, and installation explanations.

Home v2 retains an explicitly synthetic Home-only scenario selector (sample/actionable/clear/shortfall/party) and Asia/Bangkok datetime input. Actionable selects `2026-10-23T20:30`; other scenarios reset to `2026-10-18T10:00`. Values stay in session memory and refresh resets them. The panel discloses that scenario overrides affect only Home projections, not Bills/Activity or underlying financial records. Reminder threshold is fixture/projection configuration (default 20:00), not an editable notification service. Existing Account Board vertical/horizontal control and selected-account behavior remain unchanged. The compact S2 habit/bell previews read this synthetic clock; unknown streak snapshots are unavailable, and any per-date check-in grant is in page memory only. No notification preferences service or persistent rewards is added. See [Home](../home/Page-Home.md) and [S2](../../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md).

## Purpose and rules

- Thai is the primary product language; light default and dark mode are [PROPOSED].
- Settings is reached through the profile/avatar rather than primary mobile navigation [DECIDED].
- Current controls change preview state or open explanatory content only.

## Sections and details

No Level-3 notes exist yet.

## Data and engines used

Session memory only. Account, security, notification and FX services are not implemented. Installation guide and shell behavior are implemented by Batch A; real device installation remains to be verified.

## States and edge cases

Persistence, validation against a backend, and failure recovery remain [OPEN].

## Decisions and open questions

Provider and infrastructure choices are tracked in [Open Questions](../../project/OPEN_QUESTIONS.md).

## Change log

- 2026-10-16 — Added from the current Settings prototype.
- 2026-10-17 — Cross-linked with planned roadmap specifications for [TASK-GS-PLAN-005](../../worklog/10-Tasks/TASK-GS-PLAN-005.md).

- 2026-10-18 — Documented Home-only synthetic scenario/time controls for [Home S1](../../worklog/10-Tasks/TASK-GS-UI-HOME-V2-S1.md).

- 2026-10-18 — Clarified Home S2 dated habit/notification previews and unchanged mode/transient Settings boundaries.

- 2026-10-27 — Added scoped Batch A PWA/install/refresh notes; finance behavior unchanged.
