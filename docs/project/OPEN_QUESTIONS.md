---
id: PROJECT-OPEN-QUESTIONS
type: guide
level: 2
status: CURRENT
updated: 2026-10-16
up: Project-Hub.md
related:
  - PROJECT_GUIDE.md
  - DECISIONS.md
  - ../architecture/SYSTEM_ARCHITECTURE.md
---
# Open Questions

These questions come from the Project Guide and System Architecture. Agents must not silently choose answers.

| Topic | State | Source question |
|---|---|---|
| Domain and tunnel | [OPEN] | Reuse an AEGIS subdomain or use a new domain/tunnel? |
| Physical host | [OPEN] | Same physical server as AEGIS or a separate one? |
| Production stack | [OPEN] | Confirm Next.js, self-hosted PostgreSQL, PostgreSQL job queue, and an auth library with passkey support. |
| LLM | [OPEN] | Provider, monthly budget, and whether processing must remain local. |
| Email | [OPEN] | Provider for password reset and digests. |
| FX | [OPEN] | Verify availability and terms for the selected daily USD→THB source. |
| Backups | [OPEN] | Choose the off-host backup destination. |
| Party visibility | [OPEN] | Decide whether Full visibility may include itemized data; source recommendation is never. |
| Party invites | [OPEN] | Owner-only or any member? |
| Dates | [OPEN] | Offer Buddhist-era display? |
| CSV import | [OPEN] | Which Thai banks should be supported later? |
| Development shell | [OPEN] | Confirm the owner’s ongoing development OS/shell; current repository work uses Windows/PowerShell. |
| Primary navigation | [DECIDED 2026-10-16] | Closed by [D23](DECISIONS.md#d23--responsive-primary-navigation). |

## Change log

- 2026-10-16 — Consolidated open decisions from both owner-supplied source documents.
