---
id: TASK-GS-UI-002-DESKTOP-SIDEBAR
type: task
level: log
status: EXTERNALLY ACCEPTED
updated: 2026-10-16
up: ../00-Index/Task-Dashboard.md
related:
  - ../../design/reviews/DESKTOP_SIDEBAR_REVIEW.md
  - ../../pages/home/Page-Home.md
  - ../../project/DECISIONS.md
---

# GS-UI-002 — Desktop Collapsible Sidebar Navigation

- Status: merged and externally accepted
- Objective: approved desktop shell enhancement, preserving mobile and financial screens
- Base: main at7047039b8a0c8bad9d63bfeaf5a0fcc0c8df72f4; initial import PR #1 verified merged
- Branch: task/gs-ui-002-desktop-sidebar
- Original preview: local preservation copy outside the Git checkout
- Git checkout: separate local task worktree

## Decisions

Previous desktop sidebar was fixed226px and included Add in its destinations. New desktop1100px+ uses72px collapsed,240px transient overlay and240px pinned. Pin alone changes content offset. Hover150ms, exit180ms; labels also disclose for keyboard focus. Stable toggle, unpin re-entry suppression, session-only state, explicit transient reset after render. Five direct destinations plus profile Settings. One separate48px Add action in the existing content header opens the same native sheet.

## Changes and evidence

Source: new desktop-sidebar.js; updated screens.js, navigation.js, app.js, blue-screens.js header only, icons/i18n, app.css/tokens.css and navigation tests. Design/product/README/spec/map/token docs updated. Full detail: [Desktop sidebar review](../../design/reviews/DESKTOP_SIDEBAR_REVIEW.md).

Actual checks: npm run check passed (306 keys/locale); npm test16/16; diff check passed. Chromium38 browser assertions passed; no console warnings/errors. Mobile390, tablet820, landscape1023/1025 bracketing1024, breakpoint1099/1100/1101, desktop1280/1440/1920 showed no horizontal overflow and one global Add. Additional pinned English/dark checks passed1100/1280/1920.

Local screenshot evidence (not committed): artifacts/desktop-sidebar/desktop-collapsed.jpg, desktop-hover.jpg, desktop-pinned.jpg, desktop-add-sheet.jpg, desktop-dark-pinned.jpg, mobile-regression.jpg. JSON evidence saved alongside.

Independent design critique29/40 and technical audit15/20 describe the pre-correction state. Stable toggle and keyboard disclosure were corrected. Detector once:0 findings. No post-fix score inferred.

## Git and next action

- Implementation commit: f90a7598a065bfbd2232f1f8c59b655a8af03ce8
- Push: successful to origin/task/gs-ui-002-desktop-sidebar
- PR URL: https://github.com/kraveerachat/GisSino-Fn/pull/2
- Documentation sync: this URL record is one controlled follow-up commit; the branch head is authoritative
- Merge verified 2026-10-16: `183cc99478f8a4e20637f6277e7f6a95c73c8166`
- Production mutation: NONE

## Limits

Synthetic preview only. No backend, persistence, financial posting or production deployment. Physical touch, screen readers, OS reduced motion/forced colors, frame profiling and actual zoom remain unverified. Browser viewport emulation is layout evidence. Missing project/workflow documents remain a recorded limit. Task note is in-repository Markdown; no external Obsidian sync claimed.

## Owner follow-up — same PR #2

The earlier delivery started collapsed and kept the toggle below the brand in both modes. Owner correction: fresh desktop page loads start pinned expanded, and the expanded header is one horizontal44px row with logo/wordmark left and toggle right. Collapsed mode retains the compact accessible two-row header. This supersedes the earlier stable-coordinate toggle choice; the rest of the existing hover/pin state machine is preserved.

