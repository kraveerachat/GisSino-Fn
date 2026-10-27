import test from 'node:test';
import assert from 'node:assert/strict';
import { activityTransactions,activityCategories,activityModel,activityDay,activityShares,activityDateLabel,filteredActivity } from '../src/activity-data.js';
import { activityScreen,activityResults,activityCategoryDialog,activityTransactionDetail,activityContext } from '../src/activity.js';
import { translator } from '../src/i18n.js';
import { stateCard } from '../src/screens.js';

const t=translator('en');
const state={locale:'en',balanceVisible:true,previewState:'sample',filter:'all',search:'',activityPeriod:'2026-10'};
const entry=(overrides={})=>({id:'one',type:'expense',amountMinor:100,currency:'THB',date:'2026-10-18T09:00:00+07:00',categoryId:'food_drinks',name:activityTransactions[0].name,account:'accountDaily',...overrides});
const total=entries=>activityModel(entries).totals[0];

test('Activity coherent October fixture reconciles to exact integers and fourteen categories',()=>{
  const model=activityModel(),summary=model.totals[0];
  assert.equal(activityTransactions.length,12);assert.deepEqual(model.periods,['2026-10']);
  assert.equal(summary.income,4200000);assert.equal(summary.expense,1524000);assert.equal(summary.net,2676000);
  assert.equal(summary.movement,5724000);assert.equal(summary.incomeShare+summary.expenseShare,100);
  assert.equal(activityCategories.length,14);assert.equal(new Set(activityCategories.map(x=>x.id)).size,14);
  assert.equal(summary.categories.reduce((sum,x)=>sum+x.amount,0),summary.expense);
  assert.equal(Math.round(summary.categories.reduce((sum,x)=>sum+x.share,0)*10),1000);
  assert.deepEqual(summary.categories.slice(0,4).map(x=>x.id),['housing','shopping','family','bill_payment']);
});
test('Largest remainder handles cents, ties, tiny shares and rejects non-partitions',()=>{
  assert.deepEqual(activityShares([1,1,1],3),[33.4,33.3,33.3]);
  assert.deepEqual(activityShares([0,1],1),[0,100]);
  assert.deepEqual(activityShares([1,99999],100000),[0,100]);
  assert.deepEqual(activityShares([1,2],4),[null,null]);
  assert.deepEqual(activityShares([0,0],0),[null,null]);
});
test('Own transfers, card settlements, refunds and reversals never become monthly spending',()=>{
  const entries=[entry(),entry({id:'a',type:'transfer',categoryId:'savings_investment'}),entry({id:'b',ownTransfer:true}),entry({id:'c',purpose:'credit_card_payment'}),entry({id:'d',purpose:'liability_settlement'}),entry({id:'e',purpose:'refund'}),entry({id:'f',categoryId:'refund_return'}),entry({id:'g',reversalOf:'one'}),entry({id:'h',isReversal:true})];
  assert.equal(total(entries).expense,100);assert.equal(total(entries).income,0);
});
test('Source-linked duplicates count once; conflicting records become unknown',()=>{
  const original=entry();assert.equal(total([original,entry({id:'copy',sourceTransactionId:'one'})]).expense,100);
  const conflict=total([original,entry({id:'copy',sourceTransactionId:'one',amountMinor:101})]);
  assert.equal(conflict.expense,null);assert.equal(conflict.available,false);assert.equal(conflict.net,null);
});
test('THB and USD remain separate; unknown currency is not converted',()=>{
  const model=activityModel([entry(),entry({id:'usd',currency:'USD',amountMinor:200}),entry({id:'eur',currency:'EUR',amountMinor:300})]);
  assert.equal(model.totals[0].expense,100);assert.equal(model.totals[1].expense,200);assert.equal(model.unsupportedCurrency,true);
});
test('Missing, negative, fractional and unsafe amounts remain unknown, including safe-input overflow',()=>{
  for(const amountMinor of [null,undefined,-1,1.1,NaN,Number.MAX_SAFE_INTEGER+1])assert.equal(total([entry({amountMinor})]).expense,null);
  assert.equal(total([entry({amountMinor:Number.MAX_SAFE_INTEGER}),entry({id:'extra'})]).expense,null);
  assert.equal(total([entry({amountMinor:0})]).expense,0);
});
test('Date keys use Bangkok boundaries and reject impossible or timezone-free timestamps',()=>{
  assert.equal(activityDay('2026-09-30T18:00:00Z'),'2026-10-01');assert.equal(activityDay('2026-10-31T18:00:00Z'),'2026-11-01');
  for(const date of ['bad','2026-02-30','2026-10-18T09:00:00','2026-13-01'])assert.equal(activityDay(date),null);
  assert.equal(total([entry({date:'2026-09-30T18:00:00Z'})]).expense,100);
  assert.equal(total([entry({date:'2026-10-31T18:00:00Z'})]).expense,0);
  assert.match(activityDateLabel('2026-10-01','th'),/2026/);assert.doesNotMatch(activityDateLabel('2026-10-01','th'),/2569/);assert.match(activityDateLabel('2026-10-01','en'),/2026/);
});
test('Unknown expense categories fall back to Other; zero categories remain in full catalog',()=>{
  const summary=total([entry({categoryId:'unmapped'})]);
  assert.equal(summary.categories[0].id,'other');assert.equal(summary.categories[0].share,100);assert.equal(summary.categories.length,14);
  assert.equal(summary.categories.filter(x=>x.amount===0).length,13);
});
test('Empty and one-sided summaries never divide by zero or produce invented movement',()=>{
  assert.equal(total([]).net,0);assert.equal(total([]).incomeShare,null);
  assert.equal(total([entry()]).net,-100);assert.equal(total([entry()]).expenseShare,100);
  assert.equal(total([entry({type:'income'})]).incomeShare,100);
  for(const entries of [[],[entry()],[entry({type:'income'})]])assert.doesNotMatch(activityScreen({...state,activityEntries:entries},t,{stateCard,stateSelect:()=>''}),/NaN|Infinity/);
});
test('Search/type filters change only rows, leaving the full-month analytics intact',()=>{
  const model=activityModel();assert.equal(filteredActivity(model.records,{...state,filter:'income'},t).length,1);
  assert.equal(filteredActivity(model.records,{...state,search:'commute'},t).length,1);
  assert.equal(filteredActivity(model.records,{...state,search:'income'},t).length,1);
  const html=activityScreen({...state,search:'unmatched',filter:'expense'},t,{stateCard,stateSelect:()=>''});
  assert.match(html,/26,760/);assert.match(html,/42,000/);assert.match(html,/15,240/);assert.doesNotMatch(html,/data-action="transaction"/);
});
test('Visible chart has two paths, top four categories, all fourteen in shared dialog',()=>{
  const html=activityScreen(state,t,{stateCard,stateSelect:()=>''});
  assert.equal((html.match(/<path class="activity-series/g)||[]).length,2);
  assert.equal((html.match(/<li class="activity-category /g)||[]).length,4);
  assert.equal((activityCategoryDialog(state,t).match(/<li class="activity-category /g)||[]).length,14);
  assert.match(activityResults(state,t,stateCard),/needs-dot/);
  assert.match(activityTransactionDetail('rent',state,t),/Home rent/);assert.match(activityTransactionDetail('saving',state,t),/DEMO-SAVING/);
});
test('Hidden analytics, category catalog and details expose no amounts, percentages or data geometry',()=>{
  const hidden={...state,balanceVisible:false};
  for(const html of [activityScreen(hidden,t,{stateCard,stateSelect:()=>''}),activityCategoryDialog(hidden,t),activityTransactionDetail('rent',hidden,t)]){
    assert.doesNotMatch(html,/42,000|15,240|26,760|8,500|73\.4|26\.6|width:|<rect width=|<path class="activity-series/);
    assert.match(html,/Balance hidden/);
  }
});
test('Error/loading/unavailable do not render stale analytics; invalid source data suppresses totals',()=>{
  for(const previewState of ['error','loading','unavailable'])assert.doesNotMatch(activityScreen({...state,previewState},t,{stateCard,stateSelect:()=>''}),/activity-donut/);
  const html=activityScreen({...state,activityEntries:[entry({date:'invalid'})]},t,{stateCard,stateSelect:()=>''});
  assert.doesNotMatch(html,/26,760/);assert.match(html,/complete records/);assert.equal(activityContext({...state,activityPeriod:'2026-09'}).unavailable,true);
});
test('Thai/English renders and search input escapes untrusted text',()=>{
  for(const locale of ['th','en'])assert.doesNotThrow(()=>activityScreen({...state,locale},translator(locale),{stateCard,stateSelect:()=>''}));
  const html=activityScreen({...state,search:'"><img src=x onerror=alert(1)>'},t,{stateCard,stateSelect:()=>''});
  assert.doesNotMatch(html,/<img src=x/);assert.match(html,/&lt;img/);
});


test('Conflicting classifications are unavailable in either duplicate order',()=>{
  for(const patch of [{ownTransfer:true},{reversalOf:'other'},{isReversal:true},{status:'voided'},{type:'transfer'},{kind:'card_payment'}]){
    const original=entry(),duplicate=entry({id:'duplicate',sourceTransactionId:'one',...patch});
    for(const entries of [[original,duplicate],[duplicate,original]])assert.equal(total(entries).available,false);
  }
});
test('Voided and card-payment records are excluded; date-only records never invent time',()=>{
  assert.equal(total([entry({status:'voided'}),entry({id:'card',kind:'card_payment'})]).expense,0);
  const html=activityTransactionDetail('one',{...state,activityEntries:[entry({date:'2026-10-18'})]},t);
  assert.doesNotMatch(html,/07:00/);assert.match(html,/<dd>—<\/dd>/);
});

test('Currency/date source conflicts fail closed independently of input order or period',()=>{
  for(const patch of [{currency:'USD'},{date:'2026-09-18'}]){
    const original=entry(),duplicate=entry({id:'copy',sourceTransactionId:'one',...patch}),other=entry({id:'other',amountMinor:200});
    for(const records of [[original,duplicate,other],[duplicate,original,other]])for(const summary of activityModel(records).totals)assert.equal(summary.available,false);
  }
});

test('Invalid raw record money is not displayed as a signed or fractional amount',()=>{
  for(const amountMinor of [-100,1.5,undefined,NaN,Number.MAX_SAFE_INTEGER+1]){
    const invalid={...state,activityEntries:[entry({amountMinor})]};
    const html=activityTransactionDetail('one',invalid,t);assert.match(html,/Not recorded/);assert.doesNotMatch(html,/-THB/);
    assert.doesNotMatch(activityResults(invalid,t,stateCard),/−Not recorded/);
  }
});
