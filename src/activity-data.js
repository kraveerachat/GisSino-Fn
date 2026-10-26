import { transactions } from './fixtures.js';
import { toMinorUnits } from './amount.js';

export const activityCategories = Object.freeze([
  ['food_drinks','coffee'], ['shopping','bag'], ['family','party'],
  ['savings_investment','bank'], ['bill_payment','bills'], ['entertainment','music'],
  ['gifts','star'], ['transport','train'], ['education','list'],
  ['travel_hotel','globe'], ['insurance_health','shield'], ['housing','home'],
  ['refund_return','refresh'], ['other','more']
].map(([id,icon])=>Object.freeze({id,icon,label:`activityCategory_${id}`})));
const catalog = new Map(activityCategories.map(category=>[category.id,category]));
export const activityPeriod = '2026-10';
export const activitySnapshotDate = '2026-10-18';
const aliases = {food:'food_drinks',shopping:'shopping',travel:'transport'};
const times = {coffee:'18T09:42',market:'18T08:15',saving:'17T18:30',salary:'17T10:00',train:'17T07:50'};
const extra = [
  ['rent','activityTxRent','housing','home',850000,'15T08:00'],
  ['electricity','activityTxElectricity','bill_payment','bolt',125000,'14T19:20'],
  ['family','activityTxFamily','family','party',160000,'12T18:15'],
  ['health','activityTxHealth','insurance_health','shield',90000,'10T11:30'],
  ['course','activityTxCourse','education','list',50500,'08T16:00'],
  ['shopping-extra','activityTxShopping','shopping','bag',129000,'05T13:10'],
  ['music-extra','activityTxMusic','entertainment','music',35000,'02T07:00']
];
// Activity-only synthetic records: original items + explicit dated minor-unit
// examples. Shared Home/Wallet/Bills records and their snapshots are not changed.
export const activityTransactions = Object.freeze([
  ...transactions.map(item=>Object.freeze({...item,amountMinor:toMinorUnits(String(item.amount)),currency:'THB',date:`2026-10-${times[item.id]}:00+07:00`,categoryId:aliases[item.category]||null})),
  ...extra.map(([id,name,categoryId,icon,amountMinor,time])=>Object.freeze({id,name,categoryId,icon,amountMinor,currency:'THB',date:`2026-10-${time}:00+07:00`,type:'expense',account:'accountDaily'}))
]);

