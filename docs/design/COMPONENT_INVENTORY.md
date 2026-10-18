---
id: DESIGN-COMPONENT-INVENTORY
type: design
level: 2
status: CURRENT
updated: 2026-10-18
up: Design-Hub.md
related:
  - SCREEN_MAP.md
  - UI_DESIGN_SPEC.md
---
# Component inventory

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
