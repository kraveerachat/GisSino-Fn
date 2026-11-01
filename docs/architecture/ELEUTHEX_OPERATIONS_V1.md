---
id: ARCH-ELEUTHEX-OPERATIONS-V1
type: architecture
level: 2
status: CURRENT
updated: 2026-11-01
up: Architecture-Hub.md
related:
  - SYSTEM_ARCHITECTURE.md
  - ../worklog/10-Tasks/TASK-ELEUTHEX-STRUCTURE-PUBLICATION.md
---

# Eleuthex Discord and Hermes — structure v1

## Current state

Eleuthex is a personal technology community and workfolio. GisSino is its only active project. This note records community operations; it does not change the GisSino application architecture or its proposed production milestones.

| Component | Evidence-backed state as of 2026-11-01 | Not established |
|---|---|---|
| Discord foundation v1 | Applied: five managed categories, seventeen text channels, five project/community roles and five Thai introductory messages. Recovery completed 27 approved operations; saved API verification recorded 102 modeled checks without findings. | Real-member acceptance and explicit owner sign-off remain pending. |
| Discord v2 | Prepared, not applied. The reviewed 34-operation migration stopped before mutation because essential rules were missing from the only proposed pending-member entry point. | No v2 resource, social-role or message migration is claimed complete. Any correction requires a new live plan and explicit approval. |
| Hermes Docker experiment | A separate runtime and historical model smoke test exist; prior read-only metadata reported it running. | Discord linking, authorized Thai chat, unauthorized-user denial and monitoring E2E are not verified. Running processes do not prove the integration. |
| Welcome/leave bot | Research and a conditional candidate only. | No installation, automatic roles or real join/leave test is claimed. |
| Project access and application notifications | Design contracts only. | No deployed approval service, role-grant workflow or application bridge. |

These are dated records from earlier execution/audit sessions. This documentation task makes no Discord, Docker or model call and does not rerun those checks.

## Product and authorization boundaries

- Production GisSino signup remains invite-only under the [Project Guide](../project/PROJECT_GUIDE.md) and [canonical decisions](../project/DECISIONS.md). The public-looking prototype does not change that contract.
- Discord is optional for application users, including family. Discord membership, social roles and project-channel access do not authorize application accounts, Party membership or financial records.
- Human owner review controls privileged community/project access. Public self-assignment, reaction roles and automatic grants are not part of the approved design.
- This repository remains the GisSino PWA repository. Keeping a sanitized operations record here does not deploy an application backend, database, authentication service or production stack.

## Channel responsibilities

| Area | Responsibility | Access principle |
|---|---|---|
| Community information | Introduction, rules, announcements and project participation guidance | Read-only guidance where appropriate; approved posting identities only. |
| Community discussion | General conversation, demonstrations and feedback | Approved community access; no personal finance or applicant data. |
| Project community | Project updates, discussion and support | Explicit project authorization; updates remain read-only to ordinary project members. |
| Private operations | Minimal operational coordination and sanitized notifications | Ordinary and project members do not inherit access; owner-only functions remain excluded from Staff. |
| Staff coordination and logs | Coordination and restricted security/administrative logs | Staff may read designated logs but cannot post, create/reply to threads or manage messages/threads there. |

The exact private channel inventory, live permission arrays, user/bot/resource IDs, execution hashes, operational endpoints and journals are intentionally not published.

## Role responsibilities

| Role concept | Responsibility and limit |
|---|---|
| Community Member | Reviewed community participation, without private operations access. |
| GisSino Member | Explicit project community access, without app-account or finance-data rights. |
| Project Lead grouping | Organizational label; it does not confer global administration or project rights by itself. |
| Staff | Scoped community moderation; excluded from owner-only workflows and restricted from managing designated logs. |
| Integration grouping | No blanket service access. Future integrations require separately reviewed identities and channel scopes. |
| Friends / Family | V2 social-only labels, not applied; alone they grant no protected project or operational access. |

Ownership and administrator bypass are distinct from display roles. Multiple roles combine under Discord precedence; role order alone is not a privacy control. Temporary provisioning authority requires a separate owner-approved hardening/removal decision after verification.

## V2 preparation and acceptance

The prepared target has seven categories and twenty-two text channels, with two additional social roles and a separate access gate. It reuses existing resources and edits only specifically approved introductory messages while preserving IDs.
The gate is intended to be the sole pending-member text entry point after migration. It must include essential rules and a usable owner-reviewed access-request route; pending members must not be directed exclusively to hidden rooms. This behavior is not live yet.
Before any Apply: verify live identity/state, review exact changes and hash, obtain owner approval, preserve journals and stop on drift or ambiguous partial failure. No automatic deletion rollback or permission escalation.
After a separately approved migration: verify resources/overwrites/messages through the API, confirm no duplicates, then test authorized real accounts with ordinary, project, social-combination, Staff and owner profiles. A green fixture suite or modeled API permission calculation is not a real-member test.

## Hermes and future integrations

The runtime experiment is separate from the temporary Discord provisioner. A future Hermes Discord identity must have its own narrowly scoped access and owner-only interaction policy. AI may explain sanitized events; it must not approve users or administer infrastructure.
Keep agent tools disabled until explicitly reviewed. Runtime prompts are guidance, not an access-control boundary. No credentials, financial records or applicant payloads belong in community messages or model prompts.
Any future notification/approval service needs independent authorization, identity validation, replay/idempotency protection, minimized event content and application-side controls. It must not become a mandatory Discord dependency for family users.

## Documentation and source publication streams

The owner selected the existing PUBLIC [GisSino repository](https://github.com/kraveerachat/GisSino-Fn) for sanitized documentation. A previously proposed separate operations repository was not implemented and is superseded.
PR 1 is documentation only. PR 2 is reserved for reviewed provisioning source/tests and safe configuration/runtime templates after an explicitly agreed Discord completion checkpoint. No source, live journals, exports, credentials, sessions, volumes or raw workspace copy is included here.
See the [publication task](../worklog/10-Tasks/TASK-ELEUTHEX-STRUCTURE-PUBLICATION.md) and [session evidence](../worklog/20-Sessions/TASK-ELEUTHEX-STRUCTURE-PUBLICATION-S1.md). Existing [GisSino System Architecture](SYSTEM_ARCHITECTURE.md) remains authoritative and unchanged.

## Change log

- 2026-11-01 — Added a sanitized operations record and publication boundary; no application or live-service change.
