---
id: TASK-GS-UI-PARTY-V2-S1
type: task
level: log
status: REVIEW
updated: 2026-10-26
up: ../00-Index/Task-Dashboard.md
related:
  - ../../pages/party/Page-Party.md
  - ../../design/reviews/PARTY_V2_REVIEW.md
  - ../../project/DECISIONS.md
  - ../../project/OPEN_QUESTIONS.md
  - ../20-Sessions/TASK-GS-UI-PARTY-V2-S1-S1.md
branch: task/gs-ui-party-v2-s1
---
# TASK-GS-UI-PARTY-V2-S1 — Friends and weekly rankings

## Objective and authority

The owner's 2026-10-26 Party brief authorizes a refinement of the approved Party mock UI: preserve personal progress, badges and feed; add eligible Friends and synthetic opted-in Global weekly rankings; turn Members into Friends with exact lookup, request states and at most three clearly synthetic suggestions. Deliver a separate Draft PR against latest main. No merge, production service, directory or finance sharing is authorized. Governance, Project Guide, architecture M7/M8, Vault Rules and affected notes were read. [D34](../../project/DECISIONS.md#d34--party-friends-and-global-preview) records the bounded preview decision.

## Source and interaction

`src/party-preview.js` separates sample people, accepted/pending/blocked relationships, aggregate weekly XP, opt-in/visibility, badges and feed. The ranking period follows the current Asia/Bangkok Monday–Sunday week and ties use deterministic competition ranks. `src/party-ui.js` renders compact top-three Friends and Global boards, a Friends summary, exact username/six-digit-code search, Search/Requests/Friends subviews and a three-tier visibility sheet. `src/app.js` keeps all changes in page memory, reuses the native dialog controller and restores focus. `src/styles/party.css` scopes responsive enamel composition, 44px friend targets and stable mobile/desktop sheet motion. Thai and English strings live in the catalog.

Friends includes accepted eligible friends and eligible viewer. Global includes all eligible opted-in sample participants, including qualifying friends. Private, ranking-opted-out, blocked, wrong-week and unavailable-metric people cannot rank. No selector reads account, transaction or attachment records. The original Party fixtures and Home habit link are preserved; no Home financial calculation or XP award rule changes. The recommendation list is preview-only; real discoverability, audience policy, M7 aggregates and M8 authorization remain [OPEN](../../project/OPEN_QUESTIONS.md).

## Verification and delivery

See [S1](../20-Sessions/TASK-GS-UI-PARTY-V2-S1-S1.md) for exact commands, tests, browser viewports and review evidence. Preview URL: `http://127.0.0.1:4184/#party`. Screenshots are in [Party review](../../design/reviews/PARTY_V2_REVIEW.md). Draft PR and owner visual approval are pending at this task-note checkpoint.

## Open decisions

- Q7: who may appear on a production Global board, and which fields may the audience see?
- Which users explicitly opt into discoverability/recommendations, and what permitted relationship context can generate a suggestion?
- M7: authoritative weekly aggregate freshness/period semantics. M8: authenticated exact lookup, rate limits, blocked-user handling, request persistence and cross-user authorization.
- Owner visual approval and final merge are separate from this reviewed local preview.
- Activity PR #9 and Bills PR #10 both currently record D33. Their decision-ID collision belongs to those branches' integration, not this Party PR. If either merges first, integrate the advanced main through a reviewed conflict reconciliation and rerun checks; do not rewrite a sibling PR.
