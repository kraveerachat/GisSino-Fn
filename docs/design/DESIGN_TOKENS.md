---
id: DESIGN-TOKENS
type: design
level: 2
status: CURRENT
updated: 2026-10-16
up: Design-Hub.md
related:
  - UI_DESIGN_SPEC.md
  - COMPONENT_INVENTORY.md
---
# Design tokens

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

## Account folder extension

`src/styles/accounts.css` adds named navy folder top/bottom/tab/ink/muted/edge/shadow/radius tokens and a220ms selection duration. Provider-specific accent classes match the proposed values in [Provider Catalog](PROVIDER_CATALOG.md); they are not certified corporate HEX values. Narrow Stack has one exposed rear tab; wider Stack has two. The existing shell theme tokens are preserved.

- 2026-10-16 — Added Account Board token reference for [TASK-GS-UI-ACCOUNT-BOARD-001](../worklog/10-Tasks/TASK-GS-UI-ACCOUNT-BOARD-001.md).
