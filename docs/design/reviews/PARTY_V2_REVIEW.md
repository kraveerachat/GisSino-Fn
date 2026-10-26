---
id: REVIEW-PARTY-V2
type: review
level: 2
status: REVIEW
updated: 2026-10-26
up: ../Design-Hub.md
related:
  - ../../pages/party/Page-Party.md
  - ../../worklog/10-Tasks/TASK-GS-UI-PARTY-V2-S1.md
---
# Party v2 — visual and interaction review

## Design read

This is an Operate screen for a Thai-first personal-finance habit preview. The existing light porcelain/enamel world remains the visual authority. The user scans personal progress, compares accepted friends, then sees the wider explicitly opted-in synthetic sample. The main XP card still dominates; Global uses a quieter tint. The Friends card holds the single add action, while repeated search and requests live in a bottom sheet on phone and centered dialog on desktop.

| Before | After | Why |
|---|---|---|
| One sample weekly board treated members as friends | Friends board requires accepted relationship and eligible weekly metric | Friendship and Party membership are distinct |
| Standalone privacy explanation occupied the next block | Compact synthetic Global board follows Friends; privacy remains in Visibility | Adds requested comparison without weakening control |
| Members card and invite placeholder | Friend count/avatars, Add Friend sheet, exact search, requests and limited samples | Gives the preview an actionable path |
| Fixed historical sample week appeared as current | Synthetic fixture follows the current Bangkok week | Period label matches the displayed board |
| Dialog entry could break desktop centering | Scoped centered animation; opaque settled phone capture | Stable placement and readable content |

## Captures

- [Baseline phone](party-assets/before-phone.png) — prior Party screen from the separate Bills preview.
- [Small phone 320px](party-assets/small-phone.png), [phone 390px](party-assets/phone.png), [iPad portrait 768px](party-assets/tablet.png), [iPad landscape 1180px](party-assets/tablet-landscape.png), [desktop 1440px](party-assets/desktop.png).
- [Add Friend sheet on phone](party-assets/friends-sheet-phone.png), [centered desktop dialog](party-assets/friends-dialog-desktop.png) and [dark phone](party-assets/dark-phone.png).

The captures show synthetic data and do not establish pixel fidelity to an external reference. The full browser pass also checked 360, 430, 820, 1280 and 1920px widths. The card retains the approved XP/Level/Streak visual hierarchy, badges and feed. New ranking rows fit without horizontal scroll in tested widths. The native dialog supplies Escape and focus restoration; a focused check confirmed desktop centering, Home habit navigation and 44px friend actions at 320px. The search field uses 16px text to avoid mobile auto-zoom.

## Privacy and remaining work

Friends includes only accepted eligible sample friends plus eligible viewer; Global includes all explicitly opted-in eligible sample people, including friends. Private, opted-out, blocked, wrong-week and missing-metric people do not rank. Search is exact username/six-digit code. Request changes are in-memory examples and reset on refresh. Up to three suggestions are clearly synthetic and imply no real consent or discovery service. Production Global audience, recommendation discoverability, M7 aggregates and M8 auth/rate limits/cross-user tests remain open. No balances, bank names, transactions or attachments are shared in Party.
