// The one money formatter and integer helpers. Money is always integer minor
// units with an explicit currency; currencies are never mixed or converted.
export const CURRENCIES = Object.freeze(['THB', 'USD']);
const max = BigInt(Number.MAX_SAFE_INTEGER), min = BigInt(Number.MIN_SAFE_INTEGER);
const checkCurrency = currency => {
  if (!CURRENCIES.includes(currency)) throw new TypeError(`Unsupported currency: ${currency}`);
  return currency;
};
export function assertSafe(value) {
  if (!Number.isSafeInteger(value)) throw new RangeError('Money must be a safe integer of minor units');
  return value;
}
const exact = value => {
  if (value > max || value < min) throw new RangeError('Money total exceeds the safe integer range');
  return Number(value);
};

// Decimal major-unit text ("1250", "-12.5") to minor units, without floats.
export function minor(amount, currency = 'THB') {
  checkCurrency(currency);
  const text = typeof amount === 'number' ? String(amount) : String(amount ?? '').trim();
  const match = /^(-)?(\d{1,13})(?:\.(\d{1,2}))?$/.exec(text);
  if (!match) return null;
  const value = BigInt(match[2]) * 100n + BigInt((match[3] || '').padEnd(2, '0'));
  return exact(match[1] ? -value : value);
}
export const money = (minorUnits, currency) => Object.freeze({ minor: assertSafe(minorUnits), currency: checkCurrency(currency) });
export function add(a, b) {
  if (a.currency !== b.currency) throw new TypeError('Currency mismatch');
  return money(exact(BigInt(assertSafe(a.minor)) + BigInt(assertSafe(b.minor))), a.currency);
}
export const sub = (a, b) => add(a, money(-assertSafe(b.minor), b.currency));
export function sum(items, currency) {
  checkCurrency(currency);
  return items.reduce((total, item) => add(total, item), money(0, currency));
}

// decimals: 'fixed' always shows two digits; 'auto' drops ".00" for compact numerals.
// symbol: false returns the grouped number only (the caller labels the currency).
export function formatMoney(value, currency, { locale = 'th', decimals = 'fixed', symbol = true, hidden = false, hiddenText = '••••••' } = {}) {
  if (hidden) return hiddenText;
  if (!Number.isSafeInteger(value) || !CURRENCIES.includes(currency)) return null;
  const units = BigInt(value), negative = units < 0n, absolute = negative ? -units : units;
  const major = absolute / 100n, fraction = absolute % 100n;
  const digits = decimals === 'auto' && fraction === 0n ? 0 : 2;
  const options = { minimumFractionDigits: digits, maximumFractionDigits: digits };
  const format = new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', symbol ? { style: 'currency', currency, currencyDisplay: 'narrowSymbol', ...options } : options);
  return format.formatToParts(negative ? (major === 0n ? -0 : -major) : major)
    .map(part => part.type === 'fraction' ? fraction.toString().padStart(2, '0') : part.value).join('');
}
