---
id: DESIGN-SCREEN-MAP
type: design
level: 2
status: CURRENT
updated: 2026-10-16
up: Design-Hub.md
related:
  - COMPONENT_INVENTORY.md
  - ../pages/Pages-Hub.md
---
# Screen map

| Destination | Important subviews and preview states |
|---|---|
| `#wallet` | Minimal synthetic asset overview, explicit Bank/E-wallet/Cash categories, separate card liabilities, existing account detail, own-account transfer; unsupported account creation/reconcile clearly labelled |
| More (native popover) | Bills and Party, contextual child highlight, close/toggle/outside/Escape/Tab-away dismissal; mutually exclusive with the Add dialog |
| `#transfer` | Own-account child screen; zero initial amount, physical keyboard/custom touch keypad, source/destination exclusion, precision validation, unsaved review; no posting |
| `#credit-card` | Bills child screen; original sample card, outstanding/full/minimum/date summary, six tracking sheets, in-memory reminder, sample activity; no issuer controls |
| `#home` | Balance visibility, Stack/Grid asset folders, canonical Wallet account detail sheet, expense/income/transfer/no-spend quick actions, recent transaction details, upcoming bills, habit summary |
| `#activity` | October sample context, income/expense summaries, search, all/expense/income/own-transfer filters, day grouping, needs-details transaction, detail sheet; sample, empty, loading, error, unavailable, and no-search-results |
| Add (modal action) | Mode chooser; manual expense/income, own-account transfer, synthetic receipt, no-spend check-in, inactive AI; field validation and explicitly unsaved result |
| `#bills` | October commitments, calendar/list, credit cards, monthly bills, installments, subscriptions, due/status badges, detail sheet; empty/loading/error/unavailable. Compact agenda below 360px |
| `#party` | Private personal habit status, level/XP, streak/freezes, milestones, weekly habit leaderboard, members, invitation explanation, activity feed, visibility switches. No account/transaction details |
| `#settings` | Light/dark, Thai/English, profile, currency/FX, categories, notifications, privacy, security, installation guide explanation |
| Header | Notifications empty-state sheet, theme action, avatar/settings entry |
| Desktop sidebar (1100px+) | 72px collapsed / 240px temporary overlay / 240px pinned; five direct destination links, stable pin toggle, keyboard disclosure, profile Settings |
| Desktop header Add | One 48px circle invokes the shared Add modal; absent from the desktop navigation list; mobile Add stays in its floating island |

The monthly sample is explicitly October 2026. Other months are not offered until coherent fixtures exist. Empty/loading/error/unavailable states are manually selected design states; they do not imitate an operational network request.

Authoritative project documents are absent, so this map covers the supplied UI brief only. Additional future-system subviews must be reconciled against those documents when provided.

## Account Board route extension

`#home` now includes Stack/Grid asset folders with session-only selection; choosing a back tab does not navigate. Featured/Grid folder links use `#wallet/account/<stable-id>`, render Wallet parent context and open matching detail. Browser Back closes detail; Escape replaces its URL with `#wallet` and returns focus to the row. Invalid IDs show unavailable information. View All opens Wallet. Add Account is an honest unavailable preview. [Home](../pages/home/Page-Home.md) and [Wallet](../pages/wallet/Page-Wallet.md) share provider resolution.

Scope correction: authoritative project/governance/architecture documents are now present in the vault; the earlier absent-documents statement above describes the historical UI pass, not current availability.

## Change log

- 2026-10-16 — Added vault metadata, linked the page hub, and retained the historical scope statement for [TASK-VAULT-STRUCTURE-001](../worklog/10-Tasks/TASK-VAULT-STRUCTURE-001.md).

- 2026-10-16 — Account Board prototype update for [TASK-GS-UI-ACCOUNT-BOARD-001](../worklog/10-Tasks/TASK-GS-UI-ACCOUNT-BOARD-001.md).

## S2 profile actions

Home and Wallet Add now open session-only account setup; detail Edit opens its populated form. Apply refreshes Home/Wallet identity; Cancel retains prior state, editing cancel returns to detail. Optional reference/label/folder tone/accent are disclosed in the form. No new route or financial operation.

-2026-10-16 — [Account Board S2](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S2.md).
