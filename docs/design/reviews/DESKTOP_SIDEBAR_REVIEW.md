---
id: REVIEW-DESKTOP-SIDEBAR
type: design
level: 2
status: CURRENT
updated: 2026-10-16
up: ../Design-Hub.md
related:
  - ../../worklog/10-Tasks/TASK-GS-UI-002-DESKTOP-SIDEBAR.md
  - ../UI_DESIGN_SPEC.md
---
# GS-UI-002 — Desktop Collapsible Sidebar

Current owner follow-ups: desktop starts pinned; the expanded header is one horizontal54px row with the supplied metallic S-Shield, wordmark and toggle. The original implementation/critique below is historical evidence; correction records at the end supersede default-collapse, fixed-toggle placement, old emblem and44px expanded header decisions.

## Scope and implementation

Built from verified origin/main at 7047039b8a0c8bad9d63bfeaf5a0fcc0c8df72f4 after baseline PR #1 was verified merged. Repository visibility was PUBLIC. The original C:\Users\User\GisSino_FN preview directory remains untouched; this task uses the separate Git staging checkout.

| State | Sidebar | Content offset | Exit |
|---|---|---|---|
| Collapsed | 72px icons, compact brand, stable panel toggle, profile | 72px | Hover/focus disclosure or explicit pin |
| Temporary | 240px labelled overlay with enamel boundary/shadow | 72px | Pointer leave after180ms unless keyboard focus remains; focus outside, Escape, modal suspension, render or breakpoint reset |
| Pinned | 240px full navigation and profile | 240px | Explicit toggle; pointer exit and Escape retain pin |

Hover opens after150ms on hover-capable fine pointers and rejects touch pointer entry. Unpin clears transient expansion and suppresses automatic reopening until pointer exit/re-entry. Keyboard focus on navigation/profile reveals labels without changing pin. The toggle keeps exactly the same screen position through expansion. Labels use140ms disclosure; widths/offsets use240ms entry and190ms exit as requested. Width/offset transitions are a narrow intentional exception to transform-only guidance; there is no frame-rate profiling claim.

One controller owns pin, temporary expansion, pointer/focus ownership and suppression. It attaches delegated listeners once. Render resets transient ownership and timers while preserving pin. No localStorage or new application dependency is introduced.

Desktop links: Home, Wallet, Activity, Bills, Party. Wallet transfers and Wallet-origin card detail retain Wallet selection; Bills-origin card detail retains Bills. Profile enters Settings. Add is removed from desktop destinations and uses one separate48px enamel circle in the existing page header (including cover headers). It opens the original native dialog and restores its opener on dismissal. Mobile footer order, More popup, safe-area CSS and financial content are preserved.

## Independent critique and corrective batch

Method: dual-agent (A: /root/sidebar_design_a · B: /root/sidebar_technical_b). A completed before B detector output reached synthesis.

| Nielsen heuristic | Before fixes /4 |
|---|---:|
| System status | 3 |
| Match with real world | 4 |
| Control and freedom | 3 |
| Consistency | 3 |
| Error prevention | 3 |
| Recognition | 2 |
| Efficiency | 3 |
| Minimalism | 3 |
| Error recovery | 3 |
| Help/documentation | 2 |
| Total | 29/40 |

The authored enamel rail, recessed active selection and tactile Add fit GisSino. Financial content remains the visual priority. Five navigation choices are a deliberate owner requirement; the critique's strict four-choice cognitive-load checklist reports two failures but does not justify hiding Bills or Party. Alex benefits from a compact, pinnable shell; Sam needs stable targets, visible focus and readable label disclosure. Temporary occlusion of part of Home is expected overlay behavior.

| Before | After | Why |
|---|---|---|
| P2: toggle moved to another row/column on hover | Stable position below compact brand in every state | Prevents the pin target moving away during pointer approach |
| P2: sighted keyboard users saw only icons | Focus-visible navigation/profile discloses labels | Gives keyboard users the same identification support as pointer users |
| Source risk: removed focused DOM could retain transient ownership | Render explicitly clears timers and transient ownership, preserves pin | Avoids lifecycle-dependent stuck overlays; browser did not reproduce this as a pre-fix failure |

No remaining confirmed Priority Issue in the implemented shell. Scores above describe the pre-correction assessment; no fabricated post-fix score.

Assessment B pre-correction technical audit: accessibility3/4, performance3/4, theming3/4, responsive3/4, integrity3/4 =15/20. Detector ran once over src: exit0, JSON[], no findings/false positives. It does not prove visual or accessibility certification.

## Actual verification

