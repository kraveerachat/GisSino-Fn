---
id: DESIGN-TOKENS
type: design
level: 2
status: CURRENT
updated: 2026-10-17
up: Design-Hub.md
related:
  - UI_DESIGN_SPEC.md
  - COMPONENT_INVENTORY.md
---
# Design tokens

## Current state — pre-Home preview S3

[Welcome](../pages/auth/Page-Auth.md) retains scoped ground `--welcome-ground:#f6faff`, cobalt `--welcome-blue:#075dcc` and deep cobalt `--welcome-blue-deep:#034799` in [welcome.css](../../src/styles/welcome.css). Local Noto Sans Thai, ink/muted, raised surface, borders, semantic danger and contact/inset shadows reuse the incumbent light theme. Public light rendering does not mutate the in-memory dashboard theme.

| Scoped role | Observed source value and use |
|---|---|
| Shield | 144px phone, 88px compact portrait, 72px short landscape, 200px tablet portrait; wide landscape clamp(128px,12vw,192px); 42px form identity |
| Wordmark | Phone clamp(56px,16vw,72px), 48px compact/short landscape, 96px tablet, wide clamp(64px,6.6vw,96px); weight 750, line-height 1.1, tracking -.035em |
| Tagline / body | Tagline 22px phone / 18px compact / 28px tablet / clamp(22px,2vw,28px) wide; description 16px phone / 18px wider; disclosure 13px/1.65 |
| Action | 16px radius, 56px base minimum; Welcome 60px ordinary / 56px compact portrait / 64px tablet and wide; 120ms feedback |
| Input / field | 52px minimum, 16px text, 12px radius, 12px 14px padding; 44px password toggle |
| Form / context | 480px base maximum, 560px wider outer panel with 40px 64px padding (432px inner); 16px radius; context clamp(28px,3.3vw,44px) |
| Panel shadow | `0 8px 20px rgb(22 59 103 / 7%),0 24px 64px rgb(22 59 103 / 9%)` |
| Focus / minimum | Controls 3px deep cobalt outline with 4px offset; locale and navigation >=44px; main route-focus outline suppressed |
| Layout | 560px portrait hero maximum; wide hero min(65%,800px); action maximum 440px; safe-area gutters; existing 4px/8px rhythm |
| Motion | Postcard only: 320ms, 12px rise and -1deg settle, existing ease-out; reduced motion removes animation/transitions |

Artwork uses cover at center, no contain bands. Source queries and layout breakpoints differ; see [UI specification](UI_DESIGN_SPEC.md). These are scoped facts, not a replacement global scale. Root DESIGN.md/PRODUCT.md and the absent sidecar remain preserved as an ordinary extension; [S3](../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md) records pre-existing root drift.

## Dashboard current state — S3

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
