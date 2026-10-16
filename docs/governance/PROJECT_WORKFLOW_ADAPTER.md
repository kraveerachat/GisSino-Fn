---
id: PROJECT-ADAPTER
type: governance
level: 2
status: DRAFT
updated: 2026-10-16
up: Governance-Hub.md
related:
  - UNIVERSAL_AGENT_GITHUB_OBSIDIAN_WORKFLOW.md
  - VAULT_RULES.md
---

# Project Workflow Adapter — GisSino_FN

> **Target location in the repository:** `docs/governance/PROJECT_WORKFLOW_ADAPTER.md`
> Fills in the "Project Adapter" required by §2 of the Universal Workflow. Values marked **[OWNER TO CONFIRM]** are drafted from what the owner described and from the current repository; an agent must not treat them as final until the owner confirms.
> Permissions are `true` only because the owner described this exact flow: an agent implements, opens/updates **one Draft PR per task**, and the owner reviews and merges. Nothing here authorizes production changes, deletions, force-pushes or merges.

```yaml
project_name: "GisSino_FN"
repository_url: "https://github.com/kraveerachat/GisSino-Fn"
default_branch: "main"
repo_root: "<LOCAL_ABSOLUTE_PATH>"            # [OWNER TO CONFIRM] — each agent verifies its own checkout
platform_and_shell: "Windows / PowerShell"    # [OWNER TO CONFIRM] — from README and task notes
repo_agent_instructions: "AGENTS.md"          # to be created; CLAUDE.md should only point to it
workflow_master: "docs/governance/UNIVERSAL_AGENT_GITHUB_OBSIDIAN_WORKFLOW.md"

project_requirements:                         # read in this order before any task
  - "docs/project/PROJECT_GUIDE.md"           # WHAT / WHY (from GisSino_01_PROJECT_GUIDE.md)
  - "docs/project/DECISIONS.md"
  - "docs/architecture/SYSTEM_ARCHITECTURE.md"  # HOW (from GisSino_02_SYSTEM_ARCHITECTURE.md)
  - "docs/governance/VAULT_RULES.md"
  - "docs/design/UI_DESIGN_SPEC.md"           # for UI tasks

obsidian:
  mode: "in-repo"
  vault_root: "docs"                          # open this folder as the Obsidian vault
  canonical_root: "docs/worklog"             # work log: tasks, sessions, handovers, receipts
  architecture_notes: "docs/architecture"     # replaces the workflow's 30-Architecture
  design_notes: "docs/design"                 # living UI specs
  design_reviews: "docs/design/reviews"       # per-task design evidence reports
  templates_root: "docs/templates"            # excluded from graph and health checks
  external_vault_path: null
  external_vault_repository: null
  commit_dot_obsidian_folder: false

github:
  branch_prefix: "task/"
  use_draft_pr: true
  auto_commit_at_verified_checkpoint: true
  auto_push_when_authorized: true
  one_task_one_branch_one_pr: true            # follow-up fixes go into the SAME PR
  automatic_merge: false                      # owner merges

permissions:                                  # [OWNER TO CONFIRM]
  allow_repo_write: true
  allow_git_commit: true
  allow_git_push: true                        # task branches only; never main; never force
  allow_docs_write: true
  allow_production_mutation: false

sensitive_systems_do_not_touch:
  - "AEGIS project: server, Cloudflare tunnel, firewall, Docker networks/volumes, databases"
  - "Any production host or credential"
  - ".env files and secrets"

required_checks:                              # from README (buildless preview stage)
  - "npm run check"
  - "npm test"
  # add lint/typecheck/build when the production stack is chosen

owner_approval_required_for:
  - "destructive_changes"                     # deleting/moving files, data, history rewriting
  - "new_external_service_or_paid_dependency"
  - "production_changes"
  - "new_security_boundary"
  - "new_top_level_docs_folder_or_hub"
  - "renaming_or_deleting_notes"
  - "final_merge"
```

## Notes for agents

1. **Preview vs production stage.** The repository currently holds a Thai-first, mobile-first **mock-data UI prototype** (vanilla HTML/CSS/JS, in-memory data, no backend). The production stack in `SYSTEM_ARCHITECTURE.md §5` is `[PROPOSED]`, not yet adopted. Do not assume prototype code or `src/fixtures.js` carries into production.
2. **Conflicts between prototype and documents** (for example the navigation layout) are reported to the owner and recorded in `DECISIONS.md`; they are not silently resolved.
3. **Task IDs** follow `TASK-<short-name>` (existing examples: `TASK-GS-UI-BASELINE-001`, `TASK-FLOATING-ISLAND-NAVIGATION`). Keep a stable ID per task.
4. **Follow-up fixes to an open PR** reuse the same task branch, same Draft PR and same task note; add a new session note instead of a new PR.
5. **Missing source of truth:** if any file listed in `project_requirements` cannot be read, stop and tell the owner instead of proceeding from memory.
