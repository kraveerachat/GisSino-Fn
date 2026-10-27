import test from 'node:test';
import assert from 'node:assert/strict';
import { postings, ledgerEntries, balanceAt, assetsAt, liabilitiesAt, netWorthAt, unassignedLegs } from '../src/core/ledger.js';
import { monthTotals, categoryShares, spendRatio, activityEligible } from '../src/core/activity.js';
import { safeToSpend } from '../src/core/safe-to-spend.js';

const asOf = '2026-10-01T00:00:00+07:00';
const accounts = [
  { id: 'bank', currency: 'THB', is_liability: false, opening_balance_minor: 100000, opening_balance_as_of: asOf },
  { id: 'wallet', currency: 'THB', is_liability: false, opening_balance_minor: 5000, opening_balance_as_of: asOf },
  { id: 'card', currency: 'THB', is_liability: true, opening_balance_minor: 20000, opening_balance_as_of: asOf }
];
const at = '2026-10-31T23:59:59+07:00';
const tx = (extra) => ({ id: 'x', currency: 'THB', date: '2026-10-10T10:00:00+07:00', amountMinor: 1000, ...extra });

test('A transfer leaves total assets unchanged', () => {
  const entries = ledgerEntries([tx({ id: 't', type: 'transfer', fromAccountId: 'bank', toAccountId: 'wallet', amountMinor: 3000 })]);
  assert.equal(assetsAt(accounts, entries, at, 'THB'), 105000);
  assert.equal(balanceAt(accounts[0], entries, at), 97000);
  assert.equal(balanceAt(accounts[1], entries, at), 8000);
  assert.equal(monthTotals([tx({ type: 'transfer', fromAccountId: 'bank', toAccountId: 'wallet' })], '2026-10').expense, 0);
});

test('A card payment produces no extra expense and leaves net worth unchanged', () => {
  const payment = tx({ id: 'p', type: 'expense', kind: 'card_payment', fromAccountId: 'bank', toAccountId: 'card', amountMinor: 20000 });
  const entries = ledgerEntries([payment]);
  assert.equal(activityEligible(payment), false);
  assert.equal(monthTotals([payment], '2026-10').expense, 0);
  assert.equal(assetsAt(accounts, entries, at, 'THB'), 85000);
  assert.equal(liabilitiesAt(accounts, entries, at, 'THB'), 0);
  assert.equal(netWorthAt(accounts, entries, at, 'THB'), netWorthAt(accounts, [], at, 'THB'));
});

test('Voiding removes all of a transaction\'s entries from the balance', () => {
  const live = tx({ id: 'v', type: 'transfer', fromAccountId: 'bank', toAccountId: 'wallet', amountMinor: 3000 });
  const voided = { ...live, status: 'voided' };
  assert.equal(postings(voided).length, 2);
  const entries = ledgerEntries([voided, tx({ id: 'e', type: 'expense', accountId: 'bank', status: 'voided' })]);
  assert.equal(balanceAt(accounts[0], entries, at), 100000);
  assert.equal(balanceAt(accounts[1], entries, at), 5000);
  assert.equal(monthTotals([tx({ type: 'expense', accountId: 'bank', status: 'voided' })], '2026-10').expense, 0);
});

test('Opening applies from its as-of instant; entries at or before it are already included', () => {
  const entries = ledgerEntries([tx({ type: 'income', accountId: 'bank', date: asOf }), tx({ type: 'income', accountId: 'bank', date: '2026-10-01T00:00:01+07:00' })]);
  assert.equal(balanceAt(accounts[0], entries, '2026-09-30T23:59:59+07:00'), null);
  assert.equal(balanceAt(accounts[0], entries, asOf), 100000);
  assert.equal(balanceAt(accounts[0], entries, at), 101000);
  assert.deepEqual(unassignedLegs([tx({ id: 'u', type: 'transfer', toAccountId: 'wallet' }), tx({ id: 'n', type: 'expense' })]), [{ id: 'u', leg: 'fromAccountId' }, { id: 'n', leg: 'accountId' }]);
});

test('Empty, income-only and expense-only months never divide by zero', () => {
  assert.deepEqual(monthTotals([], '2026-10'), { income: 0, expense: 0, net: 0 });
  assert.deepEqual(categoryShares([], '2026-10'), []);
  assert.deepEqual(monthTotals([tx({ type: 'income', accountId: 'bank' })], '2026-10'), { income: 1000, expense: 0, net: 1000 });
  assert.deepEqual(monthTotals([tx({ type: 'expense', accountId: 'bank', categoryId: 'housing' })], '2026-10'), { income: 0, expense: 1000, net: -1000 });
  assert.deepEqual(categoryShares([tx({ type: 'expense', categoryId: 'housing' })], '2026-10'), [{ id: 'housing', amount: 1000, share: 100 }]);
  assert.equal(spendRatio(0, 1000), null);
  assert.equal(spendRatio(4200000, 1524000), 36.3);
  assert.equal(spendRatio(1000, 0), 0);
});

test('Safe to spend keeps currencies apart and reports true shortfalls', () => {
  const liquid = [{ currency: 'THB', balanceMinor: 1000 }, { currency: 'USD', balanceMinor: 50 }];
  assert.equal(safeToSpend(liquid, [{ currency: 'THB', amountMinor: 1500 }], 'THB').safeMinor, -500);
  assert.equal(safeToSpend(liquid, [{ currency: 'THB', amountMinor: 1500 }], 'USD').safeMinor, 50);
  assert.equal(safeToSpend(liquid, [{ currency: 'THB', amountMinor: null }], 'THB').available, false);
});
