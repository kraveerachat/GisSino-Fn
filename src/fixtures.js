// Synthetic, in-memory design fixtures. Served only by the development server.
// These are not account records, calculations, or a future database schema.
export const preview = Object.freeze({ balance: 116850, safe: 14500, obligations: 12750, income: 42000, expense: 15240, month: 9, year: 2026 });
export const accounts = [
  { id: 'daily', name: 'accountDaily', kind: 'bank', accountType:'bank', amount: 68450, suffix: '0428', share: 59 },
  { id: 'savings', name: 'accountSavings', kind: 'wallet', accountType:'bank', amount: 48400, suffix: '0916', share: 41 }
];
export const transactions = [
  { id: 'coffee', name: 'txCoffee', category: 'food', type: 'expense', amount: 85, icon: 'coffee', time: '09:42', day: 'today', account: 'accountDaily' },
  { id: 'market', name: 'txMarket', category: 'shopping', type: 'expense', amount: 640, icon: 'bag', time: '08:15', day: 'today', account: 'accountDaily' },
  { id: 'saving', name: 'txTransfer', category: 'transfer', type: 'transfer', amount: 5000, icon: 'transfer', time: '18:30', day: 'yesterday', account: 'accountSavings' },
  { id: 'salary', name: 'txSalary', category: 'income', type: 'income', amount: 42000, icon: 'income', time: '10:00', day: 'yesterday', account: 'accountDaily' },
  { id: 'train', name: 'txTrain', category: 'travel', type: 'expense', amount: 120, icon: 'train', time: '07:50', day: 'yesterday', account: 'accountDaily', needsDetails: true }
];
export const bills = [
  { id: 'card', name: 'billCard', category: 'creditCards', icon: 'card', amount: 8250, due: 20, status: 'dueSoon' },
  { id: 'power', name: 'billPower', category: 'monthlyBills', icon: 'bolt', amount: 1250, due: 22, status: 'upcoming' },
  { id: 'device', name: 'billDevice', category: 'installments', icon: 'bag', amount: 2900, due: 25, status: 'upcoming', installment: '3 / 10' },
  { id: 'music', name: 'billMusic', category: 'subscriptions', icon: 'music', amount: 350, due: 28, status: 'upcoming' }
];
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
