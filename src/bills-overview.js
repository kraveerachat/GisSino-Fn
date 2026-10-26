import { homeMoney } from './home-overview.js';
import { toMinorUnits } from './amount.js';

// Explicit synthetic cycles. This is a read-only presentation model, not the M5 scheduler.
export const billPreviewToday = '2026-10-18';
export const billPreviewMonths = Object.freeze(['2026-09', '2026-10', '2026-11', '2026-12']);
export const billPreviewRecords = Object.freeze([
  { id:'late-phone', type:'monthlyBills', title:{th:'ค่าโทรศัพท์',en:'Phone bill'}, icon:'bills', merchant:{th:'เครือข่ายมือถือ',en:'Mobile provider'}, currency:'THB', cycles:[{id:'late-phone-2026-09',dueDate:'2026-09-29',amountMinor:78000,paid:false}] },
  { id:'card', type:'creditCards', title:{th:'ยอดบัตรเครดิต',en:'Credit card statement'}, icon:'card', merchant:{th:'บัตรเครดิตตัวอย่าง •••• 0916',en:'Sample credit card •••• 0916'}, currency:'THB', statementDate:'2026-10-12', minimumMinor:null, cycles:[{id:'card-2026-10',dueDate:'2026-10-20',amountMinor:825000,paid:false}] },
  { id:'power', type:'monthlyBills', title:{th:'ค่าไฟฟ้า',en:'Electricity'}, icon:'bolt', merchant:{th:'บิลบ้าน',en:'Home utility'}, currency:'THB', variable:true, cycles:[{id:'power-2026-10',dueDate:'2026-10-22',amountMinor:125000,paid:false},{id:'power-2026-11',dueDate:'2026-11-22',amountMinor:null,estimatedMinor:125000,paid:false}] },
  { id:'device', type:'installments', title:{th:'อุปกรณ์ทำงาน',en:'Work essentials'}, icon:'bag', merchant:{th:'Shopee',en:'Shopee'}, financing:{th:'ข้อตกลงผ่อนชำระตัวอย่าง',en:'Sample installment arrangement'}, funding:{th:'บัญชีใช้ประจำ •••• 0428',en:'Everyday account •••• 0428'}, currency:'THB', products:[{id:'headphones',name:{th:'หูฟังไร้สาย',en:'Wireless headphones'}},{id:'accessory',name:{th:'อุปกรณ์เสริมโทรศัพท์',en:'Phone accessory'}}], cycles:[{id:'device-1',period:1,dueDate:'2026-08-25',amountMinor:290000,paid:true},{id:'device-2',period:2,dueDate:'2026-09-25',amountMinor:290000,paid:true},{id:'device-3',period:3,dueDate:'2026-10-25',amountMinor:290000,paid:false},{id:'device-4',period:4,dueDate:'2026-11-25',amountMinor:290000,paid:false},{id:'device-5',period:5,dueDate:'2026-12-25',amountMinor:290000,paid:false}] },
  { id:'music', type:'subscriptions', title:{th:'บริการฟังเพลง',en:'Music service'}, icon:'music', merchant:{th:'บริการรายเดือน',en:'Monthly service'}, currency:'THB', frequency:'monthly', cycles:[{id:'music-2026-10',dueDate:'2026-10-28',amountMinor:35000,paid:false},{id:'music-2026-11',dueDate:'2026-11-28',amountMinor:35000,paid:false},{id:'music-2026-12',dueDate:'2026-12-28',amountMinor:35000,paid:false}] },
  { id:'cloud', type:'subscriptions', title:{th:'พื้นที่เก็บข้อมูล',en:'Cloud storage'}, icon:'upload', merchant:{th:'บริการรายปี',en:'Yearly service'}, currency:'USD', frequency:'yearly', cycles:[{id:'cloud-2026-11',dueDate:'2026-11-02',amountMinor:999,paid:false}] }
]);

export const validBillDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) && new Date(`${value}T00:00:00Z`).toISOString().slice(0,10) === value;
export const validBillMonth = value => /^\d{4}-(0[1-9]|1[0-2])$/.test(value);
const integerMinor = value => Number.isSafeInteger(value) && value >= 0;
const dayNumber = date => Date.parse(`${date}T00:00:00Z`) / 86400000;
const statusRank = {overdue:0,today:1,dueSoon:2,upcoming:3,paid:4,unknown:5};
export const billDateLabel = (date,locale='th') => new Intl.DateTimeFormat(locale==='th'?'th-TH':'en-GB',{timeZone:'Asia/Bangkok',day:'numeric',month:'short'}).format(new Date(`${date}T00:00:00+07:00`));
export const billFullDateLabel = (date,locale='th') => new Intl.DateTimeFormat(locale==='th'?'th-TH':'en-GB',{timeZone:'Asia/Bangkok',day:'numeric',month:'short',year:'numeric'}).format(new Date(`${date}T00:00:00+07:00`));
export const billMonthLabel = (month,locale='th') => new Intl.DateTimeFormat(locale==='th'?'th-TH':'en-GB',{timeZone:'Asia/Bangkok',month:'long',year:'numeric'}).format(new Date(`${month}-01T00:00:00+07:00`));
export const billMoney = (minor,currency,locale='th') => homeMoney(minor,currency,locale);

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

export function billsOverview({month='2026-10',today=billPreviewToday,records=billPreviewRecords}={}) {
  if(!validBillMonth(month)||!validBillDate(today))throw new TypeError('Invalid Bills preview period');
  const seen=new Set(),rows=[];
  for(const record of records){
    if(!['installments','creditCards','monthlyBills','subscriptions'].includes(record.type)||!['THB','USD'].includes(record.currency))continue;
    for(const cycle of record.cycles||[]){
      if(!validBillDate(cycle.dueDate)||!cycle.id||seen.has(cycle.id))throw new TypeError('Invalid or duplicate obligation cycle');
      seen.add(cycle.id);
      if(cycle.dueDate.slice(0,7)!==month && !(cycle.dueDate<`${month}-01` && cycle.dueDate<today && cycle.paid!==true))continue;
      const days=dayNumber(cycle.dueDate)-dayNumber(today);
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
  if(!['installments','creditCards','monthlyBills','subscriptions'].includes(type))errors.type='type';
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
