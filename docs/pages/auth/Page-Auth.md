---
id: PAGE-auth
type: page
level: 2
status: DESIGNED
updated: 2026-10-17
up: ../Pages-Hub.md
related:
  - ../../design/ONBOARDING_HOME_V2_ROADMAP.md
  - ../../design/SCREEN_MAP.md
  - ../../project/PROJECT_GUIDE.md
  - ../../architecture/SYSTEM_ARCHITECTURE.md
  - ../../project/OPEN_QUESTIONS.md
tasks: [TASK-GS-PLAN-005]
---
# Authentication and Onboarding

## Current state

Authentication and onboarding are specified and designed in the planning roadmap ([ONBOARDING_HOME_V2_ROADMAP.md](../../design/ONBOARDING_HOME_V2_ROADMAP.md)). No prototype implementation or live authentication endpoints exist in the current buildless mock UI.

## Purpose and rules

- Gate access through invite-only registration [DECIDED invariant].
- Offer modern WebAuthn Passkey login alongside email and password [DECIDED direction].
- Welcome returning authenticated users directly to Home (`#home`).
- Guide new registered members through a structured first-time setup wizard before displaying Home.
- Collect minimal demographic data (birth year for age category; gender optional with "ไม่ระบุ") [PROPOSED].
- Present a clear, affirmative privacy and consent disclosure covering financial data, demographic categorizations, and slip image storage [DECIDED].
- Present an celebratory, dismissible Welcome Postcard exactly once upon completing onboarding [DECIDED].

## Planned screens and states

The onboarding flow follows the sequence detailed in [ONBOARDING_HOME_V2_ROADMAP.md §2](../../design/ONBOARDING_HOME_V2_ROADMAP.md#2-pre-home-flow-specification):

1. **A01 Welcome (`#welcome`):** GisSino brand mark, S-Shield glyph, product intro, "เข้าสู่ระบบ", "สมัครสมาชิกด้วยรหัสเชิญ".
2. **A02 Login (`#login`):** Passkey quick action, email, password, forgot password link, rate-limiting and unavailable states.
3. **A03 Invite Sign-up (`#signup`):** Invite code verification, expiration handling, password and Passkey registration.
4. **A04 Profile Setup (`#setup/profile`):** Real name, display nickname, preset avatar selection.
5. **A05 About You (`#setup/about`):** Birth year (derives Child, Youth, Working Age, or Retired category); gender with "ไม่ระบุ"; income range strictly conditional on spending board rules.
6. **A06 Privacy and Consent (`#setup/consent`):** Plain-language disclosure of collection purpose, visibility rules, slip image storage, account deletion, and affirmative consent checkbox.
7. **A07 First Accounts (`#setup/accounts`):** Bank, E-Wallet, Cash presets with opening balances and THB/USD currency.
8. **A08 Notification Setup (`#setup/notifications`):** In-app inbox, Web Push permission trigger, email digest toggle.
9. **A09 Installation Guide (`#setup/install`):** Platform-specific guidance for Android, iOS Safari, and Desktop PWA installation.
10. **A10 Welcome Postcard (`#postcard`):** Single-view dismissible celebration card proceeding to Home.

## Data and engines used

- Identity & Credentials: `users`, `credentials`, `passkeys`, `sessions`, `invites` (Milestone M1).
- Demographic metadata: `birth_year`, `gender`, `consented_at`, `consent_version`, `welcome_seen_at`.
- Ledger initial state: `accounts`, `ledger_entries` (Milestone M2).

## States and edge cases

- *Invalid / Expired Invite:* Informative feedback requesting a new code from the administrator.
- *Rate Limiting:* Progressive lockout on failed login attempts.
- *Minor Consent:* **[OPEN — OPEN_QUESTIONS.md Q3]** Parent/guardian acknowledgement path for users below a minimum age threshold. The specific threshold (e.g., < 13, < 15, < 20) has not been decided; it must be confirmed against Thailand PDPA requirements before any implementation.
- *Session Expiry:* Graceful redirect to login with return URL preservation.

## Decisions and open questions

- Minimum signup age and minor consent under Thailand PDPA remain [OPEN].
- Spending ranking metric and conditional income range collection remain [OPEN] (Conflict 1).
- Verbal mentions of exact birth date and marital status are marked `PENDING CLARIFICATION / NOT APPROVED`.

## Change log

- 2026-10-17 — Created as part of [TASK-GS-PLAN-005](../../worklog/10-Tasks/TASK-GS-PLAN-005.md) to define the canonical Pre-Home and Onboarding specification.
- 2026-10-17 — Corrections: minor consent threshold changed to **[OPEN]** pending PDPA confirmation. Auth parameters (invite code format, expiry, password policy) are **[PROPOSED]**, not decided.
