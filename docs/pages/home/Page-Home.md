---
id: PAGE-home
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-16
up: ../Pages-Hub.md
related:
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../design/SCREEN_MAP.md
  - ../../project/DECISIONS.md
tasks: [TASK-GS-UI-BASELINE-001, TASK-BLUE-ENAMEL-REDESIGN, TASK-GS-UI-002-DESKTOP-SIDEBAR]
---
# Home

## Current state

A responsive mock-data dashboard implemented in [blue-screens.js](../../../src/blue-screens.js) and [screens.js](../../../src/screens.js). It has no persistence or real financial connection.

## Purpose and rules

- Show balance, accounts, recent activity, upcoming obligations, and habit continuity [DECIDED].
- Keep sample-data disclosure visible and avoid presenting simulated actions as saved [DECIDED].
- Safe-to-spend behavior follows the Project Guide; production calculation remains unimplemented [PROPOSED].

## Sections and details

No Level-3 notes exist yet.

## Data and engines used

Synthetic fixtures only. Future balance, obligation, FX, and habit engines are described in [System Architecture](../../architecture/SYSTEM_ARCHITECTURE.md).

## States and edge cases

The screen map records sample, empty, loading, error, and unavailable preview states. Real network and persistence failures are [OPEN].

## Decisions and open questions

Navigation follows [D23](../../project/DECISIONS.md#d23--responsive-primary-navigation).

## Account Board preview

Home now uses the shared [Account Board](../../../src/account-board.js), with default compact Stack, selectable Grid, explicit simulated states and read-only canonical detail links. Bank, E-Wallet and Cash fixtures share the [Provider Catalog](../../design/PROVIDER_CATALOG.md) and [UI Data Contracts](../../design/UI_DATA_CONTRACTS.md). The surrounding hero/navigation remain intact. See [review evidence](../../design/reviews/ACCOUNT_BOARD_REVIEW.md).

## Change log

- 2026-10-16 — Added to the vault from the current prototype and [Screen Map](../../design/SCREEN_MAP.md).

- 2026-10-16 — Account Board prototype update for [TASK-GS-UI-ACCOUNT-BOARD-001](../../worklog/10-Tasks/TASK-GS-UI-ACCOUNT-BOARD-001.md).

## S2 compact folder refinement

Current Home uses aligned curved folder tabs and compact selectable indicators; mobile mode controls share the header. Visible account count, X-of-Y, helper and demo-state copy are removed. The active folder keeps provider/name/balance/currency/reference. Add opens a session-only profile form. [Provider assets](../../design/PROVIDER_CATALOG.md) and Wallet share the same session profile adapter.

-2026-10-16 — [Account Board S2](../../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S2.md).
