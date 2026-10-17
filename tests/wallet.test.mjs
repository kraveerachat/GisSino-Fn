import test from 'node:test';
import assert from 'node:assert/strict';
import { walletOverview, movementMix, walletMoney } from '../src/wallet-overview.js';
import { walletScreen } from '../src/wallet.js';
import { accounts } from '../src/fixtures.js';
import { translator } from '../src/i18n.js';

const record = (overrides={}) => ({id:'custom',accountType:'bank',providerId:'unknown',currency:'THB',balanceMinor:10000,...overrides});
const state = {locale:'en',balanceVisible:true,accountProfiles:accounts};
test('Wallet totals derive from records and count credit bill once',()=>{
  const model=walletOverview();
  assert.equal(model.totals[0].assets,11685000);
  assert.equal(model.totals[0].liabilities,1275000);
  assert.equal(model.totals[0].composition,12960000);
  assert.equal(model.totals[0].segments[0].amount,11285000);
  assert.equal(model.liabilities.length,4);
});
test('Movement uses legacy stable IDs, excludes own transfers, and preserves renamed accounts',()=>{
  assert.deepEqual(movementMix({...accounts[0],nickname:'Renamed'}),{income:98,expense:2});
  assert.equal(movementMix(accounts[1]),null);
  assert.equal(movementMix(accounts[3]),null);
});
test('Movement distinguishes zero, invalid, negative and different-currency records',()=>{
  const a=record();
  assert.deepEqual(movementMix(a,[{accountId:'custom',type:'expense',amountMinor:1}]),{income:0,expense:100});
  for(const value of [null,-1,Number.MAX_SAFE_INTEGER+1,0]) assert.equal(movementMix(a,[{accountId:'custom',type:'income',amountMinor:value}]),null);
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
  assert.equal(walletMoney(1234,'THB','en'),'THB 12.34');
  assert.equal(walletMoney(-1,'USD','en'),'-$0.01');
  assert.equal(walletMoney(-101,'USD','en'),'-$1.01');
  assert.equal(walletMoney(Number.MAX_SAFE_INTEGER,'USD','en'),'$90,071,992,547,409.91');
  assert.equal(walletMoney(100,'EUR'),null);
});
test('Rendered Wallet preserves profile, credit, bill, transfer, and add actions',()=>{
  const html=walletScreen(state,translator('en'));
  for(const match of ['#wallet/account/daily','data-account-id="daily"','#credit-card','data-action="bill" data-id="power"','#transfer','data-action="add-account"','Credit · debit · obligations','In 98% · Out 2%']) assert.ok(html.includes(match),match);
  assert.ok(!html.includes('data-wallet-jump'));
  assert.ok(!html.includes('16:00'));
  for (const cap of html.matchAll(/class="wallet-item wallet-obligation"[^>]*>[\s\S]*?class="wallet-item-cap">([\s\S]*?)<\/span>\s*<svg/g)) assert.ok(!cap[1].includes('wallet-movement'));
  assert.ok(html.includes('Excludes transfers between your accounts'));
});
test('Hidden mode removes amounts, percentage text, and proportional ring geometry',()=>{
  const html=walletScreen({...state,balanceVisible:false},translator('en'));
  for(const value of ['116,850','12,750','98%','stroke-dasharray','width:98%']) assert.ok(!html.includes(value),value);
  assert.ok(html.includes('Balance hidden'));
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
