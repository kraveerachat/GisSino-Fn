---
id: DESIGN-COMPONENT-INVENTORY
type: design
level: 2
status: CURRENT
updated: 2026-10-26
up: Design-Hub.md
related:
  - SCREEN_MAP.md
  - UI_DESIGN_SPEC.md
---
# Component inventory


## Activity v2 S1 components (2026-10-18)

Source observed: `src/activity-data.js` owns dated synthetic records/category registry and `activityModel`/date/eligibility/deduplication/share/filter helpers. `src/activity.js` exports `activityContext`, `activityScreen`, `activityResults`, `activityCategoryDialog`, `activityTransactionDetail`; `src/styles/activity.css` scopes visuals. Existing screens/app/i18n/index integrate. Final verification/manifest in [S1](../worklog/20-Sessions/TASK-GS-UI-ACTIVITY-V2-S1-S1.md) remains pending.

Reuse existing transaction-row visual structure and detail sheet infrastructure, `walletMoney` exact formatter, `walletRingSegments` rounded SVG geometry, translator/icons, `showSheet` native dialog/title/focus restoration, header/sidebar/floating navigation/global Add. Activity-specific dated detail content preserves original Home/Wallet detail behavior. New conceptual units: monthly summary/donut, compact category rows/full-catalog dialog content. No framework/chart dependency/modal system/route/tab. Full-month analytics independent of list search/type filters; privacy suppresses sensitive text/geometry. [Activity](../pages/activity/Page-Activity.md), [Data contracts](UI_DATA_CONTRACTS.md).


RUNTIME VERIFIED for the tested scope: parent check passes 637 matching locale keys and 102/102 tests (18 focused Activity tests). Inspected final browser evidence passes 32 normal-layout cases, 12 named functional checks, six edge scenarios and 200% text enlargement at 390px with no overflow/clipping/invalid geometry. Computed text contrast minimum is 5.175:1 light/4.775:1 dark, with zero CSP errors. Final independent A is SHIP for owner review after four final captures; no rescore. Owner review/merge remains pending. See [Activity review](reviews/ACTIVITY_ANALYTICS_REVIEW.md).


