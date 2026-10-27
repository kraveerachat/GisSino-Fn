// A display-only keypad. No posting, persistence, or bank transfer operation.
export function amountKey(value, key) {
  if (key === 'backspace') return value.length > 1 ? value.slice(0, -1) : '0';
  if (key === '.') return value.includes('.') ? value : `${value}.`;
  if (!/^\d$/.test(key)) return value;
  if (value.includes('.') && value.split('.')[1].length >= 2) return value;
  if (!value.includes('.') && value.length >= 9) return value;
  return value === '0' ? key : value + key;
}
export function validAmountText(value) {
  return /^\d{1,9}(?:\.\d{0,2})?$/.test(value) && Number(value) > 0;
}
export function toMinorUnits(value) {
  if (!validAmountText(value)) return null;
  const [whole, fraction = ''] = value.split('.');
  return Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
}
// Transfer review: a positive amount, two different accounts, and no more than a
// known source balance. An unrecorded balance cannot be checked and is not blocked.
export function transferProblem(amountText, sourceBalanceMinor, sameAccounts) {
  const minor = toMinorUnits(String(amountText ?? ''));
  if (minor === null || minor <= 0 || sameAccounts) return 'transferAmountError';
  if (Number.isSafeInteger(sourceBalanceMinor) && minor > sourceBalanceMinor) return 'transferInsufficient';
  return null;
}
// Optional opening balance for a new sample account: '' → undefined (not recorded), invalid → null.
export function openingBalanceMinor(text) {
  const value = String(text ?? '').trim();
  if (!value) return undefined;
  if (!/^\d{1,9}(?:\.\d{1,2})?$/.test(value)) return null;
  const [whole, fraction = ''] = value.split('.');
  return Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
}
// Entry dates may not be later than the app's mock "today" (a YYYY-MM-DD key).
export const isFutureDate = (date, today) => /^\d{4}-\d{2}-\d{2}$/.test(String(date)) && String(date) > today;
