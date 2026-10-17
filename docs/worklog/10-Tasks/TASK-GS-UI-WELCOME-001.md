---
id: TASK-GS-UI-WELCOME-001
type: task
level: log
status: IN PROGRESS
updated: 2026-10-17
up: ../00-Index/Task-Dashboard.md
related:
  - ../../pages/auth/Page-Auth.md
  - ../../design/UI_DESIGN_SPEC.md
  - ../../design/SCREEN_MAP.md
  - ../../project/DECISIONS.md
  - ../20-Sessions/TASK-GS-UI-WELCOME-001-S1.md
---
# TASK-GS-UI-WELCOME-001

## Current state

A01 responsive Welcome and honest Login/Sign-up placeholders are implemented and locally verified. Fresh documenter comparison finds an ordinary scoped extension of the incumbent enamel system; root DESIGN.md and absent sidecar are preserved. Independent finish reviewer returned **ship**, with no material fixes; independent browser confirmation is clean. Final checkpoint reconciliation, commit/push/new Draft PR and final receipt are pending at this documentation checkpoint. Status remains IN PROGRESS; no merge or production action.

- Branch: `task/gs-ui-welcome-001`.
- Verified main base: `a028036bcea997245fd4d2536c121813d2c2dd33`, including merged [PR #4](https://github.com/kraveerachat/GisSino-Fn/pull/4).
- Source/assets/tests checkpoint: `598bff84aa53fa76341c0dfc761e07bbb7466195` (18 files).
- Final documentation/delivery SHA: PENDING.
- New Draft PR URL: PENDING creation; intended title `feat(ui): add responsive GisSino welcome screen`.
- Planning [PR #5](https://github.com/kraveerachat/GisSino-Fn/pull/5): verified OPEN/DRAFT at `03065adbb023aafaac15a26bca99a123f6c2fe0e`; must remain untouched and unmerged.

## Objective and authority

Implement only the owner-approved A01 Welcome using the exact four supplied background assets and existing canonical GisSino S-Shield, with Thai-first catalog copy, meaningful public route actions and explicit preview disclosure. The owner explicitly authorizes implementation, verification, documentation, task-branch commit/push and one Draft PR; final merge stays with the owner.

Read canonical governance, adapter, guide, architecture, vault rules and decisions. The current [planning roadmap at immutable tip](https://github.com/kraveerachat/GisSino-Fn/blob/03065adbb023aafaac15a26bca99a123f6c2fe0e/docs/design/ONBOARDING_HOME_V2_ROADMAP.md) was read from the planning checkout because it is absent from verified main. [D25](../../project/DECISIONS.md#d25--a01-welcome-art-directed-public-preview) supersedes its proposed dark centered tablet/desktop A01 card treatment only, dated 2026-10-17. Other planning-only auth/setup/privacy/demographic rules remain unadopted.

## Scope, safety and dependencies

One public renderer, focused Welcome stylesheet, app routing/default entry, eight new shared i18n keys, responsive WebPs with provenance, server WebP MIME, component check coverage and relevant tests. Reuse canonical logo helper, local Noto Sans Thai, theme primitives, hash history and locale callback. Preserve explicit Home, Account Board, Wallet detail and dashboard navigation.

No real Login, signup, Passkey, session, onboarding, credentials, storage, backend, database, financial logic, external integration, deployment, AEGIS modification, deletion, force-push or merge. Public-vs-dashboard presentation is not a security boundary.

## Task map and acceptance

- [x] Verify latest main, existing branding/routing/tokens/catalogs and planning history; isolate on the named task branch.
- [x] Inspect exact original PNG headers, preserve originals and create four optimized delivery variants without crop/stretch/upscale.
- [x] Implement default/no-hash Welcome, public Login/signup placeholders and Back to Welcome without a Home bypass.
- [x] Verify responsive art selection, single logo, Thai/English, focus/history, reduced motion, touch targets and retained dashboard behavior.
- [x] Reconcile canonical living docs, D25, task/session, dashboard and milestone history; fresh source/capture comparison.
- [x] Complete independent finish review and fresh browser confirmation; reviewer returned **ship**, no material fixes.
- [ ] Complete final Git delivery/status reconciliation.
- [ ] Commit/push task branch, create/verify one Draft PR and synchronize exact SHAs/URL.
- [ ] Create one immutable final receipt and leave the Draft PR for owner review.

## Behavior and assets

[Auth/Welcome](../../pages/auth/Page-Auth.md) owns the page contract. No hash and unsupported entry resolve to Welcome. Public light rendering preserves the earlier dashboard theme. Login/signup show only destination name, authentication-unavailable copy, Back to Welcome and prototype disclosure. No dashboard chrome or financial fixtures render publicly.

[Asset README](../../../assets/welcome/README.md) records actual originals 2160×3840 / 2304×3072 / 3072×2304 / 3840×2160 and checksums; these differ from the smaller reviewed copies described in the task. WebP output: mobile 1080×1920/54846 bytes; tablet portrait 1536×2048/72940; tablet landscape 2048×1536/77260; desktop 2560×1440/92054. FFmpeg quality90 downsampling preserves aspect ratio. JSON origin sidecars provide fallback metadata rather than embedded WebP metadata. Four exact owner originals remain unchanged; no logo/art regeneration. The logo in this task remains byte-identical to committed main and uses the shared helper. A separate uncommitted alternate shield in the primary checkout was left untouched; this task does not copy or adopt that variant.

One picture selects desktop at width >=1280px, otherwise tablet at >=600px in both axes by orientation, else mobile (including 844×390). Contain/left-bottom preserves geometry; neutral bands are intentional. Content centers at portrait, uses the right region at landscape >=900px with height >=600px, and compacts to two columns on shorter landscape with document scrolling. CTAs are 56px, compact portrait 52px; all controls meet 44px. Motion 320ms/240ms and 6px entrance, 120ms button feedback; reduced motion disables it.

## Verification evidence

Parent-executed `npm run check`: PASS, 383 keys per locale. Parent-executed `npm test`: PASS, 41 tests (baseline 34 plus seven Welcome cases), including preview WebP MIME. Documenter directly read local ignored `artifacts/welcome/qa.json`: 10 viewport cases, 10 passing functional groups and zero errors. Correct single matching background request, one logo, no horizontal overflow and minimum 44px controls in all cases.

Required captures: 320×568, 390×844, 844×390, 820×1180, 1180×820, 1440×900, 1920×1080; extra cases 360×800, 430×932, 1280×800. Functional groups cover no-hash/public shell, shared locale/focus/title, CTA placeholders and route focus, history, keyboard order, reduced motion, Home/Account Board/Wallet/Escape, public-light/dashboard-dark restoration, empty hash and absence of auth/session storage/fake success. Parent confirms one mechanical detector scan of welcome.js/app.js/index.html, zero findings. Directly read independent `artifacts/welcome/assessment-b.json`: all four art candidates, one art on first load, public routes/locales/keyboard, retained Home/Account Board, dashboard dark restoration and reduced motion confirmed. Parent confirms no console/page/request errors. Primary contrast is at least 6.09:1, secondary 8.88:1 and solid disclosure 13.25:1; description 5.84:1 is against the ground token only, not a sample of every bitmap pixel. CLS 0 is a single unthrottled 844×390 context observation, not a broad performance certification. Fresh finish reviewer returned **ship**, with no material fixes. Captures/JSON remain ignored local artifacts, not public URLs.

Physical-device, screen-reader, actual browser zoom and cross-browser certification are not claimed. No remaining required viewport is untested in the local browser evidence. Source changes after comparison require renewed affected checks/captures.

## Session register

- [S1 — Implementation, verification and design comparison](../20-Sessions/TASK-GS-UI-WELCOME-001-S1.md) — IN PROGRESS.

## Touches

- [Auth/Welcome](../../pages/auth/Page-Auth.md), [Pages Hub](../../pages/Pages-Hub.md).
- [UI specification](../../design/UI_DESIGN_SPEC.md), [Tokens](../../design/DESIGN_TOKENS.md), [Components](../../design/COMPONENT_INVENTORY.md), [Screen Map](../../design/SCREEN_MAP.md), [UI Data Contracts](../../design/UI_DATA_CONTRACTS.md).
- [Decisions](../../project/DECISIONS.md), [Project History](../../project/PROJECT_HISTORY.md), [Start Here](../../START_HERE.md), [Dashboard](../00-Index/Task-Dashboard.md).
- [Account Board task](TASK-GS-UI-ACCOUNT-BOARD-001.md): dated PR #4 MERGED reconciliation only; historical checkpoints/receipts preserved.

## Open decisions and next action

No open A01 implementation decision. Actual auth/setup design belongs to later tasks and planning PR #5 remains untouched. Parent completes authorized commit/push/new Draft PR; replace PENDING SHA/URL only with verified values, reconcile task/session/dashboard/focus and create one final receipt. Owner reviews and merges separately.
