import test from 'node:test';
import assert from 'node:assert/strict';
import { billsOverview,billPreviewRecords,installmentProgress,dueDateForMonth,fixedInstallmentSchedule,validateBillDraft,billMoney,validBillDate } from '../src/bills-overview.js';
import { billModel,billsScreen,billDetail,billDaySheet,billForm,billReview } from '../src/bills-ui.js';
import { translator } from '../src/i18n.js';

const state=()=>({locale:'en',balanceVisible:true,billMonth:'2026-10',billsView:'list',billTypeFilter:'all',billPreviewPaid:[],previewState:'sample'});
const helpers={stateSelect:()=>'',stateCard:()=>'<p>Unavailable</p>'};

test('October payable amount uses only unpaid current cycles; prior overdue is separate',()=>{
  const model=billsOverview();
  assert.equal(model.totals.THB.minor,1275000);
  assert.equal(model.unpaidCount,4);
  assert.equal(model.overdueTotals.THB.minor,78000);
  assert.equal(model.overdue.length,1);
  assert.equal(model.next.id,'card-2026-10');
  assert.equal(model.rows[0].id,'late-phone-2026-09');
});

test('Installment progress distinguishes paid count from next due period and sums explicit amounts',()=>{
  const plan=billPreviewRecords.find(r=>r.id==='device');
  const progress=installmentProgress(plan);
  assert.deepEqual([progress.paidCount,progress.nextPeriod,progress.total,progress.paidMinor,progress.remainingMinor],[2,3,5,580000,870000]);
  const october=billsOverview().current.find(r=>r.recordId==='device');
  assert.equal(october.cycle.amountMinor,290000);
  const changed={...plan,cycles:plan.cycles.map(c=>({...c,amountMinor:c.period===5?310000:c.amountMinor}))};
  assert.equal(installmentProgress(changed).remainingMinor,890000);
  assert.equal(installmentProgress({...plan,cycles:plan.cycles.map(c=>({...c,paid:true}))}).complete,true);
});

test('Paid, overdue, due today and upcoming states use a fixed Bangkok calendar date',()=>{
  const atDue=billsOverview({today:'2026-10-20'});
  assert.equal(atDue.current.find(r=>r.id==='card-2026-10').status,'today');
  assert.equal(atDue.current.find(r=>r.id==='power-2026-10').status,'dueSoon');
  assert.equal(atDue.current.find(r=>r.id==='device-3').status,'upcoming');
  const paidRecords=billPreviewRecords.map(r=>r.id==='card'?{...r,cycles:r.cycles.map(c=>({...c,paid:true}))}:r);
  const paid=billsOverview({records:paidRecords});
  assert.equal(paid.current.find(r=>r.id==='card-2026-10').status,'paid');
  assert.equal(paid.totals.THB.minor,450000);
  assert.equal(billsOverview({today:'2026-10-26'}).current.find(r=>r.id==='device-3').status,'overdue');
});

test('Month switch includes only explicit synthetic cycles, including unknown variable amounts',()=>{
  const november=billsOverview({month:'2026-11'});
  assert.equal(november.current.length,4);
  assert.equal(november.totals.THB.minor,325000);
  assert.equal(november.totals.USD.minor,999);
  assert.equal(november.totals.THB.unknownCount,1);
  assert.equal(november.current.find(r=>r.id==='power-2026-11').amountKnown,false);
  assert.equal(billsOverview({month:'2026-12'}).current.length,2);
  assert.equal(billsOverview({month:'2026-09'}).current.filter(r=>r.recordId==='device').length,1);
});

test('Plan products are descriptive and never counted; card-backed plan is excluded from statement total',()=>{
  const plan=billPreviewRecords.find(r=>r.id==='device');
  assert.equal(plan.products.length,2);
  const included={...plan,id:'card-backed',coveredBy:'card',cycles:[{id:'card-backed-3',period:1,dueDate:'2026-10-20',amountMinor:60000,paid:false}]};
  const model=billsOverview({records:[...billPreviewRecords,included]});
  assert.equal(model.totals.THB.minor,1275000);
  assert.equal(model.current.find(r=>r.id==='card-backed-3').coveredBy,'card');
});

