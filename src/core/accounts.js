// One account source for every picker (WP-20 F2). The records are the session's
// account profiles (fixture accounts plus any added/renamed in this page session);
// this module only filters and orders them. No balances are computed here.
export const assetTypes = Object.freeze(['bank', 'ewallet', 'cash']);

// Asset accounts as Home, Wallet and the Account Board show them: archived hidden, sortOrder.
export const assetAccounts = (records = []) => records
  .filter(account => assetTypes.includes(account.accountType) && !account.archived)
  .slice()
  .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

// Accounts offered by Add Expense/Income, Transfer and Bills funding. Currencies are
// never mixed: a picker shows one currency (THB by default) and nothing converts.
export function accountsForPicker(state = {}, { currency = 'THB', records } = {}) {
  return assetAccounts(records ?? state.accountProfiles ?? []).filter(account => account.currency === currency);
}

// Number of asset accounts behind the Home hero total (same filter as the total).
export const pickerAccountCount = (state, options) => accountsForPicker(state, options).length;

// True when another non-archived account already uses this display name (F13 hint only).
export function duplicateAccountName(records = [], name = '', exceptId = null, displayName = account => account.nickname || '') {
  const key = String(name).trim().toLocaleLowerCase();
  if (!key) return false;
  return assetAccounts(records).some(account => account.id !== exceptId && String(displayName(account)).trim().toLocaleLowerCase() === key);
}
