import test from 'node:test';
import assert from 'node:assert/strict';
import { formatMoney, minor, money, add, sub, sum, assertSafe } from '../src/core/money.js';
import { formatDate, formatMonth, formatTime, formatDateRange, relativeDays } from '../src/core/dates.js';
import { money as legacyMoney } from '../src/i18n.js';
import { homeMoney } from '../src/home-overview.js';
import { walletMoney } from '../src/wallet-overview.js';
import { billMoney } from '../src/bills-overview.js';
import { walletPeriodLabel } from '../src/wallet-history.js';
import { billFullDateLabel } from '../src/bills-overview.js';

test('One money formatter: narrow symbol, exact cents, both locales', () => {
  assert.equal(formatMoney(11685000, 'THB', { locale: 'en' }), '฿116,850.00');
  assert.equal(formatMoney(11685000, 'THB', { locale: 'th' }), '฿116,850.00');
  assert.equal(formatMoney(999, 'USD', { locale: 'en' }), '$9.99');
  assert.equal(formatMoney(-1, 'THB', { locale: 'en' }), '-฿0.01');
  assert.equal(formatMoney(Number.MAX_SAFE_INTEGER, 'USD', { locale: 'en' }), '$90,071,992,547,409.91');
  assert.equal(formatMoney(2676000, 'THB', { locale: 'en', symbol: false, decimals: 'auto' }), '26,760');
  assert.equal(formatMoney(2676050, 'THB', { locale: 'en', symbol: false, decimals: 'auto' }), '26,760.50');
  assert.equal(formatMoney(100, 'THB', { hidden: true }), '••••••');
  for (const bad of [1.5, NaN, Number.MAX_SAFE_INTEGER + 1, '100']) assert.equal(formatMoney(bad, 'THB'), null);
  assert.equal(formatMoney(100, 'EUR'), null);
});

test('Legacy formatter names are thin wrappers with identical output', () => {
  for (const value of [0, 1, -1, 1234, 11685000, -8765000]) {
    const expected = formatMoney(value, 'THB', { locale: 'en' });
    assert.equal(homeMoney(value, 'THB', 'en'), expected);
    assert.equal(walletMoney(value, 'THB', 'en'), expected);
    assert.equal(billMoney(value, 'THB', 'en'), expected);
  }
  // i18n.money still takes major units; it converts to minor units before formatting.
  assert.equal(legacyMoney(116850, 'en', true), formatMoney(11685000, 'THB', { locale: 'en' }));
  assert.equal(legacyMoney(85, 'en'), '฿85');
  assert.equal(legacyMoney(12.5, 'en', true), '฿12.50');
});

test('Minor-unit arithmetic is exact, guarded and never mixes currencies', () => {
  assert.equal(minor('1250'), 125000);
  assert.equal(minor('12.5'), 1250);
  assert.equal(minor('-0.01'), -1);
  assert.equal(minor('1.234'), null);
  assert.equal(minor(85), 8500);
  assert.equal(add(money(10, 'THB'), money(20, 'THB')).minor, 30);
  assert.equal(sub(money(10, 'THB'), money(25, 'THB')).minor, -15);
  assert.equal(sum([money(1, 'USD'), money(2, 'USD')], 'USD').minor, 3);
  assert.throws(() => add(money(1, 'THB'), money(1, 'USD')), /Currency mismatch/);
  assert.throws(() => add(money(Number.MAX_SAFE_INTEGER, 'THB'), money(1, 'THB')), RangeError);
  assert.throws(() => assertSafe(0.1), RangeError);
  assert.throws(() => money(1, 'EUR'), TypeError);
});

test('One date formatter: Gregorian by default, Buddhist era optional, Bangkok zone', () => {
  assert.equal(formatDate('2026-10-18', { locale: 'en' }), '18 Oct 2026');
  assert.match(formatDate('2026-10-18', { locale: 'th' }), /2026/);
  assert.doesNotMatch(formatDate('2026-10-18', { locale: 'th' }), /2569/);
  assert.match(formatDate('2026-10-18', { locale: 'th', era: 'BE' }), /2569/);
  assert.equal(formatMonth('2026-10', { locale: 'en' }), 'October 2026');
  assert.equal(formatTime('2026-10-18T09:42:00+07:00'), '09:42');
  assert.equal(formatTime('2026-10-18T02:42:00Z'), '09:42');
  assert.equal(formatDate(new Date('2026-10-31T17:30:00Z'), { locale: 'en', day: 'numeric', month: 'short' }), '1 Nov');
  assert.equal(formatDateRange('2026-10-12', '2026-10-18', { locale: 'en', day: 'numeric', month: 'short' }), '12 Oct – 18 Oct');
  assert.equal(formatDate('2026-02-30'), null);
  assert.equal(relativeDays('2026-10-18', '2026-09-29'), -19);
  // Wallet and Bills no longer mix eras in Thai.
  assert.match(walletPeriodLabel('2026-10', 'th'), /2026/);
  assert.match(billFullDateLabel('2026-10-20', 'th'), /2026/);
});
