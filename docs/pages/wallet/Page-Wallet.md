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

## Current state — Wallet v2 (2026-10-18)

Runtime-verified mock UI under [Wallet task](../../worklog/10-Tasks/TASK-GS-UI-WALLET-V2-001.md), finish SHIP; final documentation delivery pending. [wallet.js](../../../src/wallet.js) renders the owner's ring and notched-card adaptation using [wallet-overview.js](../../../src/wallet-overview.js) and [scoped CSS](../../../src/styles/wallet.css). Assets lead in Bank → E-wallet → Cash order, followed by Credit/debit/obligations. Existing provider logos and session profile/detail/credit/bill/transfer/Add actions remain.

Center assets THB 116,850 are separate from obligations THB 12,750. Composition percentages divide by assets + obligations THB 129,600 and are explicitly not net wealth. Credit is counted once; debit contributes only through linked bank money, with no debit fixture. Movement uses matching existing income/expense transactions excluding own transfers (daily 98%/2%); missing mix is unavailable. Missing/invalid balances stay unknown, safe integer cents avoid overflow, THB/USD remain separate without FX, and hidden values remove percentages and proportional ring/movement geometry. See [data contracts](../../design/UI_DATA_CONTRACTS.md) and [D32](../../project/DECISIONS.md#d32--wallet-composition-and-notched-account-cards). Home Q10 remains separate.

Source `eac4d7193fd6d2a261d8e7286c63c819806f2f60` is pushed in [Draft PR #8](https://github.com/kraveerachat/GisSino-Fn/pull/8); final finish SHIP, owner review/merge and final documentation checkpoint remain pending.

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

- 2026-10-18 — Wallet v2 composition/notched cards supersede the earlier overview presentation; financial/profile/navigation boundaries retained. [S1](../../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S1.md), final verification pending.
