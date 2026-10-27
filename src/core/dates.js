import { flags } from '../config/feature-flags.js';
import { validDate, validMonth } from './clock.js';

// The one date formatter. Era defaults to Gregorian (Architecture §5.6, flag
// dateEra); 'BE' is the optional Buddhist-era display. Always Asia/Bangkok.
const tag = (locale, era) => `${locale === 'th' ? 'th-TH' : 'en-GB'}-u-ca-${era === 'BE' ? 'buddhist' : 'gregory'}`;
function instant(value) {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (validDate(value)) return new Date(`${value}T00:00:00+07:00`);
  if (typeof value === 'string' && /T\d{2}:\d{2}.*(?:Z|[+-]\d{2}:\d{2})$/.test(value)) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}
export function formatDate(value, { locale = 'th', era = flags.dateEra, ...options } = {}) {
  const date = instant(value);
  if (!date) return null;
  const shape = Object.keys(options).length ? options : { day: 'numeric', month: 'short', year: 'numeric' };
  return new Intl.DateTimeFormat(tag(locale, era), { timeZone: 'Asia/Bangkok', ...shape }).format(date);
}
export const formatMonth = (month, { locale = 'th', era = flags.dateEra, ...options } = {}) =>
  validMonth(month) ? formatDate(`${month}-01`, { locale, era, month: 'long', year: 'numeric', ...options }) : null;
export const formatTime = (value, { locale = 'en' } = {}) => formatDate(value, { locale, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
export const formatDateRange = (start, end, options = {}) => `${formatDate(start, options)} – ${formatDate(end, options)}`;
export function relativeDays(from, to) {
  if (!validDate(from) || !validDate(to)) return null;
  return (Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86400000;
}
