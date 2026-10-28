import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { accounts } from '../src/fixtures.js';
import { translator } from '../src/i18n.js';
import { accountsForPicker, assetAccounts, duplicateAccountName } from '../src/core/accounts.js';
import { pickerAccounts, accountOptionLabel, accountDisplay } from '../src/account-display.js';
import { applyProfile, profileDraft, accountProfileForm } from '../src/account-profile.js';
import { addForm, transactionRow } from '../src/screens.js';
import { heroCaption, transferScreen, creditCardScreen } from '../src/blue-screens.js';
import { billForm, billReview, billFieldError, creditCardCycle, billsText } from '../src/bills-ui.js';
import { validateBillDraft } from '../src/bills-overview.js';
import { amountMatches, filteredActivity, activityModel } from '../src/activity-data.js';
import { activityTransactionDetail } from '../src/activity.js';
import { activityCategories } from '../src/core/activity.js';
import { partyGrid } from '../src/party-ui.js';
import { createPartySession } from '../src/party-preview.js';
import { accountBoard } from '../src/account-board.js';
import { flags, previewControlsVisible } from '../src/config/feature-flags.js';
import { dueTodayFirst, upcomingDueList, homeOverview } from '../src/home-overview.js';
import { homePreview } from '../src/fixtures.js';

const root = path.resolve(import.meta.dirname, '..');
const source = file => readFile(path.join(root, file), 'utf8');
const T = { th: translator('th'), en: translator('en') };
const profiles = () => accounts.map(account => ({ ...account }));
// The QA account scenario: add "QA Holiday" 55.25 and rename "daily".
function scenario() {
  let records = applyProfile(profiles(), { accountType: 'bank', providerId: 'kbank', nickname: 'QA Holiday', openingBalance: '55.25' }, null, 'sample-qa');
  records = applyProfile(records, { ...profileDraft(records.find(a => a.id === 'daily'), { locale: 'en', balanceVisible: true }, T.en), nickname: 'Family food fund' }, 'daily', 'daily');
  return records;
}
const optionTexts = html => [...html.matchAll(/<option value="([^"]*)"[^>]*>([^<]*)<\/option>/g)].map(match => ({ value: match[1], text: match[2] }));
const state = (locale, extra = {}) => ({ locale, balanceVisible: true, route: 'home', accountProfiles: scenario(), transferSource: 'daily', transferDestination: 'savings', transferAmount: '0', billPreviewPaid: [], ...extra });

test('F2: one picker source — archived hidden, one currency, session profiles included', () => {
  const records = [...scenario(), { id: 'old', name: 'accountDaily', accountType: 'bank', currency: 'THB', archived: true, sortOrder: 9 }, { id: 'usd', nickname: 'Dollar', accountType: 'bank', currency: 'USD', archived: false, sortOrder: 10 }];
  const ids = accountsForPicker({ accountProfiles: records }).map(a => a.id);
  assert.deepEqual(ids, ['daily', 'savings', 'reserve', 'everyday-wallet', 'pocket-cash', 'family-savings', 'sample-qa']);
  assert.deepEqual(accountsForPicker({ accountProfiles: records }, { currency: 'USD' }).map(a => a.id), ['usd']);
  assert.deepEqual(assetAccounts(records).map(a => a.id), [...ids, 'usd']);
  // Without session profiles the fixture accounts are the source.
  assert.equal(pickerAccounts({}).length, 6);
});

