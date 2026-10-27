import { toMinorUnits } from '../amount.js';
import { validDate, validMonth, dayDiff } from './clock.js';

// Explicit obligation cycles. A read-only projection, not the M5 scheduler.
// Moved from bills-overview.js; that module keeps thin wrappers with fixture defaults.
export const validBillDate = validDate;
export const validBillMonth = validMonth;
const integerMinor = value => Number.isSafeInteger(value) && value >= 0;
const types = ['installments', 'creditCards', 'monthlyBills', 'subscriptions'];
const statusRank = { overdue: 0, today: 1, dueSoon: 2, upcoming: 3, paid: 4, unknown: 5 };

export function installmentProgress(record) {
  if(record?.type!=='installments')return null;
  const cycles=[...record.cycles].sort((a,b)=>a.period-b.period);
  if(!cycles.length || cycles.some((cycle,index)=>cycle.period!==index+1 || !validBillDate(cycle.dueDate) || !integerMinor(cycle.amountMinor)))return null;
  const paidCount=cycles.filter(c=>c.paid===true).length;
  const next=cycles.find(c=>c.paid!==true)||null;
  const paidMinor=cycles.filter(c=>c.paid===true).reduce((sum,c)=>sum+BigInt(c.amountMinor),0n);
  const remainingMinor=cycles.filter(c=>c.paid!==true).reduce((sum,c)=>sum+BigInt(c.amountMinor),0n);
  if(paidMinor>BigInt(Number.MAX_SAFE_INTEGER)||remainingMinor>BigInt(Number.MAX_SAFE_INTEGER))return null;
  return {total:cycles.length,paidCount,nextPeriod:next?.period??null,next,paidMinor:Number(paidMinor),remainingMinor:Number(remainingMinor),complete:!next};
}

export function billsOverview({month,today,records}) {
  if(!validBillMonth(month)||!validBillDate(today))throw new TypeError('Invalid Bills preview period');
  const seen=new Set(),rows=[];
  for(const record of records){
    if(!types.includes(record.type)||!['THB','USD'].includes(record.currency))continue;
    for(const cycle of record.cycles||[]){
      if(!validBillDate(cycle.dueDate)||!cycle.id||seen.has(cycle.id))throw new TypeError('Invalid or duplicate obligation cycle');
      seen.add(cycle.id);
      if(cycle.dueDate.slice(0,7)!==month && !(cycle.dueDate<`${month}-01` && cycle.dueDate<today && cycle.paid!==true))continue;
      const days=dayDiff(today,cycle.dueDate);
      const status=cycle.paid===true?'paid':days<0?'overdue':days===0?'today':days<=3?'dueSoon':'upcoming';
      rows.push({id:cycle.id,recordId:record.id,type:record.type,record,cycle,status,days,coveredBy:record.coveredBy||null,prior:cycle.dueDate.slice(0,7)!==month,amountKnown:integerMinor(cycle.amountMinor)});
    }
  }
  rows.sort((a,b)=>statusRank[a.status]-statusRank[b.status]||a.cycle.dueDate.localeCompare(b.cycle.dueDate)||a.id.localeCompare(b.id));
  const current=rows.filter(row=>!row.prior),overdue=rows.filter(row=>row.prior&&row.status==='overdue');
  const totals=Object.fromEntries(['THB','USD'].map(currency=>{
    const eligible=current.filter(row=>row.record.currency===currency&&row.status!=='paid'&&!row.coveredBy);
    const known=eligible.filter(row=>row.amountKnown);
    const total=known.reduce((sum,row)=>sum+BigInt(row.cycle.amountMinor),0n);
    return [currency,{minor:total<=BigInt(Number.MAX_SAFE_INTEGER)?Number(total):null,knownCount:known.length,unknownCount:eligible.length-known.length}];
  }));
  const overdueTotals=Object.fromEntries(['THB','USD'].map(currency=>{
    const eligible=overdue.filter(row=>row.record.currency===currency&&!row.coveredBy);
    const total=eligible.filter(row=>row.amountKnown).reduce((sum,row)=>sum+BigInt(row.cycle.amountMinor),0n);
    return [currency,{minor:total<=BigInt(Number.MAX_SAFE_INTEGER)?Number(total):null,unknownCount:eligible.filter(row=>!row.amountKnown).length}];
  }));
  return {month,today,rows,current,overdue,totals,overdueTotals,unpaidCount:current.filter(row=>row.status!=='paid'&&!row.coveredBy).length,next:rows.find(row=>!row.prior&&row.status!=='paid')||null};
}