Source `ae9c611c68c081ef6686353b33539cbc7980d453` is committed/pushed on `task/gs-ui-activity-v2-s1` in new [Draft PR #9](https://github.com/kraveerachat/GisSino-Fn/pull/9), verified OPEN/DRAFT, MERGEABLE/CLEAN against main. Implementation delivery is CLOSED after final SHIP; owner visual review/merge remains pending. Documentation closeout/receipt is prepared on the same branch; parent final docs commit/push/head equality follows. No future documentation SHA is claimed.

Latest pushed source head is `b92cf237a54ed364fda4fdb48b81b98e6c2188bf`:salary search retains visible Income category compatibility;637-key/102-test rerun passes. The receipt preserves earlier feature checkpoint ae9c611c68c081ef6686353b33539cbc7980d453;no screenshot change.

## Current Bills v2 components — 2026-10-26

The [Bills screen](../../src/bills-ui.js) adds a selected-month summary, overdue annotation, compact cycle row, type filter, shared-cycle calendar with multi-item day sheet, installment detail (progress, products, schedule, distinct merchant/financing/funding metadata), and four type-specific manual draft forms. A review sheet supports Edit/Discard; a separate two-step paid-preview sheet changes page memory only. [bills-overview.js](../../src/bills-overview.js) supplies pure totals/status/schedule validation; [bills.css](../../src/styles/bills.css) scopes light/dark responsive styling. Existing shell, modal focus/Escape, sidebar, floating navigation, icons, amount formatter and global Add are reused. No new framework, payment API or durable form component is added. See [task](../worklog/10-Tasks/TASK-GS-UI-BILLS-V2-S1.md).

## Party preview components — GS-UI-PARTY-V2-S1

`partyGrid` in [party-ui.js](../../src/party-ui.js) preserves the status card/badges/feed and composes compact Friends and Global boards plus a Friends summary. `partyFriendsSheet`, `partyRankingSheet` and `partyVisibilitySheet` reuse the existing native dialog controller, icon set, locale catalog, focus restoration and navigation. [party-preview.js](../../src/party-preview.js) owns a separate synthetic aggregate/relationship view model. [party.css](../../src/styles/party.css) scopes responsive board and sheet refinements to Party; it does not change the shared shell.

## Current Home v2 components — Focused revision S3

[home-overview.js](../../src/home-overview.js) retains Bangkok clock/read-only financial projection, exact minor-unit formatter, snapshot and preview controls; Home calls upcomingDueList instead of Today/Safe rendering; financial calculation helpers remain. Bell notices remain unchanged. Retained nearest/monthly data and reusable monthly renderer have no Home presentation. New focused [habit-preview.js](../../src/habit-preview.js) prevents mixing calendar/preview state into financial projection or duplicating production stats. [S3](../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S3.md) owns current verification.

| Component | Current contract |
|---|---|
| Account Board | First below hero; existing complete folders, modules/styles/gestures/providers/selection/details/Add/Settings modes unchanged |
| Seven-day Due soon | Valid unpaid overdue/today/+7 inclusive; stable date/ID/dedupe; max4 category/status/short-date rows; existing Bill details/View all; no inner scroll; hidden empty |
| Safe to Spend projection | Currency-isolated integer-minor/negative/scenario/formatter tests retained; Home renderer absent; future Wallet placement deferred |
| Bell notices | Existing sheet; deduped due ≤3 days/overdue fixtures, status/date/Bills link or empty; no notification delivery |
| Habit summary | Explicit synthetic current streak, weekly XP and unchanged n/7 ring; missing past-week count replaces visible freeze allowance |
| Habit timeline | 21 explicit dates; complete/missed/pending/future/frozen icon/text states; roving arrows/Home/End and internal pointer/touch scroll; first-missing focus, frozen/no-activity distinction and atomic selected status |
| Shared check-in sheet | Home and Add share No spending today confirmation; page-lifetime per-date idempotent synthetic completion/XP result; no real stats/financial mutation |
| Recent rows | Preserved three rows and Activity/detail behavior; last main section |
| Settings Home controls | Home-only scenario/Bangkok datetime; transient projections; existing Account Board mode controls unchanged |

No duplicate modal system, automatic daily popup, durable history, production XP formula, new Wallet dashboard or Activity Summary route is added.


## Current state — Wallet S2 components (2026-10-18)

[walletScreen](../../src/wallet.js) reuses the overview model, provider/display adapters and existing navigation. [wallet-history.js](../../src/wallet-history.js) owns frozen synthetic snapshot records, period selection/labels and rounded proportional SVG sectors. Three Bank/E-wallet/Cash summary links and sections replace the four-category S1 composition. Overview/History pressed-state buttons, native year select and scrollable month buttons use the current app event controller; unavailable months are disabled. A small Bills link exists only in Current mode.

Each notched account article contains a standalone monthly activity toggle and sibling account-detail link. Per-account percentage/value state is independent; own transfers are excluded. Hidden mode removes values/percentages/proportional geometry. History links explicitly announce current account detail. Add Account, Transfer, shared profile identities and locale/theme/sidebar remain existing components. No chart/state library is added. [D32 S2](../project/DECISIONS.md#d32-s2--assets-only-wallet-and-monthly-snapshots) supersedes S1 presentation; [S2](../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S2.md) records runtime verification of56 layouts/14 edges/15 named functional groups,521 keys and66 tests. Final independent A is SHIP; corrected 200% text enlargement and AX/contrast checks pass. Source `184b2f7053940f7e2129d41c8f61342c76a7b875` is pushed in existing Draft PR #8; documentation closeout follows the verified source. Current integration status: [PR #8](https://github.com/kraveerachat/GisSino-Fn/pull/8) is MERGED at `90a81e8d7a44fc5472e254be7c2197c0e5fc411f`, verified in the Activity start audit; prior review/push/checkpoint statements describe historical S2 delivery.

## Superseded Wallet S1 presentation (2026-10-18)

[walletScreen](../../src/wallet.js) consumes the pure [walletOverview](../../src/wallet-overview.js) model and uses [Wallet CSS](../../src/styles/wallet.css), shared provider/display adapters, catalog, icons and existing actions. The ring is decorative SVG with an explicit text legend; it shows assets centrally and obligations separately. The legend defines the assets + obligations denominator and uses four category symbols/colors. Notched cards preserve provider identity/native account or credit links and bill buttons. One shared movement-basis note states that matching income/expense data excludes own transfers. Liability cards omit movement captions. Movement label/bar appears only with matching valid income/expense data; hidden mode omits percentages/arcs/bar widths. Bank/E-wallet/Cash precede credit/debit/obligations; debit refers only to linked bank money. Add Account and Transfer remain existing controls, with profile editing in canonical detail. No charting/component/state dependency is added. See [Wallet](../pages/wallet/Page-Wallet.md), [data contract](UI_DATA_CONTRACTS.md) and [S1](../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S1.md); runtime verified; final finish SHIP; final documentation delivery pending.

Source `eac4d7193fd6d2a261d8e7286c63c819806f2f60` is pushed in [Draft PR #8](https://github.com/kraveerachat/GisSino-Fn/pull/8); final finish SHIP, owner review/merge and final documentation checkpoint remain pending.

## Current state — pre-Home preview S4

[welcome.js](../../src/welcome.js) renders eleven public screens; [preview-flow.js](../../src/preview-flow.js) owns transient state and six-step navigation. [Auth](../pages/auth/Page-Auth.md), [D28](../project/DECISIONS.md#d28--consumer-copy-and-open-signup-presentation-in-demo-mode) and [Welcome S4](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md) own this scoped revision.

| Component | Contract |
|---|---|
| Artwork / identity | Four unchanged local WebPs, established cover/source precedence, exact canonical S2 shield, live wordmark and approved compositions |
| Public toolbar | Single Back on non-Welcome routes, one compact Demo mode indicator with accessible environment explanation, shared TH/EN select |
| Welcome / Entry | One Get Started action; Entry offers Login and normal signup without invitation wording |
| Credential form | Labelled native email/password and signup confirmation, show/hide; disabled Login recovery; no invitation or Passkey control in this preview |
| Credential actions | Cobalt Login/signup submit, text separator, porcelain Google button and cross-form link; both actions navigate without required inputs and clear credential-node values |
| Progress / wizard | Six labelled bars with current-step aria state; one primary Continue per step and single header Back |
| Profile / About | Separate name/nickname/preset avatar and optional AD year/approximate age/gender; no uploads or age groups |
| Privacy / notifications | Plain consumer language and local choices without consent records, permissions or subscriptions |
| First Accounts | Existing provider registry/badges/logos, Bank/E-Wallet/Cash and THB/USD; no balance or account save |
| Installation / Postcard | Platform guidance only; optional escaped nickname, one Home action, existing reduced-motion-aware arrival |

S3's repeated technical footer, separate Login demo action, signup skip and duplicate step-back/Welcome exits are superseded by D28. No actual auth, Google OAuth, success state or persistence is introduced.

## Preserved Account Board contract — S3

Home defaults to a vertical deck of complete account folders. Horizontal is the only alternate mode and is selected only in Settings; mode changes preserve the selected account ID. Every account uses the same full folder component in both modes. S1/S2 tab strips, Stack/Grid choices and wrapping selection are historical and SUPERSEDED by the owner’s S3 attachment. The shared 13 provider assets, session profile form, Wallet detail routes and financial preview boundary remain intact. `accountFolder` is the single complete folder renderer; `mountAccountDeck` owns component-local geometry, pointer/wheel/keyboard lifecycle, measurement and rAF settling without rendering during pointermove. Settings owns the native mode select. Exposed inactive cards have a CSS whole-card selection overlay; inactive inner content is inert/hidden from assistive technology, and the active grip exposes slider values with screen-reader help. See [Account Board S3](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md).

Latest mobile navigation replaces the earlier five-slot component: `floatingNavigation` renders Home/Wallet/Activity/More in one capsule plus a separate Add button; `navigationOverlay` coordinates the native More popover and existing Add dialog. Configurable `moreDestinations` owns Bills/Party. `walletScreen` reuses fixtures/detail actions and explicit asset/liability semantics. Desktop rail styling remains unchanged, adding Wallet access.

Blue enamel additions: shared cover header/lip, cobalt hero/wave, quick-action plates, cohesive account/transaction lists, monthly bars, detached navigation capsule, source selector, oval amount editor, accessible numeric keypad, unsaved review, original sample-card visual, six tracking-action tiles, liability rows, and preview reminder. Implementation: `src/blue-screens.js`, `src/styles/blue.css`, and `src/amount.js`.

| Component | Contract |
|---|---|
| Application shell | Sticky sample banner, header, semantic main, adaptive navigation, avatar/settings |
| Navigation | Four anchors and central modal button; current-page state; no sixth Settings destination |
| Enamel balance panel | Visible/hidden amounts, summary hierarchy, accessible visibility action |
| Tactile key | Icon plus catalog label; pressed and focus states; minimum 44px target |
| Account card | Synthetic name/suffix/amount; preview detail action |
| Transaction row | Name, category, time, amount, own-transfer distinction, optional needs-details state |
| Bill row/calendar | Due date, type, status, amount, detail action; narrow agenda adaptation |
| Habit week/milestone | Textual accessible progress; decorative SVG hidden from assistive technology |
| Leaderboard/member | Habit metrics only; owner visibility controls affect shared representation |
| State panel | Empty/loading/error/unavailable; truthful recovery or preview action |
| Search/filter/month | Native input/select/buttons; concise polite search-result count; fixed coherent sample month |
| Bottom sheet | Native dialog, labelled heading, visible close/back, Escape, independent scrolling, focus return |
| Preview entry form | Native inputs, required/date/precision/account checks, linked field-specific error summary, escaped unsaved result |
| Toggle | Native checkbox/switch with catalog label, focus ring, visible preview consequence |

Rendering lives in `src/screens.js`; session interaction in `src/app.js`; SVG geometry in `src/icons.js`; catalog and formatting utilities in `src/i18n.js`. No component library, global state dependency, or charting package was introduced.

## S1 Account Board components — SUPERSEDED deck controls

Shared provider registry and neutral fallback badge, folder face, bounded selection tabs, direct account list, Stack/Grid pressed-state control, previous/next pager, swipe/keyboard region, explicit state panel and read-only account preview are implemented in `src/account-board.js`, `src/account-display.js`, `src/providers.js` and `src/styles/accounts.css`. Wallet reuses the identity adapter. See [Provider Catalog](PROVIDER_CATALOG.md) and [review](reviews/ACCOUNT_BOARD_REVIEW.md).

## Change log

- 2026-10-16 — Added vault metadata and linked this note from the [Design Hub](Design-Hub.md) for [TASK-VAULT-STRUCTURE-001](../worklog/10-Tasks/TASK-VAULT-STRUCTURE-001.md).

- 2026-10-16 — Account Board prototype update for [TASK-GS-UI-ACCOUNT-BOARD-001](../worklog/10-Tasks/TASK-GS-UI-ACCOUNT-BOARD-001.md).

## S2 selection and profile components — historical, selection controls SUPERSEDED

Replaced textual pager/helper/demo-state controls with44px visual indicator buttons and screen-reader-only selected-name status. Narrow header has accessible mode icons. Shared providerBadge supports contained local PNGs and captured load-error fallback. account-profile.js renders native labeled type/provider/name controls and optional appearance/reference details inside the existing dialog.

-2026-10-16 — [Account Board S2](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S2.md).


- 2026-10-16 — [Account Board S3](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md) supersedes the S1/S2 tab-strip and Stack/Grid presentation with complete overlapping folders.


- 2026-10-17 — Documented A01 public preview extension for [Welcome task](../worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md); retained dashboard S3 history.

- 2026-10-17 — Reconciled owner-requested pre-Home S3 preview for [Welcome S3](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md); S1/S2 history remains preserved.

- 2026-10-17 — [Welcome S4](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md) / D28 replaces only pre-Home copy, open-signup/Google presentation and demonstration navigation; production security and prior session history remain preserved.

- 2026-10-18 — Reconciled source-level Home v2 S1 behavior and preserved Account Board for [Home S1](../worklog/10-Tasks/TASK-GS-UI-HOME-V2-S1.md); verification/delivery gates remain in progress.

- 2026-10-18 — Reconciled owner-approved Compact Home/gamified transient preview for [Home S2](../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S2.md); D29 presentation superseded by D30, production engine boundaries retained.

- 2026-10-18 — Owner [Home S3](../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S3.md) reconciles seven-day Due soon, Home Safe removal with retained math and missing activity versus frozen days; other contracts preserved.


- 2026-10-18 — Added scoped Wallet v2 current state for [TASK-GS-UI-WALLET-V2-001](../worklog/10-Tasks/TASK-GS-UI-WALLET-V2-001.md); final verification/delivery pending.

- 2026-10-18 — [Wallet S2](../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S2.md) / D32 S2 supersedes S1 Wallet presentation with assets-only composition and monthly history; S2 verification/delivery pending.

- 2026-10-18 — Added scoped D33 Activity v2 S1 contract; verification pending; historical task evidence preserved.