test('F2: Add Expense, Add Income, Transfer (both ends) and Bills funding list the added and renamed accounts', () => {
  for (const locale of ['th', 'en']) {
    const s = state(locale), t = T[locale];
    for (const mode of ['expense', 'income', 'transfer']) {
      const html = addForm(mode, s, t);
      assert.match(html, /QA Holiday/, `${mode} ${locale}`);
      assert.match(html, /Family food fund •••• 0428/, `${mode} ${locale}`);
    }
    const transfer = transferScreen({ ...s, route: 'transfer' }, t);
    assert.equal((transfer.match(/<option /g) || []).length, 7);
    assert.match(transfer, /data-action="transfer-destination" data-id="sample-qa"/);
    assert.match(transfer, /<span>Family food fund<\/span>/);
    const funding = optionTexts(billForm('monthlyBills', locale, {}, pickerAccounts(s)).split('name="funding"')[1].split('</select>')[0]);
    assert.ok(funding.some(o => o.value === 'sample-qa' && o.text === 'QA Holiday'));
    assert.ok(funding.some(o => o.value === 'daily' && o.text === 'Family food fund •••• 0428'));
  }
});

test('F2: Home hero caption counts the real accounts, pluralized in Thai and English', () => {
  assert.equal(heroCaption(state('en'), T.en), 'Across 7 sample accounts');
  assert.equal(heroCaption(state('th'), T.th), 'จากบัญชีตัวอย่าง 7 บัญชี');
  assert.equal(heroCaption({ accountProfiles: profiles() }, T.en), 'Across 6 sample accounts');
  assert.equal(heroCaption({ accountProfiles: profiles().slice(0, 1) }, T.en), 'Across 1 sample account');
});

test('F3: Bills funding never shows raw IDs or English in Thai mode', () => {
  for (const locale of ['th', 'en']) {
    for (const type of ['installments', 'creditCards', 'monthlyBills', 'subscriptions']) {
      for (const list of [undefined, pickerAccounts(state(locale))]) {
        const options = optionTexts(billForm(type, locale, {}, list).split('name="funding"')[1].split('</select>')[0]);
        assert.ok(options.length >= 7);
        for (const option of options) assert.doesNotMatch(option.text, /^[a-z0-9-]+$/, `${locale} ${type}: ${option.text}`);
        // Fixture names are localized; user nicknames ("QA Holiday", "Family food fund") stay as typed.
        const typed = new Set((list || []).filter(a => a.nickname).map(a => a.id));
        if (locale === 'th') for (const option of options.filter(o => o.value && !typed.has(o.value))) assert.match(option.text, /[฀-๿]/u, option.text);
      }
    }
  }
  const draft = validateBillDraft({ type: 'monthlyBills', title: 'Water', amount: '100', dueDate: '2026-10-25', funding: 'reserve', currency: 'THB' }).draft;
  assert.match(billReview(draft, 'th'), /เงินสำรองวันสบาย •••• 0631/);
  assert.doesNotMatch(billReview(draft, 'th'), />reserve</);
});

test('F4: Transfer draft resets on entering/leaving and the review has an explicit confirm and disclosure', async () => {
  const app = await source('src/app.js');
  assert.match(app, /if\(next!==state\.route&&\(next==='transfer'\|\|state\.route==='transfer'\)\)resetTransferDraft\(\);/);
  assert.match(app, /state\.transferAmount='0';/);
  const review = app.slice(app.indexOf("showSheet('sampleTransferSummary'"), app.indexOf("} else if(action==='card-preview')"));
  assert.match(review, /data-action="confirm-entry-preview"/);
  assert.match(review, /t\('transferNotRecorded'\)/);
  for (const locale of ['th', 'en']) assert.ok(T[locale]('transferNotRecorded').length > 10);
});

test('F5: the credit-card page reads the Bills obligation cycle and shows paid / 0 due after payment', () => {
  for (const locale of ['th', 'en']) {
    const unpaid = creditCardCycle(state(locale));
    assert.equal(unpaid.dueMinor, 825000);
    assert.equal(unpaid.paid, false);
    const paidState = state(locale, { billPreviewPaid: ['card-2026-10'], route: 'credit-card' });
    const paid = creditCardCycle(paidState);
    assert.deepEqual([paid.paid, paid.dueMinor, paid.statementMinor], [true, 0, 825000]);
    const html = creditCardScreen(paidState, T[locale], transactionRow);
    const due = html.match(/<div class="card-info-row"><span>[^<]+<\/span><strong>([^]*?)<\/strong><\/div>/)[1];
    assert.match(due, /฿0\.00/);
    assert.match(due, new RegExp(billsText(locale, 'paid').replace(/[()]/g, '\\$&')));
    assert.match(creditCardScreen(state(locale, { route: 'credit-card' }), T[locale], transactionRow), /฿8,250\.00/);
  }
});

