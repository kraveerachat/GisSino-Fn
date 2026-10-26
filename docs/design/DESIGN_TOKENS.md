---
id: DESIGN-TOKENS
type: design
level: 2
status: CURRENT
updated: 2026-10-26
up: Design-Hub.md
related:
  - UI_DESIGN_SPEC.md
  - COMPONENT_INVENTORY.md
---
# Design tokens


## Activity v2 S1 scoped visual roles (2026-10-18)

Reuse shared porcelain/enamel shell, raised/well surfaces, ink/muted/line/focus, Thai type/tabular amounts and reduced-motion rules. Income blue/expense coral are Activity roles; fourteen category colors/icons bind to stable IDs and readable labels. No global palette/token/provider-brand change. Source-observed Activity income/expense light roles are `#1765cf`/`#bc493e`, dark `#82b6ff`/`#ffad9e`; the neutral track uses shared well. Donut widths are 188px default, 176px on narrower/tablet/phone views and 150px below 360px. Bars are 4px; analytics padding is 24/20/16px; shared sheet caps at 600px and centers from 768px. These scoped values may change during review; final source dimensions/evidence recorded in [S1](../worklog/20-Sessions/TASK-GS-UI-ACTIVITY-V2-S1-S1.md); no contrast pass before measurement. Hidden state removes proportional arcs/widths. Existing Home/Wallet/Account Board/navigation geometry remains protected.


RUNTIME VERIFIED for the tested scope: parent check passes 637 matching locale keys and 102/102 tests (18 focused Activity tests). Inspected final browser evidence passes 32 normal-layout cases, 12 named functional checks, six edge scenarios and 200% text enlargement at 390px with no overflow/clipping/invalid geometry. Computed text contrast minimum is 5.175:1 light/4.775:1 dark, with zero CSP errors. Final independent A is SHIP for owner review after four final captures; no rescore. Owner review/merge remains pending. See [Activity review](reviews/ACTIVITY_ANALYTICS_REVIEW.md).


