---
id: PROJECT-DECISIONS
type: decision-log
level: 2
status: CURRENT
updated: 2026-10-26
up: Project-Hub.md
related:
  - PROJECT_GUIDE.md
  - OPEN_QUESTIONS.md
  - ../architecture/SYSTEM_ARCHITECTURE.md
  - ../pages/Pages-Hub.md
---
# Decisions

The D1–D22 entries preserve the Project Guide snapshot. D23 records owner-approved navigation; D24 records the Account Board; D25 records the A01 Welcome extension; D26 the shield replacement; D27 the owner-requested pre-Home preview revision. D28 records consumer copy and public signup/Google presentation. D32 records the new Wallet preview; D33 records Activity monthly analytics and D35 records Bills preview composition (D34 records the Party weekly rankings and Friends preview). D29–D31 record the merged Home PR #7. Original D4 text below is preserved; D27 supersedes its direct Welcome choice and D28 refines its preview controls only. Production invite-only policy remains canonical.

| ID | Decision | Status |
|---|---|---|
| D1 | Name GisSino / `GisSino_FN`, tagline as in the Project Guide | [DECIDED] |
| D2 | Personal/family hobby app, solo-first, lean daily-use scope | [DECIDED] |
| D3 | Mobile-first PWA, then desktop | [DECIDED] |
| D4 | Flow: Welcome → Login/Sign up (invite) → Setup → Main | [DECIDED] |
| D5 | Hosting: home server + Cloudflare Tunnel; Twingate for admin only; Access for admin routes | [DECIDED] |
| D6 | Currencies THB + USD only; daily USD→THB rate fetched from an API | [DECIDED], source [PROPOSED] |
| D7 | Subscriptions post automatically, no confirmation | [DECIDED] |
| D8 | No slip/receipt OCR; slips are attached only | [DECIDED] |
| D9 | AI chat = draft then confirm | [DECIDED] |
| D10 | Party = status/ranking showcase from solo stats; three visibility levels | [DECIDED] |
| D11 | Streak with auto-consumed freezes, Duolingo-level intensity | [DECIDED], numbers [PROPOSED] |
| D12 | Notifications: in-app + Web Push + email; Telegram owner-only | [DECIDED] direction |
| D13 | Light default + dark mode, navy accent, Thai primary | [PROPOSED] |
| D14 | Bottom nav: Home · Activity · +Add · Bills · Party; settings behind avatar | [SUPERSEDED] by D23 on 2026-10-16 |
| D15 | Stack: Next.js TypeScript + self-hosted PostgreSQL + job queue in PostgreSQL | [PROPOSED] |
| D16 | Domain/tunnel reuse from AEGIS | [OPEN] |
| D17 | LLM provider | [OPEN] |
| D18 | Email provider for digests | [OPEN] |
| D19 | Thai banks for CSV import later | [OPEN] |
| D20 | Same physical server as AEGIS or separate; IP/VLAN placement | [OPEN] |
| D21 | Off-host backup destination | [OPEN] |
| D22 | Whether Full visibility ever includes itemized data; recommendation is never | [OPEN] |
| D23 | Responsive primary navigation described below | [DECIDED] |
| D24 | Complete Account Board folders and shared provider identity | [DECIDED] for mock UI |
| D25 | A01 art-directed light public Welcome and honest placeholders | [DECIDED] for preview |
| D26 | Use the owner's exact white/blue replacement at the canonical shield path | [DECIDED] for preview |
| D27 | Welcome → Get Started → Entry; separate Login/demo and six-step setup preview → Postcard → Home | [DECIDED] for S3 preview; control/copy details superseded by D28 |
| D28 | Consumer copy, one Demo mode header, open-signup/Google presentation and no-data navigation | [DECIDED] for preview; production public signup/Google [OPEN] pending approval |
| D32 | Wallet ring composition, notched cards, assets central/separate obligations and linked-bank debit semantics | [DECIDED] for Wallet mock UI |
| D34 | Party Friends and Global ranking with exact-match, session-only friend preview | [DECIDED] for Party mock UI only; production policy [OPEN] |

### D23 — Responsive primary navigation

