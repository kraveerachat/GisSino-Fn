import { bkkDate, bkkMonth } from './core/clock.js';
import { formatMoney } from './core/money.js';
import { formatDate, formatMonth } from './core/dates.js';
import { billsOverview as overview } from './core/obligations.js';
import { worldObligations } from './fixtures/world.js';

// Explicit synthetic cycles. This is a read-only presentation model, not the M5 scheduler.
// The cycles are the Fixture World obligations; the logic lives in core/obligations.js.
export const billPreviewToday = bkkDate();
export const billPreviewMonths = Object.freeze(['2026-09', '2026-10', '2026-11', '2026-12']);
export const billPreviewRecords = worldObligations;
export { validBillDate, validBillMonth, installmentProgress, dueDateForMonth, fixedInstallmentSchedule, validateBillDraft } from './core/obligations.js';
export const billDateLabel = (date,locale='th') => formatDate(date,{locale,day:'numeric',month:'short'});
export const billFullDateLabel = (date,locale='th') => formatDate(date,{locale,day:'numeric',month:'short',year:'numeric'});
export const billMonthLabel = (month,locale='th') => formatMonth(month,{locale});
// @deprecated thin wrapper; use formatMoney from core/money.js.
export const billMoney = (minor,currency,locale='th') => formatMoney(minor,currency,{locale});
export const billsOverview = ({month=bkkMonth(),today=billPreviewToday,records=billPreviewRecords}={}) => overview({month,today,records});
