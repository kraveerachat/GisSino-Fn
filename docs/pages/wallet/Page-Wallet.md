---
id: PAGE-wallet
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-16
up: ../Pages-Hub.md
related:
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../design/SCREEN_MAP.md
  - ../../project/DECISIONS.md
tasks: [TASK-FLOATING-ISLAND-NAVIGATION]
---
# Wallet

## Current state

A synthetic asset overview in [screens.js](../../../src/screens.js), with Bank, E-wallet, and Cash categories, separate card liabilities, account details, and entry into own-account transfer.

## Purpose and rules

- A Wallet is a place money sits: bank, e-wallet, cash, or credit card [DECIDED].
- Transfers between the user’s own accounts are never expenses [DECIDED].
- Unsupported account creation and reconciliation remain clearly labeled [OPEN].

## Sections and details

No Level-3 notes exist yet.

## Data and engines used

Uses explicit synthetic account types from [fixtures.js](../../../src/fixtures.js). Production ledger, ownership, reconciliation, and FX behavior are not implemented.

## States and edge cases

Empty account categories are design states and do not claim real zero balances.

## Decisions and open questions

Mobile access is part of [D23](../../project/DECISIONS.md#d23--responsive-primary-navigation).

## Change log

- 2026-10-16 — Added from the current Wallet prototype.
