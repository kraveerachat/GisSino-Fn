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
