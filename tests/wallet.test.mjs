import test from 'node:test';
import assert from 'node:assert/strict';
import { walletOverview, movementMix, monthlyActivity, walletMoney } from '../src/wallet-overview.js';
import { walletSnapshots, walletPeriod, walletRingSegments, walletCurrentPeriod } from '../src/wallet-history.js';
import { walletScreen } from '../src/wallet.js';
import { accounts } from '../src/fixtures.js';
import { translator } from '../src/i18n.js';

const record = (overrides={}) => ({id:'custom',accountType:'bank',providerId:'unknown',currency:'THB',balanceMinor:10000,...overrides});
const state = {locale:'en',balanceVisible:true,accountProfiles:accounts};
test('Wallet totals derive from records and count credit bill once',()=>{
  const model=walletOverview();
  assert.equal(model.totals[0].assets,11685000);
  assert.equal(model.totals[0].liabilities,1275000);
  assert.equal(model.totals[0].composition,11685000);
  assert.deepEqual(model.totals[0].segments.map(item=>item.kind),['bank','ewallet','cash']);
  assert.equal(model.totals[0].segments[0].amount,11285000);
  assert.equal(model.liabilities.length,4);
});
test('Movement uses legacy stable IDs, excludes own transfers, and preserves renamed accounts',()=>{
  assert.deepEqual(movementMix({...accounts[0],nickname:'Renamed'}),{income:73,expense:27});
  assert.equal(movementMix(accounts[1]),null);
  assert.equal(movementMix(accounts[3]),null);
});
test('Movement distinguishes zero, invalid, negative and different-currency records',()=>{
  const a=record();
  assert.deepEqual(movementMix(a,[{accountId:'custom',type:'expense',amountMinor:1,date:'2026-10-01'}]),{income:0,expense:100});
  for(const value of [null,-1,Number.MAX_SAFE_INTEGER+1,0]) assert.equal(movementMix(a,[{accountId:'custom',type:'income',amountMinor:value,date:'2026-10-01'}]),null);
  assert.equal(movementMix(a,[{accountId:'custom',type:'income',amountMinor:100,currency:'USD'}]),null);
});
test('Summary separates currencies, excludes archived and debit records, and handles missing totals',()=>{
  const model=walletOverview([record(),record({id:'usd',currency:'USD',balanceMinor:345}),record({id:'closed',archived:true}),record({id:'debit',accountType:'debit',balanceMinor:90000})],[],null,[]);
  assert.equal(model.totals[0].assets,10000);
  assert.equal(model.totals[1].assets,345);
  assert.equal(model.assets.length,2);
  assert.equal(walletOverview([record({balanceMinor:undefined})],[],null).totals[0].assets,null);
  assert.equal(walletOverview([record({balanceMinor:-1})],[],null).totals[0].chartAvailable,false);
  assert.equal(walletOverview([],[],null).totals[0].chartAvailable,false);
});
test('Invalid amounts remain unknown; legacy decimals are exact and duplicate or paid bills excluded',()=>{
  const model=walletOverview([], [{id:'a',amount:12.34},{id:'a',amount:200},{id:'b',amount:5,paid:true}],null);
  assert.equal(model.totals[0].liabilities,1234);
  assert.equal(walletOverview([],[{id:'bad',amountMinor:null,amount:12}],null).totals[0].liabilities,null);
  assert.equal(walletOverview([record({balanceMinor:Number.MAX_SAFE_INTEGER}),record({id:'two',balanceMinor:1})],[],null).totals[0].assets,null);
});
test('Currency formatting retains exact cents near safe-integer limits and negative subunits',()=>{
  assert.equal(walletMoney(1234,'THB','en'),'฿12.34');
  assert.equal(walletMoney(-1,'USD','en'),'-$0.01');
  assert.equal(walletMoney(-101,'USD','en'),'-$1.01');
  assert.equal(walletMoney(Number.MAX_SAFE_INTEGER,'USD','en'),'$90,071,992,547,409.91');
  assert.equal(walletMoney(100,'EUR'),null);
});
test('Rendered Wallet leads with assets and preserves profile, Bills, transfer, and add actions',()=>{
  const html=walletScreen(state,translator('en'));
  for(const match of ['#wallet/account/daily','data-account-id="daily"','href="#bills"','#transfer','data-action="add-account"','In 73% · Out 27%']) assert.ok(html.includes(match),match);
  for(const match of ['wallet-category-liabilities','Credit · debit · obligations','href="#credit-card"','wallet-mix-track']) assert.ok(!html.includes(match),match);
  assert.ok(!html.includes('16:00'));
  for (const cap of html.matchAll(/class="wallet-item wallet-obligation"[^>]*>[\s\S]*?class="wallet-item-cap">([\s\S]*?)<\/span>\s*<svg/g)) assert.ok(!cap[1].includes('wallet-movement'));
  assert.ok(html.includes('Excludes transfers'));
});
test('Hidden mode removes amounts, percentage text, and proportional ring geometry',()=>{
  const html=walletScreen({...state,balanceVisible:false},translator('en'));
  for(const value of ['116,850','12,750','98%','stroke-dasharray','wallet-ring-segment','width:98%','wallet-activity-toggle']) assert.ok(!html.includes(value),value);
  assert.ok(html.includes('Balance hidden'));
});

