# GisSino preview

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Owner selected lightweight HTML, CSS, and JavaScript for this local preview on 16 October 2026. Native ES modules, CSS custom properties, and a development-only Node.js server; no application dependencies or framework decision for the eventual production product.

## Users

A Thai-speaking owner and invited family members reviewing a personal finance interface.

## Product Purpose

Make balances, spending, upcoming commitments, and personal financial habits easy to understand on a phone. This deliverable is an interactive design preview, not a financial system.

## Capabilities and Constraints

Latest mobile navigation: Home, Wallet, Activity, and More inside one floating capsule, with a separate Add action on the right opening the existing sheet. More contains Bills and Party. Settings remains under the profile control. Wallet uses existing synthetic accounts, explicit account categories, and separately labelled card liabilities; there is no new Accounts backend. Card details preserve Wallet or Bills entry context. The desktop rail retains its styling and existing destinations, with Wallet access added. Synthetic fixtures are visibly identified, never persisted, and unavailable when NODE_ENV is production. No authentication, financial calculations, database, AI execution, uploads, deployment, AEGIS access, or external integrations are implemented.

## Brand Commitments

GisSino. Thai-first messages. Approved Glossy Enamel material direction with Sky Blue & Cobalt Enamel light appearance and Graphite & Amber dark appearance. Reference A governs component appearance; Reference B governs mobile composition. The green banking palette is not adopted.

## Evidence on Hand

The owner supplied the blue-enamel three-phone Image A and a redesign specification, alongside the earlier explicit HTML/CSS/JavaScript stack selection. Image A guides Home, own-account Transfer, and Credit Card Liability Detail. References B/C, the project guide, system architecture, and universal workflow remain unavailable. Visual fidelity is qualitative; no pixel-perfect or production architecture approval is claimed.

## Product Principles

- Label preview data and unavailable capabilities honestly.
- Keep personal finance details out of shared Party views.
- Prioritize one-handed use, understandable state, and keyboard access.
- Preserve confirmed product and privacy boundaries in future integration.

## Accessibility & Inclusion

Thai and English catalogs, local Thai/Latin font, minimum 44px controls, visible focus, semantic navigation, keyboard-operable modal sheets, responsive text, and reduced-motion alternatives.

## Desktop navigation — GS-UI-002

The latest desktop-specific decision supersedes the fixed rail described above: a collapsed icon rail supports temporary hover/keyboard label disclosure and session-only pinned expansion. Add moves from the sidebar to the existing content header. All five destinations remain direct links; mobile navigation, screen content, and synthetic financial boundaries are preserved. See docs/design/reviews/DESKTOP_SIDEBAR_REVIEW.md for the state contract and verification limits.
