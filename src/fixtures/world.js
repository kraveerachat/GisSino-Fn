// One synthetic Fixture World for the design preview: users, accounts, October
// ledger transactions, obligations and habit events. Served only by the local
// development server; it is not production data or a database schema.
// Source evidence is reused, never invented: see docs/project/FIXTURE_WORLD_RECONCILIATION.md.
import { accounts as legacyAccounts, transactions as legacyTransactions, homePreview } from '../fixtures.js';
import { toMinorUnits } from '../amount.js';

export const users = Object.freeze([
  Object.freeze({ id: 'you', initials: 'GS', nickname: Object.freeze({ th: 'คุณกิส', en: 'You' }), owner: true }),
  Object.freeze({ id: 'lin', initials: 'LN', nickname: Object.freeze({ th: 'ลิน', en: 'Lin' }), friend: true }),
  Object.freeze({ id: 'min', initials: 'MN', nickname: Object.freeze({ th: 'มิน', en: 'Min' }), friend: true }),
  Object.freeze({ id: 'ton', initials: 'TN', nickname: Object.freeze({ th: 'ต้น', en: 'Ton' }), friend: true }),
  Object.freeze({ id: 'ravi', initials: 'RV', nickname: Object.freeze({ th: 'ราวี', en: 'Ravi' }), globalParticipant: true })
]);

// Explicit illustrative month-start archives (moved unchanged from wallet-history.js).
// Each balance is the state at 00:00 Asia/Bangkok on the first of its month.
const archiveIds = ['daily', 'savings', 'reserve', 'everyday-wallet', 'pocket-cash', 'family-savings'];
const archive = (period, balances, incoming, outgoing) => Object.freeze({
  period, capturedAt: `${period}-01T00:00:00+07:00`,
  accounts: Object.freeze(archiveIds.map((id, index) => Object.freeze({
    ...legacyAccounts.find(account => account.id === id), balanceMinor: balances[index]
  }))),
  entries: Object.freeze([
    Object.freeze({ accountId: 'daily', type: 'income', amountMinor: incoming, currency: 'THB', date: `${period}-02` }),
    Object.freeze({ accountId: 'daily', type: 'expense', amountMinor: outgoing, currency: 'THB', date: `${period}-10` })
  ])
});
export const walletSnapshots = Object.freeze([
  archive('2026-10', [6420000, 3550000, 500000, 220000, 140000, 200000], 4200000, 84500),
  archive('2026-09', [5980000, 3300000, 450000, 180000, 120000, 200000], 3950000, 1325000),
  archive('2026-08', [5520000, 3100000, 400000, 210000, 160000, 180000], 3800000, 1460000),
  archive('2026-07', [5140000, 2850000, 400000, 190000, 110000, 180000], 3650000, 1180000),
  archive('2025-12', [4260000, 2400000, 300000, 150000, 100000, 160000], 3500000, 1790000),
  archive('2025-11', [3940000, 2250000, 250000, 120000, 90000, 150000], 3400000, 1280000)
]);

// Opening balances come from the October archive. The current screen values stay
// in legacyDisplay until the owner decides which figures win.
export const OPENING_AS_OF = '2026-10-01T00:00:00+07:00';
const october = walletSnapshots.find(snapshot => snapshot.period === '2026-10');
export const worldAccounts = Object.freeze(legacyAccounts.map(account => Object.freeze({
  id: account.id, type: account.accountType, provider_id: account.providerId, nickname: account.name,
  currency: account.currency, is_liability: false, opening_balance_as_of: OPENING_AS_OF,
  opening_balance_minor: october.accounts.find(item => item.id === account.id)?.balanceMinor ?? null,
  legacyDisplay: Object.freeze({ balanceMinor: account.balanceMinor })
})));

// October 2026 transactions that already exist: the shared fixture records plus the
// Activity-only extras (moved unchanged from activity-data.js). Extras carry the
// existing account key "accountDaily"; the own-account transfer names only its
// destination, so its source leg stays unassigned.
const accountId = new Map(legacyAccounts.map(account => [account.name, account.id]));
const times = { coffee: '18T09:42', market: '18T08:15', saving: '17T18:30', salary: '17T10:00', train: '17T07:50' };
const aliases = { food: 'food_drinks', shopping: 'shopping', travel: 'transport' };
const extra = [
  ['rent', 'activityTxRent', 'housing', 'home', 850000, '15T08:00'],
  ['electricity', 'activityTxElectricity', 'bill_payment', 'bolt', 125000, '14T19:20'],
  ['family', 'activityTxFamily', 'family', 'party', 160000, '12T18:15'],
  ['health', 'activityTxHealth', 'insurance_health', 'shield', 90000, '10T11:30'],
  ['course', 'activityTxCourse', 'education', 'list', 50500, '08T16:00'],
  ['shopping-extra', 'activityTxShopping', 'shopping', 'bag', 129000, '05T13:10'],
  ['music-extra', 'activityTxMusic', 'entertainment', 'music', 35000, '02T07:00']
];
export const worldTransactions = Object.freeze([
  ...legacyTransactions.map(item => Object.freeze({
    ...item, amountMinor: toMinorUnits(String(item.amount)), currency: 'THB', date: `2026-10-${times[item.id]}:00+07:00`,
    categoryId: aliases[item.category] || null,
    ...(item.type === 'transfer' ? { fromAccountId: null, toAccountId: accountId.get(item.account) ?? null } : { accountId: accountId.get(item.account) ?? null })
  })),
  ...extra.map(([id, name, categoryId, icon, amountMinor, time]) => Object.freeze({
    id, name, categoryId, icon, amountMinor, currency: 'THB', date: `2026-10-${time}:00+07:00`, type: 'expense', account: 'accountDaily', accountId: 'daily'
  }))
]);