test('Monthly activity excludes other months, undated entries, own transfers, and invalid dates',()=>{
  const item=record();
  const row=overrides=>({accountId:'custom',type:'income',amountMinor:10000,currency:'THB',date:'2026-10-01',...overrides});
  const entries=[row({}),row({type:'expense',amountMinor:2000}),row({date:'2026-09-30'}),row({date:undefined}),row({date:'bad'}),row({date:'2026-10-32'}),row({type:'transfer',amountMinor:999999}),row({currency:'USD'})];
  assert.deepEqual(monthlyActivity(item,entries,'2026-10'),{income:83,expense:17,incoming:10000,outgoing:2000});
  assert.deepEqual(monthlyActivity(item,entries,'2026-09'),{income:100,expense:0,incoming:10000,outgoing:0});
  assert.equal(monthlyActivity(item,entries,'2025-10'),null);
  assert.deepEqual(monthlyActivity(item,[row({date:'2026-09-30T18:00:00Z'})],'2026-10'),{income:100,expense:0,incoming:10000,outgoing:0});
  assert.equal(monthlyActivity(item,[row({date:'2026-09-30T16:59:59Z'})],'2026-10'),null);
  assert.equal(monthlyActivity(item,[row({date:'2026-09-31T12:00:00Z'})],'2026-10'),null);
  assert.equal(monthlyActivity(item,[row({amountMinor:-1}),row({})],'2026-10'),null);
  assert.deepEqual(monthlyActivity(item,[row({amountMinor:0})]),{income:null,expense:null,incoming:0,outgoing:0});
});

test('Snapshots are explicit first-of-month archives independent from live balances and newly added profiles',()=>{
  const original=JSON.stringify(walletSnapshots);
  for(const snapshot of walletSnapshots) assert.ok(snapshot.capturedAt.startsWith(`${snapshot.period}-01T00:00:00+07:00`));
  const profiles=accounts.map(item=>({...item,balanceMinor:1,nickname:'New name'}));
  profiles.push(record());
  const selected=walletPeriod({walletMode:'history',walletPeriod:'2026-09'},profiles);
  assert.equal(selected.records.length,6);
  assert.equal(selected.records[0].balanceMinor,5980000);
  assert.equal(selected.records[0].nickname,'New name');
  assert.equal(selected.period,'2026-09');
  assert.equal(JSON.stringify(walletSnapshots),original);
  assert.equal(walletPeriod({walletMode:'current'},profiles).records,profiles);
  assert.equal(walletPeriod({walletMode:'current'},profiles).period,walletCurrentPeriod);
});

test('History balances and monthly activity follow the selected period, never current liabilities',()=>{
  const t=translator('en');
  const history={...state,walletMode:'history',walletPeriod:'2026-09',walletActivityValues:{daily:true}};
  const html=walletScreen(history,t);
  assert.ok(html.includes('฿102,300<'));
  assert.ok(html.includes('฿59,800.00'));
  assert.ok(html.includes('In ฿39,500.00 · Out ฿13,250.00'));
  assert.ok(html.includes('Opening balance'));
  assert.ok(html.includes('As of 1 Sept 2026'));
  assert.ok(!html.includes('Payments due this month'));
  assert.ok(html.includes('data-period="2026-01" aria-pressed="false" aria-label="Jan 2026 · No opening snapshot" disabled'));
  assert.ok(!walletScreen({...history,balanceVisible:false},t).includes('฿39,500'));
});

test('Activity uses an independent button rather than a nested link control',()=>{
  const html=walletScreen(state,translator('en'));
  assert.ok(html.includes('data-action="wallet-activity" data-id="daily" aria-pressed="false"'));
  for(const match of html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g))assert.ok(!match[0].includes('<button'));
  assert.ok(walletScreen({...state,walletActivityValues:{daily:true}},translator('en')).includes('In ฿42,000.00 · Out ฿15,240.00'));
});

test('Rounded ring keeps all positive categories without inventing slices for zeros or invalid values',()=>{
  assert.equal(walletRingSegments([{kind:'bank',amount:100},{kind:'cash',amount:0}],100).length,1);
  assert.equal(walletRingSegments([{kind:'bank',amount:null}],100).length,0);
  assert.equal(walletRingSegments([{kind:'bank',amount:0}],0).length,0);
  const segments=walletRingSegments(walletOverview().totals[0].segments,11685000);
  assert.deepEqual(segments.map(item=>item.kind),['bank','ewallet','cash']);
  assert.ok(segments.every(item=>!item.path.includes('NaN')&&!item.path.includes('Infinity')));
});
test('New profile names are escaped and unavailable balances remain honest',()=>{
  for(const locale of ['th','en']) {
    const html=walletScreen({...state,locale,accountProfiles:[record({nickname:'<img src=x onerror=alert(1)>',balanceMinor:undefined,currency:'USD'})]},translator(locale));
    assert.ok(html.includes('&lt;img'));
    assert.ok(!html.includes('<img src=x'));
    assert.ok(html.includes(translator(locale)('notRecorded')));
    assert.ok(html.includes('USD'));
  }
});