test('Calendar projects every same-day cycle and selected-day sheet keeps both',()=>{
  const extra={id:'same-day',type:'monthlyBills',currency:'THB',title:{en:'Other',th:'อื่น'},cycles:[{id:'same-day-2026-10',dueDate:'2026-10-25',amountMinor:10000,paid:false}]};
  const model=billsOverview({records:[...billPreviewRecords,extra]});
  assert.equal(model.current.filter(r=>r.cycle.dueDate==='2026-10-25').length,2);
  const original=billDaySheet('2026-10-25',state(),translator('en'));
  assert.match(original,/device-3/);
});

test('Month-end dates clamp to February, leap February and year transitions',()=>{
  assert.equal(dueDateForMonth(2026,2,31),'2026-02-28');
  assert.equal(dueDateForMonth(2028,2,31),'2028-02-29');
  assert.equal(dueDateForMonth(2026,12,31),'2026-12-31');
  const schedule=fixedInstallmentSchedule({firstDue:'2026-12-31',dueDay:31,periods:3,paidPeriods:1,amountText:'100.50'});
  assert.deepEqual(schedule.map(c=>c.dueDate),['2026-12-31','2027-01-31','2027-02-28']);
  assert.equal(schedule[0].amountMinor,10050);
});

test('Draft validation rejects bad dates, amounts, periods and mismatched first due day',()=>{
  assert.equal(validBillDate('2026-02-30'),false);
  const base={type:'installments',title:'Plan',currency:'THB',amount:'1200.00',dueDate:'2026-10-25',dueDay:'25',periods:'5',paidPeriods:'2',merchant:'Shop',financing:'Arrangement',products:'Headphones\nAdapter'};
  const valid=validateBillDraft(base);
  assert.equal(valid.valid,true);
  assert.equal(valid.draft.schedule[2].amountMinor,120000);
  assert.equal(valid.draft.products.length,2);
  assert.equal(validateBillDraft({...base,amount:'0'}).valid,false);
  assert.equal(validateBillDraft({...base,dueDay:'31'}).valid,false);
  assert.equal(validateBillDraft({...base,paidPeriods:'6'}).valid,false);
  assert.equal(validateBillDraft({...base,currency:'USD'}).valid,false);
  assert.equal(validateBillDraft({...base,dueDate:'2026-02-30'}).valid,false);
});

test('Card, subscription, variable bill and THB/USD rules validate independently',()=>{
  const card={type:'creditCards',title:'Statement',currency:'THB',amount:'8250',dueDate:'2026-10-20',statementDate:'2026-10-12',minimum:'500',card:'sample-credit'};
  assert.equal(validateBillDraft(card).valid,true);
  assert.equal(validateBillDraft({...card,minimum:'9000'}).valid,false);
  const subscription={type:'subscriptions',title:'Cloud',currency:'USD',amount:'9.99',dueDate:'2026-11-02',frequency:'yearly'};
  assert.equal(validateBillDraft(subscription).valid,true);
  assert.equal(validateBillDraft({...subscription,frequency:'weekly'}).valid,false);
  const variable=validateBillDraft({type:'monthlyBills',title:'Water',currency:'THB',amount:'1250',dueDate:'2026-11-22',variable:'on'});
  assert.equal(variable.valid,true);
  assert.equal(variable.draft.amountMinor,null);
  assert.equal(variable.draft.estimatedMinor,125000);
  assert.match(billMoney(999,'USD','en'),/9\.99/);
});

test('UI render is localized, respects hidden amounts, and preserves preview boundaries',()=>{
  const en=state(),t=translator('en');
  const html=billsScreen(en,t,helpers);
  for(const content of ['Still payable this month','12,750.00','Add obligation','Overdue from earlier months','data-id="device-3"','data-control="bill-month"'])assert.ok(html.includes(content),content);
  assert.match(billDetail('device-3',en,t),/Installment 3 of 5/);
  assert.match(billDetail('device-3',en,t),/Wireless headphones/);
  assert.match(billForm('installments','en'),/name="financing"/);
  assert.match(billReview(validateBillDraft({type:'monthlyBills',title:'<img>',currency:'THB',amount:'1250',dueDate:'2026-10-22'}).draft,'en'),/&lt;img&gt;/);
  const hidden=billsScreen({...en,balanceVisible:false},t,helpers);
  assert.doesNotMatch(hidden,/12,750/);
  const th=billsScreen({...en,locale:'th'},translator('th'),helpers);
  assert.match(th,/บิลและภาระชำระ/);
});
