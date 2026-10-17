---
id: DESIGN-COMPONENT-INVENTORY
type: design
level: 2
status: CURRENT
updated: 2026-10-17
up: Design-Hub.md
related:
  - SCREEN_MAP.md
  - UI_DESIGN_SPEC.md
---
# Component inventory

## Current state — pre-Home preview S3

[welcome.js](../../src/welcome.js) renders eleven public destinations through the existing router; [preview-flow.js](../../src/preview-flow.js) owns allowlisted transient values, UI validation and six-step navigation. [Auth contract](../pages/auth/Page-Auth.md) and [Welcome S3](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md) own this extension.

| Component | Contract |
|---|---|
| Artwork picture | Four unchanged local WebPs; orientation/short-side source precedence; one selected image, cover within intentional region, decorative and pointer-inert |
| Hero / compact identity | One exact S2 canonical shield per screen; live wordmark; bolder Welcome group, compact 42px form shield |
| Public toolbar | Native Back link and existing shared TH/EN select; main route focus, no dashboard chrome |
| Entry actions / CTA | Welcome has one Get Started anchor; Entry has separate Login/signup; cobalt primary, porcelain secondary, explicit demo Home action only on Login and Postcard |
| Form / validation | Labelled native fields, password visibility buttons, inline described errors, alert summary, first-invalid focus; no auth success |
| Progress / wizard actions | Six labelled bars, current-step aria state, Previous/Continue and direct Welcome exit on every setup step |
| Profile / About | Display name/nickname, four preset SVG avatar choices; separate optional AD year with approximate age and optional gender; no uploads or age groups |
| Privacy / notification choices | Plain privacy principles and demonstration checkbox; local notification checkboxes with capability boundary |
| First Accounts | Existing providerOptions/resolveProvider/providerBadge and bundled logos; Bank/E-Wallet/Cash with THB/USD selection only; no balance or account save |
| Installation guide | Local iOS/Android/desktop selection and concise instructions; guide only, no installation success or capability detection claim |
| Postcard | Optional escaped nickname, explicit Home preview action, one reduced-motion-aware arrival; no saved setup claim |
| Disclosure | Catalog copy on each public route, 13px/1.65; hero uses solid porcelain, forms use divided footer |

The former destination-placeholder component and Welcome CTA pair are S1/S2 history, superseded by D27.

## Dashboard current state — S3

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
