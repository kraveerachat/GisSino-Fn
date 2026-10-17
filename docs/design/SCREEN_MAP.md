---
id: DESIGN-SCREEN-MAP
type: design
level: 2
status: CURRENT
updated: 2026-10-18
up: Design-Hub.md
related:
  - COMPONENT_INVENTORY.md
  - ONBOARDING_HOME_V2_ROADMAP.md
  - ../pages/Pages-Hub.md
---
# Screen map

## Current state — Wallet v2 (2026-10-18)

`#wallet` now leads with asset/liability composition and legend, then Bank → E-wallet → Cash → Credit/debit/obligations notched-card sections. Asset center is distinct from obligations and composition basis. Debit has no extra balance/card fixture. Account links remain `#wallet/account/<stable-id>` with session profile Edit; credit opens `#credit-card`; obligation buttons open existing bill detail; footer Add Account opens the session profile form and Transfer opens `#transfer`. Balance visibility, TH/EN, themes, Back/Forward and desktop/mobile navigation are retained. No route is added. [Wallet](../pages/wallet/Page-Wallet.md), [D32](../project/DECISIONS.md#d32--wallet-composition-and-notched-account-cards) and [S1](../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S1.md) describe the local implementation and runtime verification and source delivered; final documentation checkpoint pending. This dated section supersedes the minimal Wallet overview row below; Home/pre-Home/planning history remains separate.

Source `eac4d7193fd6d2a261d8e7286c63c819806f2f60` is pushed in [Draft PR #8](https://github.com/kraveerachat/GisSino-Fn/pull/8); final finish SHIP, owner review/merge and final documentation checkpoint remain pending.

## Current state — pre-Home preview S4

| Destination | Public preview contract |
|---|---|
| No hash / `#welcome` | A01: one Get Started → Entry, one shield, unchanged four responsive art candidates |
| `#entry` | A01b: conventional Login/signup choice, no invitation copy; Back → Welcome |
| `#login` | A02: email/password, show/hide and unavailable password recovery; primary Login or Google → Home with empty or typed inputs |
| `#signup` | A03: email/password/confirm, show/hide, no invitation field; primary signup or Google → Profile with empty or typed inputs |
| `#setup/profile` | A04: transient display name, nickname and preset avatar; header Back → Signup |
| `#setup/about` | A05: separate optional AD birth year/approximate age and gender; no age bands or eligibility |
| `#setup/consent` | A06: plain privacy principles and transient checkbox; no recorded legal consent |
| `#setup/accounts` | A07: shared Bank/E-Wallet/Cash providers/logos and THB/USD choice; no balance/save |
| `#setup/notifications` | A08: transient notification choices; no permissions or subscriptions |
| `#setup/install` | A09: platform installation guidance; Continue → Postcard; no simulated installed state |
| `#postcard` | A10: optional escaped nickname and one Go to Home action; header Back → Install |
| Explicit `#home` | Existing synthetic dashboard, unchanged sample-data disclosure and application shell |

Each of the eleven public routes has exactly one compact visible header Demo mode indicator (`โหมดสาธิต`) with a screen-reader description. Forms and footers use concise consumer copy without repetitive technical warnings. Every non-Welcome route has one header Back; each wizard step and Postcard has one primary action. Native hash Back/Forward, main focus/title, locale and invalid-route fallback remain. Primary/Google actions clear existing credential-node values before navigation; they create no authentication, registration or provider-success state. Deep links need no identity. Routing is presentation, not authorization. [D28](../project/DECISIONS.md#d28--consumer-copy-and-open-signup-presentation-in-demo-mode) supersedes S3 credential validation/separate demo/skip and duplicate back/exit controls only for this preview. Canonical production invite-only signup remains in force pending a separate owner/security decision before M1. See [Auth](../pages/auth/Page-Auth.md), [Welcome S4](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md), [welcome.js](../../src/welcome.js) and [preview-flow.js](../../src/preview-flow.js).

## Dashboard current state — S3

Home defaults to a vertical deck of complete account folders. Horizontal is the only alternate mode and is selected only in Settings; mode changes preserve the selected account ID. Every account uses the same full folder component in both modes. S1/S2 tab strips, Stack/Grid choices and wrapping selection are historical and SUPERSEDED by the owner’s S3 attachment. The shared 13 provider assets, session profile form, Wallet detail routes and financial preview boundary remain intact. Home selection stays on `#home`; explicit detail or active-only double-tap/double-click opens `#wallet/account/<stable-id>`. Escape retains the existing Wallet return contract. Settings controls mode with no new route. [Account Board S3](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md) records the change.

| Destination | Important subviews and preview states |
|---|---|
| `#wallet` | Ring-led asset/obligation composition and notched Bank/E-wallet/Cash then credit/debit/obligation cards; existing detail, session profiles and transfer/Add actions; debit uses linked bank money only |
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

## Planned screen roadmap — Onboarding, Home v2, and Community

The comprehensive roadmap is defined in [ONBOARDING_HOME_V2_ROADMAP.md](ONBOARDING_HOME_V2_ROADMAP.md). Primary responsive navigation remains invariant under [D23](../project/DECISIONS.md#d23--responsive-primary-navigation) (Mobile 4+1, Desktop sidebar 5).

| Planned Route | Destination Purpose & Key Preview Subviews | Status |
|---|---|---|
| `#welcome` | Public landing: S-Shield logo, brand tagline, Login action, Invite Sign-up action | DESIGNED |
| `#login` | Returning auth: Passkey primary action, email/password fallback, rate-limit/unavailable states | DESIGNED |
| `#signup` | Registration: 6-token invite code validation, credential creation, Passkey prompt | DESIGNED |
| `#setup/profile` | Onboarding Step 1: Real name, display nickname, preset avatar selection | DESIGNED |
| `#setup/about` | Onboarding Step 2: Birth year (derived age category), gender ("ไม่ระบุ"), conditional income | DESIGNED |
| `#setup/consent` | Onboarding Step 3: Affirmative plain-Thai privacy/data/slip disclosure, minor confirmation | DESIGNED |
| `#setup/accounts` | Onboarding Step 4: First Bank, E-Wallet, Cash presets with opening balances | DESIGNED |
| `#setup/notifications`| Onboarding Step 5: In-app inbox, Web Push trigger, email digest toggle, streak time | DESIGNED |
| `#setup/install` | Onboarding Step 6: Platform-specific PWA installation guidance | DESIGNED |
| `#postcard` | Modal overlay: One-time dismissible celebratory Welcome Postcard preceding Home | DESIGNED |
| `#home` (v2) | Enhanced layout: Today strip, Nearest Obligation, Streak with Party rank, 1-line summary, compact Leaderboard card | DESIGNED |
| `#activity/summary` | Activity Summary tab: Relocated monthly totals, 7-day bar chart, category breakdown | DESIGNED |
| `#leaderboard` | Full Leaderboard page: Global & My Friends tabs, age category and period filter chips | PLANNED / DRAFT |
| `#friends` | Friends list: Search by exact name / 6-digit code, pending requests, friend management | DESIGNED |
| `#party/create` | Group creation overlay: Create custom friend party with icon and invite picker | DESIGNED |
| `#family/create` | Household creation overlay: Create family group with household defaults | DESIGNED |

- 2026-10-17 — Planned Onboarding, Home v2, Activity Summary tab, Leaderboard, and Friends routes added for [TASK-GS-PLAN-005](../worklog/10-Tasks/TASK-GS-PLAN-005.md).


> This table is the PR #5 planning snapshot for future production work. The current S4 navigable UI preview is documented above; its open-signup UI does not override the production invite-only decision.


- 2026-10-17 — Documented A01 public preview extension for [Welcome task](../worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md); retained dashboard S3 history.

- 2026-10-17 — Reconciled owner-requested pre-Home S3 preview for [Welcome S3](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md); S1/S2 history remains preserved.

- 2026-10-17 — [Welcome S4](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md) / D28 replaces only pre-Home copy, open-signup/Google presentation and demonstration navigation; production security and prior session history remain preserved.

- 2026-10-18 — Added scoped Wallet v2 current state for [TASK-GS-UI-WALLET-V2-001](../worklog/10-Tasks/TASK-GS-UI-WALLET-V2-001.md); final verification/delivery pending.
