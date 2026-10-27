import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { transferProblem, isFutureDate, openingBalanceMinor } from '../src/amount.js';
import { routeForHash, linksToCurrentPage } from '../src/navigation.js';
import { previewScenarios, homePreviewControls } from '../src/home-overview.js';
import { homePreview, accounts } from '../src/fixtures.js';
import { flags } from '../src/config/feature-flags.js';
import { partyFriendsSheet } from '../src/party-ui.js';
import { createPartySession } from '../src/party-preview.js';
import { applyProfile, accountProfileForm, profileDraft } from '../src/account-profile.js';
import { addForm } from '../src/screens.js';
import { translator } from '../src/i18n.js';

const root = path.resolve(import.meta.dirname, '..');
const source = file => readFile(path.join(root, file), 'utf8');

test('Fix 1: Transfer review blocks amounts above the source balance and at or below zero', async () => {
  const daily = accounts.find(a => a.id === 'daily').balanceMinor; // ฿68,450
  assert.equal(transferProblem('99999999', daily, false), 'transferInsufficient');
  assert.equal(transferProblem('68450.01', daily, false), 'transferInsufficient');
  assert.equal(transferProblem('68450', daily, false), null);
  for (const bad of ['0', '0.00', '-5', '', 'abc']) assert.equal(transferProblem(bad, daily, false), 'transferAmountError');
  assert.equal(transferProblem('10', daily, true), 'transferAmountError');
  assert.equal(transferProblem('10', undefined, false), null);
  const app = await source('src/app.js');
  assert.match(app, /transferProblem\(state\.transferAmount,accounts\.find\(a=>a\.id===state\.transferSource\)\?\.balanceMinor/);
  assert.match(app, /error\.textContent=t\(problem\);error\.hidden=false/);
  for (const locale of ['th', 'en']) assert.ok(translator(locale)('transferInsufficient').length > 5);
});

test('Fix 2: Add entry rejects dates later than the mock today', async () => {
  const today = homePreview.nowLocal.slice(0, 10);
  assert.equal(isFutureDate('2026-10-19', today), true);
  assert.equal(isFutureDate(today, today), false);
  assert.equal(isFutureDate('2026-10-01', today), false);
  assert.equal(isFutureDate('', today), false);
  assert.match(addForm('expense', { locale: 'en' }, translator('en')), new RegExp(`id="entry-date"[^>]*max="${today}"`));
  assert.match(await source('src/app.js'), /isFutureDate\(form\.elements\.date\.value,homePreview\.nowLocal\.slice\(0,10\)\)\) errors\.push\(\{field:'date',key:'dateFutureError'\}\)/);
});

test('Fix 3: Unknown hashes fall back to Welcome and replace the URL', async () => {
  const valid = ['home', 'wallet', 'welcome'];
  assert.deepEqual(routeForHash('#bogus', valid), { route: 'welcome', replace: true });
  assert.deepEqual(routeForHash('#home', valid), { route: 'home', replace: false });
  assert.deepEqual(routeForHash('', valid), { route: 'welcome', replace: false });
  assert.deepEqual(routeForHash('#main', valid), { route: null, replace: false });
  const app = await source('src/app.js');
  assert.match(app, /if\(initialRoute\.replace\)history\.replaceState\(null,'','#'\+initialRoute\.route\)/);
  assert.match(app, /history\.replaceState\(null,'','#'\+fallback\.route\);next=fallback\.route;/);
  assert.doesNotMatch(app, /location\.hash='welcome'/);
});

test('Fix 4: No-op Home scenarios are hidden behind a flag that defaults off', () => {
  assert.equal(flags.homeScenarioExtras, false);
  assert.deepEqual(previewScenarios, ['sample', 'actionable', 'clear']);
  const html = homePreviewControls({ homeScenario: 'sample', homeNow: homePreview.nowLocal }, translator('en'));
  assert.ok(!html.includes('value="shortfall"') && !html.includes('value="party"'));
  assert.ok(html.includes('value="actionable"'));
});

test('Fix 5: A sheet link to the current page closes the sheet', async () => {
  assert.equal(linksToCurrentPage('#bills', '#bills'), true);
  assert.equal(linksToCurrentPage('#bills', '#home'), false);
  assert.equal(linksToCurrentPage('https://example.com', '#bills'), false);
  assert.match(await source('src/app.js'), /if \(link && linksToCurrentPage\(link\.getAttribute\('href'\), location\.hash\)\) \{ closeSheet\(\); return; \}/);
});

test('Fix 6: Party friend search button says friends in Thai and English', () => {
  for (const [locale, label] of [['en', 'Search friends'], ['th', 'ค้นหาเพื่อน']]) {
    const html = partyFriendsSheet({ locale }, translator(locale), createPartySession());
    assert.match(html, new RegExp(`<button type="submit" class="button primary">[\\s\\S]*?<span>${label}</span></button>`));
    assert.ok(!html.includes(translator(locale)('search')));
  }
});

test('Fix 7: Onboarding radios and checkboxes are at least 24px inside 48px rows', async () => {
  const css = await source('src/styles/welcome.css');
  assert.match(css, /\.flow-radio-group input,\.flow-check input \{ width:24px; height:24px;/);
  assert.match(css, /\.flow-radio-group label,\.flow-check \{[^}]*min-height:48px/);
});

test('Fix 8: Add account records an optional opening balance in balanceMinor', () => {
  assert.equal(openingBalanceMinor(''), undefined);
  assert.equal(openingBalanceMinor('1500'), 150000);
  assert.equal(openingBalanceMinor('0'), 0);
  assert.equal(openingBalanceMinor('12.5'), 1250);
  for (const bad of ['-1', '1.234', 'abc', '1e3']) assert.equal(openingBalanceMinor(bad), null);
  const base = { accountType: 'bank', providerId: 'kbank', nickname: 'New' };
  assert.equal(applyProfile(accounts, { ...base, openingBalance: '2500.75' }, null, 'n1').at(-1).balanceMinor, 250075);
  assert.equal(applyProfile(accounts, base, null, 'n2').at(-1).balanceMinor, undefined);
  assert.throws(() => applyProfile(accounts, { ...base, openingBalance: '-3' }, null, 'n3'), /profileOpeningError/);
  // Editing keeps the existing balance and offers no opening field.
  assert.equal(applyProfile(accounts, { ...base, openingBalance: '1' }, 'daily').find(a => a.id === 'daily').balanceMinor, 6845000);
  const t = translator('en'), state = { locale: 'en', balanceVisible: true };
  assert.ok(accountProfileForm(profileDraft(null, state, t), state, t, false).includes('name="openingBalance"'));
  assert.ok(!accountProfileForm(profileDraft(accounts[0], state, t), state, t, true).includes('name="openingBalance"'));
});
