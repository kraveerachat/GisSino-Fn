# GS-UI-002 — Desktop Collapsible Sidebar

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
