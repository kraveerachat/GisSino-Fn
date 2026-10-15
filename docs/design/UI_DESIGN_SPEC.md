# UI design specification

## Authority and scope

The 16 October 2026 written brief, supplied blue-enamel Image A, and owner-selected HTML/CSS/JavaScript preview stack guide this work. This specification does not approve a production framework or financial domain implementation. Project guide, architecture, universal workflow, and references B/C remain unavailable. Image A now governs the three focused screens; B/C contents are not invented.

## Screen composition

Home leads with a substantial sky-blue cover, compact profile/header, cobalt balance hero, and four enamel quick actions. The curved cover transition opens onto a cohesive account list, recent transactions, safe-to-spend/commitment strip, monthly bars, and habit progress. At 390×844 the cover is approximately 374px high. Mobile stacks this information; tablet and desktop add supporting columns.

Transfer reuses the cover with an account source panel. Its deep-blue body contains an oval amount editor, own-account destinations, tactile pill keypad, and an unsaved review. It starts at zero; physical keyboard editing remains possible and `inputmode="none"` avoids a second mobile keypad. The polite amount status confirms custom-keypad changes. Credit Card Liability Detail adapts Image A's original card visual and six-tile action grid to supported tracking previews. A single indicator represents the single sample card. No card network branding, real credentials, freeze/online/contactless controls, or payment execution is present.

Latest mobile footer: Home / Wallet / Activity / More capsule and a separate right-hand Add circle. More is a native nonmodal popover containing Bills and Party, not a route. Add retains the existing bottom sheet. Settings stays under the avatar. Browser hash history supports direct destinations and Back/Forward; navigation focuses main content and remembers scroll positions. Wallet-origin card details return to Wallet and retain its active context; Bills-origin or directly opened cards use Bills/More. Desktop rail styling remains intact, with Wallet added.

## Material and interaction

Desktop navigation at 1100px follows GS-UI-002: 72px collapsed rail, 240px temporary overlay with unchanged 72px content offset, and 240px pinned layout offset. Hover entry/exit delays are 150/180ms; panel entry/exit transitions are 240/190ms and label reveal is 140ms. A stable toggle pins/unpins; unpin suppresses hover until a fresh pointer entry. Keyboard focus reveals navigation labels; Escape dismisses temporary expansion while retaining pin preference. The controller keeps pin in session memory, cancels stale timers and clears transient ownership when the shell rerenders. Home/Wallet/Activity/Bills/Party are direct desktop links; Add is one separate header action invoking the existing sheet. Desktop dimensions, motion and layering use shared tokens. Reduced motion removes spatial transitions; forced colors preserves boundaries/selection.

Opaque enamel panels have a gentle upper-left highlight and restrained offset contact shadows. Inputs, selected segmented controls, and icon wells are recessed. Buttons have hover, pressed, focus-visible, and disabled states. No glass, decorative blur, continuous animation, neon, rainbow gradients, or third-party animation framework is used.

The sheet enters in 300ms with ease-out; button state transitions are 120–180ms. No-spend preview has one brief seal response. Reduced-motion preferences remove those animations while retaining visible state. Native dialog provides modal keyboard containment and Escape; close returns focus to the opener. Sheets scroll independently and respect safe-area padding.

## Copy, fixtures, and privacy

Thai is the default; all component copy uses the Thai/English catalogs. Product logotype, numeric account suffixes, generated currency notation, and technical references are not translated. A sticky sample-data indicator identifies all screens. Every entry result, receipt, AI, invitation, and setting explanation states its preview boundary. User text is escaped before HTML rendering.

Fixtures are immutable examples in `src/fixtures.js`, not accounts or a schema. No financial/user data is saved, no file is read or uploaded, and no external request is made by the app. Theme, locale, form, and visibility state also reset on reload. Party shares only habit metrics; visibility controls change the owner's displayed shared metrics while leaving private personal progress intact.

## Responsive and accessibility target

Primary reference: 390 CSS px. Supported layout target starts at 320px, with 600/900/1100px adaptations. Horizontal gutters start at 16px. Controls have at least 44px hit dimensions; the very narrow calendar changes to an agenda instead of squeezing dates. Cards and rows grow around translated text. Typography, focus, contrast, zoom, actual touch keyboards, and screen-reader behavior require verification rather than a blanket certification.

The preview server is loopback-only and refuses production startup. Production auth, finance, persistence, bank services, AI, subscription posting, PWA caching, and deployment remain outside this slice.
