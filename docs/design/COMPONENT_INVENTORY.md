---
id: DESIGN-COMPONENT-INVENTORY
type: design
level: 2
status: CURRENT
updated: 2026-10-16
up: Design-Hub.md
related:
  - SCREEN_MAP.md
  - UI_DESIGN_SPEC.md
---
# Component inventory

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

## Change log

- 2026-10-16 — Added vault metadata and linked this note from the [Design Hub](Design-Hub.md) for [TASK-VAULT-STRUCTURE-001](../worklog/10-Tasks/TASK-VAULT-STRUCTURE-001.md).
