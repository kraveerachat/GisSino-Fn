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

## Current state — A01 Welcome extension

[welcome.js](../../src/welcome.js) renders one shared public composition for `#welcome`, `#login` and `#signup`; [app.js](../../src/app.js) selects it independently of the dashboard shell. [Welcome page contract](../pages/auth/Page-Auth.md) and [Welcome task](../worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md) own this extension.

| Component | Contract |
|---|---|
| Art-directed decorative picture | Four local WebP candidates; one selected request; contained whole geometry; empty alt/aria-hidden; pointer-inert |
| Welcome identity | Existing canonical logo helper once, live h1, translated tagline and supporting text; no surrounding card |
| Welcome CTA pair | Native route anchors, cobalt primary/porcelain secondary, 56px ordinary/52px compact portrait, visible hover/focus/pressed/disabled styles |
| Public locale selector | Existing locale callback/state and native select; no second locale store |
| Public prototype disclosure | 14px readable solid porcelain surface directly below actions, states authentication/account persistence unavailable |
| Destination placeholder | Route title, honest authentication-not-implemented description, Back to Welcome anchor; no credential fields |

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
