import test from 'node:test';
import assert from 'node:assert/strict';
import { worldAccounts, worldTransactions, worldObligations, walletSnapshots, habitEvents, habitFreezeDays, habitCandidates, OPENING_AS_OF, users } from '../src/fixtures/world.js';
import { ledgerEntries, balanceAt, assetsAt, unassignedLegs } from '../src/core/ledger.js';
import { monthTotals, categoryShares } from '../src/core/activity.js';
import { billsOverview } from '../src/core/obligations.js';
import { streak, weeklyXp } from '../src/core/habit.js';
import { habitStats, habitOverview } from '../src/habit-preview.js';
import { partySelfStats, partyPeople, partyPreviewToday, partyWeek } from '../src/party-preview.js';
import { homeOverview } from '../src/home-overview.js';
import { activityModel } from '../src/activity-data.js';
import { walletScreen } from '../src/wallet.js';
import { accounts } from '../src/fixtures.js';
import { translator } from '../src/i18n.js';

const at = new Date('2026-10-18T10:00:00+07:00');

test('Accounts reuse stable IDs and open from the October archive as of 1 Oct 00:00 Bangkok', () => {
  assert.deepEqual(worldAccounts.map(a => a.id), ['daily', 'savings', 'reserve', 'everyday-wallet', 'pocket-cash', 'family-savings']);
  const october = walletSnapshots.find(s => s.period === '2026-10');
  for (const account of worldAccounts) {
    assert.equal(account.opening_balance_as_of, OPENING_AS_OF);
    assert.equal(account.opening_balance_minor, october.accounts.find(a => a.id === account.id).balanceMinor);
  }
  assert.deepEqual(users.map(u => u.initials), ['GS', 'LN', 'MN', 'TN', 'RV']);
});

test('October ledger reproduces Activity income 42,000, expense 15,240 and the category amounts', () => {
  assert.deepEqual(monthTotals(worldTransactions, '2026-10'), { income: 4200000, expense: 1524000, net: 2676000 });
  assert.deepEqual(categoryShares(worldTransactions, '2026-10').slice(0, 4).map(c => [c.id, c.amount, c.share]),
    [['housing', 850000, 55.8], ['shopping', 193000, 12.7], ['family', 160000, 10.5], ['bill_payment', 125000, 8.2]]);
  assert.equal(worldTransactions.length, 12);
});

test('Derived 18 Oct balances differ from the screen values exactly as documented; nothing is forced', () => {
  const entries = ledgerEntries(worldTransactions);
  const diff = Object.fromEntries(worldAccounts.map(a => [a.id, balanceAt(a, entries, at) - a.legacyDisplay.balanceMinor]));
  // Matches docs/project/FIXTURE_WORLD_RECONCILIATION.md; the owner decides which figures win.
  assert.deepEqual(diff, { daily: 2251000, savings: -190000, reserve: 0, 'everyday-wallet': -30000, 'pocket-cash': -10000, 'family-savings': 0 });
  assert.equal(assetsAt(worldAccounts, entries, at, 'THB'), 13706000);
  assert.equal(worldAccounts.reduce((sum, a) => sum + a.legacyDisplay.balanceMinor, 0), 11685000);
  assert.deepEqual(unassignedLegs(worldTransactions), [{ id: 'saving', leg: 'fromAccountId' }]);
});

test('Obligations reproduce the Bills screen and are the base for Home and Wallet', () => {
  const model = billsOverview({ month: '2026-10', today: '2026-10-18', records: worldObligations });
  assert.equal(model.totals.THB.minor, 1275000);
  assert.equal(model.overdueTotals.THB.minor, 78000);
  assert.deepEqual(model.current.filter(r => r.status !== 'paid').map(r => [r.recordId, r.cycle.amountMinor]),
    [['card', 825000], ['power', 125000], ['device', 290000], ['music', 35000]]);
  assert.equal(worldObligations.find(r => r.id === 'device').cycles.find(c => c.id === 'device-3').period, 3);
  const home = homeOverview({ homeScenario: 'sample', accountProfiles: accounts });
  assert.deepEqual(home.upcoming.map(b => b.id), ['late-phone-2026-09', 'card-2026-10', 'power-2026-10', 'device-3']);
  assert.equal(home.totals[0].unpaidMinor, model.totals.THB.minor);
  const t = translator('en'), base = { locale: 'en', balanceVisible: true, accountProfiles: accounts, walletMode: 'current' };
  assert.match(walletScreen(base, t), /Payments due this month<\/span><strong>฿12,750\.00/);
  const paid = homeOverview({ homeScenario: 'sample', accountProfiles: accounts, billPreviewPaid: ['card-2026-10'] });
  assert.ok(!paid.upcoming.some(b => b.id === 'card-2026-10'));
  assert.match(walletScreen({ ...base, billPreviewPaid: ['card-2026-10'] }, t), /Payments due this month<\/span><strong>฿4,500\.00/);
});

test('Wallet and Activity report the same October totals from one ledger', () => {
  const activity = activityModel().totals.find(t => t.currency === 'THB');
  assert.equal(activity.expense, 1524000);
  const html = walletScreen({ locale: 'en', balanceVisible: true, accountProfiles: accounts, walletMode: 'current', walletActivityValues: { daily: true } }, translator('en'));
  assert.ok(html.includes('In ฿42,000.00 · Out ฿15,240.00'));
});

test('One habit source: Home and Party show the same streak, weekly XP and week', () => {
  assert.equal(streak(habitEvents, habitFreezeDays, '2026-10-18'), habitCandidates.home.streak);
  assert.equal(weeklyXp(habitEvents, '2026-10-18'), habitCandidates.home.weeklyXP);
  assert.deepEqual(habitStats('2026-10-18'), { streak: 3, weeklyXP: 80, source: 'home' });
  const home = habitOverview({});
  const you = partyPeople.find(p => p.id === 'you');
  assert.equal(home.streak, partySelfStats.streak);
  assert.equal(home.streak, you.streak);
  assert.equal(home.weeklyXP, you.weeklyXP);
  assert.deepEqual([home.week[0], home.week[6]], Object.values(partyWeek(partyPreviewToday)));
  assert.equal(you.weekStart, home.week[0]);
  assert.deepEqual(habitCandidates.party, { streak: 7, weeklyXP: 92, level: 8, totalXP: 1240 });
});
