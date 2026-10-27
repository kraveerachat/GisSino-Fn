---
id: REVIEW-GS-PWA-SHELL
type: design-review
level: 2
status: REVIEW
updated: 2026-10-27
up: ../Design-Hub.md
related:
  - ../../worklog/10-Tasks/TASK-GS-WP09-10-PWA.md
  - ../../pages/settings/Page-Settings.md
---
# Batch A — Installable sample shell

## Scope and implementation

WP-09 + WP-10 on `wp-09-10-pwa-shell`, based on main `bdbedaec24d781b928d8bf7747474032bfb9c384`. Owner selected this combined batch. PR #12 remains unmerged; its read-only InstallPrompt inventory identified the existing guide and Settings sheet reused here. No dependency, production stack, finance formula, ranking, date policy, account data or brand source was changed.

- Root manifest: standalone home entry, three shortcuts, narrow/wide screenshots. Expense shortcut opens the existing Expense form. Root server allowlist adds only manifest/sw and icons; traversal/write protections remain.
- Existing S-Shield composited on token surface `#f6f9fd` into 192/512, maskable 512 and Apple 180 PNGs; favicon embeds the same raster. Maskable artwork is scaled into the central safe circle. Theme metadata uses token action colors (`#0860d4`, dark `#e5ad38`). Original logo unchanged.
- `npm run pwa:build` hashes shell paths, normalized text and raw image/font bytes plus worker source; generated allowlist/version is committed. `npm run check` rejects stale inventory. Root worker uses HTML network first with four-second fallback, explicit shell assets cache first; only older `gissino-shell-*` caches are removed. Query-bearing assets, APIs, POST and foreign origins are ignored.
- Immutable bundled synthetic fixture JS is shell code. No runtime entry, form payload, credential, API response, real financial record, offline queue or sync is cached. Offline financial preview entry/transfer/payment controls are unavailable; disclosure remains visible.
- Waiting updates show a persistent localized notice. Activation/reload requires the tab's explicit refresh action. Dirty input uses a separate confirmation dialog so cancelling preserves the underlying form. Activation from another tab never reloads this tab automatically.
- Shared guide renderer serves existing #setup/install and Settings. iPhone bottom Share vs iPad top-right Share UI diagrams; iOS non-Safari recommendation; native prompt when captured; browser menu fallback. Standalone hides install prompts. Explicit confirmation of an unsaved sample result unlocks proactive offers, never arrival. No XP or ledger posting. Fourteen-day dismissal uses guarded localStorage. Settings remains an explicit way to install during cooldown.
- Existing public/back/account/credit-card/native-sheet controls retained; Settings gains Home Back and Refresh. Top safe-area spacing in standalone; existing Floating Island bottom inset covers its sibling +; landscape left/right insets and sheet bottom inset retained. Badging counts existing overdue cycles plus needs-details, with feature/permission guards.

## Verification

`npm run check` passes 719 matched TH/EN keys, syntax, linked assets and generated-shell freshness. `npm test` passes 134/134 (121 existing + 13 PWA), no skips. Impeccable detector returned an empty findings array. The final complete browser run passed 57 cases against shell `0ed64e53298b2112`, with zero page errors and no Chrome installability errors. All 66 served shell asset hashes match the checkout.

The final matrix includes all five dashboard routes at 390/820/1440 in light/dark (30 cases), install guide at 320/360/390/430/768/820/1024/1440 in light/dark (16), and 11 named installability/functional/environment cases. This is browser automation, not manual physical-device testing. The asset hashes in browser-evidence.json verify all 66 served shell files against the checkout. Native sheet Close/Escape controls retain existing handling; refresh uses a separate native dialog. Actual PWA install UI remains untested on physical devices.

## Tooling limits

Chrome [removed Lighthouse's PWA category](https://developer.chrome.com/blog/update-install-criteria). This review uses actual `Page.getInstallabilityErrors`, manifest/icon response checks, worker lifecycle and offline browser behavior; it does not claim a nonexistent Lighthouse PWA score.

Initial default-sandbox npm test could not connect to localhost (EACCES); the loopback-enabled run passed 134/134. Persistent Chrome profiles under this deep Windows worktree caused Cache Storage `InvalidAccessError: Entry already exists` even for one URL. A short temporary profile resolves that harness constraint; profiles are left for OS cleanup, with no file deletion performed. An early guide selector also matched retained closed-dialog content; active-page scoping corrected the harness. These attempts are not counted as successful browser cases. Keeping the extra installability CDP session attached also interfered with Playwright offline emulation (`navigator.onLine` stayed true); detaching it before that phase corrected the harness. A closed-form dirty warning and installed/waiting registration timing race were found and fixed in source; their final targeted flows pass. No visual redesign or full scored critique is claimed.

## Not tested / risks

Physical iPhone/iPad standalone launch and OS versions, Android native install UI, real desktop installation, Safari/WebKit rendering, screen readers and physical notch/home-indicator behavior are not tested. Emulated environment branches do not prove physical installation. No production deploy or endpoint was used. Localhost qualifies as a secure context; physical-device testing requires a separate owner-approved HTTPS preview, not this loopback URL.

Financial data remains a page-local synthetic preview. Offline shell support is not offline financial write support. No push notifications. User inputs and current session state reset on an explicitly accepted reload. Normal browser storage eviction may remove the cached shell. Existing fixed-filename assets require regenerating the shell version on every source release; the stale-inventory check enforces that for this prototype.

## Review captures

- [Manifest narrow Home](../../../assets/pwa/screenshots/home-narrow.png)
- [Manifest wide Home](../../../assets/pwa/screenshots/home-wide.png)
- [Install guide at iPhone width](pwa-2026-10/install-iphone-width.png)
- [iPad setup guide](pwa-2026-10/setup-ipad-guide.png)
- [Offline shell and disabled entry](pwa-2026-10/offline-shell.png)
- [Waiting update with dirty input](pwa-2026-10/update-with-draft.png)
- [Browser evidence](pwa-2026-10/browser-evidence.json)

## Delivery checkpoint

Implementation `b7bbd2752d6ff8c2af21bb0cc3fe5ada72de12bb` is pushed in [Draft PR #13](https://github.com/kraveerachat/GisSino-Fn/pull/13). Final complete Chrome 155.0.8059.86 verification passed 57 cases, zero page/installability errors, and all 66 served asset hashes match. Full tests pass 134/134; check passes 719 keys and fresh shell; detector has no findings. Initial-head Vercel status and Preview Comments checks are successful. Documentation reconciliation is a subsequent docs-only commit on the same branch; no future SHA is asserted. Keep Draft; owner review and physical-device acceptance pending. No immutable receipt or merge.
