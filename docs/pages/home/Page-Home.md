---
id: PAGE-home
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-17
up: ../Pages-Hub.md
related:
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../design/SCREEN_MAP.md
  - ../../design/ONBOARDING_HOME_V2_ROADMAP.md
  - ../../project/DECISIONS.md
tasks: [TASK-GS-UI-BASELINE-001, TASK-BLUE-ENAMEL-REDESIGN, TASK-GS-UI-002-DESKTOP-SIDEBAR, TASK-GS-UI-ACCOUNT-BOARD-001, TASK-GS-PLAN-005]
---
# Home

## Current state

A responsive mock-data dashboard implemented in [blue-screens.js](../../../src/blue-screens.js) and [screens.js](../../../src/screens.js), with the shared [folder renderer](../../../src/account-board.js) and [deck controller](../../../src/account-deck.js). Home defaults to a vertical deck of complete account folders. Horizontal is the only alternate mode and is selected only in Settings; mode changes preserve the selected account ID. Every account uses the same full folder component in both modes. S1/S2 tab strips, Stack/Grid choices and wrapping selection are historical and SUPERSEDED by the owner’s S3 attachment. The shared 13 provider assets, session profile form, Wallet detail routes and financial preview boundary remain intact. It has no persistence or real financial connection.

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

## S1 Account Board preview — SUPERSEDED

Home now uses the shared [Account Board](../../../src/account-board.js), with default compact Stack, selectable Grid, explicit simulated states and read-only canonical detail links. Bank, E-Wallet and Cash fixtures share the [Provider Catalog](../../design/PROVIDER_CATALOG.md) and [UI Data Contracts](../../design/UI_DATA_CONTRACTS.md). The surrounding hero/navigation remain intact. See [review evidence](../../design/reviews/ACCOUNT_BOARD_REVIEW.md).

## Change log

- 2026-10-16 — Added to the vault from the current prototype and [Screen Map](../../design/SCREEN_MAP.md).

- 2026-10-16 — Account Board prototype update for [TASK-GS-UI-ACCOUNT-BOARD-001](../../worklog/10-Tasks/TASK-GS-UI-ACCOUNT-BOARD-001.md).

## S2 compact folder refinement — SUPERSEDED presentation

Historical S2 Home used aligned curved folder tabs and compact selectable indicators; mobile mode controls share the header. Visible account count, X-of-Y, helper and demo-state copy are removed. The active folder keeps provider/name/balance/currency/reference. Add opens a session-only profile form. [Provider assets](../../design/PROVIDER_CATALOG.md) and Wallet share the same session profile adapter.

-2026-10-16 — [Account Board S2](../../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S2.md).


## S3 interaction contract

Six complete folders retain provider, name, currency, balance, reference and explicit detail link. Measured heights are 160–164px; vertical overlap exposes 24px below a 520px component width and 28px above it, with at most two or three rear folders respectively. Desktop vertical mode adds a synchronized direct selector. Horizontal mode clips adjacent complete cards within the component.

Vertical touch holds the dedicated 44px grip for 260ms; folder-body touch retains normal page scrolling. Horizontal touch and desktop mouse drag track continuously with requestAnimationFrame transforms on the same DOM cards, then snap with a 240ms ease-out (immediate under reduced motion). Below-threshold or cancelled drags restore the source. Arrow keys, Home/End and previous/next are bounded. Wheel input accumulates and throttles, releases at the boundary and leaves Ctrl+Wheel to the browser. Selecting an exposed card uses a whole-card overlay and never opens detail; explicit detail plus active-only double-tap/double-click open the selected ID.

- 2026-10-16 — [Account Board S3](../../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md) replaces tab strips and Grid.

## Planned Home v2 roadmap

The planned Home v2 evolution is detailed in [ONBOARDING_HOME_V2_ROADMAP.md §4](../../design/ONBOARDING_HOME_V2_ROADMAP.md#4-home-v2-specification):

1. **Top-to-Bottom Structure:** (1) Header, (2) Total Balance Card, (3) Quick Actions, (4) Today Strip, (5) Safe to Spend + Nearest Obligation dual-tile, (6) Streak with Primary Party Rank, (7) My Accounts complete overlapping folders, (8) Recent Transactions, (9) One-Line Monthly Summary, (10) Compact Global Leaderboard Card.
2. **Today Strip:** Conditional alert strip surfacing obligations due ≤ 3 days, streak at risk (> 20:00), transactions with status `needs_details`, or missing daily activity. Hidden entirely when no items qualify.
3. **Nearest Obligation:** Upgrades aggregate commitment tile to name the specific earliest unpaid bill with days remaining.
4. **Streak & Party Rank:** Embeds primary party rank line (e.g. `สตรีก 7 วัน · อันดับ 2 ในปาร์ตี้ครอบครัว`); omits rank gracefully if not in a party.
5. **My Accounts Preservation:** Strictly preserves the merged **PR #4** complete overlapping folder deck and continuous touch/drag gesture architecture without modification.
6. **One-Line Monthly Summary:** Moves full monthly summary and 7-day spending bars to the Activity Summary tab (`#activity/summary`), leaving a clean one-line navigation capsule on Home.
7. **Compact Global Leaderboard:** DRAFT / PLANNED community motivation card with age category chips, period chips, top 3 + personal row, and educational opt-in state. Amounts hidden by default.

- 2026-10-17 — Planned Home v2 layout, Today strip, nearest obligation, and compact leaderboard card documented for [TASK-GS-PLAN-005](../../worklog/10-Tasks/TASK-GS-PLAN-005.md). PR #4 Account Board folders preserved.
