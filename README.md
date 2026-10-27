# GisSino FN — Mock Data Draft v1

A Thai-first, mobile-first personal finance interface in vanilla HTML, CSS, and JavaScript. The owner selected this stack for the preview only; it does not decide the production framework.

This repository is the first reviewable source baseline of the local GisSino UI prototype. All names, balances, transactions, summaries, and card details are synthetic design-preview content.

## Run

Requires Node.js 20 or later. No npm installation or third-party application packages are required.

```powershell
npm install
npm run dev
```

Open http://127.0.0.1:4173. Stop the server with Ctrl+C. Set `$env:PORT` before starting to use a different port.

```powershell
npm run check
npm test
```

`check` verifies module syntax, catalog parity, local asset paths, and catalog-only Thai component text. Tests cover translations, safe user-input rendering, amount formatting, production refusal, HTTP method restrictions, and encoded path traversal. Tests bind an ephemeral loopback port and require permission to use local sockets in a restricted sandbox.

## Explore

Desktop navigation at 1100px and wider now uses a compact icon rail, temporary hover/keyboard disclosure, and session-only pinned expansion. Add is a separate upper-right header action opening the existing sheet. See [desktop sidebar review](docs/design/reviews/DESKTOP_SIDEBAR_REVIEW.md) for interaction checks and limits. Older design reports describe their historical delivery state.

Mobile navigation now uses Home / Wallet / Activity / More plus a separate Add circle. More opens Bills and Party in a floating panel. Wallet (`#wallet`) reuses sample accounts and separates card liabilities. See [navigation task report](docs/design/reviews/FLOATING_NAVIGATION_REVIEW.md) for implementation, tests, screenshots, and the missing video/Git limitations.

- Home: balance visibility, accounts, quick actions, recent activity, commitments, habits.
- Transfer (`#transfer`): editable amount, tactile keypad, own-account selection, validation, and an explicitly unsaved review.
- Credit Card (`#credit-card`): original sample card, liability summary, six tracking previews, and an in-memory reminder switch.
- Activity: search, type filters, transaction details, and sample/empty/loading/error/unavailable states.
- Add: expense, income, own-account transfer, synthetic receipt attachment, no-spend check-in, and explicitly inactive AI.
- Bills: October 2026 sample list/calendar, detail sheets, and preview states. Under 360px the calendar adapts to a readable agenda with large targets.
- Party: habits, milestones, members, invitations, weekly consistency, and visibility toggles that affect only the owner's shared metrics.
- Settings: use the avatar to switch Thai/English and light/dark appearance and inspect future setting sections.

## Boundaries

Everything is synthetic and stays in memory. Reloading resets the preview. There is no financial persistence, real account, authentication, upload, AI call, payment, live exchange rate, database, production integration, deployment, or service worker. An Obsidian-compatible task note records this UI slice.

The server binds only to `127.0.0.1`, allows GET/HEAD for public preview files, rejects path traversal and mutation methods, and refuses startup when `NODE_ENV=production`. There is deliberately no production build/deploy command. `src/fixtures.js` belongs to this development preview and must not be imported into a future production app.

The supplied blue-enamel Image A guides the revised Home, own-account Transfer, and Credit Card Liability Detail. References B/C and authoritative project/workflow documents remain unavailable. See docs/design/reviews/BLUE_ENAMEL_REVIEW.md for fidelity, review evidence, and limits.

## Design and review

See [UI specification](docs/design/UI_DESIGN_SPEC.md), [tokens](docs/design/DESIGN_TOKENS.md), [screen map](docs/design/SCREEN_MAP.md), [component inventory](docs/design/COMPONENT_INVENTORY.md), [UI data boundaries](docs/design/UI_DATA_CONTRACTS.md), and [verification](docs/design/reviews/VERIFICATION.md).

Noto Sans Thai is self-hosted under the [SIL Open Font License](assets/fonts/OFL.txt). Its variable font supports the Thai and Latin text used here; the browser loads it from this server with `font-display: swap`. Upstream source: https://github.com/google/fonts/tree/main/ofl/notosansthai. No font service receives browsing requests.

## PWA sample shell

Run `npm run pwa:build` after changing shell code/assets; `npm run check` detects a stale inventory. The existing `npm run dev` serves the root manifest, worker and generated shield icons. PWA features require HTTPS or localhost. Settings provides installation guidance and Refresh; the existing setup guide is reused. Offline mode caches the sample shell only and does not save or sync financial entries. Updates wait for explicit Refresh; dirty input can be kept instead of discarded. See the [Batch A review](docs/design/reviews/PWA_SHELL_REVIEW.md) for actual browser evidence and untested devices.

For browser checks, set `PLAYWRIGHT_MODULE` to an installed Playwright module and `CHROME_BINARY` to Chrome, start the local preview, then run `node scripts/qa-pwa.mjs` (`PWA_URL` defaults to localhost:4188). The test uses a short temporary Chrome profile on Windows and writes sample screenshots/evidence. It does not install a real app or delete profiles.