- npm run check: passed syntax, local assets, catalog-only Thai component copy,306 keys in each locale.
- npm test:16/16 passed, including timing/state transitions, unpin re-entry suppression, keyboard disclosure, render reset, direct child context, and existing loopback server boundaries.
- git diff --check: passed.
- Parent Chromium browser:38 recorded passing assertions, zero console warnings/errors.
- Verified default collapse, pointer entry/exit, transient72px offset, pinned240px offset, pin across navigation/theme/locale/modal and desktop/mobile round-trip, unpin suppression, fresh re-entry, stable toggle coordinates, Enter/Space, Escape semantics, focus outline, Add dismissal/focus return, Wallet/Bills card contexts, Party navigation, browser Back/Forward, mobile More and Add mutual exclusion.
- Focus-held exit behavior and fine/coarse pointer guards are also covered by source/state tests; physical touch and assistive technology were not exercised.

Representative Home responsive measurements:

| Actual CSS width | Shell | Horizontal overflow | Visible global Add |
|---|---|---|---:|
| 390 | Mobile floating islands | None | 1 |
| 820 | Existing tablet/mobile navigation | None | 1 |
| 1023 and1025 | Existing tablet/mobile navigation | None | 1 |
| 1099 | Existing tablet/mobile navigation | None | 1 |
| 1100 and1101 | Desktop rail | None | 1 |
| 1280 | Desktop rail | None | 1 |
| 1440 | Desktop rail | None | 1 |
| 1920 | Desktop rail | None | 1 |

Host scale prevented an exact1024px viewport: the two adjacent attainable measurements bracketed the requested target. Reported values are measured, not assumed. Pinned English/dark Home additionally passed at1100,1280,1920. Main responsive matrix height900; final mobile screenshot390×844. These are representative layout checks, not a full locale/theme/state factorial.

Sidebar token pair contrast: light text/surface13.15:1, secondary/surface5.80:1, selected text/well5.57:1, focus/surface6.15:1. Dark pairs11.05:1,6.61:1,5.81:1,6.30:1. This checks these explicit pairs, not all blended pixels or every app control.

## Screenshot evidence (local, excluded from Git)

artifacts/desktop-sidebar:
- desktop-collapsed.jpg
- desktop-hover.jpg
- desktop-pinned.jpg
- desktop-add-sheet.jpg
- desktop-dark-pinned.jpg
- mobile-regression.jpg
- browser-checks.json
- detector.json

These are direct Chromium captures. No private records or screenshots are published.

## Files and limits

New: src/desktop-sidebar.js. Modified: src/screens.js, navigation.js, app.js, blue-screens.js (header Add only), icons.js, i18n.js, styles/app.css, styles/tokens.css, tests/navigation.test.mjs. Documentation: this review, task note, PRODUCT, DESIGN, README, UI_DESIGN_SPEC, SCREEN_MAP and DESIGN_TOKENS. Local ignored .ui-craft notes record scope/tokens.

The mobile navigation markup and overlay controller remain unchanged except for exported desktop helpers added alongside them. styles/navigation.css, fixtures and financial calculations remain unchanged. No auth, database, deployment or production system changed.

No physical iOS/Android, screen reader, coarse-pointer synthesis, frame profiling, or OS reduced-motion/forced-colors emulation. Their code paths were inspected; no hardware/OS test claim. Browser zoom shortcut attempts produced no measured scale change, so zoom is not reported passed. The available browser evaluate API is read-only; no detector overlay injection or overlay server was attempted. Project guide, architecture and universal workflow remain unavailable. In-repository Markdown is the task record.

Questions skipped: owner approved the implementation scope and all confirmed priority findings were addressed.

## Owner correction — header alignment and pinned default

Owner request: update the existing Draft PR #2 only. Expanded header now aligns the GisSino brand and panel toggle in one horizontal row, eliminating the second row and52px of reserved header height. Compact72px mode keeps its two-row brand/control layout. Existing tokens, icons, materials and navigation destinations are reused.

sidebarState starts with pinned:true. The controller seeds the desktop layout offset before shell insertion; initial shell markup also starts expanded with matching ARIA. Synchronization applies effective pinned/expanded state only at1100px+, leaving mobile/tablet hidden and unshifted. User unpin survives normal rerenders; a new page load restores the pinned default. Hover timers, overlay behavior, suppression, pin retention and keyboard disclosure remain the existing state machine.

Modified source: src/screens.js, src/styles/app.css, src/desktop-sidebar.js, tests/navigation.test.mjs. Updated documentation: DESIGN.md, UI_DESIGN_SPEC.md, this review and the existing task note. Local ignored .ui-craft/brief.md records both learned constraints and their rationale.

