import { homePreview } from './fixtures.js';
import { bangkokClock } from './home-overview.js';
import { icon } from './icons.js';
import { escapeHTML as esc } from './i18n.js';

const dayMs = 86400000;
const ordinal = date => Date.parse(date + 'T00:00:00Z') / dayMs;
const dayKey = day => new Date(day * dayMs).toISOString().slice(0, 10);
const validDay = date => typeof date === 'string' && /^20\d{2}-\d{2}-\d{2}$/.test(date) && Number.isFinite(ordinal(date)) && dayKey(ordinal(date)) === date;
export function bangkokWeek(date) {
  if (!validDay(date)) throw new TypeError('Invalid Bangkok calendar date');
  const start = ordinal(date) - (new Date(date + 'T00:00:00Z').getUTCDay() + 6) % 7;
  return Array.from({ length: 7 }, (_, i) => dayKey(start + i));
}

// Explicit fixtures and a page-lifetime Map. This is not a production habit/reward engine.
export function deriveHabitPreview({ today, activeDays = [], freezeDays = [], streak = 0, weeklyXP = 0, selectedDay = today }) {
  const week = bangkokWeek(today);
  const active = new Set(activeDays.filter(date => validDay(date) && date <= today));
  const frozen = new Set(freezeDays.filter(date => validDay(date) && date < today));
  const count = week.filter(date => active.has(date)).length;
  const missingDays = week.filter(date => date < today && !active.has(date));
  const days = Array.from({ length: 21 }, (_, i) => {
    const date = dayKey(ordinal(week[0]) - 7 + i);
    const status = date > today ? 'future' : active.has(date) ? 'complete' : frozen.has(date) ? 'frozen' : date === today ? 'pending' : 'missed';
    return { date, status, current: date === today };
  });
  const selected = days.find(day => day.date === selectedDay) || days.find(day => day.current);
  return { today, week, count, missingDays, percentage: Math.round(count / 7 * 100), days, selected, streak, weeklyXP, complete: active.has(today) };
}
export function createCheckinPreview() {
  const grants = new Map();
  return {
    days: () => [...grants.keys()],
    xpForWeek: date => bangkokWeek(date).reduce((sum, day) => sum + (day <= date ? grants.get(day) || 0 : 0), 0),
    confirm(date, alreadyActive = false, reward = homePreview.habit.rewardXP) {
      if (!validDay(date) || !Number.isSafeInteger(reward) || reward < 0 || reward > 1000) throw new TypeError('Invalid synthetic check-in');
      if (alreadyActive || grants.has(date)) return { awarded: false, xp: 0 };
      grants.set(date, reward);
      return { awarded: true, xp: reward };
    }
  };
}
export function habitOverview(state) {
  const today = (bangkokClock(state.homeNow || '') || bangkokClock(homePreview.nowLocal)).date;
  const fixture = homePreview.habit;
  const demoDays = state.homeDemoDays || [];
  const activeDays = [...fixture.activeDays, ...(state.homeScenario === 'clear' ? [today] : []), ...demoDays];
  const sameWeek = bangkokWeek(today)[0] === fixture.weekStart;
  const sameSnapshot = today === homePreview.nowLocal.slice(0, 10);
  return deriveHabitPreview({ today, activeDays, freezeDays: fixture.freezeDays,
    streak: sameSnapshot ? fixture.streak : null,
    weeklyXP: (sameWeek ? fixture.weeklyXP : 0) + (state.homeDemoXP || 0), selectedDay: state.homeSelectedDay });
}
const dateLabel = (date, locale, options) => new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-GB', { timeZone: 'Asia/Bangkok', ...options }).format(new Date(date + 'T00:00:00+07:00'));
const statusIcon = status => ({ complete: 'check', missed: 'close', frozen: 'snow', pending: 'plus', future: 'calendar' })[status];
export function habitCard(model, state, t) {
  const selected = model.selected;
  return `<section class="home-habit" aria-labelledby="habit-title" data-habit-card>
    <div class="habit-heading"><h2 id="habit-title">${t('habitTitle')}</h2><a href="#party">${t('habitParty')}${icon('chevron')}</a></div>
    <div class="habit-summary"><div class="habit-counters"><div class="habit-streak">${icon('flame')}<span><strong>${model.streak === null ? t('habitNoSnapshot') : t('habitStreak',{ n:model.streak })}</strong><small>${t('habitCurrentStreak')}</small></span></div><div class="habit-xp"><strong>${model.weeklyXP} <span>XP</span></strong><small>${t('habitWeeklyXP')}</small></div><div class="habit-missing">${model.missingDays.length?`<span>${t(model.missingDays.length===1?'habitMissingOne':'habitMissing',{n:model.missingDays.length})}</span><button type="button" data-action="habit-missed">${t('habitViewMissed')}${icon('chevron')}</button>`:`<span class="habit-all-recorded">${icon('check')}${t('habitNoMissing')}</span>`}</div></div>
    <div class="habit-progress" role="img" aria-label="${t('habitProgressLabel',{n:model.count,p:model.percentage})}"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="habit-ring-track" cx="50" cy="50" r="42"/><circle class="habit-ring-value" cx="50" cy="50" r="42" pathLength="100" stroke-dasharray="${model.percentage} 100"/></svg><div><strong>${model.percentage}%</strong><span>${t('habitDays',{n:model.count})}</span></div></div></div>
    <div class="habit-week-label"><span>${dateLabel(model.week[0],state.locale,{day:'numeric',month:'short'})} – ${dateLabel(model.week[6],state.locale,{day:'numeric',month:'short'})}</span><span>${t('habitWeekDefinition')}</span></div>
    <div class="habit-timeline-tools"><p id="habit-timeline-label">${t('habitTimeline')}</p><div><button type="button" class="habit-arrow previous" data-action="habit-step" data-direction="-1" aria-label="${t('habitPrevious')}">${icon('chevron')}</button><button type="button" class="habit-arrow" data-action="habit-step" data-direction="1" aria-label="${t('habitNext')}">${icon('chevron')}</button></div></div>
    <div class="habit-timeline" role="group" aria-labelledby="habit-timeline-label" data-habit-timeline>${model.days.map(day=>`<button type="button" class="habit-day is-${day.status}" data-action="habit-day" data-date="${day.date}" data-status="${day.status}" tabindex="${day.date===selected.date?'0':'-1'}" aria-pressed="${day.date===selected.date}" ${day.current?'aria-current="date"':''} aria-label="${esc(dateLabel(day.date,state.locale,{dateStyle:'full'}))} · ${t('habitStatus'+day.status)}${day.current?' · '+t('today'):''}"><span>${dateLabel(day.date,state.locale,{weekday:'short'})}</span><strong>${new Date(day.date+'T00:00:00Z').getUTCDate()}</strong>${icon(statusIcon(day.status))}${day.current?`<small>${t('today')}</small>`:''}</button>`).join('')}</div>
    <p class="habit-selected" role="status" aria-atomic="true" data-habit-selected>${dateLabel(selected.date,state.locale,{day:'numeric',month:'short'})} · ${t('habitStatus'+selected.status)}</p>
    <div class="habit-footer"><span>${t(model.complete?'habitTodayComplete':'habitTodayPending')}</span><button type="button" class="habit-checkin" data-action="habit-checkin">${t(model.complete?'habitReview':'habitCheckin')}${icon(model.complete?'check':'plus')}</button></div>
    <p class="habit-synthetic">${t('habitSynthetic')}</p>
  </section>`;
}
export function mountHabitTimeline(root, model, state, t) {
  if (!root) return;
  const strip = root.querySelector('[data-habit-timeline]');
  const buttons = [...strip.querySelectorAll('[data-date]')];
  const center = button => {
    strip.scrollLeft = button.offsetLeft - (strip.clientWidth - button.offsetWidth) / 2;
  };
  const select = (button, focus = false) => {
    if (!button) return;
    state.homeSelectedDay = button.dataset.date;
    for (const item of buttons) { item.tabIndex = item === button ? 0 : -1; item.setAttribute('aria-pressed', String(item === button)); }
    root.querySelector('[data-habit-selected]').textContent = `${dateLabel(button.dataset.date,state.locale,{day:'numeric',month:'short'})} · ${t('habitStatus'+button.dataset.status)}`;
    const index = buttons.indexOf(button);
    root.querySelector('.habit-arrow.previous').disabled = index === 0;
    root.querySelector('.habit-arrow:not(.previous)').disabled = index === buttons.length-1;
    if (focus) button.focus({preventScroll:true});
    // Scroll this region only: selecting a date must not move the entire dashboard.
    center(button);
  };
  select(buttons.find(b => b.dataset.date === model.selected.date));
  root.addEventListener('click', event => {
    const day = event.target.closest('[data-action="habit-day"]');
    if (day) select(day);
    const step = event.target.closest('[data-action="habit-step"]');
    if (step) select(buttons[buttons.findIndex(b=>b.tabIndex===0)+Number(step.dataset.direction)]);
    if (event.target.closest('[data-action="habit-missed"]')) select(buttons.find(button=>button.dataset.date===model.missingDays[0]),true);
  });
  strip.addEventListener('keydown', event => {
    const index = buttons.indexOf(event.target);
    if (index < 0 || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const target = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length-1 : Math.max(0, Math.min(buttons.length-1, index + (event.key==='ArrowRight'?1:-1)));
    select(buttons[target], true);
  });
  const observer = new ResizeObserver(() => center(buttons.find(button => button.tabIndex === 0)));
  observer.observe(strip);
  return () => observer.disconnect();
}
