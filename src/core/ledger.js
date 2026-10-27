// Balance projection from opening balances plus ledger entries. Pure; no DOM.
// Balance = opening + non-voided entries with opening_as_of < occurred_at <= instant.
const time = value => new Date(value).getTime();

// Ledger legs for one transaction. A leg without an account is left out and
// reported by unassignedLegs(); it is never guessed.
export function postings(tx) {
  if (!Number.isSafeInteger(tx.amountMinor) || tx.amountMinor < 0) return [];
  const leg = (accountId, sign) => accountId ? [{ transactionId: tx.id, accountId, amountMinor: sign * tx.amountMinor, currency: tx.currency, occurred_at: tx.date, voided: tx.status === 'voided' }] : [];
  // A card payment lowers the paying asset and the amount owed on the card;
  // it is never an expense (the card purchases already were).
  if (tx.kind === 'card_payment') return tx.fromAccountId && tx.toAccountId ? [...leg(tx.fromAccountId, -1), ...leg(tx.toAccountId, -1)] : [];
  // An own transfer moves value between two owned asset accounts.
  if (tx.type === 'transfer') return tx.fromAccountId && tx.toAccountId ? [...leg(tx.fromAccountId, -1), ...leg(tx.toAccountId, 1)] : [];
  if (tx.type === 'income') return leg(tx.accountId, 1);
  if (tx.type === 'expense') return leg(tx.accountId, -1);
  return [];
}
export const ledgerEntries = transactions => transactions.flatMap(postings);
export function unassignedLegs(transactions) {
  return transactions.flatMap(tx => {
    if (tx.type === 'transfer' || tx.kind === 'card_payment') return [['fromAccountId', tx.fromAccountId], ['toAccountId', tx.toAccountId]].filter(([, id]) => !id).map(([leg]) => ({ id: tx.id, leg }));
    return tx.accountId ? [] : [{ id: tx.id, leg: 'accountId' }];
  });
}

export function balanceAt(account, entries, instant) {
  const at = time(instant), from = time(account.opening_balance_as_of);
  if (!Number.isSafeInteger(account.opening_balance_minor) || !(at >= from)) return null;
  const total = entries.filter(entry => entry.accountId === account.id && !entry.voided && time(entry.occurred_at) > from && time(entry.occurred_at) <= at)
    .reduce((sum, entry) => sum + BigInt(entry.amountMinor), BigInt(account.opening_balance_minor));
  return total > BigInt(Number.MAX_SAFE_INTEGER) || total < BigInt(Number.MIN_SAFE_INTEGER) ? null : Number(total);
}
function total(accounts, entries, instant, currency) {
  const values = accounts.filter(account => account.currency === currency).map(account => balanceAt(account, entries, instant));
  return values.some(value => value === null) ? null : values.reduce((sum, value) => sum + value, 0);
}
export const assetsAt = (accounts, entries, instant, currency) => total(accounts.filter(account => !account.is_liability), entries, instant, currency);
// Liability balances are stored as positive amounts owed.
export const liabilitiesAt = (accounts, entries, instant, currency) => total(accounts.filter(account => account.is_liability), entries, instant, currency);
export function netWorthAt(accounts, entries, instant, currency) {
  const assets = assetsAt(accounts, entries, instant, currency), liabilities = liabilitiesAt(accounts, entries, instant, currency);
  return assets === null || liabilities === null ? null : assets - liabilities;
}
