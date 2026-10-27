// One mock clock for the synthetic preview. Every page reads "today" from here.
// All day, week and month boundaries are Asia/Bangkok (UTC+07:00, no DST).
export const MOCK_NOW = '2026-10-18T10:00:00+07:00';
const zone = 'Asia/Bangkok';
const dayMs = 86400000;
let current = new Date(MOCK_NOW);

export const now = () => new Date(current.getTime());
// Tests and a future dev panel only. The normal UI never calls this.
export function setNow(iso) {
  const instant = new Date(iso);
  if (typeof iso !== 'string' || !/T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/.test(iso) || Number.isNaN(instant.getTime())) throw new TypeError('Mock clock needs an ISO instant with an offset');
  current = instant;
  return now();
}
export const resetNow = () => setNow(MOCK_NOW);

const ordinal = date => Date.parse(`${date}T00:00:00Z`) / dayMs;
const dayKey = day => new Date(day * dayMs).toISOString().slice(0, 10);
export const validDate = date => typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(ordinal(date)) && dayKey(ordinal(date)) === date;
export const validMonth = month => typeof month === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(month);

function parts(instant) {
  return Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(instant).map(p => [p.type, p.value]));
}
export function bkkLocal(instant = now()) {
  if (!(instant instanceof Date) || Number.isNaN(instant.getTime())) return null;
  const p = parts(instant);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}
export const bkkDate = (instant = now()) => bkkLocal(instant)?.slice(0, 10) ?? null;
export const bkkMonth = (instant = now()) => bkkLocal(instant)?.slice(0, 7) ?? null;
export const bkkYear = (instant = now()) => Number(bkkLocal(instant).slice(0, 4));
export const startOfBkkDay = (instant = now()) => new Date(`${bkkDate(instant)}T00:00:00+07:00`);
export function addBkkDays(date, days) {
  if (!validDate(date) || !Number.isInteger(days)) throw new TypeError('Invalid Bangkok calendar date');
  return dayKey(ordinal(date) + days);
}
export const dayDiff = (from, to) => ordinal(to) - ordinal(from);

// Monday–Sunday. Replaces the separate Home bangkokWeek and Party partyWeek arithmetic.
export function bkkWeekDays(date) {
  if (!validDate(date)) throw new TypeError('Invalid Bangkok calendar date');
  const start = ordinal(date) - (new Date(`${date}T00:00:00Z`).getUTCDay() + 6) % 7;
  return Array.from({ length: 7 }, (_, i) => dayKey(start + i));
}
export function bkkWeekRange(value = now()) {
  const days = bkkWeekDays(value instanceof Date ? bkkDate(value) : value);
  return { start: days[0], end: days[6], days };
}
// Half-open [start, end) instants for a Bangkok calendar month.
export function bkkMonthRange(year, month) {
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12 || year < 1000 || year > 9999) throw new TypeError('Invalid Bangkok month');
  const at = (y, m) => new Date(`${y}-${String(m).padStart(2, '0')}-01T00:00:00+07:00`);
  return { start: at(year, month), end: month === 12 ? at(year + 1, 1) : at(year, month + 1) };
}

// Validates an explicit Bangkok local "YYYY-MM-DDTHH:mm" (moved from home-overview.js).
export function bangkokClock(local) {
  if (!/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(local)) return null;
  const instant = new Date(`${local}:00+07:00`);
  if (!validDate(local.slice(0, 10)) || !Number.isFinite(instant.valueOf())) return null;
  const checked = bkkLocal(instant);
  return checked === local ? { instant, date: checked.slice(0, 10), month: checked.slice(0, 7), time: checked.slice(11) } : null;
}
