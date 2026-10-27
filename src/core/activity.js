import { bkkDate } from './clock.js';

// Monthly income/expense projection (D33). Moved from activity-data.js, which keeps
// thin wrappers with the fixture defaults. Integer minor units; THB/USD isolated.
export const activityCategories = Object.freeze([
  ['food_drinks','coffee'], ['shopping','bag'], ['family','party'],
  ['savings_investment','bank'], ['bill_payment','bills'], ['entertainment','music'],
  ['gifts','star'], ['transport','train'], ['education','list'],
  ['travel_hotel','globe'], ['insurance_health','shield'], ['housing','home'],
  ['refund_return','refresh'], ['other','more']
].map(([id,icon])=>Object.freeze({id,icon,label:`activityCategory_${id}`})));
const catalog = new Map(activityCategories.map(category=>[category.id,category]));
const aliases = {food:'food_drinks',shopping:'shopping',travel:'transport'};

export function activityDay(value) {
  if (typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}(?:$|T)/.test(value)) return null;
  const calendar=value.slice(0,10), day=new Date(`${calendar}T00:00:00Z`);
  if(Number.isNaN(day.getTime())||day.toISOString().slice(0,10)!==calendar)return null;
  if(value.length===10)return calendar;
  if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/.test(value))return null;
  const instant=new Date(value);if(Number.isNaN(instant.getTime()))return null;
  return bkkDate(instant);
}
export const activityCategory = item=>catalog.get(item.categoryId)||catalog.get(aliases[item.category])||catalog.get('other');
const checked=value=>Number.isSafeInteger(value)&&value>=0?value:null;
const exact=value=>value>BigInt(Number.MAX_SAFE_INTEGER)||value<BigInt(Number.MIN_SAFE_INTEGER)?null:Number(value);
const sum=values=>values.some(value=>value===null)?null:exact(values.reduce((total,value)=>total+BigInt(value),0n));
const canonicalId=item=>String(item.sourceTransactionId||item.id||'');
const fingerprint=item=>JSON.stringify([item.type,item.amountMinor,item.currency,item.date,item.categoryId,item.purpose,item.ownTransfer,item.reversalOf,item.isReversal,item.status,item.kind]);
export function activityRecords(entries) {
  const byId=new Map();
  for(const item of entries){const id=canonicalId(item);if(!id)continue;const previous=byId.get(id);if(!previous)byId.set(id,{...item});else if(fingerprint(previous)!==fingerprint(item))byId.set(id,{...previous,amountMinor:null,conflicting:true});}
  return [...byId.values()];
}
// Transfers, voided items, card payments, adjustments, refunds and reversals are never income or expense.
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
export function activityModel(entries,period) {
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

// Plan WP-03 names. Same rules as activityModel; null means "unavailable".
export function monthTotals(transactions, month, currency = 'THB') {
  const total = activityModel(transactions, month).totals.find(item => item.currency === currency);
  return { income: total.income, expense: total.expense, net: total.net };
}
export const categoryShares = (transactions, month, currency = 'THB') =>
  activityModel(transactions, month).totals.find(item => item.currency === currency).categories.filter(category => category.amount > 0).map(({ id, amount, share }) => ({ id, amount, share }));
// Expense as a share of income, one decimal place; null when income is zero or unknown.
export function spendRatio(income, expense) {
  if (!Number.isSafeInteger(income) || !Number.isSafeInteger(expense) || income <= 0 || expense < 0) return null;
  return Number((BigInt(expense) * 1000n + BigInt(income) / 2n) / BigInt(income)) / 10;
}
