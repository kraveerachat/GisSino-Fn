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
export function filteredActivity(records,state,t) {
  const query=String(state.search||'').trim().toLocaleLowerCase(state.locale==='th'?'th-TH':'en-GB');
  return records.filter(item=>(!state.filter||state.filter==='all'||item.type===state.filter)&&(!query||`${t(item.name)} ${item.type==='transfer'?t('transfer'):item.type==='income'?t('income'):t(activityCategory(item).label)}`.toLocaleLowerCase(state.locale==='th'?'th-TH':'en-GB').includes(query))).sort((a,b)=>b.dayKey.localeCompare(a.dayKey)||b.date.localeCompare(a.date)||a.id.localeCompare(b.id));
}
