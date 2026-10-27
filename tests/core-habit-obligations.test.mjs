import test from 'node:test';
import assert from 'node:assert/strict';
import { streak, weeklyXp, xpWithCaps, dayStatus, dedupeEvents, habitWeek } from '../src/core/habit.js';
import { rankFriends } from '../src/core/ranking.js';
import { dueDateForMonth, dueSoon, withPaid, monthUnpaidSum, overdueOutside } from '../src/core/obligations.js';
import { worldObligations } from '../src/fixtures/world.js';

const ev = (date, xp = 20, key) => ({ date, kind: 'qualifying', xp, dedupe_key: key || `daily-${date}` });

test('XP deduplicates by dedupe_key and honours a daily cap', () => {
  const events = [ev('2026-10-12'), ev('2026-10-12'), ev('2026-10-13', 20, 'a'), ev('2026-10-13', 20, 'b'), { date: '2026-10-14', kind: 'app_open', xp: 50 }];
  assert.equal(dedupeEvents(events).length, 3);
  assert.equal(weeklyXp(events, '2026-10-18'), 60);
  assert.equal(weeklyXp(events, '2026-10-18', { dailyCap: 25 }), 45);
  assert.equal(xpWithCaps(events, { dailyCap: 25 }).get('2026-10-13'), 25);
  assert.equal(weeklyXp(events, '2026-10-12'), 20);
  assert.equal(weeklyXp(events, '2026-10-19'), 0);
});

test('A freeze day bridges a streak but never counts as active', () => {
  const events = [ev('2026-10-15'), ev('2026-10-16'), ev('2026-10-18')];
  assert.equal(streak(events, ['2026-10-17'], '2026-10-18'), 3);
  assert.equal(streak(events, [], '2026-10-18'), 1);
  assert.equal(dayStatus(events, ['2026-10-17'], '2026-10-17', '2026-10-18'), 'frozen');
  assert.equal(habitWeek(events, '2026-10-18').count, 3);
  // Today still pending does not break yesterday's streak.
  assert.equal(streak(events, ['2026-10-17'], '2026-10-19'), 3);
  assert.equal(dayStatus(events, [], '2026-10-19', '2026-10-19'), 'pending');
  assert.equal(dayStatus(events, [], '2026-10-14', '2026-10-18'), 'missed');
});

test('Ranking ties share a rank with stable ID order; private and opted-out users are excluded', () => {
  const people = [
    { id: 'you', weeklyXP: 80, weekStart: 'w', visibility: 'status' },
    { id: 'pim', weeklyXP: 80, weekStart: 'w', visibility: 'status', rankingOptIn: true, globalOptIn: true },
    { id: 'lin', weeklyXP: 170, weekStart: 'w', visibility: 'status', rankingOptIn: true, globalOptIn: true },
    { id: 'priv', weeklyXP: 999, weekStart: 'w', visibility: 'private', rankingOptIn: true, globalOptIn: true },
    { id: 'out', weeklyXP: 888, weekStart: 'w', visibility: 'status', rankingOptIn: false, globalOptIn: true },
    { id: 'old', weeklyXP: 500, weekStart: 'v', visibility: 'status', rankingOptIn: true, globalOptIn: true }
  ];
  const rows = rankFriends({ audience: 'global', people, relationships: {}, weekStart: 'w' });
  assert.deepEqual(rows.map(r => [r.id, r.rank]), [['lin', 1], ['pim', 2], ['you', 2]]);
  assert.deepEqual(rankFriends({ audience: 'global', people, relationships: {}, weekStart: 'w', viewerRankingOptIn: false }).map(r => r.id), ['lin', 'pim']);
  assert.deepEqual(rankFriends({ audience: 'friends', people, relationships: { pim: 'accepted' }, weekStart: 'w' }).map(r => r.id), ['pim', 'you']);
});

test('Due dates clamp to the last day of short months (documented rule, OPEN)', () => {
  assert.equal(dueDateForMonth(2026, 2, 31), '2026-02-28');
  assert.equal(dueDateForMonth(2028, 2, 30), '2028-02-29');
  assert.equal(dueDateForMonth(2026, 4, 31), '2026-04-30');
  assert.equal(dueDateForMonth(2026, 1, 31), '2026-01-31');
  assert.equal(dueDateForMonth(2026, 13, 1), null);
});

test('Due soon includes overdue through +7 days, skips paid cycles and caps at four', () => {
  assert.deepEqual(dueSoon(worldObligations, '2026-10-18').map(r => r.id), ['late-phone-2026-09', 'card-2026-10', 'power-2026-10', 'device-3']);
  assert.deepEqual(dueSoon(withPaid(worldObligations, ['late-phone-2026-09']), '2026-10-18', 7, 10).map(r => r.id), ['card-2026-10', 'power-2026-10', 'device-3']);
  assert.equal(dueSoon(worldObligations, '2026-10-18', 10, 10).at(-1).id, 'music-2026-10');
  assert.equal(monthUnpaidSum(worldObligations, '2026-10', '2026-10-18').THB.minor, 1275000);
  assert.equal(monthUnpaidSum(withPaid(worldObligations, ['card-2026-10']), '2026-10', '2026-10-18').THB.minor, 450000);
  assert.equal(overdueOutside(worldObligations, '2026-10', '2026-10-18').THB.minor, 78000);
  // Unknown variable amounts are reported separately, never summed.
  assert.deepEqual(monthUnpaidSum(worldObligations, '2026-11', '2026-10-18').THB, { minor: 325000, knownCount: 2, unknownCount: 1 });
});