Source `ae9c611c68c081ef6686353b33539cbc7980d453` is committed/pushed on `task/gs-ui-activity-v2-s1` in new [Draft PR #9](https://github.com/kraveerachat/GisSino-Fn/pull/9), verified OPEN/DRAFT, MERGEABLE/CLEAN against main. Implementation delivery is CLOSED after final SHIP; owner visual review/merge remains pending. Documentation closeout/receipt is prepared on the same branch; parent final docs commit/push/head equality follows. No future documentation SHA is claimed.

Latest pushed source head is `b92cf237a54ed364fda4fdb48b81b98e6c2188bf`:salary search retains visible Income category compatibility;637-key/102-test rerun passes. The receipt preserves earlier feature checkpoint ae9c611c68c081ef6686353b33539cbc7980d453;no screenshot change.

## Current Bills v2 roles — 2026-10-26

[bills.css](../../src/styles/bills.css) scopes the Bills extension to `.bills-v2`: royal blue summary/primary action, porcelain and pale-blue wells, navy financial text, slate support copy, amber due-soon/today, restrained red overdue, green paid, and neutral unknown. Every status also has text. Amounts use tabular alignment; the monthly total is visually dominant while list rows stay compact. Existing global theme colors, Thai typography, focus ring, shared motion and reduced-motion media query are reused. No global palette or Account Board token change. [Review](reviews/BILLS_V2_REVIEW.md).

## Current Home v2 extension — Focused revision S3

[Compact Home](../pages/home/Page-Home.md) reuses porcelain raised/well surfaces, enamel accent/ink, text/muted/line, warning/danger and existing semantic success roles in [blue.css](../../src/styles/blue.css). No global palette, Account Board stylesheet or token module changes. Due soon replaces Today and Home Safe UI is absent; the habit card uses restrained green/orange for status with icons/text, a blue progress ring and neutral future dates. Current and selected states remain distinguishable beyond color. Money keeps tabular numerals, true negative text and masking.

The new card's counters/ring and internal date scroller form two primary zones. Date chips and stepping/check-in controls preserve usable focus/targets; timeline width is local, not page overflow. Desktop/tablet composition keeps the same DOM reading order; Account Board's preserved S3 geometry and navigation breakpoints below are unchanged. Existing reduced-motion preference removes spatial celebration; no automatic popup or looping celebratory motion. Current scoped geometry: lower gap20px (20px x24px at960px+); Due soon uses compact category/title/status/date rows with restrained danger/warning/enamel urgency, no invented provider colors; habit radius16px/padding16px, ring104px (88px below360px), 48px-wide/88px-minimum-height day chips with8px gaps, 44px stepping/check-in targets. Celebration is280ms and disabled under reduced motion. Existing ring/timeline geometry remains; missing focus uses existing controls and frozen stays blue/snowflake. Browser verification is tracked in [S3](../worklog/20-Sessions/TASK-GS-UI-HOME-V2-S1-S3.md). No third-reference fidelity claim is made without the missing image.


## Current state — Wallet S2 category roles (2026-10-18)

Scoped [wallet.css](../../src/styles/wallet.css) roles now map bank `#2464d8`, ewallet `#1594ac`, cash `#bd7d13`; dark equivalents are `#78a4ff`, `#62cfdf`, `#f3c15f`. Supporting Bills text uses shared muted neutral. Category wells use light `#e8effd`/`#e3f3f6`/`#faf1de` and dark `#273752`/`#293f43`/`#493d28`. These are UI category colors, not provider brand substitutions. Existing enamel shell, Thai fonts, surfaces, focus and contact shadows remain shared.

The assets-only ring uses 320×320 SVG with outer/inner radii 143/113, proportional gaps and rounded corners; no minimum-sized slice exaggerates composition. Current source caps ring width at 224px on phones and 312px from 700px, content at 1120px, three summary columns, then paired ring/details and account columns from 700px. Cards use 20px corners, 16px shoulder, 36px provider badges and 44px minimum activity/period controls. Month strip scrolls; native year select and visible focus remain. Reduced motion removes transitions; hidden mode removes sensitive geometry. Values are source-observed; S2 browser verification passes56 layouts/14 edges with no overflow/clipping, and12 after/3 before captures exist. Final independent A is SHIP; corrected 200% text enlargement and AX/contrast checks pass. Source `184b2f7053940f7e2129d41c8f61342c76a7b875` is pushed in existing Draft PR #8; documentation closeout follows the verified source. Current integration status: [PR #8](https://github.com/kraveerachat/GisSino-Fn/pull/8) is MERGED at `90a81e8d7a44fc5472e254be7c2197c0e5fc411f`, verified in the Activity start audit; prior review/push/checkpoint statements describe historical S2 delivery. [D32 S2](../project/DECISIONS.md#d32-s2--assets-only-wallet-and-monthly-snapshots), [S2](../worklog/20-Sessions/TASK-GS-UI-WALLET-V2-001-S2.md).

## Superseded Wallet S1 presentation (2026-10-18)

[wallet.css](../../src/styles/wallet.css) scopes presentation to `.wallet-v2`: bank `#133865`, ewallet `#236fc8`, cash `#76a5d7`, liabilities `#677687`, cap `#15395f` and cap ink `#f4f8ff`. Dark roles use amber `#e5ad38`, blue `#8bb6e6`, pale slate `#becedb`, liabilities `#928475`, cap `#242323` and ink `#f3eee5`; surfaces/focus/borders/contact shadows reuse shared theme roles. These are UI categories, not official provider colors.

Content caps at 1120px; ring width min(100%,264px) on phones and 340px from 700px, SVG 320×320/radius 130/stroke 26; center amount clamps 20–32px. Notched cards use 24px radius and 20px SVG shoulder,44px cap minimum,36px badges,14px names and 20px amounts (18px under 359px). From 360–699px the legend uses two columns with flexible amount/percentage rows; from 700px ring/legend and category grids gain two columns. Item press uses the shared duration/ease; reduced motion removes transition/translation. Provider artwork remains contained. [Wallet task](../worklog/10-Tasks/TASK-GS-UI-WALLET-V2-001.md) runtime verification passed; finish is SHIP; final docs checkpoint is pending; these roles extend the existing tokens and do not redesign Home/pre-Home.

Source `eac4d7193fd6d2a261d8e7286c63c819806f2f60` is pushed in [Draft PR #8](https://github.com/kraveerachat/GisSino-Fn/pull/8); final finish SHIP, owner review/merge and final documentation checkpoint remain pending.

## Current state — pre-Home preview S4

[Welcome](../pages/auth/Page-Auth.md) retains scoped ground `--welcome-ground:#f6faff`, cobalt `--welcome-blue:#075dcc` and deep cobalt `--welcome-blue-deep:#034799` in [welcome.css](../../src/styles/welcome.css). Local Noto Sans Thai, ink/muted, raised surface, borders, semantic danger and contact/inset shadows reuse the incumbent light theme. Public light rendering does not mutate the in-memory dashboard theme.

| Scoped role | Observed source value and use |
|---|---|
| Shield | 144px phone, 88px compact portrait, 72px short landscape, 200px tablet portrait; wide landscape clamp(128px,12vw,192px); 42px form identity |
| Wordmark | Phone clamp(56px,16vw,72px), 48px compact/short landscape, 96px tablet, wide clamp(64px,6.6vw,96px); weight 750, line-height 1.1, tracking -.035em |
| Tagline / body | Tagline 22px phone / 18px compact / 28px tablet / clamp(22px,2vw,28px) wide; description 16px phone / 18px wider; Demo mode status 12px/1.5; separator 13px/1.6 |
| Action | 16px radius, 56px base minimum; Welcome 60px ordinary / 56px compact portrait / 64px tablet and wide; 120ms feedback |
| Input / field | 52px minimum, 16px text, 12px radius, 12px 14px padding; 44px password toggle |
| Form / context | 480px base maximum, 560px wider outer panel with 40px 64px padding (432px inner); 16px radius; context clamp(28px,3.3vw,44px) |
| Panel shadow | `0 8px 20px rgb(22 59 103 / 7%),0 24px 64px rgb(22 59 103 / 9%)` |
| Focus / minimum | Controls 3px deep cobalt outline with 4px offset; locale and navigation >=44px; main route-focus outline suppressed |
| Layout | 560px portrait hero maximum; wide hero min(65%,800px); action maximum 440px; safe-area gutters; existing 4px/8px rhythm |
| Demo status / Google | Status 5px 8px padding, 8px radius, deep cobalt on existing ground; toolbar gap 16px (8px below 359px). Google uses existing raised surface/ink/strong border, no shadow; separator gap 16px and 1px rules |
| Motion | Postcard only: 320ms, 12px rise and -1deg settle, existing ease-out; reduced motion removes animation/transitions |

Artwork uses cover at center, no contain bands. Source queries and layout breakpoints differ; see [UI specification](UI_DESIGN_SPEC.md). These are scoped facts, not a replacement global scale. Root DESIGN.md/PRODUCT.md and the absent sidecar remain preserved as an ordinary extension; [S3](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md) records pre-existing root drift; [S4](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md) adds compact status and credential-action spacing without changing the palette or composition. The former 13px technical footers are absent from current pre-Home rendering.

## Preserved Account Board contract — S3

The enamel/theme primitives remain unchanged. S3 geometry and motion live in `src/account-deck.js` and `src/styles/accounts.css`: full folder minimum height 160px (measured 160–164px), 20px curved corners/shoulders, 24/28px vertical exposure with two/three rear layers below/above 520px component width, 44px grip and step controls. Vertical card width caps at 420px; horizontal at 360px. The controller uses a 260ms touch hold, 240ms cubic ease-out snap and 360ms wheel throttle; reduced motion finishes immediately. The older 220ms CSS selection token remains in source but does not govern S3 deck transforms. [Account Board S3](../worklog/20-Sessions/TASK-GS-UI-ACCOUNT-BOARD-001-S3.md) records comparison evidence.

Desktop shell adds shared roles in tokens.css: sidebar-collapsed72px, sidebar-expanded240px, sidebar-open240ms, sidebar-close190ms, sidebar-label-reveal140ms, z-sidebar20. It reuses surface/text/accent/key-shadow/inset-shadow roles. Native modal top-layer remains above the sidebar.

Floating navigation uses existing theme roles plus `--island-height:64px`, `--island-bottom:12px`, `--island-gap:10px`, `--popup-open:220ms`, and `--popup-close:160ms` in `src/styles/navigation.css`. Safe-area padding is additive; Add is a separate 56px circle. The More panel uses existing enamel, border, shadow, and focus tokens. Footer labels stay 11px at 320px.

Canonical implementation: `src/styles/tokens.css`.

| Role | Sky Blue & Cobalt Enamel | Graphite & Amber |
|---|---|---|
| Ground | `#EDF4FA` | `#242323` |
| Raised surface | `#FFFFFF` | `#403D3A` |
| Text | `#102B59` | `#F3EEE5` |
| Secondary text | `#536379` | `#C3B9AE` |
| Approved accent | `#527DC4` | `#E5AD38` |
| Action surface | `#0860D4` | `#E5AD38` |
| On action | `#FFFFFF` | `#242323` |
| Hero ground | `#E0E9F8` | `#403D3A` |
| Recessed well | `#E4EDF6` | `#292827` |
| Focus | `#315E9F` | `#E5AD38` |

Image A adds cover `#94DFFC → #65BFEE`, cobalt enamel `#176BD8 → #034293`, enamel `#FFFFFF → #E7F0FA`, and icon blue `#076EE8 → #044DA8`. Supporting text on cobalt is `#EEF6FF`. Dark equivalents are graphite, warm enamel, and amber. Destination controls use a light focus outline against their deep background. Success/warning/error tokens remain semantic.

Spacing uses a 4px base: 4, 8, 12, 16, 20, 24, 32, 40. Optical details and intrinsic glyph sizes may sit between steps. Radius roles: input 12px; control 14px; card 20px; hero 24px; sheet 28px. The larger card radii follow the owner's soft tactile direction.

Elevation has separate contact, enamel, key, inset, and sheet roles. The enamel fill remains opaque beneath its directional highlight. Shadows have a directional offset and restrained blur; none acts as a glow.

Typeface: local Noto Sans Thai variable TTF, weight 100–900, SIL OFL 1.1. Financial values use tabular numerals. Page headings begin at 22px on phones; ordinary supporting copy has been increased to 12px, with larger transaction names. Browser text scaling is not locked.

Motion: press 120ms, state 180ms, sheet 300ms; easing `cubic-bezier(.16,1,.3,1)`. Reduced motion preserves the state change without the entrance or seal animation.

## Change log

- 2026-10-16 — Added vault metadata and linked this note from the [Design Hub](Design-Hub.md) for [TASK-VAULT-STRUCTURE-001](../worklog/10-Tasks/TASK-VAULT-STRUCTURE-001.md).

## S1 Account folder extension — SUPERSEDED geometry/motion

`src/styles/accounts.css` adds named navy folder top/bottom/tab/ink/muted/edge/shadow/radius tokens and a220ms selection duration. Provider-specific accent classes match the proposed values in [Provider Catalog](PROVIDER_CATALOG.md); they are not certified corporate HEX values. Narrow Stack has one exposed rear tab; wider Stack has two. The existing shell theme tokens are preserved.

- 2026-10-16 — Added Account Board token reference for [TASK-GS-UI-ACCOUNT-BOARD-001](../worklog/10-Tasks/TASK-GS-UI-ACCOUNT-BOARD-001.md).

## S2 folder material — historical, indicator behavior SUPERSEDED

Active navy uses#153a71/#0b244c with existing dark-shell adaptation. Curved shoulder is20px geometry; all rear tabs align to the active left edge. Optional profile tones add cobalt#164f96/#0c326c or slate#334d69/#21354d; neutral accent#9db2cc. Brand PNGs render unmodified on neutral plates.44px indicators animate the selected6px dot to20px pill; reduced motion removes transitions.

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
