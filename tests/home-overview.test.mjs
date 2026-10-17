import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { homePreview,accounts,bills,transactions } from '../src/fixtures.js';
import { homeOverview,deriveHomeOverview,bangkokClock,homeMoney,todayStrip,homeDecisions,homeStreak } from '../src/home-overview.js';
import { blueHome } from '../src/blue-screens.js';
import { accountBoard } from '../src/account-board.js';
import { transactionRow } from '../src/screens.js';
import { translator,messages } from '../src/i18n.js';
const state=(extra={})=>({locale:'th',route:'home',balanceVisible:true,accountSelected:'daily',accountView:'vertical',accountState:'sample',accountProfiles:accounts,homeScenario:'sample',homeNow:homePreview.nowLocal,...extra});
const render=(extra={})=>{const s=state(extra);return blueHome(s,translator(s.locale),transactionRow);};
const base=()=>({nowLocal:'2026-10-18T20:30',assets:accounts,obligations:bills,entries:transactions,activityDays:['2026-10-18'],streak:7,freezes:2,reminderAt:'20:00'});

test('Today Strip is absent when nothing is actionable, without an empty placeholder',()=>{
  const model=deriveHomeOverview({...base(),obligations:[],entries:[]});
  assert.deepEqual(model.today,[]);assert.equal(todayStrip(model,translator('th')),'');
  assert.ok(!render({homeScenario:'clear'}).includes('id="today-strip"'));
});
test('Four priority categories use earliest unpaid bills and supported destinations, first two with disclosure',()=>{
  const model=deriveHomeOverview({...base(),nowLocal:'2026-10-23T20:30'});
  assert.deepEqual(model.today.map(i=>i.kind),['due','streak','details','inactive']);
  assert.equal(model.today[0].count,3);assert.equal(model.today[0].nearest.id,'card');
  const html=todayStrip(model,translator('en'));
  assert.match(html,/<details class="today-more">/);assert.match(html,/Show 2 more/);
  assert.match(html,/href="#bills"/);assert.match(html,/href="#activity"/);assert.match(html,/data-action="add"/);
  assert.ok(!html.includes('?filter'));assert.ok(!html.includes('activity/summary'));
});
test('Bangkok boundaries, configurable reminder and current-day activity are deterministic',()=>{
  assert.equal(bangkokClock('2026-10-18T00:01').instant.toISOString(),'2026-10-17T17:01:00.000Z');
  assert.equal(bangkokClock('2026-10-18T23:59').date,'2026-10-18');
  for(const value of ['2026-02-30T10:00','2026-10-18T25:00','bad',''])assert.equal(bangkokClock(value),null);
  for(const time of ['19:59','20:00']){
    const model=deriveHomeOverview({...base(),nowLocal:'2026-10-19T'+time,obligations:[],entries:[]});
    assert.equal(model.today.length,time==='19:59'?0:2);
  }
  assert.equal(deriveHomeOverview({...base(),reminderAt:'21:00',activityDays:[]}).today.some(i=>i.kind==='streak'),false);
  assert.equal(deriveHomeOverview({...base()}).today.some(i=>i.kind==='inactive'),false);
});
test('Safe to Spend reconciles to liquid assets minus this month unpaid obligations in integer units',()=>{
  const total=homeOverview(state()).totals[0];
  assert.deepEqual(total,{currency:'THB',available:true,liquidMinor:11685000,unpaidMinor:1275000,safeMinor:10410000});
  assert.ok(bills.every(b=>Number.isSafeInteger(b.amountMinor)&&b.currency==='THB'));
  const excluded=deriveHomeOverview({...base(),assets:[...accounts,{accountType:'credit',currency:'THB',balanceMinor:99999999},{accountType:'cash',archived:true,currency:'THB',balanceMinor:5000}]});
  assert.deepEqual(excluded.totals[0],total);
});
test('Negative values remain negative and shortfall has text as well as color; hidden balances do not leak',()=>{
  const s=state({homeScenario:'shortfall'}),model=homeOverview(s);
  assert.equal(model.totals[0].safeMinor,-8765000);
  assert.match(homeDecisions(model,s,translator('en')),/-฿87,650.00/);
  assert.match(homeDecisions(model,s,translator('en')),/Shortfall/);
  const hidden=render({homeScenario:'shortfall',balanceVisible:false});
  for(const value of ['87,650','104,100','116,850','8,250','15,240'])assert.ok(!hidden.includes(value),value);
});
test('THB and USD remain independent; fractional minor values and overflow become unavailable',()=>{
  const model=deriveHomeOverview({...base(),assets:[{accountType:'cash',currency:'THB',balanceMinor:101},{accountType:'bank',currency:'USD',balanceMinor:205}],obligations:[{id:'usd',dueDate:'2026-10-20',paid:false,currency:'USD',amountMinor:6}]});
  assert.deepEqual(model.totals.map(v=>[v.currency,v.safeMinor]),[['THB',101],['USD',199]]);
  assert.equal(homeMoney(-1,'USD','en'),'-$0.01');assert.equal(homeMoney(199,'USD','en'),'$1.99');
  assert.equal(homeMoney(1.5,'THB'),null);assert.equal(homeMoney(1,'BTC'),null);
  const missing=deriveHomeOverview({...base(),assets:[{accountType:'bank',currency:'THB',balanceMinor:null}]});assert.equal(missing.totals[0].available,false);
  const overflow=deriveHomeOverview({...base(),assets:[{accountType:'bank',currency:'THB',balanceMinor:Number.MAX_SAFE_INTEGER},{accountType:'cash',currency:'THB',balanceMinor:1}]});assert.equal(overflow.totals[0].available,false);
});
test('Nearest obligation sorts unpaid dates, including overdue, and supports empty state',()=>{
  const obligations=[{id:'paid',paid:true,dueDate:'2026-01-01'},{id:'later',paid:false,dueDate:'2026-10-20'},{id:'earlier',paid:false,dueDate:'2026-10-15'},{id:'bad',paid:false,dueDate:'invalid'}];
  const model=deriveHomeOverview({...base(),obligations});assert.equal(model.nearest.id,'earlier');assert.equal(model.nearest.days,-3);
  assert.equal(homeOverview(state({homeScenario:'clear'})).nearest,null);
  assert.match(render({homeScenario:'clear',locale:'en'}),/No unpaid obligations/);
});
test('Rank is optional and requires explicitly synthetic party context, never financial member records',()=>{
  const t=translator('en');assert.ok(!homeStreak(homeOverview(state()),state(),t).includes('Rank'));
  assert.match(render({locale:'en',homeScenario:'party'}),/Rank 2 · Sample family/);
  assert.equal(deriveHomeOverview({...base(),party:{rank:1}}).party,null);
});
test('Monthly total is illustrative, hidden outside its fixture month, and uses existing Activity route',()=>{
  assert.ok(render().includes('class="home-monthly" href="#activity"'));
  assert.match(render({homeNow:'2026-11-01T10:00',locale:'en'}),/No activity this month/);
  for(const value of ['mini-bars','monthly-enamel','#activity/summary','#leaderboard'])assert.ok(!render().includes(value));
});
test('Home order and complete Account Board markup are preserved in both modes and locales',()=>{
  for(const locale of ['th','en'])for(const accountView of ['vertical','horizontal']){
    const s=state({locale,accountView}),html=render({locale,accountView});
    assert.ok(html.includes(accountBoard(s,translator(locale))));
    const order=['cover-header','home-hero','blue-quick-actions','id="today-strip"','home-decisions','home-streak','account-board','blue-transactions','home-monthly'];
    assert.deepEqual(order.map(key=>html.indexOf(key)),order.map(key=>html.indexOf(key)).sort((a,b)=>a-b));
    assert.equal((html.match(/<section class="account-board"/g)||[]).length,1);
    for(const link of [...html.matchAll(/href="#([^\"]+)"/g)].map(v=>v[1]))assert.ok(['home','wallet','activity','bills','party','settings','transfer'].includes(link)||link.startsWith('wallet/account/'),link);
  }
});
test('All Home copy resolves in both catalogs and synthetic clock/disclosure is visible',()=>{
  assert.deepEqual(Object.keys(messages.th).sort(),Object.keys(messages.en).sort());
  for(const locale of ['th','en'])for(const scenario of homePreview.scenarios){
    const html=render({locale,homeScenario:scenario,homeNow:scenario==='actionable'?'2026-10-23T20:30':homePreview.nowLocal});
    assert.ok(!html.includes('undefined'));assert.match(html,/home-snapshot/);assert.match(html,locale==='th'?/ข้อมูลจำลอง/:/Synthetic data/);
  }
});
test('Home projection leaves canonical financial fixtures and Account Board modules unchanged',async()=>{
  const before=JSON.stringify({accounts,bills,transactions});for(const scenario of homePreview.scenarios)homeOverview(state({homeScenario:scenario}));assert.equal(JSON.stringify({accounts,bills,transactions}),before);
  const code=await readFile(new URL('../src/home-overview.js',import.meta.url),'utf8');
  for(const value of ['localStorage','sessionStorage','fetch(','setInterval(','Date.now(','members'])assert.ok(!code.includes(value));
});

