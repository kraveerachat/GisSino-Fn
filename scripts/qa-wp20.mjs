// WP-20 browser checks. PLAYWRIGHT_MODULE and CHROME_BINARY select local tooling;
// QA_URL points at a running `npm run dev` server; QA_OUT receives screenshots/results
// (default: a new folder in the OS temp directory, never inside the repository).
import { createRequire } from 'node:module';
import { mkdtemp, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = (process.env.QA_URL || 'http://127.0.0.1:4173').replace(/\/$/, '') + '/';
const out = process.env.QA_OUT || await mkdtemp(path.join(os.tmpdir(), 'gs-wp20-'));
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BINARY });
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok: !!ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`); };
async function page(width, height, { touch = width < 1100, dark = false } = {}) {
  const context = await browser.newContext({ viewport: { width, height }, hasTouch: touch, isMobile: touch && width < 900, colorScheme: dark ? 'dark' : 'light', serviceWorkers: 'block' });
  const p = await context.newPage(); p.errors = []; p.on('pageerror', error => p.errors.push(error.message));
  return p;
}
const go = (p, hash) => p.evaluate(h => { location.hash = h; }, hash).then(() => p.waitForTimeout(250));
const toastText = p => p.evaluate(() => { const t = document.querySelector('#toast'); return t && !t.hidden ? t.textContent : null; });
async function settings(p, { locale, theme }) {
  await go(p, 'settings');
  await p.selectOption('#locale-select', locale);
  await p.click(`[data-action="set-theme"][data-theme="${theme}"]`);
}

try {
  // F1: once scrolled into view, the primary action and keypad are not under the island.
  for (const [w, h] of [[360, 740], [390, 844], [820, 1180], [1180, 820], [1440, 900], [1920, 1080]]) {
    const p = await page(w, h); await p.goto(base + '#transfer'); await p.waitForTimeout(400);
    const covered = await p.evaluate(() => ['[data-action=review-transfer]', ...[1,2,3,4,5,6,7,8,9,0].map(k => `[data-key="${k}"]`)].filter(selector => {
      const element = document.querySelector(selector); element.scrollIntoView({ block: 'nearest' });
      const r = element.getBoundingClientRect(), top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return !element.contains(top);
    }));
    check(`F1 transfer action/keypad uncovered at ${w}x${h}`, !covered.length, covered.join(' '));
    await p.context().close();
  }
  // F2/F3/F13/F8: account scenario across every picker, TH and EN.
  for (const locale of ['th', 'en']) {
    const p = await page(390, 844); await p.goto(base + '#home'); await p.waitForTimeout(300);
    if (locale === 'en') { await settings(p, { locale, theme: 'light' }); await go(p, 'home'); }
    await p.click('[data-action=add-account]'); await p.fill('#profile-nickname', 'QA Holiday'); await p.fill('#profile-opening', '55.25'); await p.click('#account-profile-form button[type=submit]'); await p.waitForTimeout(250);
    await go(p, 'wallet/account/daily'); await p.click('[data-action=edit-account]');
    await p.fill('#profile-nickname', 'QA Holiday'); const dupe = await p.evaluate(() => !document.querySelector('#profile-name-duplicate').hidden);
    await p.fill('#profile-nickname', 'Family food fund'); await p.click('#account-profile-form button[type=submit]'); await p.waitForTimeout(250);
    await go(p, 'home');
    const caption = await p.evaluate(() => document.querySelector('.hero-context span').textContent.trim());
    const pickers = {};
    for (const mode of ['expense', 'income']) { await p.click(`.blue-quick[data-mode=${mode}]`); pickers[mode] = await p.$$eval('#entry-account option', o => o.map(x => x.textContent)); await p.keyboard.press('Escape'); await p.waitForTimeout(200); }
    await go(p, 'transfer'); pickers.source = await p.$$eval('#transfer-source option', o => o.map(x => x.textContent)); pickers.destination = await p.$$eval('.destination-chip', o => o.map(x => x.textContent.trim()));
    await go(p, 'bills'); await p.click('[data-action=bill-add]'); pickers.funding = await p.$$eval('select[name=funding] option', o => o.map(x => x.textContent)); await p.keyboard.press('Escape');
    const all = Object.values(pickers);
    check(`F2 [${locale}] new + renamed account in Add Expense/Income, Transfer both ends, Bills funding`, all.every(list => list.some(x => x.includes('QA Holiday')) && list.some(x => x.includes('Family food fund'))));
    check(`F2 [${locale}] hero caption says 7`, /\b7\b/.test(caption), caption);
    check(`F3 [${locale}] no raw IDs in Bills funding`, pickers.funding.every(x => !/^[a-z0-9-]+$/.test(x)), pickers.funding.join(' | '));
    check(`F13 [${locale}] duplicate-name hint shown and save still allowed`, dupe);
    check(`F2 [${locale}] no page errors`, !p.errors.length, p.errors.join(' '));
    await p.context().close();
  }
  // F4 transfer draft, F5 credit card, F6 sheet history, F9 search, F10/F11 toasts, F14 friends rank.
  {
    const p = await page(390, 844); await p.goto(base + '#welcome'); await p.waitForTimeout(500);
    check('F10 Welcome shows no update-failure toast', !(await toastText(p)));
    await go(p, 'transfer'); for (const k of '999999') await p.click(`[data-key="${k}"]`);
    await go(p, 'home'); await go(p, 'transfer'); for (const k of '500') await p.click(`[data-key="${k}"]`);
    check('F4 transfer draft starts empty after leaving', await p.inputValue('#transfer-amount') === '500');
    await p.click('[data-action=review-transfer]');
    check('F4 transfer review has Confirm preview entry', await p.isVisible('#sheet [data-action=confirm-entry-preview]'));
    await p.goBack(); await p.waitForTimeout(300);
    check('F6 Back closes the transfer review and stays on #transfer', !(await p.evaluate(() => document.querySelector('#sheet').open)) && (await p.evaluate(() => location.hash)) === '#transfer' && await p.inputValue('#transfer-amount') === '500');
    await go(p, 'activity'); const before = await p.evaluate(() => history.length);
    await p.click('[data-action=transaction]'); await p.click('#sheet [data-action=close]'); await p.waitForTimeout(300);
    check('F6 closing by X pops the sheet entry', !(await p.evaluate(() => document.querySelector('#sheet').open)) && (await p.evaluate(() => location.hash)) === '#activity');
    await p.click('[data-action=transaction]'); await p.keyboard.press('Escape'); await p.waitForTimeout(300);
    await p.goBack(); await p.waitForTimeout(300);
    check('F6 after Escape, Back leaves the page normally (no dead sheet entry)', (await p.evaluate(() => location.hash)) === '#transfer', `history ${before}`);
    await go(p, 'activity'); await p.fill('#activity-search', '8,500'); await p.waitForTimeout(250);
    check('F9 search "8,500" finds the rent row', (await p.$$eval('#activity-results .transaction-row', r => r.length)) === 1);
    await go(p, 'bills'); await p.click('[data-action=bill][data-id="card-2026-10"]'); await p.click('[data-action=bill-pay-review]'); await p.click('[data-action=bill-pay-confirm]'); await p.keyboard.press('Escape');
    await go(p, 'wallet'); const wallet = await p.evaluate(() => document.querySelector('#main').innerText);
    await go(p, 'credit-card'); const card = await p.$eval('.card-info-row', r => r.innerText);
    check('F5 paying the card moves Wallet due 12,750 → 4,500 and the card page shows 0 / paid', /4,500/.test(wallet) && !/12,750/.test(wallet) && /฿0\.00/.test(card), card.replace(/\n/g, ' '));
    await go(p, 'settings'); await p.click('.pwa-settings-tools [data-pwa-action=refresh]'); await p.waitForTimeout(300);
    check('F11 Refresh gives visible feedback', !!(await toastText(p)), await toastText(p));
    check('F11 placeholder rows are badged before tapping', (await p.$$eval('.settings-soon', b => b.length)) === 5);
    await go(p, 'party'); check('F14 friends board shows your position', await p.isVisible('.party-board-friends .is-own-position'));
    await p.click('[data-action=visibility]'); const radios = await p.$$eval('#sheet input[type=radio]', r => r.map(x => { const b = x.getBoundingClientRect(), l = x.closest('label').getBoundingClientRect(); return [b.width, b.height, l.height]; }));
    check('F15 visibility radios ≥24px with ≥44px rows', radios.every(([w, h, row]) => w >= 24 && h >= 24 && row >= 44), JSON.stringify(radios));
    check('F4–F14 no page errors', !p.errors.length, p.errors.join(' '));
    await p.context().close();
  }
  // F15 keyboard: focus enters the sheet, never lands on BODY, returns to the opener.
  {
    const p = await page(1440, 900, { touch: false }); await p.goto(base + '#home'); await p.waitForTimeout(400);
    await p.focus('.blue-quick[data-mode=expense]'); await p.keyboard.press('Enter'); await p.waitForTimeout(200);
    const inside = await p.evaluate(() => document.querySelector('#sheet').contains(document.activeElement));
    let body = 0; for (let i = 0; i < 24; i++) { await p.keyboard.press('Tab'); if (await p.evaluate(() => document.activeElement === document.body || !document.querySelector('#sheet').contains(document.activeElement))) body++; }
    await p.keyboard.press('Escape'); await p.waitForTimeout(200);
    const back = await p.evaluate(() => document.activeElement?.dataset.mode);
    check('F15 sheet focus moves inside, stays inside for 24 Tabs and returns to the opener', inside && body === 0 && back === 'expense', `outside=${body} return=${back}`);
    const stops = await p.evaluate(() => [...document.querySelectorAll('.account-board a,.account-board button,.account-board [tabindex]')].filter(e => e.tabIndex >= 0 && e.getClientRects().length && !e.closest('[inert]')).length);
    check('F15 account board tab stops ≤ 5 (was ~10)', stops <= 5, String(stops));
    const profile = await p.evaluate(() => [...document.querySelectorAll('[data-action=settings]')].filter(e => e.tabIndex >= 0 && e.getClientRects().length).length);
    check('F15 one profile tab stop on desktop', profile === 1, String(profile));
    await p.context().close();
  }
  // F16: doubled computed font sizes do not overflow horizontally; nav labels do not collide.
  for (const [w, h] of [[360, 740], [820, 1180], [1440, 900]]) for (const locale of ['th', 'en']) {
    const p = await page(w, h); await p.goto(base + '#home'); await settings(p, { locale, theme: 'light' });
    for (const route of ['home', 'wallet', 'activity', 'bills', 'party', 'settings']) {
      await go(p, route);
      const r = await p.evaluate(() => {
        const els = [...document.querySelectorAll('body *')], sizes = els.map(e => parseFloat(getComputedStyle(e).fontSize));
        els.forEach((e, i) => e.style.setProperty('font-size', sizes[i] * 2 + 'px', 'important'));
        const labels = [...document.querySelectorAll('.floating-islands .nav-item>span:last-child')].filter(e => e.getClientRects().length).map(e => e.getBoundingClientRect());
        let collide = 0; for (let i = 1; i < labels.length; i++) if (labels[i].left < labels[i - 1].right - 1) collide++;
        const result = { sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, collide };
        els.forEach(e => e.style.removeProperty('font-size'));
        return result;
      });
      check(`F16 2× text ${w} ${locale} ${route}`, r.sw <= r.cw && !r.collide, JSON.stringify(r));
    }
    await p.context().close();
  }
  // Acceptance matrix: 6 sizes × light/dark × TH/EN × 8 pages, 0 page errors, 0 horizontal overflow.
  let cells = 0; const bad = [];
  for (const [w, h] of [[360, 740], [390, 844], [820, 1180], [1180, 820], [1440, 900], [1920, 1080]]) for (const theme of ['light', 'dark']) for (const locale of ['th', 'en']) {
    const p = await page(w, h, { dark: theme === 'dark' }); await p.goto(base + '#home'); await settings(p, { locale, theme });
    for (const route of ['home', 'wallet', 'activity', 'bills', 'party', 'settings', 'transfer', 'credit-card']) {
      await go(p, route); cells++;
      const o = await p.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
      if (o[0] > o[1]) bad.push(`${w}x${h} ${theme} ${locale} ${route} ${o[0]}>${o[1]}`);
      if (route === 'home' && w === 390) await p.screenshot({ path: path.join(out, `M-${w}-${theme}-${locale}-${route}.png`) });
    }
    if (p.errors.length) bad.push(`${w}x${h} ${theme} ${locale} errors: ${p.errors.join(' ')}`);
    await p.context().close();
  }
  check(`Matrix ${cells} cells: 0 page errors, 0 horizontal overflow`, !bad.length, bad.slice(0, 5).join(' ; '));
  // Cross-page canonical values.
  {
    const p = await page(1440, 900, { touch: false }); await p.goto(base + '#home'); await p.waitForTimeout(400);
    const home = await p.evaluate(() => document.querySelector('#main').innerText);
    await go(p, 'party'); const party = await p.evaluate(() => document.querySelector('#main').innerText);
    await go(p, 'activity'); const activity = await p.evaluate(() => document.querySelector('#main').innerText);
    await go(p, 'wallet'); const wallet = await p.evaluate(() => document.querySelector('#main').innerText);
    await p.click('[data-action=wallet-activity][data-id=daily]'); await p.waitForTimeout(200);
    const outflow = await p.$eval('[data-action=wallet-activity][data-id=daily]', b => b.textContent);
    check('Cross-page: assets 116,850 on Home and Wallet', /116,850/.test(home) && /116,850/.test(wallet));
    check('Cross-page: Activity expense 15,240 and Wallet October outflow 15,240', /15,240/.test(activity) && /15,240/.test(outflow), outflow);
    check('Cross-page: Party week 12–18 Oct 2026 with 80 weekly XP, Home streak 3', /12 ต\.ค\. 2026\s*–\s*18 ต\.ค\. 2026/.test(party) && /(^|\D)80(\D|$)/.test(party) && /(^|\D)3(\D|$)/.test(home));
    await p.context().close();
  }
} finally {
  await writeFile(path.join(out, 'results.json'), JSON.stringify(results, null, 1));
  await browser.close();
}
const failed = results.filter(r => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed · evidence: ${out}`);
assert.equal(failed.length, 0, failed.map(f => f.name).join('\n'));
