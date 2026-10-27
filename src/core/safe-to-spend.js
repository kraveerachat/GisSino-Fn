// Liquid assets minus unpaid current-month obligations, per currency and without
// FX. A negative result is a true shortfall. Not rendered on Home (D31, flag
// safeToSpendChip); kept as the single arithmetic source. Moved from deriveHomeOverview.
export function safeToSpend(liquidAssets, unpaidThisMonth, currency) {
  const cash = liquidAssets.filter(a => a.currency === currency), due = unpaidThisMonth.filter(b => b.currency === currency);
  let available = cash.every(a => Number.isSafeInteger(a.balanceMinor)) && due.every(b => Number.isSafeInteger(b.amountMinor) && b.amountMinor >= 0);
  const liquidMinor = cash.reduce((sum, a) => sum + BigInt(Number.isSafeInteger(a.balanceMinor) ? a.balanceMinor : 0), 0n);
  const unpaidMinor = due.reduce((sum, b) => sum + BigInt(Number.isSafeInteger(b.amountMinor) ? b.amountMinor : 0), 0n);
  const safe = liquidMinor - unpaidMinor;
  available = available && [liquidMinor, unpaidMinor, safe].every(v => v >= BigInt(Number.MIN_SAFE_INTEGER) && v <= BigInt(Number.MAX_SAFE_INTEGER));
  return { currency, available, liquidMinor: available ? Number(liquidMinor) : null, unpaidMinor: available ? Number(unpaidMinor) : null, safeMinor: available ? Number(safe) : null };
}
