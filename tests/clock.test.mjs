import test from 'node:test';
import assert from 'node:assert/strict';
import { MOCK_NOW, now, setNow, resetNow, bkkDate, bkkLocal, bkkMonth, bkkWeekRange, bkkMonthRange, startOfBkkDay, addBkkDays, bangkokClock } from '../src/core/clock.js';
import { homePreview } from '../src/fixtures.js';
import { billPreviewToday } from '../src/bills-overview.js';
import { partyPreviewToday, partyWeek } from '../src/party-preview.js';
import { activitySnapshotDate, activityPeriod } from '../src/activity-data.js';
import { walletCurrentPeriod } from '../src/wallet-history.js';
import { bangkokWeek } from '../src/habit-preview.js';
import { addForm } from '../src/screens.js';
import { approximateAge } from '../src/preview-flow.js';
import { translator } from '../src/i18n.js';

test('One mock clock defaults to 18 Oct 2026 10:00 Bangkok and every page reads it', () => {
  assert.equal(MOCK_NOW, '2026-10-18T10:00:00+07:00');
  assert.equal(now().toISOString(), '2026-10-18T03:00:00.000Z');
  assert.equal(bkkLocal(), '2026-10-18T10:00');
  for (const today of [homePreview.nowLocal.slice(0, 10), billPreviewToday, partyPreviewToday, activitySnapshotDate]) assert.equal(today, '2026-10-18');
  for (const month of [activityPeriod, walletCurrentPeriod]) assert.equal(month, '2026-10');
  assert.match(addForm('expense', { locale: 'en' }, translator('en')), /id="entry-date" name="date" value="2026-10-18"/);
  assert.equal(approximateAge('1990'), 36);
});

test('Home and Party share one Monday–Sunday week helper', () => {
  const week = bkkWeekRange(now());
  assert.deepEqual([week.start, week.end], ['2026-10-12', '2026-10-18']);
  assert.deepEqual(bangkokWeek('2026-10-18'), week.days);
  assert.deepEqual(partyWeek(partyPreviewToday), { start: week.start, end: week.end });
  assert.deepEqual(bkkWeekRange('2027-01-01'), { start: '2026-12-28', end: '2027-01-03', days: bangkokWeek('2027-01-01') });
  assert.throws(() => bkkWeekRange('2026-02-30'));
});

test('Bangkok day and month boundaries hold at 23:59 / 00:00 on 31 Oct → 1 Nov', () => {
  assert.equal(bkkDate(new Date('2026-10-31T23:59:59+07:00')), '2026-10-31');
  assert.equal(bkkDate(new Date('2026-11-01T00:00:00+07:00')), '2026-11-01');
  assert.equal(bkkDate(new Date('2026-10-31T16:59:59Z')), '2026-10-31');
  assert.equal(bkkDate(new Date('2026-10-31T17:00:00Z')), '2026-11-01');
  assert.equal(bkkMonth(new Date('2026-10-31T17:00:00Z')), '2026-11');
  const october = bkkMonthRange(2026, 10);
  assert.equal(october.start.toISOString(), '2026-09-30T17:00:00.000Z');
  assert.equal(october.end.toISOString(), '2026-10-31T17:00:00.000Z');
  assert.equal(bkkMonthRange(2026, 12).end.toISOString(), '2026-12-31T17:00:00.000Z');
  assert.equal(startOfBkkDay(new Date('2026-10-18T01:00:00Z')).toISOString(), '2026-10-17T17:00:00.000Z');
  assert.equal(addBkkDays('2026-10-31', 1), '2026-11-01');
  assert.equal(addBkkDays('2028-03-01', -1), '2028-02-29');
  assert.throws(() => bkkMonthRange(2026, 13));
});

test('setNow accepts only offset instants and resetNow restores the mock', () => {
  setNow('2026-11-01T00:00:00+07:00');
  assert.equal(bkkDate(), '2026-11-01');
  assert.throws(() => setNow('2026-11-01T00:00'));
  assert.throws(() => setNow('not a date'));
  resetNow();
  assert.equal(bkkLocal(), '2026-10-18T10:00');
  assert.equal(bangkokClock('2026-10-18T24:00'), null);
  assert.equal(bangkokClock('2026-10-18T10:00').date, '2026-10-18');
});
