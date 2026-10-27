---
id: SESSION-GS-WP09-10-PWA-S1
type: session
level: 3
status: RUNTIME VERIFIED
updated: 2026-10-27
up: ../10-Tasks/TASK-GS-WP09-10-PWA.md
related:
  - ../../design/reviews/PWA_SHELL_REVIEW.md
  - ../../pages/settings/Page-Settings.md
---
# Batch A implementation and verification

Owner selected WP-09 + WP-10 together under remediation v2. One branch `wp-09-10-pwa-shell` from main `bdbedaec24d781b928d8bf7747474032bfb9c384`; Draft PR creation/push pending. PR #12 is still open/Draft and was not merged. Production mutation, deletions, new paid services and merge remain unauthorized.

## Changes and reuse

Reused root static server, canonical logo, tokens/font/icons, #setup/install, Settings install-info/native sheet and existing form/result routes. Root manifest/head/icons, generated shell inventory, allowlisted worker and shared install controller added. New Settings Back/Refresh, sample-confirm install gate, offline/update notices, dirty-refresh protection, safe-area extensions and guarded badges. Existing financial fixtures/projections, auth demonstration and rankings retained. No durable sample writes, production data cache or offline sync.

## Evidence and commands

See [PWA review](../../design/reviews/PWA_SHELL_REVIEW.md) and its raw browser evidence/captures. Commands: git fetch/status/worktree/diff; ffmpeg existing-logo resize/composite; npm run pwa:build; npm run check (719 keys, syntax, shell freshness); npm test (134/134); node scripts/qa-pwa.mjs with local Playwright/Chrome; Impeccable detect --json src index.html (empty); relative-link/frontmatter checks. Original failed sandbox localhost test is explicitly distinguished from the passing loopback-enabled run.

Browser checks exercise real service worker install/cache/update lifecycle, persistent-profile Chrome installability, layout matrix, native guide reuse, mocked installation/device/storage branches, confirmed sample gating, dirty cancellation, offline reload and disabled writes, expense shortcut and another-tab activation without reload. No actual real-device install is claimed. Short temporary browser profiles avoid Windows path limits; one extra CDP session was detached before offline emulation. Earlier guide-selector/harness failures and two targeted source fixes are recorded in the review.

## Delivery boundary

One Draft PR, owner review/merge pending. No immutable receipt until owner acceptance. The dedicated local preview runs on port 4188; previous preview servers were left as found. Stop only the Batch A server session if no longer needed. Physical iPhone/iPad launch, real Android/native install, Safari/WebKit, screen readers and physical safe areas remain not tested.
