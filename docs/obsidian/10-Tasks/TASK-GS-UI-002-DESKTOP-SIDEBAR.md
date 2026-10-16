# GS-UI-002 — Desktop Collapsible Sidebar Navigation

- Status: verified, pushed, Draft PR open for owner review
- Objective: approved desktop shell enhancement, preserving mobile and financial screens
- Base: main at7047039b8a0c8bad9d63bfeaf5a0fcc0c8df72f4; initial import PR #1 verified merged
- Branch: task/gs-ui-002-desktop-sidebar
- Original preview: C:\Users\User\GisSino_FN (untouched)
- Git checkout: separate GisSino_FN_PR_STAGE checkout used for the initial import

## Decisions

Previous desktop sidebar was fixed226px and included Add in its destinations. New desktop1100px+ uses72px collapsed,240px transient overlay and240px pinned. Pin alone changes content offset. Hover150ms, exit180ms; labels also disclose for keyboard focus. Stable toggle, unpin re-entry suppression, session-only state, explicit transient reset after render. Five direct destinations plus profile Settings. One separate48px Add action in the existing content header opens the same native sheet.

## Changes and evidence

Source: new desktop-sidebar.js; updated screens.js, navigation.js, app.js, blue-screens.js header only, icons/i18n, app.css/tokens.css and navigation tests. Design/product/README/spec/map/token docs updated. Full detail: [[../../design/DESKTOP_SIDEBAR_REVIEW|Desktop sidebar review]].

Actual checks: npm run check passed (306 keys/locale); npm test16/16; diff check passed. Chromium38 browser assertions passed; no console warnings/errors. Mobile390, tablet820, landscape1023/1025 bracketing1024, breakpoint1099/1100/1101, desktop1280/1440/1920 showed no horizontal overflow and one global Add. Additional pinned English/dark checks passed1100/1280/1920.

Local screenshot evidence (not committed): artifacts/desktop-sidebar/desktop-collapsed.jpg, desktop-hover.jpg, desktop-pinned.jpg, desktop-add-sheet.jpg, desktop-dark-pinned.jpg, mobile-regression.jpg. JSON evidence saved alongside.

Independent design critique29/40 and technical audit15/20 describe the pre-correction state. Stable toggle and keyboard disclosure were corrected. Detector once:0 findings. No post-fix score inferred.

## Git and next action

- Implementation commit: f90a7598a065bfbd2232f1f8c59b655a8af03ce8
- Push: successful to origin/task/gs-ui-002-desktop-sidebar
- Draft PR URL: https://github.com/kraveerachat/GisSino-Fn/pull/2
- Documentation sync: this URL record is one controlled follow-up commit; the branch head is authoritative
- Next action: owner reviews Draft PR #2 before changing status or merging
- Production mutation: NONE

## Limits

Synthetic preview only. No backend, persistence, financial posting or production deployment. Physical touch, screen readers, OS reduced motion/forced colors, frame profiling and actual zoom remain unverified. Browser viewport emulation is layout evidence. Missing project/workflow documents remain a recorded limit. Task note is in-repository Markdown; no external Obsidian sync claimed.

## Owner follow-up — same PR #2

The earlier delivery started collapsed and kept the toggle below the brand in both modes. Owner correction: fresh desktop page loads start pinned expanded, and the expanded header is one horizontal44px row with logo/wordmark left and toggle right. Collapsed mode retains the compact accessible two-row header. This supersedes the earlier stable-coordinate toggle choice; the rest of the existing hover/pin state machine is preserved.

Source modified: src/screens.js, src/styles/app.css, src/desktop-sidebar.js, tests/navigation.test.mjs. Documentation modified: DESIGN.md, UI_DESIGN_SPEC.md, DESKTOP_SIDEBAR_REVIEW.md and this existing task record. Original preview directory remains untouched.

Actual correction checks: npm run check passed306-key locale parity; npm test17/17; Chromium32 assertions passed with no console warnings/errors. Desktop1100/1280/1440/1920 in light/Thai and dark/English: no overlap/overflow, aligned44px header,240px pinned content offset. Mobile390, tablet820 and breakpoint1099/1100 retained correct navigation and one Add. More/Add, native dialog, route/rerender pin retention, unpin suppression, hover exit and keyboard actions passed. Reduced-motion source rules remain intact; OS emulation and actual zoom remain unverified.

Screenshots (local only): artifacts/desktop-sidebar/header-correction/desktop-initial-pinned.jpg, desktop-collapsed.jpg, desktop-dark-english.jpg, mobile-regression.jpg. JSON: browser-checks.json alongside.

- Correction commit: f8d79dd0b48f39b33d99165ce317665339fa4119
- Existing PR: https://github.com/kraveerachat/GisSino-Fn/pull/2
- Delivery: correction and this SHA record are pushed to the same task branch; the branch head includes this controlled documentation checkpoint
- Next action: owner reviews the updated Draft PR #2 before merging
- Production mutation: NONE
