---
id: PAGE-AUTH
type: page
level: 2
status: PROTOTYPE (public design preview)
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

A01 Welcome exists as the default no-hash entry and explicit `#welcome` route. `#login` and `#signup` are minimal, honest placeholders only. Source: [welcome.js](../../../src/welcome.js), [welcome.css](../../../src/styles/welcome.css) and [app.js](../../../src/app.js). No real authentication, credentials, session, passkey, invitation validation, setup, backend or persistence is implemented.

## Purpose and rules

S1 retained the canonical shield from verified main. Superseded 2026-10-17 in [S2](../../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S2.md): the owner explicitly selected the white/blue PNG already at the primary checkout's canonical path. Its exact bytes now occupy that same shared asset path. The owner source remains untouched; no logo rendering, sizing or route code changed. [Brand provenance](../../../assets/brand/README.md) records the current checksum and historical asset.

The owner-approved one-screen task introduces GisSino through Light Porcelain × Premium Blue Architectural Enamel. One unmodified canonical [S-Shield](../../../assets/brand/gissino-s-shield.png), live GisSino wordmark, exact Thai catalog tagline and supporting description, two native route CTAs, shared TH/EN locale select and prototype disclosure are rendered as HTML over artwork. Login/signup actions never silently enter Home. Placeholders explain authentication is unavailable and provide Back to Welcome.

Public routes omit dashboard header, sidebar, mobile floating navigation, Add and balances. Explicit `#home` remains available for synthetic dashboard review; this separation is not an authorization boundary. Public light appearance preserves the prior dashboard theme preference. All visible copy uses the existing catalogs and locale state.

## Artwork and responsive composition

Four supplied background-only images remain separate from the canonical logo. [Asset provenance and dimensions](../../../assets/welcome/README.md) records unchanged-source SHA256s, WebP outputs and JSON origin sidecars; these sidecars are the metadata fallback, not embedded WebP metadata.

| Delivery asset | Intrinsic dimensions | Bytes |
|---|---|---:|
| [mobile.webp](../../../assets/welcome/mobile.webp) | 1080×1920 | 54846 |
| [tablet-portrait.webp](../../../assets/welcome/tablet-portrait.webp) | 1536×2048 | 72940 |
| [tablet-landscape.webp](../../../assets/welcome/tablet-landscape.webp) | 2048×1536 | 77260 |
| [desktop.webp](../../../assets/welcome/desktop.webp) | 2560×1440 | 92054 |

Desktop art wins at width >=1280px; otherwise both axes >=600px select tablet art by orientation; mobile is the fallback, including 844×390. The single picture loads the matching candidate. Whole artwork is contained at left/bottom without stretch/crop; porcelain bands where ratios differ are intentional. Mobile/portrait center content within 400px; landscape width >=900px and height >=600px uses the right content region; short landscape uses compact two columns with ordinary document scrolling. Safe-area padding, flexible text and minimum 44px controls preserve access.

## Interaction, states and accessibility

Route changes focus main, update document title/language, and preserve browser Back/Forward. Both CTA variants have focus/hover/pressed/disabled styles; current CTAs are enabled navigation links. Reduced motion disables logo/action entrances and CTA transitions. The artwork is decorative and pointer-inert. Prototype disclosure remains directly under the actions at 14px on solid porcelain. No fake successful save or login state exists.

## Decisions and planning history

[D25](../../project/DECISIONS.md#d25--a01-welcome-art-directed-public-preview), 2026-10-17, supersedes only the earlier **PROPOSED dark centered-card tablet/desktop A01** treatment in the [immutable planning roadmap](https://github.com/kraveerachat/GisSino-Fn/blob/03065adbb023aafaac15a26bca99a123f6c2fe0e/docs/design/ONBOARDING_HOME_V2_ROADMAP.md). Planning [PR #5](https://github.com/kraveerachat/GisSino-Fn/pull/5) remains OPEN/DRAFT and untouched at that verified tip. Its other proposed auth/setup/privacy/demographic rules are not adopted by this task. This canonical path is first introduced on the main-based welcome branch; planning-only files are not copied wholesale.

## Verification and limits

The parent ran `npm run check` (383 keys per locale) and `npm test` (41 passing tests). Local `artifacts/welcome/qa.json` records 10 viewport cases and 10 passing functional groups with zero errors: correct single-art requests, no horizontal overflow, one logo, >=44px controls, locale/focus/history, honest placeholders, reduced motion and retained dashboard/Wallet/theme behavior. Seven required sizes 320×568, 390×844, 844×390, 820×1180, 1180×820, 1440×900 and 1920×1080 were captured; extras are 360×800, 430×932 and 1280×800. Captures are ignored local artifacts, not published evidence URLs. Independent browser confirmation reports no console/page/request errors; fresh finish reviewer returned **ship**, with no material fixes. Physical devices, screen readers, actual browser zoom and cross-browser certification were not tested.

## Change log

- 2026-10-17 — Created for [TASK-GS-UI-WELCOME-001](../../worklog/10-Tasks/TASK-GS-UI-WELCOME-001.md); [Session S1](../../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S1.md) records source/capture comparison and delivery status.
- 2026-10-17 — Owner-selected exact replacement shield adopted at the shared path; [S2](../../worklog/20-Sessions/TASK-GS-UI-WELCOME-001-S2.md) records fresh logo checks and captures. Earlier S1 visual review remains a historical checkpoint.
