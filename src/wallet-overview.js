import { accounts, bills, creditCard } from './fixtures.js';
import { assetAccounts } from './account-display.js';
import { toMinorUnits } from './amount.js';
import { walletCurrentPeriod, walletCurrentEntries } from './wallet-history.js';
import { bkkMonth } from './core/clock.js';
import { formatMoney } from './core/money.js';

const currencies = ['THB', 'USD'];
const checked = value => Number.isSafeInteger(value) ? value : null;
const minor = item => Object.hasOwn(item, 'amountMinor') ? checked(item.amountMinor) : item.amount === 0 ? 0 : toMinorUnits(String(item.amount));
const sum = values => {
  if (values.some(value => value === null)) return null;
  const total = values.reduce((n, value) => n + BigInt(value), 0n);
  return total > BigInt(Number.MAX_SAFE_INTEGER) || total < BigInt(Number.MIN_SAFE_INTEGER) ? null : Number(total);
};

// @deprecated thin wrapper; use formatMoney from core/money.js.
export const walletMoney = (value, currency, locale = 'th') => formatMoney(value, currency, { locale });

export function monthlyActivity(account, entries = walletCurrentEntries, period = walletCurrentPeriod) {
  const legacyName = accounts.find(item => item.id === account.id)?.name;
  const periodFor = item => {
    if (typeof item.date !== 'string') return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
      const date = new Date(`${item.date}T00:00:00Z`);
      return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === item.date ? item.date.slice(0, 7) : null;
    }
    if (!/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(item.date)) return null;
    const calendarDate = new Date(`${item.date.slice(0, 10)}T00:00:00Z`);
    if (Number.isNaN(calendarDate.getTime()) || calendarDate.toISOString().slice(0, 10) !== item.date.slice(0, 10)) return null;
    return bkkMonth(new Date(item.date));
  };
  const rows = entries.filter(item => (item.accountId === account.id || (!item.accountId && legacyName && item.account === legacyName)) && ['income', 'expense'].includes(item.type) && (!item.currency || item.currency === account.currency) && periodFor(item) === period);
  if (!rows.length) return null;
  if (rows.some(item => minor(item) === null || minor(item) < 0)) return null;
  const incoming = sum(rows.filter(item => item.type === 'income').map(minor));
  const outgoing = sum(rows.filter(item => item.type === 'expense').map(minor));
  if (incoming === null || outgoing === null || incoming < 0 || outgoing < 0) return null;
  const total = BigInt(incoming) + BigInt(outgoing);
  if (!total) return { income: null, expense: null, incoming, outgoing };
  const income = Number((BigInt(incoming) * 100n + total / 2n) / total);
  return { income, expense: 100 - income, incoming, outgoing };
}

export function movementMix(account, entries = walletCurrentEntries, period = walletCurrentPeriod) {
  const activity = monthlyActivity(account, entries, period);
  return activity && activity.income !== null ? { income: activity.income, expense: activity.expense } : null;
}

export function walletOverview(records = accounts, obligations = bills, card = creditCard, entries = walletCurrentEntries, period = walletCurrentPeriod) {
  const assets = assetAccounts(records);
  const liabilities = [];
  if (card) liabilities.push({ id: card.id, kind: 'credit', name: 'cardNickname', icon: 'card', currency: card.currency, amountMinor: checked(card.outstandingMinor), route: 'credit-card' });
  const seen = new Set();
  for (const bill of obligations) {
    if (bill.paid || seen.has(bill.id) || (card && bill.id === 'card')) continue;
    seen.add(bill.id);
    liabilities.push({ id: bill.id, kind: bill.category === 'installments' ? 'installments' : bill.category === 'subscriptions' ? 'subscriptions' : 'monthlyBills', name: bill.name, icon: bill.icon, currency: bill.currency || 'THB', amountMinor: minor(bill), billId: bill.id });
  }
  const totals = currencies.map(currency => {
    const groups = ['bank', 'ewallet', 'cash'].map(kind => ({ kind, amount: sum(assets.filter(item => item.currency === currency && item.accountType === kind).map(item => checked(item.balanceMinor))) }));
    const assetTotal = sum(groups.map(group => group.amount));
    const liabilityTotal = sum(liabilities.filter(item => item.currency === currency).map(item => item.amountMinor));
    const segments = groups;
    const composition = sum(segments.map(group => group.amount));
    const chartAvailable = segments.every(group => group.amount !== null && group.amount >= 0) && composition > 0;
    return { currency, assets: assetTotal, liabilities: liabilityTotal, segments, composition, chartAvailable, present: assets.some(item => item.currency === currency) || liabilities.some(item => item.currency === currency) };
  });
  return { assets, liabilities, totals, movements: new Map(assets.map(item => [item.id, monthlyActivity(item, entries, period)])), unsupportedCurrency: [...assets, ...liabilities].some(item => !currencies.includes(item.currency)) };
}
