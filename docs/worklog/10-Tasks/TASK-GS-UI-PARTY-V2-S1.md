---
id: TASK-GS-UI-PARTY-V2-S1
type: task
level: log
status: MERGED
updated: 2026-10-26
up: ../00-Index/Task-Dashboard.md
related:
  - ../../pages/party/Page-Party.md
  - ../../design/reviews/PARTY_V2_REVIEW.md
  - ../../project/DECISIONS.md
  - ../../project/OPEN_QUESTIONS.md
  - ../20-Sessions/TASK-GS-UI-PARTY-V2-S1-S1.md
  - ../20-Sessions/TASK-GS-UI-PARTY-V2-S1-INTEGRATION.md
branch: task/gs-ui-party-v2-s1
pr: https://github.com/kraveerachat/GisSino-Fn/pull/11
---
# TASK-GS-UI-PARTY-V2-S1 — Friends and weekly rankings

## Objective and authority

The owner's 2026-10-26 Party brief authorizes a refinement of the approved Party mock UI: preserve personal progress, badges and feed; add eligible Friends and synthetic opted-in Global weekly rankings; turn Members into Friends with exact lookup, request states and at most three clearly synthetic suggestions. Deliver a separate Draft PR against latest main. No merge, production service, directory or finance sharing is authorized. Governance, Project Guide, architecture M7/M8, Vault Rules and affected notes were read. [D34](../../project/DECISIONS.md#d34--party-friends-and-global-preview) records the bounded preview decision.

## Source and interaction

`src/party-preview.js` separates sample people, accepted/pending/blocked relationships, aggregate weekly XP, opt-in/visibility, badges and feed. The ranking period follows the current Asia/Bangkok Monday–Sunday week and ties use deterministic competition ranks. `src/party-ui.js` renders compact top-three Friends and Global boards, a Friends summary, exact username/six-digit-code search, Search/Requests/Friends subviews and a three-tier visibility sheet. `src/app.js` keeps all changes in page memory, reuses the native dialog controller and restores focus. `src/styles/party.css` scopes responsive enamel composition, 44px friend targets and stable mobile/desktop sheet motion. Thai and English strings live in the catalog.

Friends includes accepted eligible friends and eligible viewer. Global includes all eligible opted-in sample participants, including qualifying friends. Private, ranking-opted-out, blocked, wrong-week and unavailable-metric people cannot rank. No selector reads account, transaction or attachment records. The original Party fixtures and Home habit link are preserved; no Home financial calculation or XP award rule changes. The recommendation list is preview-only; real discoverability, audience policy, M7 aggregates and M8 authorization remain [OPEN](../../project/OPEN_QUESTIONS.md).

## Verification and delivery

See [S1](../20-Sessions/TASK-GS-UI-PARTY-V2-S1-S1.md) for exact commands, tests, browser viewports and review evidence. Preview URL: `http://127.0.0.1:4184/#party`. Screenshots are in [Party review](../../design/reviews/PARTY_V2_REVIEW.md). Source/docs checkpoint `e32ceddbf05491f6038f04142ad44b89fd5ae0b7` was pushed and [Draft PR #11](https://github.com/kraveerachat/GisSino-Fn/pull/11) verified OPEN/DRAFT, mergeable against unchanged main. The owner subsequently approved the mockup and authorized the sequential merge after integration verification. Activity PR #9 and Bills PR #10 are now merged. The integrated Party branch passes check, tests and Chromium review as recorded in the integration session. GitHub confirmed [PR #11](https://github.com/kraveerachat/GisSino-Fn/pull/11) merged at `cd1fa82906c203ba4db93616db6ad6fd3e70a0a3` after mergeability and Vercel checks passed. The task is MERGED; no final immutable receipt is created before task acceptance under workflow §18.

## Open decisions

- Q7: who may appear on a production Global board, and which fields may the audience see?
- Which users explicitly opt into discoverability/recommendations, and what permitted relationship context can generate a suggestion?
- M7: authoritative weekly aggregate freshness/period semantics. M8: authenticated exact lookup, rate limits, blocked-user handling, request persistence and cross-user authorization.
- Owner approved the mockup and GitHub confirmed the final merge.
- Activity PR #9 is merged as D33, Bills PR #10 is merged as D35, and Party remains D34. Shared files were integrated and retested.

## Integration checkpoint

A normal merge of main after PR #10 into this branch retains the Activity, Bills and Party preview systems. [Integration session](../20-Sessions/TASK-GS-UI-PARTY-V2-S1-INTEGRATION.md) records 693 translation keys per language, 121/121 tests and browser route/interaction evidence. The original task scope remains synthetic and in memory.

## External merge closeout

PR #11 is merged. Final main passed `npm run check` (693 keys per locale), `npm test` (121/121), and 30 Chromium route/theme/viewport cases with no page or console errors and no horizontal overflow. The original reviewed Party design remains synthetic and in memory.
