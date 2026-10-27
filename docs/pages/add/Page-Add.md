---
id: PAGE-add
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-27
up: ../Pages-Hub.md
related:
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../design/SCREEN_MAP.md
  - ../../design/UI_DATA_CONTRACTS.md
tasks: [TASK-GS-UI-BASELINE-001, TASK-FLOATING-ISLAND-NAVIGATION, TASK-GS-UI-002-DESKTOP-SIDEBAR]
---
# Add

## Current state

Batch A extends the current sample app with installable shell support, offline disclosure and explicit refresh/update protection. Settings and #setup/install reuse one iPhone/iPad/Android/desktop guide. Installation prompts are hidden in standalone. The explicit confirmed sample entry gates proactive install offers; no real entry is saved and offline financial writes remain unavailable. See [PWA task](../../worklog/10-Tasks/TASK-GS-WP09-10-PWA.md) and [review](../../design/reviews/PWA_SHELL_REVIEW.md); Batch A is locally/browser verified; Draft delivery/owner review pending. Earlier owner-merge-pending prose is historical: Welcome PR #6 and dashboard PRs #9–#11 are already merged.

A shared modal action implemented in [app.js](../../../src/app.js). It previews expense, income, own-account transfer, synthetic receipt, and no-spend check-in flows. Results are explicitly unsaved.

## Purpose and rules

- Add is a separate primary action on mobile and desktop [DECIDED].
- AI-assisted input must produce a draft for human confirmation [DECIDED].
- Slip images may be attached, but OCR is excluded [DECIDED].

## Sections and details

No Level-3 notes exist yet.

## Data and engines used

In-memory form state only. Persistence, posting, AI, and attachment storage are not implemented.

## States and edge cases

Field validation is local. Real save failures and concurrent edits remain [OPEN].

## Decisions and open questions

Placement follows [D23](../../project/DECISIONS.md#d23--responsive-primary-navigation).

## Change log

- 2026-10-16 — Added from the current Add modal.

- 2026-10-27 — Added scoped Batch A PWA/install/refresh notes; finance behavior unchanged.
