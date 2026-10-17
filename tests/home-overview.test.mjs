import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { homePreview,accounts,bills,transactions } from '../src/fixtures.js';
import { homeOverview,deriveHomeOverview,bangkokClock,homeMoney,todayStrip,homeDecisions,dueNotices,notificationPreview,homeMonthly } from '../src/home-overview.js';
import { blueHome } from '../src/blue-screens.js';
import { accountBoard } from '../src/account-board.js';
import { transactionRow } from '../src/screens.js';
import { translator,messages } from '../src/i18n.js';
const state=(extra={})=>({locale:'th',route:'home',balanceVisible:true,accountSelected:'daily',accountView:'vertical',accountState:'sample',accountProfiles:accounts,homeScenario:'sample',homeNow:homePreview.nowLocal,...extra});
const render=(extra={})=>{const s=state(extra);return blueHome(s,translator(s.locale),transactionRow);};
const base=()=>({nowLocal:'2026-10-18T20:30',assets:accounts,obligations:bills,entries:transactions,activityDays:['2026-10-18'],streak:7,freezes:2,reminderAt:'20:00'});

test('Today hides when empty and uses two concise existing Activity/Add actions without dues',()=>{
  const empty=deriveHomeOverview({...base(),entries:[]});
  assert.equal(todayStrip(empty,translator('en')),'');
  assert.ok(!render({homeScenario:'clear'}).includes('id="today-strip"'));
  const model=deriveHomeOverview({...base(),nowLocal:'2026-10-23T20:30'});
  assert.deepEqual(model.today.map(i=>i.kind),['details','streak']);
  const html=todayStrip(model,translator('en'));
  assert.match(html,/href="#activity"/);assert.match(html,/data-action="add"/);
  assert.ok(!html.includes('#bills'));assert.ok(!html.includes('<small>'));assert.ok(!html.includes('?filter'));
});
test('Bangkok clock validates dates and reminder starts only after the configured boundary',()=>{
  assert.equal(bangkokClock('2026-10-18T00:01').instant.toISOString(),'2026-10-17T17:01:00.000Z');
  for(const value of ['2026-02-30T10:00','2026-10-18T25:00','bad',''])assert.equal(bangkokClock(value),null);
  for(const time of ['19:59','20:00'])assert.equal(deriveHomeOverview({...base(),nowLocal:'2026-10-19T'+time,entries:[]}).today.length,time==='19:59'?0:1);
  assert.equal(deriveHomeOverview({...base(),reminderAt:'21:00',activityDays:[],entries:[]}).today.length,0);
});
test('Safe uses exact integer minor units, excludes liabilities/archived assets and isolates currencies',()=>{
  const model=deriveHomeOverview({...base(),assets:[...accounts,{accountType:'liability',currency:'THB',balanceMinor:999999},{accountType:'bank',currency:'THB',balanceMinor:999999,archived:true},{accountType:'cash',currency:'USD',balanceMinor:10001}],obligations:[...bills,{id:'usd',paid:false,dueDate:'2026-10-30',currency:'USD',amountMinor:2}]});
  assert.equal(model.totals.find(t=>t.currency==='THB').safeMinor,10410000);
  assert.equal(model.totals.find(t=>t.currency==='USD').safeMinor,9999);
  assert.equal(homeMoney(-1,'THB','en'),'-฿0.01');
  assert.equal(homeMoney(10001,'USD','en'),'$100.01');
  const short=render({homeScenario:'shortfall',locale:'en'});assert.match(short,/-฿87,650.00/);assert.match(short,/Shortfall/);
  const hidden=render({homeScenario:'shortfall',balanceVisible:false});assert.ok(!hidden.includes('87,650'));
  const missing=deriveHomeOverview({...base(),assets:[{accountType:'bank',currency:'THB',balanceMinor:null}]});assert.equal(missing.totals[0].available,false);
  const overflow=deriveHomeOverview({...base(),assets:[{accountType:'bank',currency:'THB',balanceMinor:Number.MAX_SAFE_INTEGER},{accountType:'cash',currency:'THB',balanceMinor:1}]});assert.equal(overflow.totals[0].available,false);
});
test('Bell preview includes due/overdue dates, deduplicates obligations, routes to Bills and handles empty',()=>{
  const model=deriveHomeOverview({...base(),nowLocal:'2026-10-23T20:30',obligations:[...bills,{...bills[0],id:'duplicate-card'}]});
  assert.equal(model.nearest.id,'card');assert.equal(dueNotices(model).length,3);
  const html=notificationPreview(model,state({locale:'en'}),translator('en'));
  assert.match(html,/3 days overdue/);assert.match(html,/datetime="2026-10-20"/);assert.match(html,/href="#bills"/);
  assert.equal((html.match(/Monthly credit card/g)||[]).length,1);
  const clear=homeOverview(state({homeScenario:'clear'}));assert.equal(clear.nearest,null);assert.equal(dueNotices(clear).length,0);
  assert.match(notificationPreview(clear,state(),translator('en')),/No unpaid obligations/);
  assert.ok(!notificationPreview(homeOverview(state()),state(),translator('en')).includes('8250'));
});
test('Home keeps Account Board byte-identical, first after hero, with Recent last and monthly/nearest absent',()=>{
  for(const locale of ['th','en'])for(const accountView of ['vertical','horizontal']){
    const s=state({locale,accountView}),html=render({locale,accountView});assert.ok(html.includes(accountBoard(s,translator(locale))));
    const order=['blue-quick-actions','account-board','id="today-strip"','class="home-safe"','class="home-habit"','blue-transactions','home-snapshot'];
    assert.deepEqual(order.map(key=>html.indexOf(key)),order.map(key=>html.indexOf(key)).sort((a,b)=>a-b));
    for(const key of ['home-monthly','home-obligation','#activity/summary','#leaderboard'])assert.ok(!html.includes(key));
    assert.equal((html.match(/<section class="account-board"/g)||[]).length,1);
    assert.equal((html.match(/data-action="transaction"/g)||[]).length,3);
    for(const link of [...html.matchAll(/href="#([^" ]+)"/g)].map(v=>v[1]))assert.ok(['home','wallet','activity','bills','party','settings','transfer'].includes(link)||link.startsWith('wallet/account/'),link);
  }
});
test('Monthly data, renderer and optional aggregate context remain available without a Home presentation',()=>{
  const model=homeOverview(state({homeScenario:'party'}));assert.equal(model.party.rank,2);
  assert.equal(model.monthlyExpense.amountMinor,1524000);
  assert.match(homeMonthly(model,state({locale:'en'}),translator('en')),/15,240.00/);
  assert.equal(homeOverview(state({homeNow:'2026-11-01T10:00'})).monthlyExpense,null);
});
test('Catalogs and all supported scenarios resolve honestly without mutating financial fixtures',async()=>{
  assert.deepEqual(Object.keys(messages.th).sort(),Object.keys(messages.en).sort());
  const before=JSON.stringify({accounts,bills,transactions,homePreview});
  for(const locale of ['th','en'])for(const scenario of homePreview.scenarios){
    const html=render({locale,homeScenario:scenario});assert.ok(!html.includes('undefined'));assert.match(html,/home-snapshot/);assert.match(html,locale==='th'?/ข้อมูลจำลอง/:/Synthetic data/);
  }
  assert.equal(JSON.stringify({accounts,bills,transactions,homePreview}),before);
  const code=await readFile(new URL('../src/home-overview.js',import.meta.url),'utf8');
  for(const value of ['localStorage','sessionStorage','fetch(','setInterval(','Date.now('])assert.ok(!code.includes(value));
});
