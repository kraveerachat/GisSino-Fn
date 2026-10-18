import { accounts, preview, transactions } from './fixtures.js';

// Explicit illustrative archives, not reconstructed balances or a persisted ledger.
// Each balance is the state at 00:00 Asia/Bangkok on the first of its month.
export const walletCurrentPeriod = `${preview.year}-${String(preview.month + 1).padStart(2, '0')}`;
const ids = ['daily', 'savings', 'reserve', 'everyday-wallet', 'pocket-cash', 'family-savings'];
const archive = (period, balances, incoming, outgoing) => Object.freeze({
  period, capturedAt: `${period}-01T00:00:00+07:00`,
  accounts: Object.freeze(ids.map((id, index) => Object.freeze({
    ...accounts.find(account => account.id === id), balanceMinor: balances[index]
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

// Date the original relative-day records without modifying the shared fixture.
// Other undated records never silently enter a monthly activity calculation.
export const walletCurrentEntries = Object.freeze(transactions.map(entry => Object.freeze({
  ...entry, date: `${walletCurrentPeriod}-${entry.day === 'today' ? '18' : '17'}`
})));

export function walletPeriod(state, records = accounts, snapshots = walletSnapshots) {
  const history = state.walletMode === 'history';
  const snapshot = snapshots.find(item => item.period === state.walletPeriod);
  const selected = snapshot || snapshots[0];
  if (!history) return { history: false, period: walletCurrentPeriod, records, entries: walletCurrentEntries, snapshot: null };
  if (!selected) return { history: true, period: walletCurrentPeriod, records: [], entries: [], snapshot: null };
  const profiles = new Map(records.map(item => [item.id, item]));
  return {
    history: true, period: selected.period, snapshot: selected,
    records: selected.accounts.map(item => ({
      ...item, ...profiles.get(item.id), balanceMinor: item.balanceMinor,
      accountType: item.accountType, currency: item.currency, archived: item.archived
    })),
    entries: selected.period === walletCurrentPeriod ? walletCurrentEntries : selected.entries
  };
}

export function walletPeriodLabel(period, locale = 'th', options = {}) {
  const [year, month] = period.split('-').map(Number);
  return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH-u-ca-gregory' : 'en-GB', {
    month: 'short', year: 'numeric', timeZone: 'Asia/Bangkok', ...options
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

// Round inside the exact proportional sector; no minimum-sized slices.
export function walletRingSegments(segments, total) {
  if (!(total > 0) || !segments.every(item => Number.isSafeInteger(item.amount) && item.amount >= 0)) return [];
  const outer = 143, inner = 113;
  const point = (radius, angle) => `${(160 + radius * Math.cos(angle)).toFixed(4)} ${(160 + radius * Math.sin(angle)).toFixed(4)}`;
  let cursor = -Math.PI / 2;
  return segments.filter(item => item.amount > 0).map(item => {
    const angle = item.amount / total * Math.PI * 2;
    const gap = Math.min(.032, angle * .18);
    const start = cursor + gap / 2, end = cursor + angle - gap / 2;
    cursor += angle;
    const corner = Math.min(13, (end - start) * inner * .35);
    const outerCorner = corner / outer, innerCorner = corner / inner;
    const large = end - start - 2 * outerCorner > Math.PI ? 1 : 0;
    const innerLarge = end - start - 2 * innerCorner > Math.PI ? 1 : 0;
    return { kind: item.kind, path: [
      `M${point(outer, start + outerCorner)}`,
      `A${outer} ${outer} 0 ${large} 1 ${point(outer, end - outerCorner)}`,
      `Q${point(outer, end)} ${point(outer - corner, end)}`,
      `L${point(inner + corner, end)} Q${point(inner, end)} ${point(inner, end - innerCorner)}`,
      `A${inner} ${inner} 0 ${innerLarge} 0 ${point(inner, start + innerCorner)}`,
      `Q${point(inner, start)} ${point(inner + corner, start)}`,
      `L${point(outer - corner, start)} Q${point(outer, start)} ${point(outer, start + outerCorner)}Z`
    ].join(' ') };
  });
}