// Obligations reproduce the Bills screen (moved unchanged from bills-overview.js).
// This is the base dataset for Bills, the Home due list and Wallet "Payments due".
export const worldObligations = Object.freeze([
  { id:'late-phone', type:'monthlyBills', title:{th:'ค่าโทรศัพท์',en:'Phone bill'}, icon:'bills', merchant:{th:'เครือข่ายมือถือ',en:'Mobile provider'}, currency:'THB', cycles:[{id:'late-phone-2026-09',dueDate:'2026-09-29',amountMinor:78000,paid:false}] },
  { id:'card', type:'creditCards', title:{th:'ยอดบัตรเครดิต',en:'Credit card statement'}, icon:'card', merchant:{th:'บัตรเครดิตตัวอย่าง •••• 0916',en:'Sample credit card •••• 0916'}, currency:'THB', statementDate:'2026-10-12', minimumMinor:null, cycles:[{id:'card-2026-10',dueDate:'2026-10-20',amountMinor:825000,paid:false}] },
  { id:'power', type:'monthlyBills', title:{th:'ค่าไฟฟ้า',en:'Electricity'}, icon:'bolt', merchant:{th:'บิลบ้าน',en:'Home utility'}, currency:'THB', variable:true, cycles:[{id:'power-2026-10',dueDate:'2026-10-22',amountMinor:125000,paid:false},{id:'power-2026-11',dueDate:'2026-11-22',amountMinor:null,estimatedMinor:125000,paid:false}] },
  { id:'device', type:'installments', title:{th:'อุปกรณ์ทำงาน',en:'Work essentials'}, icon:'bag', merchant:{th:'Shopee',en:'Shopee'}, financing:{th:'ข้อตกลงผ่อนชำระตัวอย่าง',en:'Sample installment arrangement'}, funding:{th:'บัญชีใช้ประจำ •••• 0428',en:'Everyday account •••• 0428'}, currency:'THB', products:[{id:'headphones',name:{th:'หูฟังไร้สาย',en:'Wireless headphones'}},{id:'accessory',name:{th:'อุปกรณ์เสริมโทรศัพท์',en:'Phone accessory'}}], cycles:[{id:'device-1',period:1,dueDate:'2026-08-25',amountMinor:290000,paid:true},{id:'device-2',period:2,dueDate:'2026-09-25',amountMinor:290000,paid:true},{id:'device-3',period:3,dueDate:'2026-10-25',amountMinor:290000,paid:false},{id:'device-4',period:4,dueDate:'2026-11-25',amountMinor:290000,paid:false},{id:'device-5',period:5,dueDate:'2026-12-25',amountMinor:290000,paid:false}] },
  { id:'music', type:'subscriptions', title:{th:'บริการฟังเพลง',en:'Music service'}, icon:'music', merchant:{th:'บริการรายเดือน',en:'Monthly service'}, currency:'THB', frequency:'monthly', cycles:[{id:'music-2026-10',dueDate:'2026-10-28',amountMinor:35000,paid:false},{id:'music-2026-11',dueDate:'2026-11-28',amountMinor:35000,paid:false},{id:'music-2026-12',dueDate:'2026-12-28',amountMinor:35000,paid:false}] },
  { id:'cloud', type:'subscriptions', title:{th:'พื้นที่เก็บข้อมูล',en:'Cloud storage'}, icon:'upload', merchant:{th:'บริการรายปี',en:'Yearly service'}, currency:'USD', frequency:'yearly', cycles:[{id:'cloud-2026-11',dueDate:'2026-11-02',amountMinor:999,paid:false}] }
].map(record => Object.freeze({ ...record, cycles: Object.freeze(record.cycles.map(cycle => Object.freeze(cycle))) })));

// One habit source. Events reuse the Home fixture's dated active days; 20 XP per
// qualifying day is the rate implied by the Home set (4 active days = 80 XP).
// The Party set cannot be derived from these events and stays an owner alternative.
const habit = homePreview.habit;
export const habitXpPerDay = habit.weeklyXP / habit.activeDays.filter(date => date >= habit.weekStart).length;
export const habitEvents = Object.freeze(habit.activeDays.map(date => Object.freeze({ date, kind: 'qualifying', xp: habitXpPerDay, dedupe_key: `daily-${date}` })));
export const habitFreezeDays = habit.freezeDays;
export const habitCandidates = Object.freeze({
  home: Object.freeze({ streak: habit.streak, weeklyXP: habit.weeklyXP }),
  party: Object.freeze({ streak: 7, weeklyXP: 92, level: 8, totalXP: 1240 })
});