Source modified: src/screens.js, src/styles/app.css, src/desktop-sidebar.js, tests/navigation.test.mjs. Documentation modified: DESIGN.md, UI_DESIGN_SPEC.md, docs/design/reviews/DESKTOP_SIDEBAR_REVIEW.md and this existing task record. Original preview directory remains untouched.

Actual correction checks: npm run check passed306-key locale parity; npm test17/17; Chromium32 assertions passed with no console warnings/errors. Desktop1100/1280/1440/1920 in light/Thai and dark/English: no overlap/overflow, aligned44px header,240px pinned content offset. Mobile390, tablet820 and breakpoint1099/1100 retained correct navigation and one Add. More/Add, native dialog, route/rerender pin retention, unpin suppression, hover exit and keyboard actions passed. Reduced-motion source rules remain intact; OS emulation and actual zoom remain unverified.

Screenshots (local only): artifacts/desktop-sidebar/header-correction/desktop-initial-pinned.jpg, desktop-collapsed.jpg, desktop-dark-english.jpg, mobile-regression.jpg. JSON: browser-checks.json alongside.

- Correction commit: f8d79dd0b48f39b33d99165ce317665339fa4119
- Existing PR: https://github.com/kraveerachat/GisSino-Fn/pull/2
- Delivery: correction and this SHA record are pushed to the same task branch; the branch head includes this controlled documentation checkpoint
- Current state: included in merged PR #2
- Production mutation: NONE

## Owner follow-up — Metallic Navy S-Shield

Replaced the previous brand mark with the owner's supplied Metallic Navy S-Shield Emblem.png. Original1254×1254 RGBA source remains unchanged, SHA256 B26D5107C0B9DC62B5038596E1A067573859B3B90EED7F49017A1BF771055DD9. Web copy assets/brand/gissino-s-shield.png omits only nonvisual caBX/C2PA metadata; retained PNG chunks are byte-identical. Visible alpha bounds1072×1189; no crop, resize, recolor, filter or regeneration.

Final boxes: expanded54px, collapsed44px, mobile31px and tablet34px. Expanded header54px high with centered wordmark and toggle, approximately20px wordmark-to-toggle gap at1440px. Existing dark/light surfaces retain readable silver/navy artwork without an additional plate. One canonical shared brand helper and favicon; obsolete favicon.svg removed. Mobile/tablet layout and sidebar behavior remain intact.

Changed files: assets/brand/gissino-s-shield.png, assets/brand/README.md, assets/favicon.svg (removed), index.html, server.mjs, src/icons.js, src/screens.js, src/styles/app.css, src/styles/tokens.css, tests/preview.test.mjs, DESIGN.md, docs/design/UI_DESIGN_SPEC.md, docs/design/reviews/DESKTOP_SIDEBAR_REVIEW.md and this note.

Verification: npm run check passed306 locale keys; npm test17/17 passed including PNG HTTP/MIME/signature; Chromium26 assertions passed, no console warnings/errors. Desktop1100/1280/1440/1920 checked in light/Thai and dark/English. Collapsed light/dark, hover, keyboard Home link, pin retention, Add, shared Wallet logo390/820/1099 and mobile More/Add passed. No overflow or header overlap.

Screenshots: artifacts/desktop-sidebar/brand-shield/desktop-light-expanded.jpg, desktop-light-collapsed.jpg, desktop-hover.jpg, desktop-dark-expanded.jpg, desktop-dark-collapsed.jpg, wallet-390.jpg, wallet-820.jpg; browser-checks.json alongside. Local review artifacts are excluded from Git.

- Brand integration commit: 40da7ee74c5bb8e7bcd544f948b755558fd95142
- PR: https://github.com/kraveerachat/GisSino-Fn/pull/2 (same task branch)
- Delivery: implementation and this SHA record share the existing task branch; the branch head includes this controlled documentation checkpoint
- Current state: included in merged PR #2
- Limits: actual zoom, physical high-density display, screen-reader and touch hardware remain unverified
- Production mutation: NONE
