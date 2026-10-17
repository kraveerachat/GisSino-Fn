---
id: DESIGN-SCREEN-MAP
type: design
level: 2
status: CURRENT
updated: 2026-10-17
up: Design-Hub.md
related:
  - COMPONENT_INVENTORY.md
  - ../pages/Pages-Hub.md
---
# Screen map

## Current state — pre-Home preview S3

| Destination | Public preview contract |
|---|---|
| No hash / `#welcome` | A01: one Get Started → Entry, one shield, four responsive art candidates, locale and disclosure |
| `#entry` | A01b: separate Login/signup choice; Back to Welcome |
| `#login` | A02: email/password UI, visibility toggle, validation; Passkey/reset disabled; submit stays here and clears valid inputs; separate demo action → Home |
| `#signup` | A03: invitation/email/password/confirm UI validation; explicit preview continuation or no-data skip → Profile; no user or invite verification |
| `#setup/profile` | A04: transient display name, nickname and preset avatar; Previous → Signup |
| `#setup/about` | A05: optional AD birth year/approximate age and optional gender; no eligibility or age bands |
| `#setup/consent` | A06: privacy/visibility/sample-data information and demo checkbox; no legal consent |
| `#setup/accounts` | A07: shared Bank/E-Wallet/Cash provider identities/logos; THB/USD selection, no balances/save |
| `#setup/notifications` | A08: local in-app/push/email choices; no permissions or subscriptions |
| `#setup/install` | A09: iOS/Android/desktop guide; Continue → Postcard; no simulated installed state |
| `#postcard` | A10: optional nickname; explicit Home preview action; no persistent completion |
| Explicit `#home` | Existing synthetic dashboard and application shell; reachable only through labelled demo continuation or direct review URL |

The eleven public routes render one main/one logo, light appearance, translated title/copy and no application navigation. Six setup steps provide Previous/Continue plus a direct Welcome exit; Postcard also exits to Welcome. Hash Back/Forward and safe invalid-route fallback are retained. Deep links require no fake identity. Public routing is presentation, not authorization; dashboard theme survives returning. See [Auth](../pages/auth/Page-Auth.md), [D27](../project/DECISIONS.md#d27--owner-requested-pre-home-preview-revision), [Welcome S3](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md), [app.js](../../src/app.js) and [preview-flow.js](../../src/preview-flow.js).

## Dashboard current state — S3

Home defaults to a vertical deck of complete account folders. Horizontal is the only alternate mode and is selected only in Settings; mode changes preserve the selected account ID. Every account uses the same full folder component in both modes. S1/S2 tab strips, Stack/Grid choices and wrapping selection are historical and SUPERSEDED by the owner’s S3 attachment. The shared 13 provider assets, session profile form, Wallet detail routes and financial preview boundary remain intact. Home selection stays on `#home`; explicit detail or active-only double-tap/double-click opens `#wallet/account/<stable-id>`. Escape retains the existing Wallet return contract. Settings controls mode with no new route. [Account Board S3](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md) records the change.

| Destination | Important subviews and preview states |
|---|---|
| `#wallet` | Minimal synthetic asset overview, explicit Bank/E-wallet/Cash categories, separate card liabilities, existing account detail, own-account transfer; unsupported account creation/reconcile clearly labelled |
| More (native popover) | Bills and Party, contextual child highlight, close/toggle/outside/Escape/Tab-away dismissal; mutually exclusive with the Add dialog |
| `#transfer` | Own-account child screen; zero initial amount, physical keyboard/custom touch keypad, source/destination exclusion, precision validation, unsaved review; no posting |
| `#credit-card` | Bills child screen; original sample card, outstanding/full/minimum/date summary, six tracking sheets, in-memory reminder, sample activity; no issuer controls |
| `#home` | Balance visibility, complete overlapping asset folders (vertical default; horizontal selected in Settings), canonical Wallet account detail sheet, expense/income/transfer/no-spend quick actions, recent transaction details, upcoming bills, habit summary |
| `#activity` | October sample context, income/expense summaries, search, all/expense/income/own-transfer filters, day grouping, needs-details transaction, detail sheet; sample, empty, loading, error, unavailable, and no-search-results |
| Add (modal action) | Mode chooser; manual expense/income, own-account transfer, synthetic receipt, no-spend check-in, inactive AI; field validation and explicitly unsaved result |
| `#bills` | October commitments, calendar/list, credit cards, monthly bills, installments, subscriptions, due/status badges, detail sheet; empty/loading/error/unavailable. Compact agenda below 360px |
| `#party` | Private personal habit status, level/XP, streak/freezes, milestones, weekly habit leaderboard, members, invitation explanation, activity feed, visibility switches. No account/transaction details |
| `#settings` | Light/dark, Thai/English, Account Board vertical/horizontal display mode, profile, currency/FX, categories, notifications, privacy, security, installation guide explanation |
| Header | Notifications empty-state sheet, theme action, avatar/settings entry |
| Desktop sidebar (1100px+) | 72px collapsed / 240px temporary overlay / 240px pinned; five direct destination links, stable pin toggle, keyboard disclosure, profile Settings |
| Desktop header Add | One 48px circle invokes the shared Add modal; absent from the desktop navigation list; mobile Add stays in its floating island |

The monthly sample is explicitly October 2026. Other months are not offered until coherent fixtures exist. Empty/loading/error/unavailable states are manually selected design states; they do not imitate an operational network request.

Authoritative project documents are available in the vault. This map describes the current mock UI; future-system subviews remain subject to the Project Guide and architecture decisions.

## S1 Account Board route extension — SUPERSEDED presentation/Add state

`#home` now includes Stack/Grid asset folders with session-only selection; choosing a back tab does not navigate. Featured/Grid folder links use `#wallet/account/<stable-id>`, render Wallet parent context and open matching detail. Browser Back closes detail; Escape replaces its URL with `#wallet` and returns focus to the row. Invalid IDs show unavailable information. View All opens Wallet. Add Account is an honest unavailable preview. [Home](../pages/home/Page-Home.md) and [Wallet](../pages/wallet/Page-Wallet.md) share provider resolution.

Scope correction: authoritative project/governance/architecture documents are now present in the vault; the earlier absent-documents statement above describes the historical UI pass, not current availability.

## Change log

- 2026-10-16 — Added vault metadata, linked the page hub, and retained the historical scope statement for [TASK-VAULT-STRUCTURE-001](../worklog/10-Tasks/TASK-VAULT-STRUCTURE-001.md).

- 2026-10-16 — Account Board prototype update for [TASK-GS-UI-ACCOUNT-BOARD-001](../worklog/10-Tasks/TASK-GS-UI-ACCOUNT-BOARD-001.md).

## S2 profile actions

Home and Wallet Add now open session-only account setup; detail Edit opens its populated form. Apply refreshes Home/Wallet identity; Cancel retains prior state, editing cancel returns to detail. Optional reference/label/folder tone/accent are disclosed in the form. No new route or financial operation.

-2026-10-16 — [Account Board S2](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S2.md).


- 2026-10-16 — [Account Board S3](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md) supersedes the S1/S2 tab-strip and Stack/Grid presentation with complete overlapping folders.


- 2026-10-17 — Documented A01 public preview extension for [Welcome task](../worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md); retained dashboard S3 history.

- 2026-10-17 — Reconciled owner-requested pre-Home S3 preview for [Welcome S3](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md); S1/S2 history remains preserved.
