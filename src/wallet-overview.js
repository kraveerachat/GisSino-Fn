import { accounts, bills, creditCard, transactions } from './fixtures.js';
import { assetAccounts } from './account-display.js';
import { toMinorUnits } from './amount.js';

const currencies = ['THB', 'USD'];
const checked = value => Number.isSafeInteger(value) ? value : null;
const minor = item => Object.hasOwn(item, 'amountMinor') ? checked(item.amountMinor) : item.amount === 0 ? 0 : toMinorUnits(String(item.amount));
const sum = values => {
  if (values.some(value => value === null)) return null;
  const total = values.reduce((n, value) => n + BigInt(value), 0n);
  return total > BigInt(Number.MAX_SAFE_INTEGER) || total < BigInt(Number.MIN_SAFE_INTEGER) ? null : Number(total);
};

// Integer arithmetic keeps display totals exact; currencies are never converted.
export function walletMoney(value, currency, locale = 'th') {
  if (!Number.isSafeInteger(value) || !currencies.includes(currency)) return null;
  const absolute = BigInt(value) < 0n ? -BigInt(value) : BigInt(value);
  const decimals = absolute % 100n === 0n ? 0 : 2;
  const major = BigInt(value) / 100n;
  const parts = new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', { style: 'currency', currency, minimumFractionDigits: decimals, maximumFractionDigits: 2 }).formatToParts(major);
  if (value < 0 && major === 0n) parts.unshift({ type: 'minusSign', value: '-' });
  return parts.map(part => part.type === 'fraction' ? String(absolute % 100n).padStart(2, '0') : part.value).join('');
}

export function movementMix(account, entries = transactions) {
  const legacyName = accounts.find(item => item.id === account.id)?.name;
  const rows = entries.filter(item => (item.accountId === account.id || (!item.accountId && legacyName && item.account === legacyName)) && ['income', 'expense'].includes(item.type) && (!item.currency || item.currency === account.currency));
  if (!rows.length) return null;
  const incoming = sum(rows.filter(item => item.type === 'income').map(minor));
  const outgoing = sum(rows.filter(item => item.type === 'expense').map(minor));
  if (incoming === null || outgoing === null || incoming < 0 || outgoing < 0) return null;
  const total = BigInt(incoming) + BigInt(outgoing);
  if (!total) return null;
  const income = Number((BigInt(incoming) * 100n + total / 2n) / total);
  return { income, expense: 100 - income };
}

export function walletOverview(records = accounts, obligations = bills, card = creditCard, entries = transactions) {
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
    const segments = [...groups, { kind: 'liabilities', amount: liabilityTotal }];
    const composition = sum(segments.map(group => group.amount));
    const chartAvailable = segments.every(group => group.amount !== null && group.amount >= 0) && composition > 0;
    return { currency, assets: assetTotal, liabilities: liabilityTotal, segments, composition, chartAvailable, present: assets.some(item => item.currency === currency) || liabilities.some(item => item.currency === currency) };
  });
  return { assets, liabilities, totals, movements: new Map(assets.map(item => [item.id, movementMix(item, entries)])), unsupportedCurrency: [...assets, ...liabilities].some(item => !currencies.includes(item.currency)) };
}
