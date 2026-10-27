import { validDate, bkkWeekDays, addBkkDays } from './clock.js';

// Habit rules: only user-initiated qualifying events count, a frozen day never
// counts as active, and events are deduplicated by dedupe_key (first wins).
export function dedupeEvents(events = []) {
  const seen = new Set();
  return events.filter(event => {
    if (event?.kind !== 'qualifying' || !validDate(event.date)) return false;
    const key = event.dedupe_key || `${event.kind}-${event.date}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
const activeDates = (events, today) => new Set(dedupeEvents(events).filter(event => event.date <= today).map(event => event.date));

export function dayStatus(events, freezeDays, day, today) {
  if (day > today) return 'future';
  if (activeDates(events, today).has(day)) return 'complete';
  if (freezeDays.includes(day) && day < today) return 'frozen';
  return day === today ? 'pending' : 'missed';
}
// Consecutive active days ending today (or yesterday while today is pending).
// A freeze bridges a day without adding to the count.
export function streak(events, freezeDays, today) {
  if (!validDate(today)) throw new TypeError('Invalid Bangkok calendar date');
  const active = activeDates(events, today), frozen = new Set(freezeDays);
  let day = active.has(today) ? today : addBkkDays(today, -1), count = 0;
  for (let guard = 0; guard < 3660; guard++, day = addBkkDays(day, -1)) {
    if (active.has(day)) count++;
    else if (!frozen.has(day)) break;
  }
  return count;
}
// XP per Bangkok day after the optional daily cap.
export function xpWithCaps(events, { dailyCap = Infinity } = {}) {
  const days = new Map();
  for (const event of dedupeEvents(events)) {
    if (!Number.isSafeInteger(event.xp) || event.xp < 0) continue;
    days.set(event.date, Math.min(dailyCap, (days.get(event.date) || 0) + event.xp));
  }
  return days;
}
export function weeklyXp(events, today, config = {}) {
  const week = bkkWeekDays(today);
  return [...xpWithCaps(events, config)].filter(([date]) => week.includes(date) && date <= today).reduce((sum, [, xp]) => sum + xp, 0);
}
export function habitWeek(events, today) {
  const days = bkkWeekDays(today), active = activeDates(events, today);
  return { days, count: days.filter(day => active.has(day)).length };
}

// Moved from habit-preview.js. Explicit fixtures; not a production habit/reward engine.
export function deriveHabitPreview({ today, activeDays = [], freezeDays = [], streak = 0, weeklyXP = 0, selectedDay = today }) {
  const week = bkkWeekDays(today);
  const active = new Set(activeDays.filter(date => validDate(date) && date <= today));
  const frozen = new Set(freezeDays.filter(date => validDate(date) && date < today));
  const count = week.filter(date => active.has(date)).length;
  const missingDays = week.filter(date => date < today && !active.has(date));
  const days = Array.from({ length: 21 }, (_, i) => {
    const date = addBkkDays(week[0], i - 7);
    const status = date > today ? 'future' : active.has(date) ? 'complete' : frozen.has(date) ? 'frozen' : date === today ? 'pending' : 'missed';
    return { date, status, current: date === today };
  });
  const selected = days.find(day => day.date === selectedDay) || days.find(day => day.current);
  return { today, week, count, missingDays, percentage: Math.round(count / 7 * 100), days, selected, streak, weeklyXP, complete: active.has(today) };
}
// Page-lifetime check-in grants (moved from habit-preview.js).
export function createCheckinPreview(defaultReward) {
  const grants = new Map();
  return {
    days: () => [...grants.keys()],
    xpForWeek: date => bkkWeekDays(date).reduce((sum, day) => sum + (day <= date ? grants.get(day) || 0 : 0), 0),
    confirm(date, alreadyActive = false, reward = defaultReward) {
      if (!validDate(date) || !Number.isSafeInteger(reward) || reward < 0 || reward > 1000) throw new TypeError('Invalid synthetic check-in');
      if (alreadyActive || grants.has(date)) return { awarded: false, xp: 0 };
      grants.set(date, reward);
      return { awarded: true, xp: reward };
    }
  };
}