- Date: 2026-10-16
- Status: [DECIDED]
- Decided by: owner through design iteration
- Statement: mobile uses Home / Wallet / Activity / More plus a separate Add circle; More contains Bills and Party. Desktop uses a collapsible sidebar with Home, Wallet, Activity, Bills, and Party, while Add remains a separate header action.
- Supersedes: D14’s earlier five-slot proposal.
- Source: [Floating Island Navigation task](../worklog/10-Tasks/TASK-FLOATING-ISLAND-NAVIGATION.md) and [Desktop Sidebar task](../worklog/10-Tasks/TASK-GS-UI-002-DESKTOP-SIDEBAR.md).
- Affects: [System Architecture §8](../architecture/SYSTEM_ARCHITECTURE.md#8-information-architecture--navigation-map-structure-only-not-layout), [Pages Hub](../pages/Pages-Hub.md), and [Screen Map](../design/SCREEN_MAP.md).

## Change log

- 2026-10-16 — Split the source decision snapshot into a canonical log and recorded D23.

### D24 — Account Board preview and shared provider identity

- Date: 2026-10-16; status: DECIDED for the mock UI; decided by owner through task and compact-folder clarification.
- Historical S1 statement — SUPERSEDED by the S3 follow-up below: Home defaults to compact layered asset folders with Stack/Grid choice. Bank/E-Wallet/Cash identities share one registry and display adapter with Wallet; liabilities remain separate. Selection is distinct from opening detail.
- Provider artwork without confirmed rights uses original fallback icons; accent HEX values remain proposed UI tokens, not official brand certification.
- Supersedes the prior simple Home account-list presentation only. No Accounts/Ledger, persistence or bank integration milestone is implied.
- Source: [TASK-GS-UI-ACCOUNT-BOARD-001](../worklog/10-Tasks/TASK-GS-UI-ACCOUNT-BOARD-001.md); affects [Home](../pages/home/Page-Home.md), [Wallet](../pages/wallet/Page-Wallet.md), [Provider Catalog](../design/PROVIDER_CATALOG.md).

## D24 follow-up — aligned folders and profile previews

Owner-directed2026-10-16 refinement: straight curved folders, compact mobile visual indicators/no counter/helper, bundled owner-supplied bank/E-Wallet PNGs, Paotang profile and add/edit display metadata with appearance choices. This supersedes D24 baseline blanket logo withholding for the supplied13assets and unavailable Add behavior only. Everything remains mock/session-only.

-2026-10-16 — [Account Board S2](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S2.md).


## D24 follow-up — complete overlapping folders (S3)

- Date: 2026-10-16; status: DECIDED for the mock UI; decided by owner in attachment `892553f0-0076-4b38-94ac-703e530edd72/Pasted text.txt`, “Real Overlapping Folder Stack & Gesture Redesign.”
- Statement: all accounts are complete reusable folders with actual overlap; vertical is default and horizontal is the only Settings alternate. Preserve selected ID across modes. Home has no mode toggle, tab-strip placeholders or conventional Grid.
- Interaction: dedicated vertical touch grip holds 260ms before continuous drag; horizontal touch moves laterally; rAF transforms preserve card nodes; 240ms snap (immediate with reduced motion). Bounded arrows/buttons/Home/End/wheel, boundary/Ctrl release, normal folder-body scroll, explicit detail and active-only double-tap/double-click. Drag does not open detail.
- Supersedes: S1/S2 Stack/Grid, strip-tab selection and wrapping index behavior only. Provider/profile/Wallet/financial contracts and the 13 supplied assets continue unchanged.
- Source: [S3](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md); affects [Home](../pages/home/Page-Home.md), [UI specification](../design/UI_DESIGN_SPEC.md), [Screen Map](../design/SCREEN_MAP.md).


### D25 — A01 Welcome art-directed public preview

- Date: 2026-10-17; status: DECIDED for A01 design preview; decided by owner in task GS-UI-WELCOME-001.
- Statement: Light Porcelain × Premium Blue Architectural Enamel uses four owner-supplied background variants, one separate canonical S-Shield, live translated copy and native Login/invitation-signup route actions. Welcome becomes the default no-hash public entry. Login/signup are honest placeholders with Back to Welcome. Explicit Home remains a mock-dashboard review route; no authentication is implemented.
- Responsive rule: desktop artwork at >=1280px; otherwise tablet requires both axes >=600px and follows orientation; mobile fallback includes short landscape. Contain/left-bottom preserves all art geometry. Public light appearance does not change dashboard theme preference.
- Supersedes: only the **PROPOSED dark centered tablet/desktop A01 card treatment** in the [planning roadmap at verified tip](https://github.com/kraveerachat/GisSino-Fn/blob/03065adbb023aafaac15a26bca99a123f6c2fe0e/docs/design/ONBOARDING_HOME_V2_ROADMAP.md), dated supersession 2026-10-17. Preserve that history; no other auth/setup/privacy/demographic proposal is adopted. Planning [PR #5](https://github.com/kraveerachat/GisSino-Fn/pull/5) is untouched.
- Source: [Welcome task](../worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md). Affects: [Auth/Welcome](../pages/auth/Page-Auth.md), [UI specification](../design/UI_DESIGN_SPEC.md), [Screen Map](../design/SCREEN_MAP.md).

### D26 — Owner-selected canonical shield replacement

- Date: 2026-10-17; status: DECIDED; decided by owner via explicit attached-logo instruction after S1 delivery.
- Statement: copy the owner's exact replacement PNG into `assets/brand/gissino-s-shield.png` on the Welcome task branch. Reuse the existing shared helper and favicon path; no image transformation or sizing/layout change. The primary source is left untouched.
- Supersedes: the earlier S1 decision to retain the committed-main metallic shield and leave the primary alternate unadopted. S1 receipt remains an immutable historical snapshot. Shared dashboard branding intentionally receives the same replacement.
- Source and evidence: [S2](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S2.md), [brand provenance](../../assets/brand/README.md). Affects [Auth/Welcome](../pages/auth/Page-Auth.md) and [UI specification](../design/UI_DESIGN_SPEC.md). Same Draft PR #6; no change to planning PR #5.

### D27 — Owner-requested pre-Home preview revision

- Date: 2026-10-17; status: DECIDED for visual/interaction preview; decided by owner through the GS-UI-WELCOME-001 revision and full-viewport/bolder-branding clarification.
- Statement: Welcome has exactly one Get Started → Entry. Entry offers Login or invitation signup. Login validates field presentation without authentication; only a separately labelled demo continuation opens Home. Signup preview validation or explicit no-data skip leads to six separate steps: Profile → About You → Privacy/Consent → First Accounts → Notifications → Install, then Postcard → Home preview.
- Visual scope: full-viewport art-directed cover, bolder Welcome identity and calmer porcelain forms, unchanged four WebPs/exact canonical shield; portrait tablet source first, landscape tablet retained at 1366×1024 and desktop art at 1280×800; one reduced-motion-aware Postcard arrival.
- Supersedes: D4's direct Welcome → Login/signup choice, and D25's Welcome CTA pair, placeholder destinations and contain/letterbox treatment, for this preview revision only. Original D4 table text, D25, S1/S2 and the existing immutable receipt remain preserved. Production M1 authentication and future setup rules are unchanged.
- Boundaries: credentials stay DOM-only; allowlisted setup selections are transient and reset on refresh. No actual user/session, storage/cookie, invitation acceptance, legal consent/timestamp, account/balance/fixture mutation, push permission, email subscription, service worker, installation success or completion timestamp. Year/gender are optional; approximate AD-year age has no age bands, guardian consent or eligibility policy. Invite format/expiry, password policy and production data models stay unresolved.
- Planning provenance: [PR #5](https://github.com/kraveerachat/GisSino-Fn/pull/5) and roadmap tip `03065adbb023aafaac15a26bca99a123f6c2fe0e` remain unmerged/untouched; no wholesale roadmap copy or adoption of other proposals.
- Source: [Welcome task](../worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md), [S3](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md), same existing [Draft PR #6](https://github.com/kraveerachat/GisSino-Fn/pull/6). Affects [Auth](../pages/auth/Page-Auth.md), [UI specification](../design/UI_DESIGN_SPEC.md), [Screen Map](../design/SCREEN_MAP.md), [Data Contracts](../design/UI_DATA_CONTRACTS.md), [Project Guide](PROJECT_GUIDE.md) and [System Architecture](../architecture/SYSTEM_ARCHITECTURE.md).

- 2026-10-17 — Recorded D27 as the dated owner revision; original D4 snapshot preserved.

### D28 — Consumer copy and open signup presentation in Demo mode

- Date: 2026-10-17; status: DECIDED for the non-authenticating design preview; decided by owner in “Production-Style Copy and Open Sign-up UI Revision” and compact-header Demo mode clarification.
- Statement: all eleven pre-Home screens use concise TH/EN consumer copy and exactly one compact visible header Demo mode with an accessible explanation. Welcome keeps one Get Started; Entry offers normal Login/signup. Signup removes invitation field/copy and presents email/password/confirmation. Login/signup add Google actions with an “or” separator. Primary/Google navigate empty or typed Login → Home and signup → Profile; clear credential-node values before routing, create no authenticated identity/user/session/provider-success. Six separate setup steps and Postcard retain one primary action and one header Back. Four WebPs, exact logo, visual world and responsive compositions remain unchanged.
- Supersedes: only D27's preview credential validation, separate Login demo action, signup skip/invitation presentation, repetitive technical copy and duplicate previous/Welcome exits. Preserve D4/D25/D26/D27, closed S1–S3, the immutable receipt and invite design/data history.
- Production conflict: public signup and Google authentication are owner-requested proposals, PENDING separate owner confirmation and security architecture approval before M1. Canonical invite-only signup, production validation/password policy, invite model and existing M1 requirements remain in force. No public backend signup or actual OAuth is authorized or implemented by this preview decision.
- Boundaries: credentials DOM-only and explicitly cleared; transient allowlisted setup state resets on refresh. No OAuth redirect/token, auth success/session/storage/cookie, legally recorded consent/timestamps, financial records/balances/fixture mutation, permissions or installation-success state. Existing dashboard synthetic disclosures remain.
- Source: [Welcome task](../worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md), [S4](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md), existing [Draft PR #6](https://github.com/kraveerachat/GisSino-Fn/pull/6). Affects [Auth](../pages/auth/Page-Auth.md), [UI spec](../design/UI_DESIGN_SPEC.md), [Screen Map](../design/SCREEN_MAP.md), [Data Contracts](../design/UI_DATA_CONTRACTS.md), [Guide](PROJECT_GUIDE.md), [Architecture](../architecture/SYSTEM_ARCHITECTURE.md) and [Open Questions](OPEN_QUESTIONS.md). Planning PR #5 remains untouched at `03065adbb023aafaac15a26bca99a123f6c2fe0e`.

- 2026-10-17 — Added D28 as a preview-scoped revision with explicit pending production-policy approval; prior decisions preserved.

### D29 — Home v2 S1 daily overview scope

- Date: 2026-10-18; status: DECIDED for the synthetic S1 UI foundation; decided by owner in the GS-UI-HOME-V2-S1 brief and first-two-plus-expand clarification.
- Statement: preserve greeting/hero/quick actions, add conditional Today priorities, revise Safe to Spend/nearest unpaid obligation, move streak before unchanged Account Board, and replace Home monthly chart with one-line existing Activity navigation. Today shows the first two categories with native expansion; empty means zero strip DOM. Use a fixed controllable Bangkok synthetic snapshot, explicit sample disclosures and Home-only scenario projections.
- Financial boundary: integer minor units per THB/USD, no FX; liquid assets minus unpaid current-month obligations, true negative shortfall. Earliest unpaid obligation may be overdue/across months. No new ledger, obligation or habit engine. Synthetic streak/freezes/rank do not read other users' finances; primary-party selection remains OPEN.
- Supersedes: only the prior Home composition/monthly chart presentation for this slice. Retain the source planning roadmap and prior decisions; Activity Summary, compact Global Leaderboard, spending boards, Friends and Party/Family creation remain later slices. Existing Account Board components/styles/providers/gestures/Settings mode are preserved.
- Source: [Home S1 task](../worklog/10-Tasks/TASK-GS-UI-HOME-V2-S1.md), [session](../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S1.md). Affects [Home](../pages/home/Page-Home.md), [Settings](../pages/settings/Page-Settings.md), [UI spec](../design/UI_DESIGN_SPEC.md), [Data Contracts](../design/UI_DATA_CONTRACTS.md) and [Screen Map](../design/SCREEN_MAP.md).

- 2026-10-18 — Added D29 as an S1-scoped implementation decision; historical planning and existing primary-party question remain unchanged.

### D30 — Compact Home and gamified habit preview

- Date: 2026-10-18; status: DECIDED for the owner-requested synthetic UI revision. The weekly activity percentage remains PROPOSED as a Home presentation metric; production XP/freeze tunables are not approved by this UI sample.
- Statement: preserve header/hero/actions/navigation, then unchanged My Accounts first, compact Today without due bills, compact Safe to Spend, two-zone Streak/weekly XP/ring/calendar, Recent Transactions last. Remove Home Monthly Summary and standalone nearest tile; retain financial fixtures and calculations. Put small deduplicated synthetic due/overdue notices behind the existing bell sheet.
- Weekly metric: qualifying active dates in the current Bangkok Monday-Sunday week /7 ×100 rounded, with n/7 shown (4/7=57%). Completed/missed/pending/future/frozen use explicit dated sample data and non-color cues. Freeze is not an active day. This does not replace canonical habit statistics.
- Shared interaction: Home and existing Add No spending today use the same existing sheet; explicit confirmation may complete today's transient preview and illustrate configurable synthetic XP once per Bangkok date during the page lifetime. No persistence, transactions/accounts/user_stats/Party-stat mutation or automatic daily popup. App-open/login never qualifies or awards XP under current rules.
- Supersedes: D29 Home hierarchy, due-tile, one-line monthly and streak-strip presentation only. Preserve D29, CLOSED S1 session, immutable receipt and planning history. Account Board renderer/styles/controller/assets/selection/gestures/Settings modes remain protected.
- OPEN: final monthly destination (Activity vs Wallet) and separate automatic login/app-open XP proposal conflicting with current qualifying-action rules. No new Wallet dashboard, Activity Summary, reward engine or notification service is approved. Automatic first-day welcome/shown state and authoritative grants remain future M7.
- Source: [Home task](../worklog/10-Tasks/TASK-GS-UI-HOME-V2-S1.md), [S2](../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md), same [Draft PR #7](https://github.com/kraveerachat/GisSino-Fn/pull/7). Affects [Home](../pages/home/Page-Home.md), [architecture](../architecture/SYSTEM_ARCHITECTURE.md), [UI spec](../design/UI_DESIGN_SPEC.md), [data contracts](../design/UI_DATA_CONTRACTS.md), [Activity](../pages/activity/Page-Activity.md), [Party](../pages/party/Page-Party.md) and [open questions](OPEN_QUESTIONS.md).

- 2026-10-18 — D30 records the owner revision; D29 remains the historical S1 delivery decision.

### D31 — Seven-day Home due list and missing activity days

- Date:2026-10-18; DECIDED for owner-requested focused preview refinement. Owner confirmed relative status plus short date.
- Preserve header/hero/actions/nav/complete Account Board. Below hero Accounts → conditional Due soon → existing gamified Streak/XP → Recent last. Remove Safe Home rendering only, retain arithmetic/formatter/fixtures/scenarios/tests; future Wallet placement OPEN, no loss of product scope.
- Due soon: selected Bangkok date, valid unpaid overdue/today/+7 inclusive; exclude paid/invalid/+8/duplicates. Date then stable ID, same-ID or name/date/currency/amount dedupe; max4 compact category/status/date rows, no inner scroll, hidden empty. Red/orange/blue urgency plus text/icons; known Bill IDs reuse existing details, View all existing Bills unfiltered.
- Seven-day Home visibility does not change bell <=3-day preview or production T-3/due/overdue schedules/preferences/dispatch.
- Replace visible freeze allowance only with strictly past current-week missing activity, including frozen but excluding pending today/future. Existing timeline/first-missing focus/atomic selected status; frozen retains blue snowflake/no-activity meaning. Zero missing gets positive copy.
- Preserve freeze data/model, streak, weekly XP, 4/7 metric/ring, gestures/keyboard, shared check-in/idempotent illustrative rewards and reduced motion. No app-open/login XP, new calendar/modal or production persistence.
- Supersedes only D30 Today/Safe Home presentation and visible freeze allowance. D29/D30, S1/S2 sessions and immutable receipt remain unchanged. Existing monthly/nearest removal and production boundaries remain.
- Source: [Home task](../worklog/10-Tasks/TASK-GS-UI-HOME-V2-S1.md), [S3](../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S3.md), same [Draft PR7](https://github.com/kraveerachat/GisSino-Fn/pull/7). Affects [Home](../pages/home/Page-Home.md), [architecture](../architecture/SYSTEM_ARCHITECTURE.md#81-home-dashboard), [UI spec](../design/UI_DESIGN_SPEC.md), [data contracts](../design/UI_DATA_CONTRACTS.md), [Screen Map](../design/SCREEN_MAP.md).


### D32 — Wallet composition and notched account cards

- Date: 2026-10-18; status: DECIDED for Wallet mock UI; decided by owner through the Wallet reference request and asset/debit clarification.
- Statement: adapt the reference ring/notched-card language to Wallet. Center shows total bank/ewallet/cash assets, with liabilities separately labelled. Ring segments use assets + obligations as an explicitly labelled composition denominator, never net wealth. Bank/E-wallet/Cash lead, then credit/debit/obligations. Debit money belongs only to its linked bank account; no debit fixture or duplicate cash is introduced.
- Data: derive from current synthetic records, deduplicate the credit bill, separate THB/USD without FX, preserve unknown amounts/exact integer cents and overflow handling. Movement mix uses matching income/expense only, excluding own transfers; unavailable mix has no invented ratio. Hidden mode removes amounts, percentages and proportional ring/movement geometry.
- Preserve: existing provider logos/profile detail, credit/bill/transfer/Add actions, locale/theme/sidebar/navigation. No financial persistence, bank integration, production accounting or debit entity is implemented.
- Supersedes: prior Wallet overview presentation only. Does not adopt unmerged Home PR #7, consume reserved D29–D31 or settle Home Q10.
- Source: [Wallet task](../worklog/10-Tasks/TASK-GS-UI-WALLET-V2-001.md), [S1](../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S1.md). Affects [Wallet](../pages/wallet/Page-Wallet.md), [UI spec](../design/UI_DESIGN_SPEC.md), [Data contracts](../design/UI_DATA_CONTRACTS.md), [Architecture](../architecture/SYSTEM_ARCHITECTURE.md).

- 2026-10-18 — Added D32 for the scoped Wallet prototype; final verification and new Draft Wallet PR pending.

- 2026-10-18 — D32 Wallet implementation is runtime verified/finish SHIP; source `eac4d7193fd6d2a261d8e7286c63c819806f2f60` is pushed in new [Draft PR #8](https://github.com/kraveerachat/GisSino-Fn/pull/8), OPEN/DRAFT. Final docs checkpoint/receipt and owner review remain separate.

### D32 S2 — Assets-only Wallet and monthly snapshots

- Date: 2026-10-18; status: DECIDED for Wallet mock UI; decided by owner through the latest Wallet refinement brief and confirmed bold rounded separated-ring direction.
- Statement: Wallet primary content is Bank → E-wallet → Cash. Assets alone determine ring shares/center; use royal blue, cyan and amber consistently. Compact centered layout, rounded separated proportional segments and notched cards remain in the existing visual world. Current may retain one small muted Bills reference; History must not show current liabilities as historical obligations.
- Periods: Current is default. History selects year and a scrollable month list; unavailable months disabled. Explicit frozen synthetic snapshots represent first-of-month 00:00 Asia/Bangkok balances for July–October 2026 and November–December 2025. No Week mode, production snapshot persistence or reconstructed balance history.
- Activity: each account independently toggles selected-month income/expense percentages and amounts, excluding own transfers. Missing/invalid data remains unavailable. Account detail entered from History explicitly remains current; preserve shared identities/providers/actions, integer/unknown/currency safeguards and privacy suppression of amounts, percentages and proportional geometry.
- Supersedes: D32 S1 assets-plus-obligations denominator, primary credit/debit/obligation sections and unbounded movement-period presentation only. Original D32, closed S1 and immutable receipt remain historical. Home Q10, unrelated Home work and production finance architecture remain separate.
- Source: [Wallet task](../worklog/10-Tasks/TASK-GS-UI-WALLET-V2-001.md), [S2](../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S2.md), same existing [Draft PR #8](https://github.com/kraveerachat/GisSino-Fn/pull/8). Affects [Wallet](../pages/wallet/Page-Wallet.md), [UI spec](../design/UI_DESIGN_SPEC.md), [Data contracts](../design/UI_DATA_CONTRACTS.md), [Architecture](../architecture/SYSTEM_ARCHITECTURE.md).

- 2026-10-18 — Reopened Wallet task for D32 S2 owner revision; source inspection recorded, verification/review/delivery pending.


### D33 — Embedded Activity monthly analytics

- Date:2026-10-18; status:DECIDED for owner-authorized synthetic Activity v2 S1 UI.
- Statement: embed monthly income/expense donut with labelled net, maximum four leading expense categories and View all in existing `#activity`. Full fourteen-category breakdown reuses native dialog; preserve search/type chips/day groups/detail/navigation. No separate Summary route/tab.
- Data: Activity-only dated synthetic records reconcile THB 42,000 income/15,240 expense/26,760 net; transfer 5,000 stays list-only. Integer minor units/BigInt, THB/USD isolation, honest unknown/zero/unavailable and hidden amount/share/geometry suppression apply. Donut denominator income+expense; category denominator eligible expense. Search/type filters change list only. Only coherent October 2026 available; no fake history or shared Home/Wallet fixture mutation.
- Supersedes: proposed Activity Summary-tab placement in roadmap/Home-Leaderboard specification and D30's OPEN Activity-versus-Wallet monthly destination, for this UI slice only. Preserve original planning, D29-D32, closed sessions/receipts. Future tab separation deferred; Home Q10/Safe placement and production accounting remain separate.
- OPEN: M2/M3 authorized owned ledger/category integration and refund/reversal/adjustment/linked-record/settlement policies. Catalog labels never automatically classify savings/investment transfers/card payments as expenses.
- Source: [Activity task](../worklog/10-Tasks/TASK-GS-UI-ACTIVITY-V2-S1.md), [S1](../worklog/20-Sessions/TASK-GS-UI-ACTIVITY-V2-S1-S1.md); runtime verified/final A SHIP;source ae9c611c68c081ef6686353b33539cbc7980d453 pushed in [Draft PR9](https://github.com/kraveerachat/GisSino-Fn/pull/9),OPEN/DRAFT MERGEABLE/CLEAN;owner review pending. Affects [Activity](../pages/activity/Page-Activity.md), [UI spec](../design/UI_DESIGN_SPEC.md), [Data contracts](../design/UI_DATA_CONTRACTS.md), [Screen Map](../design/SCREEN_MAP.md), [Architecture](../architecture/SYSTEM_ARCHITECTURE.md).

### D35 — Bills v2 preview composition and manual obligation flow

- Date: 2026-10-26; status: DECIDED for mock UI only under the owner's Bills v2 brief.
- Selected-month known unpaid cycles form a by-currency commitment summary; prior arrears remain separate. Explicit schedule cycles drive list, calendar and details. Products describe one plan and never add another payable obligation. Statement-covered cycles are excluded from duplicate commitment counting.
- Bills-specific Add offers Installment, Credit Card Statement, Monthly Bill and Subscription forms, then unsaved Review/Edit/Discard. Mark paid requires a separate confirmation and changes page memory only. Existing global Add behavior remains.
- Detail separates marketplace, financing provider and funding account. Unknown variable actual amounts remain unknown; estimates are labelled. A draft due day after a short month's end clamps to its last day pending production owner approval.
- This decision does not approve actual payment, durable mutation, liability settlement, automatic posting, reminders, FX or owner-scoped APIs. Those remain M2/M5/M6 and [open finance questions](OPEN_QUESTIONS.md).
- Source: [Bills task](../worklog/10-Tasks/TASK-GS-UI-BILLS-V2-S1.md), [page](../pages/bills/Page-Bills.md), [review](../design/reviews/BILLS_V2_REVIEW.md). Activity D33 is already merged; this decision is scoped to Bills only.

### D34 — Party Friends and Global preview

- Date: 2026-10-26; status: [DECIDED] for the local mock UI only. Activity PR #9 is merged as D33 and Bills PR #10 as D35; Party uses D34.
- Preserve the approved Party personal XP/streak/freezes card, badges and aggregate feed. Replace the single ranking with compact Friends Weekly Ranking then Global Ranking; remove only the standalone privacy explanation card. Friends shows accepted eligible friends and eligible viewer; Global shows opted-in eligible sample participants including friends. Both use synthetic current Bangkok Monday–Sunday weekly XP, never lifetime XP or financial data.
- The Friends card opens the existing dialog for exact username/six-digit-code lookup, local request states and at most three explicitly synthetic suggestions. Preview relationships are not Party membership, global opt-in or production discoverability. Session memory resets on reload; no network, persistence or real-user directory.
- Preserve three visibility tiers and independent ranking opt-in. Private, opted-out, blocked, missing-metric and wrong-week people are unranked. Full visibility never authorizes itemized transactions in this UI slice.
- Production Global audience, discoverability/recommendations, M7 aggregates and M8 friendship authorization remain [OPEN]. This decision does not approve public ranking endpoints or amend canonical Project Guide policy.
- Source: [Party task](../worklog/10-Tasks/TASK-GS-UI-PARTY-V2-S1.md), [Page Party](../pages/party/Page-Party.md), [Open Questions](OPEN_QUESTIONS.md).