Verification on the correction:
- npm run check passed: syntax/assets,306 catalog keys per locale.
- npm test passed17/17; added fresh-session default and unpin/rerender coverage, retained hover/pin/Escape/context regressions.
- Chromium32 passing assertions, no console warnings/errors.
- Actual desktop widths1100/1280/1440/1920 checked in light/Thai and dark/English. Header44px tall, brand and toggle top/bottom aligned, brand-to-toggle gap approximately31px, content offset240px, no overlap or horizontal overflow.
- Fresh desktop pinned state, unpin, fresh hover entry, pointer exit, hover-to-pin, pinned pointer exit, Wallet route retention, original desktop Add, one visible global Add, Enter/Space, transient Escape, pinned Escape and preserved focus verified.
- Effective mobile/tablet pin state false at390/820/1099; zero sidebar content offset. Fresh390 mobile More and Add exclusion passed. Returning to1100 restores the session pin preference.
- First-paint ordering is established by synchronous pre-insertion layout seeding and initial markup; no filmstrip/per-frame flash profiling was performed.
- Reduced-motion rules remain intact and cover sidebar/workspace transitions. OS reduced-motion and actual zoom emulation remain unverified; no physical-device or assistive-technology certification.

Direct screenshots and JSON, excluded from Git: artifacts/desktop-sidebar/header-correction/desktop-initial-pinned.jpg, desktop-collapsed.jpg, desktop-dark-english.jpg, mobile-regression.jpg, browser-checks.json. The1440px capture was visually compared with the owner's attached reference, retaining the existing dashboard while applying the written header correction.

## Owner brand integration — Metallic Navy S-Shield

Supplied source: Metallic Navy S-Shield Emblem.png,1254×1254 RGBA. Inspected original artwork and alpha bounds: x92..1163/y40..1228 at alpha>=16, or1072×1189 visible pixels. No crop or resampling was needed. Original SHA256 remains B26D5107C0B9DC62B5038596E1A067573859B3B90EED7F49017A1BF771055DD9 before and after integration.

Canonical web copy: assets/brand/gissino-s-shield.png,1,655,531 bytes. Removed only the nonvisual caBX/C2PA metadata chunk from the web copy. Remaining IHDR/IDAT/IEND chunks match the source byte-for-byte; no hidden textual metadata is included. No generated substitute, color change, geometry change, CSS filter, glow or artwork clipping. Asset provenance and treatment are recorded in assets/brand/README.md.

The shared logo helper in icons.js renders the PNG with intrinsic dimensions and decorative alt/ARIA inside a Home link named GisSino. Favicon uses the same PNG; obsolete favicon.svg removed from the task branch. Desktop logo boxes54×54 expanded and44×44 collapsed, object-fit:contain. At the alpha-bound threshold this gives approximately46×51px and38×42px of visible artwork, respectively. Expanded header grows to54px and centers the44px toggle on the same row. At1440px the measured wordmark-to-toggle gap is approximately20px. Mobile/tablet retain their31/34px boxes and existing header spacing.

Light and dark captures show the silver/navy artwork clearly enough on existing opaque surfaces; no backing plate was needed. This is a rendered visual assessment, not a numeric contrast certification for every photographic/metallic pixel.

Actual checks:
- npm run check passed: syntax, local assets,306-key locale parity.
- npm test17/17 passed; existing HTTP smoke test now verifies PNG200 status, image/png MIME and PNG signature. server.mjs adds only the required MIME mapping.
- Chromium26 passing assertions; no console warnings/errors. PNG natural dimensions and complete loading verified.
- Desktop1100/1280/1440/1920 in light/Thai and dark/English: no horizontal overflow, no clipping/overlap, centered image/wordmark/toggle. Collapsed light/dark44px logo, hover54px logo, pin retention, keyboard Home link, Add and mobile More/Add verified.
- Shared Wallet branding inspected at390/820/1099; images loaded at31/34px, one accessible brand name, no horizontal overflow and no mobile sidebar offset. Returning to1100 restores desktop pin.
- Local screenshots: artifacts/desktop-sidebar/brand-shield/desktop-light-expanded.jpg, desktop-light-collapsed.jpg, desktop-hover.jpg, desktop-dark-expanded.jpg, desktop-dark-collapsed.jpg, wallet-390.jpg, wallet-820.jpg. Browser measurements saved in browser-checks.json.

Files changed in this brand slice: assets/brand/gissino-s-shield.png and README.md added; assets/favicon.svg removed; index.html, server.mjs, src/icons.js, src/screens.js, src/styles/app.css, src/styles/tokens.css, tests/preview.test.mjs, DESIGN.md, UI_DESIGN_SPEC.md, this review and the existing task note updated. No financial screen content, fixtures or sidebar state machine changes.

Limits: original1254px asset retained for resolution headroom; physical high-density displays, actual browser zoom, screen readers and touch hardware were not tested. Existing CSS preserves proportions and named link/focus behavior; no device certification is claimed.

## Change log

- 2026-10-16 — Added vault metadata and linked this review from the [Design Hub](../Design-Hub.md) for [TASK-VAULT-STRUCTURE-001](../../worklog/10-Tasks/TASK-VAULT-STRUCTURE-001.md).
