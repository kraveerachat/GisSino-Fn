---
id: PAGE-AUTH
type: page
level: 2
status: PROTOTYPE (mock data)
updated: 2026-10-17
up: ../Pages-Hub.md
related:
  - ../../design/UI_DESIGN_SPEC.md
  - ../../design/SCREEN_MAP.md
  - ../../design/UI_DATA_CONTRACTS.md
  - ../../project/DECISIONS.md
  - ../../worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md
---
# Auth and Welcome

## Current state

Eleven public pre-Home screens form one navigable design preview. Welcome has exactly one Get Started action → Entry → Login or invitation signup. Login never authenticates: its valid UI submission clears the fields and stays on Login with an unavailable message. A separate labelled demo action opens the existing Home. Signup validates form presentation or allows a no-data skip → Profile → About You → Privacy/Consent → First Accounts → Notifications → Install → Postcard → Home preview. [Screen Map](../../design/SCREEN_MAP.md) lists exact hashes; [D27](../../project/DECISIONS.md#d27--owner-requested-pre-home-preview-revision) records the owner's dated revision. [S3](../../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md) is IN PROGRESS pending final delivery reconciliation.

Source: [welcome.js](../../../src/welcome.js), [preview-flow.js](../../../src/preview-flow.js), [welcome.css](../../../src/styles/welcome.css), [app.js](../../../src/app.js). All visible copy uses existing TH/EN catalogs and locale state. Public screens have one logo and one main with title/focus updates, hash Back/Forward and safe fallback to Welcome. They omit dashboard header/sidebar/floating navigation/Add and financial values. Explicit Home remains a synthetic review route; presentation routing is not an authorization boundary. Public light appearance preserves dashboard theme preference.

## Preview controls and data limits

Login has email/password fields, show/hide, linked validation and separate unavailable Passkey/reset controls. Arbitrary credentials never prove authentication. Signup has invitation/email/password/confirm UI, required/email-shape/match errors and explicit preview continuation; production invite format/expiry and password policy stay OPEN. No hardcoded demo credentials are used. Credentials remain DOM-only, clear on route replacement or valid submission and never enter the model, storage, cookies, logs or network.

Profile and About You are separate steps. Display name/nickname and preset avatar choices are temporary; no image upload. Birth year is optional AD with approximate age; gender is optional Male/Female/Prefer not to say. No exact birth date, marital status, age bands, guardian consent or minor eligibility system is adopted. Privacy/Consent shows plain principles and a demonstration checkbox without legal consent, timestamps or compliance claims. First Accounts reuses existing provider registry/logos and Bank/E-Wallet/Cash plus THB/USD choice, with no balance/conversion/save or financial fixture mutation. Notification choices stay local and request no browser permission, send no email and register no service worker. Install gives platform instructions only. Postcard uses an escaped nickname if supplied and makes no saved-registration claim or completion timestamp. Refresh resets all preview values. [UI Data Contracts](../../design/UI_DATA_CONTRACTS.md) owns the exact allowlist.

## Artwork and responsive composition

Light Porcelain × Premium Blue Architectural Enamel remains the owner-pinned world. The exact white/blue shield adopted in [S2](../../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S2.md) remains unchanged at the shared canonical path; [brand provenance](../../../assets/brand/README.md) retains its source/checksum history. No logo or background was regenerated or redownloaded.

| Delivery asset | Intrinsic dimensions | Bytes |
|---|---|---:|
| [mobile.webp](../../../assets/welcome/mobile.webp) | 1080×1920 | 54846 |
| [tablet-portrait.webp](../../../assets/welcome/tablet-portrait.webp) | 1536×2048 | 72940 |
| [tablet-landscape.webp](../../../assets/welcome/tablet-landscape.webp) | 2048×1536 | 77260 |
| [desktop.webp](../../../assets/welcome/desktop.webp) | 2560×1440 | 92054 |

[Asset provenance](../../../assets/welcome/README.md) records unchanged originals and JSON origin sidecars. One decorative picture now covers the full intentional region at center, replacing the historical contain bands. It keeps aspect ratio while allowing art-directed cropping. Tablet portrait source matches both axes >=600px first; landscape tablet uses width >=768px and either height >=900px/width <=1439px, or height >=600px/width <=1279px. Desktop >=1280px follows; mobile is fallback. Thus 1024×1366 uses portrait tablet, 1366×1024 landscape tablet and 1280×800 desktop.

Mobile portrait has a larger centered brand group and reachable action; short portrait compacts it. Tablet portrait centers a larger composition; landscape >=900px wide and >=600px high aligns shield, wordmark and action in a wider right region. Short landscape has two compact columns. Later screens use a calmer veil and simple mobile fields, wider porcelain panels and contextual copy. Long forms scroll intentionally. Safe-area padding and >=44px controls remain. [Tokens](../../design/DESIGN_TOKENS.md) records exact observed values.

## Interaction and installation guidance

Controls retain visible focus; the route-focus main does not draw an oversized outline. Inline errors use described text, summary alert and first-invalid focus. Previous/Continue navigate all six setup steps, with a direct Welcome exit on each step and Postcard. Only Postcard uses the 320ms arrival; reduced motion removes animation/transitions. Artwork remains pointer-inert.

Installation wording is guide-only, based on [Apple's iPhone web-app guidance](https://support.apple.com/en-lamr/guide/iphone/iphea86e5236/ios) and [Chrome's web-app guidance](https://support.google.com/chrome/answer/9658361?hl=en-0), as verified by the implementing parent. No browser/device installation or platform support certification is implied.

## Decisions and preserved history

Original D4 and S1/S2 remain historical records. [D25](../../project/DECISIONS.md#d25--a01-welcome-art-directed-public-preview) replaced only the proposed dark centered A01 card; D26 adopted the exact shield. D27 now supersedes D4's direct Welcome choice and D25's placeholder/contain treatment only for this owner-requested preview. Planning [PR #5](https://github.com/kraveerachat/GisSino-Fn/pull/5) stays untouched at `03065adbb023aafaac15a26bca99a123f6c2fe0e`; [its roadmap](https://github.com/kraveerachat/GisSino-Fn/blob/03065adbb023aafaac15a26bca99a123f6c2fe0e/docs/design/ONBOARDING_HOME_V2_ROADMAP.md) is a read-only reference. Unmerged demographic, privacy and production-model proposals are not silently adopted or copied wholesale.

## Verification and limits

Parent-executed `npm run check` passed 479 keys per locale; `npm test` passed 52/52. Directly inspected `artifacts/welcome-s3/qa.json` contains 154 route/viewport measurements (11 routes × 14 sizes), 40 captures, 13 passing functional groups and empty errors/issues. Documenter directly compared eight representative final images to source and incumbent direction. Full independent B assessment reports 63 passing checks and one P2 signup recovery issue: blur-error removal moved Submit during pointer down/up. Parent applied correction `a5aa80ece3c1a01619795c7ca3d1276d0d7a9672` and reran checks. Targeted B recheck resolved the P2: with confirm still focused, one pointer click kept Submit y=541.390625 through down/up/click, reached `#setup/profile` and cleared prior credential nodes (`signup-recovery-correction.json`). Historical 63-pass/one-failure evidence remains in assessment-b.json; current open verified issues are P0/P1/P2/P3=0. Final finish reviewer returned **SHIP**, all five sections, material fixes None, after 40 captures plus two canonical references and the resolved correction. Deliberate CSP probe refusals are separate from app errors 0/0/0. Parent confirms PR title/body updated; final documentation commit/push and branch/remote/PR SHA synchronization remain pending. [S3](../../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md) owns the precise evidence and remaining gates. Local artifacts are ignored and are not public screenshot URLs. No physical iPad/device, screen-reader, real browser zoom, cross-browser or production verification is claimed.

## Change log

- 2026-10-17 — Created for [Welcome task](../../worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md); [S1](../../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S1.md) records historical implementation and receipt.
- 2026-10-17 — Exact owner replacement shield adopted; [S2](../../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S2.md) records asset-only checks.
- 2026-10-17 — [S3](../../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md) expands responsive Welcome into the eleven-route design preview; D27 preserves D4 history and all real security/data boundaries.