export function activityDay(value) {
  if (typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}(?:$|T)/.test(value)) return null;
  const calendar=value.slice(0,10), day=new Date(`${calendar}T00:00:00Z`);
  if(Number.isNaN(day.getTime())||day.toISOString().slice(0,10)!==calendar)return null;
  if(value.length===10)return calendar;
  if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/.test(value))return null;
  const instant=new Date(value);if(Number.isNaN(instant.getTime()))return null;
  return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).format(instant);
}
export function activityDateLabel(value, locale='th', options={}) {
  const day=activityDay(value);
  if(!day)return null;
  return new Intl.DateTimeFormat(locale==='th'?'th-TH':'en-GB',{timeZone:'Asia/Bangkok',year:'numeric',month:'long',...options}).format(new Date(`${day}T12:00:00+07:00`));
}
export const activityCategory = item=>catalog.get(item.categoryId)||catalog.get(aliases[item.category])||catalog.get('other');
const checked=value=>Number.isSafeInteger(value)&&value>=0?value:null;
const exact=value=>value>BigInt(Number.MAX_SAFE_INTEGER)||value<BigInt(Number.MIN_SAFE_INTEGER)?null:Number(value);
const sum=values=>values.some(value=>value===null)?null:exact(values.reduce((total,value)=>total+BigInt(value),0n));
const canonicalId=item=>String(item.sourceTransactionId||item.id||'');
const fingerprint=item=>JSON.stringify([item.type,item.amountMinor,item.currency,item.date,item.categoryId,item.purpose,item.ownTransfer,item.reversalOf,item.isReversal,item.status,item.kind]);
export function activityRecords(entries=activityTransactions) {
  const byId=new Map();
  for(const item of entries){const id=canonicalId(item);if(!id)continue;const previous=byId.get(id);if(!previous)byId.set(id,{...item});else if(fingerprint(previous)!==fingerprint(item))byId.set(id,{...previous,amountMinor:null,conflicting:true});}
  return [...byId.values()];
}
export const activityEligible = item=>['income','expense'].includes(item.type)&&item.status!=='voided'&&!['card_payment','adjustment'].includes(item.kind)&&!item.ownTransfer&&!item.reversalOf&&!item.isReversal&&!['credit_card_payment','liability_settlement','own_transfer','refund'].includes(item.purpose)&&item.categoryId!=='refund_return';
// Largest remainder at one decimal place. A valid partition sums to 100.0%.
export function activityShares(values,total) {
  if(!Number.isSafeInteger(total)||total<=0||values.some(value=>!Number.isSafeInteger(value)||value<0))return values.map(()=>null);
  const denominator=BigInt(total);
  if(values.reduce((n,value)=>n+BigInt(value),0n)!==denominator)return values.map(()=>null);
  const rows=values.map((value,index)=>({index,units:Number(BigInt(value)*1000n/denominator),remainder:BigInt(value)*1000n%denominator}));
  let remaining=1000-rows.reduce((n,row)=>n+row.units,0);
  if(remaining<0||remaining>rows.length)return values.map(()=>null);
  const order=rows.slice().sort((a,b)=>a.remainder===b.remainder?a.index-b.index:a.remainder>b.remainder?-1:1);
  for(let index=0;index<remaining;index++)order[index].units++;
  return rows.map(row=>row.units/10);
}
export function activityModel(entries=activityTransactions,period=activityPeriod) {
  const records=activityRecords(entries);
  const validPeriod=/^\d{4}-(?:0[1-9]|1[0-2])$/.test(period);
  const dated=records.map(item=>({...item,dayKey:activityDay(item.date)}));
  const monthly=validPeriod?dated.filter(item=>item.dayKey?.startsWith(`${period}-`)):[];
  const totals=['THB','USD'].map(currency=>{
    const eligible=monthly.filter(item=>item.currency===currency&&activityEligible(item));
    // A conflicting canonical source may disagree on currency or date as well.
    // Fail closed across projections until the source conflict is resolved.
    const conflicting=records.some(item=>item.conflicting);
    const income=conflicting?null:sum(eligible.filter(item=>item.type==='income').map(item=>checked(item.amountMinor)));
    const expense=conflicting?null:sum(eligible.filter(item=>item.type==='expense').map(item=>checked(item.amountMinor)));
    const movement=income===null||expense===null?null:exact(BigInt(income)+BigInt(expense));
    const net=income===null||expense===null?null:exact(BigInt(income)-BigInt(expense));
    const shares=activityShares([income,expense],movement);
    const categories=activityCategories.map(category=>({...category,amount:sum(eligible.filter(item=>item.type==='expense'&&activityCategory(item).id===category.id).map(item=>checked(item.amountMinor)))}));
    const categoryShares=activityShares(categories.map(category=>category.amount),expense);
    categories.forEach((category,index)=>{category.share=categoryShares[index];});
    categories.sort((a,b)=>(b.amount??-1)-(a.amount??-1)||a.id.localeCompare(b.id));
    return {currency,income,expense,movement,net,incomeShare:shares[0],expenseShare:shares[1],categories,available:income!==null&&expense!==null&&movement!==null&&net!==null,present:monthly.some(item=>item.currency===currency)};
  });
  return {period,validPeriod,records:monthly,totals,periods:[...new Set(dated.filter(item=>item.dayKey).map(item=>item.dayKey.slice(0,7)))].sort().reverse(),invalidDates:dated.filter(item=>!item.dayKey).length,unsupportedCurrency:monthly.some(item=>!['THB','USD'].includes(item.currency)),excluded:monthly.filter(item=>!activityEligible(item)&&item.type!=='transfer').length};
}
export function filteredActivity(records,state,t) {
  const query=String(state.search||'').trim().toLocaleLowerCase(state.locale==='th'?'th-TH':'en-GB');
  return records.filter(item=>(!state.filter||state.filter==='all'||item.type===state.filter)&&(!query||`${t(item.name)} ${item.type==='transfer'?t('transfer'):item.type==='income'?t('income'):t(activityCategory(item).label)}`.toLocaleLowerCase(state.locale==='th'?'th-TH':'en-GB').includes(query))).sort((a,b)=>b.dayKey.localeCompare(a.dayKey)||b.date.localeCompare(a.date)||a.id.localeCompare(b.id));
}
