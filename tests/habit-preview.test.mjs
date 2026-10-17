import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { bangkokWeek,deriveHabitPreview,createCheckinPreview,habitOverview,habitCard } from '../src/habit-preview.js';
import { accounts,bills,transactions,members,homePreview } from '../src/fixtures.js';
import { translator } from '../src/i18n.js';

test('Week is Monday–Sunday across Bangkok midnight, month, year and leap-day boundaries',()=>{
  assert.deepEqual(bangkokWeek('2026-10-18'),['2026-10-12','2026-10-13','2026-10-14','2026-10-15','2026-10-16','2026-10-17','2026-10-18']);
  assert.equal(bangkokWeek('2026-10-19')[0],'2026-10-19');
  assert.equal(bangkokWeek('2027-01-01')[0],'2026-12-28');
  assert.equal(bangkokWeek('2028-02-29')[0],'2028-02-28');
  assert.throws(()=>bangkokWeek('2026-02-30'));assert.throws(()=>bangkokWeek('bad'));
});
test('Weekly percentage counts unique confirmed active days, divides by seven and excludes future/freeze days',()=>{
  const m=deriveHabitPreview({today:'2026-10-18',activeDays:['2026-10-12','2026-10-15','2026-10-16','2026-10-18','2026-10-18','2026-10-19','invalid'],freezeDays:['2026-10-17']});
  assert.equal(m.count,4);assert.equal(m.percentage,57);
  assert.equal(deriveHabitPreview({today:'2026-10-19',activeDays:['2026-10-18']}).percentage,0);
  assert.equal(deriveHabitPreview({today:'2026-10-12',activeDays:['2026-10-13']}).percentage,0);
});
test('Calendar derives complete/missed/frozen/pending/future using date keys with distinct current/selected states',()=>{
  const m=deriveHabitPreview({today:'2026-10-16',activeDays:['2026-10-12','2026-10-17'],freezeDays:['2026-10-15','2026-10-18'],selectedDay:'2026-10-12'});
  const status=d=>m.days.find(x=>x.date===d).status;
  assert.equal(status('2026-10-12'),'complete');assert.equal(status('2026-10-13'),'missed');assert.equal(status('2026-10-15'),'frozen');assert.equal(status('2026-10-16'),'pending');assert.equal(status('2026-10-17'),'future');
  assert.equal(m.days.filter(d=>d.current).length,1);assert.equal(m.selected.date,'2026-10-12');
  assert.ok(m.days.filter(d=>d.date>m.today).every(d=>d.status==='future'));
});
test('App arrival and repeated projections grant no XP; only explicit confirm changes preview session',()=>{
  const session=createCheckinPreview();for(let i=0;i<3;i++)habitOverview({homeNow:homePreview.nowLocal});
  assert.deepEqual(session.days(),[]);assert.equal(session.xpForWeek('2026-10-18'),0);
  assert.deepEqual(session.confirm('2026-10-18',true),{awarded:false,xp:0});
  assert.deepEqual(session.days(),[]);
});
test('Shared check-in guard is idempotent per Bangkok date, across week and date changes, and resets on new session',()=>{
  const session=createCheckinPreview();assert.deepEqual(session.confirm('2026-10-18',false,10),{awarded:true,xp:10});
  assert.deepEqual(session.confirm('2026-10-18',false,100),{awarded:false,xp:0});assert.equal(session.xpForWeek('2026-10-18'),10);
  assert.deepEqual(session.confirm('2026-10-19',false,20),{awarded:true,xp:20});assert.equal(session.xpForWeek('2026-10-19'),20);
  assert.equal(session.xpForWeek('2026-10-17'),0);assert.equal(session.confirm('2026-10-18').awarded,false);assert.equal(createCheckinPreview().xpForWeek('2026-10-18'),0);
  for(const date of ['bad','2026-02-30'])assert.throws(()=>session.confirm(date));
  assert.throws(()=>session.confirm('2026-10-20',false,-1));
});
test('Confirm affects only transient day and weekly demo XP; accounts, ledger, members and fixtures are unchanged',()=>{
  const before=JSON.stringify({accounts,bills,transactions,members,homePreview}),session=createCheckinPreview();
  session.confirm('2026-10-23');
  const m=habitOverview({homeNow:'2026-10-23T20:30',homeDemoDays:session.days(),homeDemoXP:session.xpForWeek('2026-10-23')});
  assert.equal(m.complete,true);assert.equal(m.count,1);assert.equal(m.percentage,14);assert.equal(m.weeklyXP,10);assert.equal(m.streak,null);
  assert.equal(JSON.stringify({accounts,bills,transactions,members,homePreview}),before);
});
test('Current fixture displays 4/7=57%, explicit sample counters and localized noncolor status cues',async()=>{
  for(const locale of ['th','en']){
    const state={homeNow:homePreview.nowLocal,locale};const m=habitOverview(state),html=habitCard(m,state,translator(locale));
    assert.equal(m.percentage,57);assert.equal(m.weeklyXP,80);assert.equal(m.streak,3);
    for(const key of ['aria-current="date"','aria-pressed="true"','data-status="frozen"','role="img"','tabindex="0"','57%','4/7'])assert.ok(html.includes(key));
    assert.ok(!html.includes('undefined'));
  }
  const code=await readFile(new URL('../src/habit-preview.js',import.meta.url),'utf8');
  for(const value of ['localStorage','sessionStorage','fetch(','setInterval(','Date.now('])assert.ok(!code.includes(value));
});