// Session-only "mark paid" overlay; the records themselves are never mutated.
export const withPaid = (records, paidIds = []) => {
  const paid = new Set(paidIds);
  return records.map(record => ({ ...record, cycles: record.cycles.map(cycle => ({ ...cycle, paid: cycle.paid || paid.has(cycle.id) })) }));
};
// Known unpaid amount due in the month, per currency; unknown amounts are counted separately.
export const monthUnpaidSum = (records, month, today) => billsOverview({ month, today, records }).totals;
export const overdueOutside = (records, month, today) => billsOverview({ month, today, records }).overdueTotals;
// Unpaid cycles from overdue up to today+days inclusive, as flat rows (Home due list, D31).
export function dueSoon(records, today, days = 7, limit = 4) {
  if (!validBillDate(today)) throw new TypeError('Invalid Bills preview date');
  return records.flatMap(record => (record.cycles || []).map(cycle => ({ ...cycle, recordId: record.id, type: record.type, name: record.title, icon: record.icon, currency: record.currency, coveredBy: record.coveredBy || null })))
    .filter(row => row.paid !== true && !row.coveredBy && validBillDate(row.dueDate) && dayDiff(today, row.dueDate) <= days)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate) || a.id.localeCompare(b.id))
    .slice(0, limit);
}

// Documented rule: a due day after a short month's end clamps to its last day (OPEN, D35).
export function dueDateForMonth(year,month,dueDay) {
  if(!Number.isInteger(year)||!Number.isInteger(month)||month<1||month>12||!Number.isInteger(dueDay)||dueDay<1||dueDay>31)return null;
  const last=new Date(Date.UTC(year,month,0)).getUTCDate();
  return `${year}-${String(month).padStart(2,'0')}-${String(Math.min(dueDay,last)).padStart(2,'0')}`;
}

export function fixedInstallmentSchedule({firstDue,dueDay,periods,paidPeriods,amountText}) {
  const minor=toMinorUnits(String(amountText||''));
  if(!validBillDate(firstDue)||!Number.isInteger(dueDay)||dueDay<1||dueDay>31||!Number.isInteger(periods)||periods<1||periods>120||!Number.isInteger(paidPeriods)||paidPeriods<0||paidPeriods>periods||minor===null)return null;
  const [year,month]=firstDue.split('-').map(Number);
  if(dueDateForMonth(year,month,dueDay)!==firstDue)return null;
  return Array.from({length:periods},(_,index)=>{
    const date=new Date(Date.UTC(year,month-1+index,1));
    return {id:`draft-${index+1}`,period:index+1,dueDate:dueDateForMonth(date.getUTCFullYear(),date.getUTCMonth()+1,dueDay),amountMinor:minor,paid:index<paidPeriods};
  });
}

export function validateBillDraft(data) {
  const type=String(data.type||'');
  const errors={};
  if(!types.includes(type))errors.type='type';
  const title=String(data.title||'').trim();
  if(!title||title.length>80)errors.title='title';
  const currency=String(data.currency||'THB');
  if(!['THB','USD'].includes(currency)||(type==='installments'&&currency!=='THB'))errors.currency='currency';
  const enteredMinor=toMinorUnits(String(data.amount||''));
  const unknownVariable=type==='monthlyBills'&&data.variable==='on';
  if(enteredMinor===null && !(unknownVariable&&!String(data.amount||'').trim()))errors.amount='amount';
  const amountMinor=unknownVariable?null:enteredMinor;
  const dueDate=String(data.dueDate||'');
  if(!validBillDate(dueDate))errors.dueDate='date';
  let schedule=null;
  if(type==='installments'){
    for(const field of ['merchant','financing'])if(!String(data[field]||'').trim()||String(data[field]).trim().length>80)errors[field]=field;
    schedule=fixedInstallmentSchedule({firstDue:dueDate,dueDay:Number(data.dueDay),periods:Number(data.periods),paidPeriods:Number(data.paidPeriods),amountText:String(data.amount||'')});
    if(!schedule)errors.periods='schedule';
    if(String(data.products||'').split('\n').filter(Boolean).length>8)errors.products='products';
  }
  if(type==='subscriptions'&&!['monthly','yearly'].includes(data.frequency))errors.frequency='frequency';
  if(type==='creditCards'&&data.card!=='sample-credit')errors.card='card';
  if(type==='creditCards'&&data.minimum){const minimum=toMinorUnits(String(data.minimum));if(minimum===null||minimum>amountMinor)errors.minimum='minimum';}
  if(type==='creditCards'&&data.statementDate&&!validBillDate(String(data.statementDate)))errors.statementDate='date';
  return {valid:Object.keys(errors).length===0,errors,draft:{type,title,currency,amountMinor,estimatedMinor:unknownVariable?enteredMinor:null,dueDate,schedule,products:String(data.products||'').split('\n').map(s=>s.trim()).filter(Boolean).slice(0,8),merchant:String(data.merchant||'').trim(),financing:String(data.financing||'').trim(),funding:String(data.funding||'').trim(),card:String(data.card||''),note:String(data.note||'').trim(),frequency:String(data.frequency||''),variable:data.variable==='on',statementDate:String(data.statementDate||''),minimumMinor:data.minimum?toMinorUnits(String(data.minimum)):null}};
}
