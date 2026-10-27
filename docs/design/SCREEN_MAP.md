---
id: DESIGN-SCREEN-MAP
type: design
level: 2
status: CURRENT
updated: 2026-10-27
up: Design-Hub.md
related:
  - COMPONENT_INVENTORY.md
  - ONBOARDING_HOME_V2_ROADMAP.md
  - ../pages/Pages-Hub.md
---
# Screen map

## PWA shell and install entry points (2026-10-27)

Manifest start /?source=pwa#home; shortcuts to existing Expense form (#add/expense), #transfer and #bills. Existing #setup/install and Settings native sheet share one guide; no parallel route. Settings Back/Refresh available. Sub-screen Back/Close remains in-app. Standalone suppresses install prompts. See [Batch A task](../worklog/10-Tasks/TASK-GS-WP09-10-PWA.md) and [PWA review](reviews/PWA_SHELL_REVIEW.md). Batch A is locally/browser verified; Draft delivery/owner review pending. Earlier pending-delivery statements below are historical: Activity PR #9, Bills #10 and Party #11 are merged; the current task remains separate.



## Activity v2 S1 navigation and period (2026-10-18)

[D33](../project/DECISIONS.md#d33--embedded-activity-monthly-analytics): existing `#activity` contains month selector, monthly donut/net/income/expense, maximum four expense categories, View all, search/type chips and dated list. View all opens shared native dialog with selected-month/full fourteen-category breakdown; Escape/Close restores trigger. Existing transaction details/global Add/header/sidebar/bottom navigation remain. Month state transient; only coherent October 2026 selectable. Search/type filters affect list only. No `#activity/summary` implementation/new tab. Historical roadmap below remains deferred planning. [Task/S1](../worklog/10-Tasks/TASK-GS-UI-ACTIVITY-V2-S1.md) records source implemented; verification evidence recorded.


RUNTIME VERIFIED for the tested scope: parent check passes 637 matching locale keys and 102/102 tests (18 focused Activity tests). Inspected final browser evidence passes 32 normal-layout cases, 12 named functional checks, six edge scenarios and 200% text enlargement at 390px with no overflow/clipping/invalid geometry. Computed text contrast minimum is 5.175:1 light/4.775:1 dark, with zero CSP errors. Final independent A is SHIP for owner review after four final captures; no rescore. Owner review/merge remains pending. See [Activity review](reviews/ACTIVITY_ANALYTICS_REVIEW.md).


Source `ae9c611c68c081ef6686353b33539cbc7980d453` is committed/pushed on `task/gs-ui-activity-v2-s1` in new [Draft PR #9](https://github.com/kraveerachat/GisSino-Fn/pull/9), verified OPEN/DRAFT, MERGEABLE/CLEAN against main. Implementation delivery is CLOSED after final SHIP; owner visual review/merge remains pending. Documentation closeout/receipt is prepared on the same branch; parent final docs commit/push/head equality follows. No future documentation SHA is claimed.

Latest pushed source head is `b92cf237a54ed364fda4fdb48b81b98e6c2188bf`:salary search retains visible Income category compatibility;637-key/102-test rerun passes. The receipt preserves earlier feature checkpoint ae9c611c68c081ef6686353b33539cbc7980d453;no screenshot change.

## Current Bills v2 route — 2026-10-26

`#bills` opens the selected-month list by default. Month selection updates summary, list and calendar; the type filter affects list rows only. Calendar date opens every cycle for that day. A row opens the existing dialog infrastructure with amount/status and, for installments, period progress, products, schedule and merchant/financing/funding. A credit-card statement detail retains its `#credit-card` destination. Bills Add opens the four-type draft form → review → Edit or Discard; sample Edit is prefilled. Record paid opens review → confirm and updates in-memory projection until reload. Existing global Add, Mobile More placement, desktop sidebar, Home/Wallet/Activity routes and privacy/theme/locale controls remain. [Page contract](../pages/bills/Page-Bills.md).

## Party preview route — GS-UI-PARTY-V2-S1

`#party` retains personal XP/streak/freezes, badges, feed and Visibility, then shows Friends Weekly Ranking followed by a synthetic opted-in Global Ranking for the current Bangkok week. The Friends card opens the shared mobile bottom sheet/desktop dialog with Search, Requests and Friends subviews; search requires exact username or six-digit code and state resets on reload. Home's existing habit link reaches `#party`; mobile More and desktop Party navigation are unchanged. Separate `#leaderboard` and `#friends` remain planned, not new routes. See [Party](../pages/party/Page-Party.md).

## Current Home v2 — Focused owner revision S3

`#home` preserves greeting/balance/actions/navigation, then My Accounts first → conditional max4 seven-day Due soon → existing gamified Streak/XP with missing days → Recent Transactions last. No Today/Safe Home card, standalone nearest or monthly Home UI; underlying Safe math remains for future Wallet design. Settings retains synthetic scenario/Bangkok clock and Account Board mode controls. No route is added. See [Home](../pages/home/Page-Home.md) and [S3](../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S3.md).

| Home action | Actual destination / behavior |
|---|---|
| Bell | Existing sheet with deduplicated synthetic due/overdue notices or empty; notice link → `#bills`, no item highlight/delivery |
| Due soon row | Existing Bill handler with real fixture ID: card uses established credit-card tracking route, other bills existing detail dialog |
| Due soon View all | Existing Bills screen, no applied filter claim |
| View missed days | Focus/scroll first existing current-week missing date, including distinct frozen/no-activity status |
| Habit card check-in/review | Existing shared No spending today confirmation/result sheet, transient only |
| Calendar day / stepping | Internal selected date and bounded timeline focus/scroll; no route or historical write |
| Party link | Existing `#party`, aggregate preview unchanged |
| Snapshot adjustment | `#settings`, Home-only clock/scenarios |
| Account selection / detail | Existing selection and `#wallet/account/<stable-id>` preserved |
| Recent rows / View all | Existing transaction detail / `#activity` |

`#activity/summary`, Leaderboard and Friends remain unimplemented. The roadmap below is historical/planned, not a runtime claim. D33 selects embedded Activity monthly analysis for this slice; independent Summary tab remains deferred.


## Current state — Wallet S2 routes and periods (2026-10-18)

`#wallet` now has an assets-only Bank/E-wallet/Cash summary and account sections. Overview is default; History adds native year and scrollable monthly snapshot selection, with unavailable months disabled. This is local screen state, with no new route. Current-only supporting Bills link opens `#bills`; History does not show current obligations as historical data. Account activity toggles selected-month shares/values independently. `#wallet/account/<stable-id>` remains current detail and is explicitly described as current when opened from History. Session profile Edit/Add, `#transfer`, global Add, Back/Forward, balance visibility, themes and TH/EN remain shared. Credit/bill destinations stay available through existing product navigation rather than Wallet primary sections. [D32 S2](../project/DECISIONS.md#d32-s2--assets-only-wallet-and-monthly-snapshots) supersedes S1 below; [S2](../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S2.md) records passed56 layouts/14 edges/15 named functional groups and no artifact errors. Final independent A is SHIP; corrected 200% text enlargement and AX/contrast checks pass. Source `184b2f7053940f7e2129d41c8f61342c76a7b875` is pushed in existing Draft PR #8; documentation closeout follows the verified source. Current integration status: [PR #8](https://github.com/kraveerachat/GisSino-Fn/pull/8) is MERGED at `90a81e8d7a44fc5472e254be7c2197c0e5fc411f`, verified in the Activity start audit; prior review/push/checkpoint statements describe historical S2 delivery.

## Superseded Wallet S1 presentation (2026-10-18)

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

## Preserved Account Board contract — S3

Home defaults to a vertical deck of complete account folders. Horizontal is the only alternate mode and is selected only in Settings; mode changes preserve the selected account ID. Every account uses the same full folder component in both modes. S1/S2 tab strips, Stack/Grid choices and wrapping selection are historical and SUPERSEDED by the owner’s S3 attachment. The shared 13 provider assets, session profile form, Wallet detail routes and financial preview boundary remain intact. Home selection stays on `#home`; explicit detail or active-only double-tap/double-click opens `#wallet/account/<stable-id>`. Escape retains the existing Wallet return contract. Settings controls mode with no new route. [Account Board S3](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md) records the change.

| Destination | Important subviews and preview states |
|---|---|
| `#wallet` | Ring-led asset/obligation composition and notched Bank/E-wallet/Cash then credit/debit/obligation cards; existing detail, session profiles and transfer/Add actions; debit uses linked bank money only |
| More (native popover) | Bills and Party, contextual child highlight, close/toggle/outside/Escape/Tab-away dismissal; mutually exclusive with the Add dialog |
| `#transfer` | Own-account child screen; zero initial amount, physical keyboard/custom touch keypad, source/destination exclusion, precision validation, unsaved review; no posting |
| `#credit-card` | Bills child screen; original sample card, outstanding/full/minimum/date summary, six tracking sheets, in-memory reminder, sample activity; no issuer controls |
| `#home` | Balance visibility, complete overlapping asset folders (vertical default; horizontal selected in Settings), canonical Wallet account detail sheet, expense/income/transfer/bills quick actions, compact Today/Safe, gamified calendar/check-in, bell due preview and recent details last; no Home monthly UI |
| `#activity` | October sample context, income/expense summaries, search, all/expense/income/own-transfer filters, day grouping, needs-details transaction, detail sheet; sample, empty, loading, error, unavailable, and no-search-results |
| Add (modal action) | Mode chooser; manual expense/income, own-account transfer, synthetic receipt, no-spend check-in, inactive AI; field validation and explicitly unsaved result |
| `#bills` | October commitments, calendar/list, credit cards, monthly bills, installments, subscriptions, due/status badges, detail sheet; empty/loading/error/unavailable. Compact agenda below 360px |
| `#party` | Personal habit status, level/XP, streak/freezes, badges; accepted Friends weekly board then synthetic opted-in Global board; Friends summary/search/requests sheet; aggregate feed and three visibility levels. No account/transaction details |
| `#settings` | Light/dark, Thai/English, Account Board vertical/horizontal display mode, Home-only scenario/Bangkok datetime, profile, currency/FX, categories, notifications, privacy, security, installation guide explanation |
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
| `#activity/summary` | Historical separate Summary-tab proposal, superseded for S1 by D33 embedded analytics | DEFERRED; no route implemented |
| `#leaderboard` | Full Leaderboard page: Global & My Friends tabs, age category and period filter chips | PLANNED / DRAFT |
| `#friends` | Friends list: Search by exact name / 6-digit code, pending requests, friend management | DESIGNED |
| `#party/create` | Group creation overlay: Create custom friend party with icon and invite picker | DESIGNED |
| `#family/create` | Household creation overlay: Create family group with household defaults | DESIGNED |

- 2026-10-17 — Planned Onboarding, Home v2, Activity Summary tab, Leaderboard, and Friends routes added for [TASK-GS-PLAN-005](../worklog/10-Tasks/TASK-GS-PLAN-005.md).


> This table is the PR #5 planning snapshot for future production work. The current S4 navigable UI preview is documented above; its open-signup UI does not override the production invite-only decision.


- 2026-10-17 — Documented A01 public preview extension for [Welcome task](../worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md); retained dashboard S3 history.

- 2026-10-17 — Reconciled owner-requested pre-Home S3 preview for [Welcome S3](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md); S1/S2 history remains preserved.

- 2026-10-17 — [Welcome S4](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md) / D28 replaces only pre-Home copy, open-signup/Google presentation and demonstration navigation; production security and prior session history remain preserved.

- 2026-10-18 — Reconciled source-level Home v2 S1 behavior and preserved Account Board for [Home S1](../worklog/10-Tasks/TASK-GS-UI-HOME-V2-S1.md); verification/delivery gates remain in progress.

- 2026-10-18 — Reconciled owner-approved Compact Home/gamified transient preview for [Home S2](../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md); D29 presentation superseded by D30, production engine boundaries retained.

- 2026-10-18 — Owner [Home S3](../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S3.md) reconciles seven-day Due soon, Home Safe removal with retained math and missing activity versus frozen days; other contracts preserved.


- 2026-10-18 — Added scoped Wallet v2 current state for [TASK-GS-UI-WALLET-V2-001](../worklog/10-Tasks/TASK-GS-UI-WALLET-V2-001.md); final verification/delivery pending.

- 2026-10-18 — [Wallet S2](../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S2.md) / D32 S2 supersedes S1 Wallet presentation with assets-only composition and monthly history; S2 verification/delivery pending.

- 2026-10-18 — Added scoped D33 Activity v2 S1 contract; verification pending; historical task evidence preserved.
