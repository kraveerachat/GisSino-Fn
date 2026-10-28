import { activityModel as model, activityCategory, activityDay } from './core/activity.js';
import { formatDate } from './core/dates.js';
import { bkkDate, bkkMonth } from './core/clock.js';
import { worldTransactions } from './fixtures/world.js';

// Rules live in core/activity.js; records are the Fixture World October ledger,
// the same transactions Wallet reads, so both pages report one October total.
export { activityCategories, activityDay, activityCategory, activityRecords, activityEligible, activityShares } from './core/activity.js';
export const activityPeriod = bkkMonth();
export const activitySnapshotDate = bkkDate();
export const activityTransactions = worldTransactions;
export function activityDateLabel(value, locale='th', options={}) {
  const day=activityDay(value);
  if(!day)return null;
  return formatDate(day,{locale,year:'numeric',month:'long',...options});
}
export const activityModel = (entries=activityTransactions,period=activityPeriod) => model(entries,period);
// Amount search (WP-20 F9): "8500", "8,500", "฿8,500.00" all match THB 8,500.00.
// Only digits and one decimal point are compared; records stay inside the selected month.
export function amountMatches(item,query) {
  const digits=String(query||'').replace(/[\s,฿]|THB|บาท/gi,'');
  if(!/^\d+(?:\.\d{0,2})?$/.test(digits)||!Number.isSafeInteger(item.amountMinor))return false;
  const major=(item.amountMinor/100).toFixed(2);
  return major.startsWith(digits)||major.replace(/\.00$/,'')===digits;
}
export function filteredActivity(records,state,t) {
  const query=String(state.search||'').trim().toLocaleLowerCase(state.locale==='th'?'th-TH':'en-GB');
  return records.filter(item=>(!state.filter||state.filter==='all'||item.type===state.filter)&&(!query||amountMatches(item,query)||`${t(item.name)} ${item.type==='transfer'?t('transfer'):item.type==='income'?t('income'):t(activityCategory(item).label)}`.toLocaleLowerCase(state.locale==='th'?'th-TH':'en-GB').includes(query))).sort((a,b)=>b.dayKey.localeCompare(a.dayKey)||b.date.localeCompare(a.date)||a.id.localeCompare(b.id));
}
