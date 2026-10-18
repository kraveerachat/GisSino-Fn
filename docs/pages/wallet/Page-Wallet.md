---
id: PAGE-wallet
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-18
up: ../Pages-Hub.md
related:
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../design/SCREEN_MAP.md
  - ../../project/DECISIONS.md
tasks: [TASK-FLOATING-ISLAND-NAVIGATION, TASK-GS-UI-WALLET-V2-001]
---
# Wallet

## Current state — Wallet S2 assets and monthly history (2026-10-18)

Owner-approved revision has CLOSED implementation delivery on the same [Wallet task](../../worklog/10-Tasks/TASK-GS-UI-WALLET-V2-001.md), branch and [Draft PR #8](https://github.com/kraveerachat/GisSino-Fn/pull/8). [D32 S2](../../project/DECISIONS.md#d32-s2--assets-only-wallet-and-monthly-snapshots) supersedes S1's assets-plus-obligations composition and primary liability sections. [wallet.js](../../../src/wallet.js) now renders only Bank → E-wallet → Cash with a bold rounded, separated blue/cyan/amber assets-only ring and a compact centered summary. A small Bills link supports Current mode only; History has no liability summary.

Current shows session account balances. History selects a year and available month from a horizontally scrollable list; missing months are disabled. [wallet-history.js](../../../src/wallet-history.js) contains frozen illustrative first-of-month snapshots at 00:00 Asia/Bangkok for July–October 2026 and November–December 2025. These are synthetic archives, not balances reconstructed from today's accounts or a persisted ledger. Account balances and chart follow the snapshot; monthly account activity follows the selected period. Each account independently toggles income/expense percentages and actual values, excluding own transfers. Missing activity stays unavailable. Opening account detail from History explicitly identifies it as current account detail, not a historical detail view.

Shared identities, providers, profile/detail, transfer/Add, navigation, themes and locale remain. Privacy removes amounts, percentages and proportional geometry. Safe integer minor units, unknown/overflow states and separate THB/USD without FX remain. S2 tested scope is RUNTIME VERIFIED: 521 keys/66 tests, 56 layouts, 14 edge cases and 15 functional groups; 12 after/3 before captures exist with no artifact errors/overflow/clipping. Final independent A is SHIP; corrected 200% text enlargement and AX/contrast checks pass. Source `184b2f7053940f7e2129d41c8f61342c76a7b875` is pushed in existing Draft PR #8; documentation closeout follows the verified source. Owner review/merge pending. [S2](../../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S2.md) owns current evidence. S1 SHIP/receipt applies only to the earlier presentation.

## Superseded Wallet S1 presentation (2026-10-18)

Runtime-verified mock UI under [Wallet task](../../worklog/10-Tasks/TASK-GS-UI-WALLET-V2-001.md), finish SHIP; implementation delivery CLOSED, owner review pending. [wallet.js](../../../src/wallet.js) renders the owner's ring and notched-card adaptation using [wallet-overview.js](../../../src/wallet-overview.js) and [scoped CSS](../../../src/styles/wallet.css). Assets lead in Bank → E-wallet → Cash order, followed by Credit/debit/obligations. Existing provider logos and session profile/detail/credit/bill/transfer/Add actions remain.

Center assets THB 116,850 are separate from obligations THB 12,750. Composition percentages divide by assets + obligations THB 129,600 and are explicitly not net wealth. Credit is counted once; debit contributes only through linked bank money, with no debit fixture. Movement uses matching existing income/expense transactions excluding own transfers (daily 98%/2%); missing mix is unavailable. Missing/invalid balances stay unknown, safe integer cents avoid overflow, THB/USD remain separate without FX, and hidden values remove percentages and proportional ring/movement geometry. See [data contracts](../../design/UI_DATA_CONTRACTS.md) and [D32](../../project/DECISIONS.md#d32--wallet-composition-and-notched-account-cards). Home Q10 remains separate.

Source `eac4d7193fd6d2a261d8e7286c63c819806f2f60` is pushed in [Draft PR #8](https://github.com/kraveerachat/GisSino-Fn/pull/8); final finish SHIP, documentation checkpoint 15e4f3225b21540eec41c59a3078934bf14a5f09 is verified; owner review/merge remains pending.

## Earlier presentation — retained history

## Current state

A synthetic asset overview in [wallet.js](../../../src/wallet.js), with Bank, E-wallet, and Cash categories, separate card liabilities, account details, session-only profiles, and entry into own-account transfer. S3 changes Home account selection only; the canonical detail destination and shared provider/profile/financial contracts remain unchanged.

## Purpose and rules

- A Wallet is a place money sits: bank, e-wallet, cash, or credit card [DECIDED].
- Transfers between the user’s own accounts are never expenses [DECIDED].
- Session-only account profile creation/edit is implemented; production account creation and reconciliation remain unimplemented [OPEN].

## Sections and details

No Level-3 notes exist yet.

## Data and engines used

Uses explicit synthetic account types from [fixtures.js](../../../src/fixtures.js). Production ledger, ownership, reconciliation, and FX behavior are not implemented.

## States and edge cases

Empty account categories are design states and do not claim real zero balances.

## Decisions and open questions

Mobile access is part of [D23](../../project/DECISIONS.md#d23--responsive-primary-navigation).

## Shared account identity

[wallet.js](../../../src/wallet.js) uses the same [account display adapter](../../../src/account-display.js) as Home. Assets are explicitly bank/ewallet/cash; card liabilities remain separate. Canonical `#wallet/account/<id>` opens read-only detail with matching provider/name/currency/suffix/balance; Escape returns focus to its Wallet row. Add Account opens the session-only profile form; production account creation remains unavailable. See [Provider Catalog](../../design/PROVIDER_CATALOG.md) and [review evidence](../../design/reviews/ACCOUNT_BOARD_REVIEW.md).

## Change log

- 2026-10-16 — Added from the current Wallet prototype.

- 2026-10-16 — Account Board prototype update for [TASK-GS-UI-ACCOUNT-BOARD-001](../../worklog/10-Tasks/TASK-GS-UI-ACCOUNT-BOARD-001.md).

## S2 profile preview

Supersedes the earlier unavailable Add Account description: Add now creates fictional session-only profiles; Edit is available in account detail. Provider/type/nickname/reference/label/appearance are editable while balance/ID/currency remain unchanged. New profiles show unavailable balance and reset on reload. The original transaction/transfer fixtures remain separate; this is no production ledger integration.

-2026-10-16 — [Account Board S2](../../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S2.md).


- 2026-10-16 — [Account Board S3](../../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md) retains Wallet detail/profile context while replacing Home selection.

- 2026-10-18 — Wallet v2 composition/notched cards supersede the earlier overview presentation; financial/profile/navigation boundaries retained. [S1](../../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S1.md), runtime verification and implementation delivery complete; owner review pending.

- 2026-10-18 — [Wallet S2](../../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S2.md) / D32 S2 supersedes S1 Wallet presentation with assets-only composition and monthly history; S2 verification/delivery pending.