test('F6: sheets push one history entry, Back closes the sheet first, X/Escape pop it', async () => {
  const app = await source('src/app.js');
  assert.match(app, /if\(!fromHash\)\{history\.pushState\(\{gsSheet:true\},'',location\.href\);sheetEntry=true;\}/);
  assert.match(app, /if\(sheetEntry\)\{sheetEntry=false;if\(!closingFromHistory\)history\.back\(\);\}/);
  assert.match(app, /window\.addEventListener\('popstate',\(\)=>\{/);
  assert.match(app, /if\(sheet\.open&&sheetEntry&&!history\.state\?\.gsSheet\)\{closingFromHistory=true;closeSheet\(\);\}/);
  // Hash routing (#bogus replacement, deep links) is untouched; account sheets keep their own hash entry.
  assert.match(app, /history\.replaceState\(null,'','#'\+fallback\.route\);next=fallback\.route;/);
  assert.match(app, /if\(accountId\)openAccount\(accountId,true\);/);
});

test('F7: entry review shows "Type" and a formatted date, never raw ISO', async () => {
  for (const locale of ['th', 'en']) assert.notEqual(T[locale]('entryType'), T[locale]('category'));
  assert.equal(T.en('entryType'), 'Type');
  const app = await source('src/app.js');
  assert.match(app, /\[t\('entryType'\),t\(state\.mode\)\]/);
  assert.match(app, /formatDate\(String\(data\.get\('date'\)\|\|''\),\{locale:state\.locale,day:'numeric',month:'long',year:'numeric'\}\)/);
  assert.doesNotMatch(app, /\[t\('date'\),esc\(data\.get\('date'\)\)\]/);
});

test('F8: editing only the account name keeps its type and subtitle', () => {
  const s = { locale: 'en', balanceVisible: true };
  const before = profiles().find(a => a.id === 'daily');
  const draft = profileDraft(before, s, T.en);
  assert.equal(draft.profileLabel, '');
  const after = applyProfile(profiles(), { ...draft, nickname: 'Renamed' }, 'daily', 'daily').find(a => a.id === 'daily');
  assert.equal(accountDisplay(after, s, T.en).type, accountDisplay(before, s, T.en).type);
  assert.equal(after.accountType, 'bank');
  assert.match(accountProfileForm(draft, s, T.en, true), /<option value="" selected>Bank accounts<\/option>/);
  // New accounts keep today's default label.
  assert.equal(profileDraft(null, s, T.en).profileLabel, 'profileSavings');
});

test('F9: Activity search matches amounts inside the selected month and transfers show both ends', () => {
  const rent = { amountMinor: 850000 };
  for (const query of ['8500', '8,500', '฿8,500.00', '8500.00', '85']) assert.equal(amountMatches(rent, query), true, query);
  for (const query of ['9500', 'abc', '8.500.00', '']) assert.equal(amountMatches(rent, query), false, query);
  const model = activityModel();
  const found = filteredActivity(model.records, { locale: 'en', search: '8,500', filter: 'all' }, T.en).map(r => r.id);
  assert.deepEqual(found, ['rent']);
  assert.deepEqual(filteredActivity(model.records.filter(r => r.dayKey < '2026-10-01'), { locale: 'en', search: '8500', filter: 'all' }, T.en), []);
  const detail = activityTransactionDetail('saving', { locale: 'en', balanceVisible: true, activityPeriod: '2026-10', activityCurrency: 'THB', accountProfiles: profiles() }, T.en);
  assert.match(detail, /<dt>From account<\/dt><dd>Not recorded<\/dd>/);
  assert.match(detail, /<dt>To account<\/dt><dd>[^<]+<\/dd>/);
});

test('F10: update-failure toasts only follow an update this tab started', async () => {
  const pwa = await source('src/pwa.js');
  assert.match(pwa, /\.catch\(\(\) => \{ if \(updateRequested\) toast\(t\('pwaUnavailable'\)\); \}\)/);
  assert.match(pwa, /pending\.state === 'redundant' && !reg\.active && updateRequested/);
  assert.equal((pwa.match(/toast\(t\('pwaUnavailable'\)\)/g) || []).length, 3);
  assert.match(pwa, /hasPendingDraft\(\)/); // dirty-form guard kept
});

test('F11: Settings categories derive from the registry, Refresh gives feedback, placeholders are badged', async () => {
  for (const locale of ['th', 'en']) {
    const text = T[locale]('categoryRegistryInfo', { n: activityCategories.length, list: activityCategories.map(c => T[locale](c.label)).join(', ') });
    assert.match(text, /14/);
    for (const category of activityCategories) assert.ok(text.includes(T[locale](category.label)));
  }
  const screens = await source('src/screens.js');
  assert.match(screens, /\['tag','categories','categoryRegistryInfo',true\]/);
  assert.equal((screens.match(/',true\]/g) || []).length, 5);
  assert.match(screens, /settings-soon/);
  const pwa = await source('src/pwa.js');
  assert.match(pwa, /if \(!worker\) \{ checkForUpdate\(\); return; \}/);
  assert.match(pwa, /toast\(t\('pwaNothingToRefresh'\)\)/);
});

test('F12: Bills form gives a distinct message per invalid field', () => {
  const result = validateBillDraft({ type: 'installments', title: '', amount: 'x', dueDate: 'bad', merchant: '', financing: '', periods: '0' });
  assert.equal(result.valid, false);
  for (const locale of ['th', 'en']) {
    const messages = Object.values(result.errors).map(kind => billFieldError(kind, locale));
    assert.equal(new Set(messages).size, messages.length);
    assert.ok(!messages.includes(billsText(locale, 'required')));
  }
  assert.equal(billFieldError('schedule', 'en'), billsText('en', 'scheduleError'));
});

test('F13: duplicate account names get a non-blocking hint and are still allowed', () => {
  const records = profiles();
  const name = account => account.nickname || T.th(account.name);
  assert.equal(duplicateAccountName(records, T.th('accountDaily'), null, name), true);
  assert.equal(duplicateAccountName(records, T.th('accountDaily'), 'daily', name), false);
  assert.equal(duplicateAccountName(records, 'Unique name', null, name), false);
  const added = applyProfile(records, { accountType: 'bank', providerId: 'kbank', nickname: T.th('accountDaily'), openingBalance: '' }, null, 'dup');
  assert.equal(added.length, 7);
  assert.match(accountProfileForm(profileDraft(null, { locale: 'th' }, T.th), { locale: 'th', balanceVisible: true }, T.th), /id="profile-name-duplicate" role="status" hidden/);
});

test('F14: the friends board shows your own position like Global', () => {
  const html = partyGrid({ locale: 'en', partyVisibility: 'status', shareStreak: true, shareXP: true, partyRankingOptIn: true }, T.en, createPartySession());
  const friends = html.split('party-board-friends')[1].split('</section>')[0];
  const global = html.split('party-board-global')[1].split('</section>')[0];
  assert.match(global, /is-own-position/);
  assert.match(friends, /is-own-position/);
});

test('F15: account deck is one roving tab stop and sheets trap focus', async () => {
  const html = accountBoard({ locale: 'en', balanceVisible: true, accountProfiles: profiles(), accountSelected: 'daily', accountView: 'vertical', accountState: 'sample' }, T.en);
  assert.equal((html.match(/class="account-choice[^"]*"[^>]*tabindex="0"/g) || []).length, 1);
  assert.equal((html.match(/class="account-choice[^"]*"[^>]*tabindex="-1"/g) || []).length, 5);
  assert.match(html, /data-deck-handle tabindex="-1"/);
  assert.equal((html.match(/data-deck-step="-?1" tabindex="-1"/g) || []).length, 2);
  const app = await source('src/app.js');
  assert.match(app, /if\(event\.key!=='Tab'\)return;/);
  assert.match(app, /'\.app-header \.avatar-button,\.cover-header \.cover-profile'/);
  const party = await source('src/styles/party.css');
  assert.match(party, /\.party-visibility-choice input \{width:24px;height:24px/);
  assert.match(party, /\.party-visibility-choice \{min-height:44px/);
  const css = (await source('src/styles/app.css')) + (await source('src/styles/blue.css'));
  assert.match(css, /\.amount-input input:focus-visible \{ outline: 3px solid var\(--focus\)/);
  assert.match(css, /\.oval-amount input:focus-visible \{ outline: 3px solid var\(--focus\)/);
});

test('F1/F16: bottom padding follows the island height plus safe area, and large text can wrap', async () => {
  const blue = await source('src/styles/blue.css');
  assert.match(blue, /\.page-footer \{ padding-bottom: calc\(var\(--island-height,64px\) \+ var\(--island-bottom,12px\) \+ env\(safe-area-inset-bottom,0px\) \+ 52px\); \}/);
  const nav = await source('src/styles/navigation.css');
  assert.match(nav, /scroll-padding-bottom:calc\(var\(--island-height\) \+ var\(--island-bottom\) \+ env\(safe-area-inset-bottom,0px\) \+ 16px\)/);
  assert.match(nav, /\.floating-islands \.nav-item>span:last-child \{ display:block; max-width:100%; overflow-wrap:anywhere;/);
});

test('G1–G3: new owner gates default to today’s behaviour', () => {
  assert.equal(flags.homeDueTodayFirst, false);
  assert.equal(flags.showPreviewControls, true);
  assert.equal(flags.creditCardInBillDetail, false);
  assert.equal(previewControlsVisible('', false), false);
  assert.equal(previewControlsVisible('?dev=1', false), true);
  assert.equal(previewControlsVisible('?x=1&dev=1', false), true);
  assert.equal(previewControlsVisible('?dev=10', false), false);
  assert.equal(previewControlsVisible('', true), true);
  // G1 ordering (only used when the flag is on): today first, extra overdue collapsed.
  const rows = [['a', '2026-10-20'], ['b', '2026-10-22'], ['c', '2026-10-25'], ['d', '2026-10-26'], ['e', '2026-10-28'], ['f', '2026-11-01']].map(([id, dueDate]) => ({ id, dueDate }));
  const ordered = dueTodayFirst(rows, '2026-10-28');
  assert.deepEqual(ordered.rows.map(r => r.id), ['e', 'a', 'f']);
  assert.equal(ordered.hiddenOverdue, 3);
  // Default Home list is unchanged (D31: date order, max four).
  const model = homeOverview({ homeScenario: 'sample', homeNow: '2026-10-28T21:00', accountProfiles: profiles(), billPreviewPaid: [] });
  const html = upcomingDueList(model, { locale: 'en', balanceVisible: true }, T.en);
  assert.equal((html.match(/<li>/g) || []).length, 4);
  assert.doesNotMatch(html, /home-due-more/);
  assert.match(upcomingDueList(model, { locale: 'en', balanceVisible: true }, T.en, { todayFirst: true }), /home-due-more/);
});

test('Canonical cross-page values are unchanged', () => {
  assert.equal(homePreview.habit.streak, 3);
  assert.equal(homePreview.habit.weeklyXP, 80);
  const total = assetAccounts(profiles()).reduce((sum, a) => sum + a.balanceMinor, 0);
  assert.equal(total, 11685000);
  const thb = activityModel().totals.find(x => x.currency === 'THB');
  assert.deepEqual([thb.income, thb.expense, thb.net], [4200000, 1524000, 2676000]);
});
