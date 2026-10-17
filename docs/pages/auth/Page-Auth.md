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

Eleven public pre-Home screens form one navigable design demonstration. Welcome has exactly one Get Started → Entry → Login or normal signup. Login primary/Google actions → Home; signup primary/Google actions → Profile → About You → Privacy → First Accounts → Notifications → Install → Postcard → Home. Empty and typed credential fields follow the same preview routes without authentication or created-user claims. Signup has no invitation field or invitation copy. [D28](../../project/DECISIONS.md#d28--consumer-copy-and-open-signup-presentation-in-demo-mode) records this owner-requested S4 revision; [Screen Map](../../design/SCREEN_MAP.md) owns hashes and [S4](../../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md) implementation delivery is CLOSED after independent finish SHIP and verified documentation checkpoint `e649eb2228500cf6abaef3958f9b14a1134f5d2c`; owner review/merge remains pending. Closed S1–S3 and the receipt remain historical.

One compact visible header `โหมดสาธิต` / Demo mode indicator appears on every public screen, with an assistive-technology description explaining the environment and unavailable recovery. Ordinary forms/footers use consumer copy without repetitive technical prototype warnings. Every non-Welcome route has one header Back; each setup step and Postcard has one primary action. TH/EN catalogs, main/title focus, hash Back/Forward and safe Welcome fallback remain. Public screens omit dashboard chrome/financial values; the existing Home retains synthetic financial disclosures and theme preference. Presentation routing is not an authorization boundary.

Source: [welcome.js](../../../src/welcome.js), [preview-flow.js](../../../src/preview-flow.js), [welcome.css](../../../src/styles/welcome.css), existing [app.js](../../../src/app.js).

## Preview controls and data limits

Login presents email/password, show/hide, unavailable password recovery, Login and Google actions, an “or” separator and signup link. Signup presents email/password/confirmation, show/hide, signup and Google actions and Login link. No Passkey or invitation control remains in these preview forms. Primary and Google actions explicitly clear existing credential-node values before navigating. App route/locale rerender also clears credential values before innerHTML replacement. They neither require nor authenticate entered data; no hardcoded credentials, OAuth redirect, tokens, session, authenticated identity or success message is created. Credentials stay DOM-only and never enter the transient model, storage, cookies, logs or network. Production input validation and password policy remain M1 requirements.

Profile and About You stay separate. Display name/nickname/preset avatars, optional AD year/approximate age and optional gender are temporary. No uploads, exact date of birth, marital status, age bands, guardian consent or eligibility policy. Optional year syntax validation remains. Privacy principles and a checkbox produce no legal consent/timestamp. First Accounts reuses the existing provider registry/logos, Bank/E-Wallet/Cash and THB/USD with no balances, conversion, save or fixture mutation. Notification choices request no permission, subscribe to nothing and send no email. Installation is guide-only. Postcard may render an escaped nickname with one Home action and no saved-registration or completion claim. Refresh resets the model. [Data Contracts](../../design/UI_DATA_CONTRACTS.md) owns the allowlist.

The owner requested a public signup/Google visual proposal. Canonical production invite-only signup remains in force. Changing it and introducing Google OAuth require separate owner confirmation and security architecture approval before M1; the production invite model and decision history are preserved. See [Open Questions](../../project/OPEN_QUESTIONS.md).

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

Controls retain visible focus; the route-focus main does not draw an oversized outline. Inline errors use described text, summary alert and first-invalid focus. One header Back and one primary Continue navigate all six setup steps; Postcard has one header Back and one Home action. S4 removes S3 duplicate Previous/Welcome exits. Only Postcard uses the 320ms arrival; reduced motion removes animation/transitions. Artwork remains pointer-inert.

Installation wording is guide-only, based on [Apple's iPhone web-app guidance](https://support.apple.com/en-lamr/guide/iphone/iphea86e5236/ios) and [Chrome's web-app guidance](https://support.google.com/chrome/answer/9658361?hl=en-0), as verified by the implementing parent. No browser/device installation or platform support certification is implied.

## Decisions and preserved history

Original D4 and S1/S2 remain historical records. [D25](../../project/DECISIONS.md#d25--a01-welcome-art-directed-public-preview) replaced only the proposed dark centered A01 card; D26 adopted the exact shield. D27 superseded D4's direct Welcome choice and D25's placeholder/contain treatment for S3. D28 supersedes only S3 credential-validation/separate demo/skip, invitation presentation, repeated technical copy and duplicate navigation for S4. Production invite-only signup is unchanged pending separate approval. Planning [PR #5](https://github.com/kraveerachat/GisSino-Fn/pull/5) stays untouched at `03065adbb023aafaac15a26bca99a123f6c2fe0e`; [its roadmap](https://github.com/kraveerachat/GisSino-Fn/blob/03065adbb023aafaac15a26bca99a123f6c2fe0e/docs/design/ONBOARDING_HOME_V2_ROADMAP.md) is a read-only reference. Unmerged demographic, privacy and production-model proposals are not silently adopted or copied wholesale.

## Verification and limits

Parent-executed `npm run check`: PASS 472 keys per locale after review fixes. `npm test`: PASS 52/52 in the elevated rerun; the initial sandbox run was 51/52 because the localhost server test hit EACCES, not an application assertion failure. Documenter inspected final `artifacts/welcome-s4/qa.json`: 154 route/viewport cases, 39 captures, 15 passing functional groups, errors[]/issues[]. The eight primary/Google × empty/typed Login/signup routes include clearing detached credential-node values. Parent reports requests only to local GET assets, with no cookies/storage; visually inspected mobile Login/signup, desktop signup and tablet-landscape Accounts. A scored 32/40, no P0/P1; localized avatar labels, optional-install guidance and Postcard copy were fixed. B passed 44 layout checks, 22 locale/shell cases and four empty flows; its P3 locale detached-credential erasure fix in app.js independently passed targeted recheck (old/new credential nodes empty; TH/EN avatar labels verified), with no open B issue. Parent ran detector exactly once after A: []/exit 0; CSP blocked inline overlay preflight. Final post-fix matrix passed 154 cases/39 captures/15 groups, errors[]/issues[]; final S4 finish review is SHIP, all 39 captures valid and material fixes None. Source checkpoint `269288fe96139950a1ba99901b3884a76a62a98d` contains seven runtime/test files; source/docs were pushed; documentation checkpoint `e649eb2228500cf6abaef3958f9b14a1134f5d2c` matched local/remote/PR head, with final status-only closeout following.

Artifacts are ignored local evidence, not public screenshot URLs. Physical devices/iPad, screen readers, actual browser zoom, cross-browser and production verification are unperformed. [S4](../../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md) owns precise evidence and remaining gates.

## Change log

- 2026-10-17 — Created for [Welcome task](../../worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md); [S1](../../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S1.md) records historical implementation and receipt.
- 2026-10-17 — Exact owner replacement shield adopted; [S2](../../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S2.md) records asset-only checks.
- 2026-10-17 — [S3](../../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S3.md) expands responsive Welcome into the eleven-route design preview; D27 preserves D4 history and all real security/data boundaries.

- 2026-10-17 — [S4](../../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S4.md) / D28 adds consumer copy, compact Demo mode, invitation-free signup/Google presentation and no-data navigation; production invite-only policy stays canonical pending approval.
