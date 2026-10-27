// Synthetic, in-memory design fixtures. Served only by the development server.
// These are not account records, calculations, or a future database schema.
import { bkkLocal } from './core/clock.js';
// @deprecated preview.safe (14,500) is stale; the derived value is 104,100 and Safe to
// Spend is not shown on Home (D31). Nothing may read preview.safe (grep test).
export const preview = Object.freeze({ balance: 116850, safe: 14500, obligations: 12750, income: 42000, expense: 15240, month: 9, year: 2026 });
export const accounts = [
  { id: 'daily', name: 'accountDaily', kind: 'bank', accountType: 'bank', providerId: 'kbank', currency: 'THB', balanceMinor: 6845000, amount: 68450, suffix: '0428', context: 'mainAccount', archived: false, sortOrder: 0 },
  { id: 'savings', name: 'accountSavings', kind: 'wallet', accountType: 'bank', providerId: 'scb', currency: 'THB', balanceMinor: 3740000, amount: 37400, suffix: '0916', context: 'savingsAccount', archived: false, sortOrder: 1 },
  { id: 'reserve', name: 'accountReserve', kind: 'bank', accountType: 'bank', providerId: 'kbank', currency: 'THB', balanceMinor: 500000, amount: 5000, suffix: '0631', context: 'savingsAccount', archived: false, sortOrder: 2 },
  { id: 'everyday-wallet', name: 'accountEWallet', kind: 'wallet', accountType: 'ewallet', providerId: 'truemoney', currency: 'THB', balanceMinor: 250000, amount: 2500, context: 'everydayWallet', archived: false, sortOrder: 3 },
  { id: 'pocket-cash', name: 'accountCash', kind: 'wallet', accountType: 'cash', providerId: 'cash', currency: 'THB', balanceMinor: 150000, amount: 1500, context: 'cashOnHand', archived: false, sortOrder: 4 },
  { id: 'family-savings', name: 'accountFamilySavings', kind: 'bank', accountType: 'bank', providerId: 'baac', currency: 'THB', balanceMinor: 200000, amount: 2000, suffix: '0784', context: 'savingsAccount', archived: false, sortOrder: 5 }
];
export const transactions = [
  { id: 'coffee', name: 'txCoffee', category: 'food', type: 'expense', amount: 85, icon: 'coffee', time: '09:42', day: 'today', account: 'accountDaily' },
  { id: 'market', name: 'txMarket', category: 'shopping', type: 'expense', amount: 640, icon: 'bag', time: '08:15', day: 'today', account: 'accountDaily' },
  { id: 'saving', name: 'txTransfer', category: 'transfer', type: 'transfer', amount: 5000, icon: 'transfer', time: '18:30', day: 'yesterday', account: 'accountSavings' },
  { id: 'salary', name: 'txSalary', category: 'income', type: 'income', amount: 42000, icon: 'income', time: '10:00', day: 'yesterday', account: 'accountDaily' },
  { id: 'train', name: 'txTrain', category: 'travel', type: 'expense', amount: 120, icon: 'train', time: '07:50', day: 'yesterday', account: 'accountDaily', needsDetails: true }
];
export const bills = [
  { id: 'card', name: 'billCard', category: 'creditCards', icon: 'card', amount: 8250, amountMinor:825000, currency:'THB', dueDate:'2026-10-20', paid:false, due: 20, status: 'dueSoon' },
  { id: 'power', name: 'billPower', category: 'monthlyBills', icon: 'bolt', amount: 1250, amountMinor:125000, currency:'THB', dueDate:'2026-10-22', paid:false, due: 22, status: 'upcoming' },
  { id: 'device', name: 'billDevice', category: 'installments', icon: 'bag', amount: 2900, amountMinor:290000, currency:'THB', dueDate:'2026-10-25', paid:false, due: 25, status: 'upcoming',
    // @deprecated legacy installment label; the five-cycle Bills record (3 of 5) is the source. Nothing may read it (grep test).
    installment: '3 / 10' },
  { id: 'music', name: 'billMusic', category: 'subscriptions', icon: 'music', amount: 350, amountMinor:35000, currency:'THB', dueDate:'2026-10-28', paid:false, due: 28, status: 'upcoming' }
];
// Fixed, synthetic Home-only snapshots. Never advance these with the live clock.
// Scenario overrides do not change Bills, Account Board or any source records.
export const homePreview = Object.freeze({
  nowLocal:bkkLocal(), reminderAt:'20:00', streak:7, freezes:2,
  activityDays:Object.freeze(['2026-10-18']), monthlyExpense:Object.freeze({amountMinor:1524000,currency:'THB',month:'2026-10',illustrative:true}),
  scenarios:Object.freeze(['sample','actionable','clear','shortfall','party']),
  sampleParty:Object.freeze({synthetic:true,rank:2,nameTh:'ครอบครัวตัวอย่าง',nameEn:'Sample family'}),
  habit:Object.freeze({
    weekStart:'2026-10-12', streak:3, weeklyXP:80, rewardXP:10,
    activeDays:Object.freeze(['2026-10-06','2026-10-08','2026-10-09','2026-10-12','2026-10-15','2026-10-16','2026-10-18']),
    freezeDays:Object.freeze(['2026-10-17'])
  })
});
export const members = [
  { id: 'you', name: 'memberYou', initials: 'GS', xp: 1240, streak: 7 },
  { id: 'one', name: 'memberOne', initials: 'PL', xp: 1080, streak: 5 },
  { id: 'two', name: 'memberTwo', initials: 'TT', xp: 920, streak: 4 }
];
export const creditCard = Object.freeze({
  id: 'sample-credit', displaySuffix: '0916', outstandingMinor: 825000,
  fullAmountMinor: 825000, statementDay: 12, dueDay: 20, currency: 'THB'
});
export const dailySpending = Object.freeze([
  {day:10,amount:240},{day:11,amount:580},{day:12,amount:420},{day:13,amount:760},
  {day:14,amount:310},{day:15,amount:640},{day:16,amount:85}
]);
