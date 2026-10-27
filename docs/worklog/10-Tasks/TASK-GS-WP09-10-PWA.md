---
id: TASK-GS-WP09-10-PWA
type: task
level: 2
status: RUNTIME VERIFIED
updated: 2026-10-27
up: ../00-Index/Task-Dashboard.md
related:
  - ../../pages/settings/Page-Settings.md
  - ../../pages/auth/Page-Auth.md
---
# Batch A — PWA shell and install guide

Owner selected Batch A (WP-09 + WP-10) under remediation plan v2 in chat. Branch `wp-09-10-pwa-shell` starts from main `bdbedaec24d781b928d8bf7747474032bfb9c384`. PR #12 remains Draft and is not a dependency for source changes; its InstallPrompt reuse inventory was read from the audit branch. One combined Draft PR follows the explicit Batch A prompt. Production mutation and merge are not authorized.

## Task map

1. Extend root manifest/server/head and generate existing-shield icons and versioned shell inventory.
2. Add an allowlisted service worker (HTML network first; shell assets cache first); no API response cache or offline financial writes.
3. Extend the existing install guide, Settings and confirmed-preview result; add platform detection, dismissal, offline/update/refresh UI, safe areas and feature-detected badges.
4. Run unit/regression checks, Chrome installability protocol checks, offline/update/dirty-form scenarios and responsive light/dark matrix. Record unavailable physical devices honestly.
5. Synchronize page/design/task/session/dashboard/history notes, push and open one Draft PR. No final receipt before owner acceptance.

## Existing components searched / reused

Searched src, styles, tests and docs for install, service workers, manifest, beforeinstallprompt, safe-area, dialogs, refresh and confirmation. Reuse welcome.install / #setup/install, Settings install-info, native #sheet focus handling, existing shield, Noto Sans Thai, token colors, Floating Island safe-area bottom spacing, Bills overdue projection and needsDetails fixture flags. No install controller or service worker exists.

## Files planned

Root manifest/sw/head/server; generated assets/pwa and icons; scripts/build-pwa.mjs; src/pwa-install.js, src/pwa.js, pwa CSS and matched i18n keys. Narrow integrations in app/welcome/preview-flow/screens. Focused PWA tests and existing documentation notes.

## Verification / open decisions

Check passes 719 keys and current shell inventory; 134/134 tests pass. Final complete browser evidence passed 57 cases with zero page/installability errors. [Session S1](../20-Sessions/TASK-GS-WP09-10-PWA-S1.md) and [PWA review](../../design/reviews/PWA_SHELL_REVIEW.md) record commands, limitations and review captures. Draft PR and owner review pending. All canonical financial and ranking behavior stays unchanged. Real installation needs owner devices. Chrome removed Lighthouse's PWA category (https://developer.chrome.com/blog/update-install-criteria); report Chrome installability errors and actual worker/offline evidence instead of inventing a Lighthouse PWA score. The successful Add result is an unsaved sample preview; explicitly confirm that preview before enabling a proactive install offer, without claiming a ledger write.
