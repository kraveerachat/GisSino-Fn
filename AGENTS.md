# GisSino agent instructions

Before changing this repository, read these notes in order:

1. `docs/governance/UNIVERSAL_AGENT_GITHUB_OBSIDIAN_WORKFLOW.md`
2. `docs/governance/PROJECT_WORKFLOW_ADAPTER.md`
3. `docs/project/PROJECT_GUIDE.md`
4. `docs/architecture/SYSTEM_ARCHITECTURE.md`
5. `docs/governance/VAULT_RULES.md`
6. `docs/project/DECISIONS.md`
7. The active task note and every page, architecture, or design note it affects

Use `docs/` as the Obsidian vault root. Follow the documentation duties in §8 of `docs/governance/VAULT_RULES.md` for every task: keep the task note, session note when substantial, dashboard row, related links, history at milestones, status, and final receipt synchronized with the real repository and GitHub state.

Never modify the separate AEGIS project or use it as a writable dependency. Do not deploy to production, delete user data, force-push, or merge pull requests. Use one named task branch and one Draft PR per task unless the owner explicitly directs otherwise.
