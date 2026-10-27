import { accounts } from './fixtures.js';
import { bkkMonth } from './core/clock.js';
import { formatDate } from './core/dates.js';
import { walletSnapshots, worldTransactions } from './fixtures/world.js';

// Explicit illustrative archives, not reconstructed balances or a persisted ledger.
// Each balance is the state at 00:00 Asia/Bangkok on the first of its month.
// The archives now live in the Fixture World, where they also seed opening balances.
export { walletSnapshots };
export const walletCurrentPeriod = bkkMonth();

// Current-month entries are the Fixture World ledger, the same records Activity reads.
export const walletCurrentEntries = worldTransactions;

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
  return formatDate(`${period}-01`, { locale, month: 'short', year: 'numeric', ...options });
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
