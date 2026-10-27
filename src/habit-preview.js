import { homePreview } from './fixtures.js';
import { bangkokClock, bkkDate, bkkWeekDays } from './core/clock.js';
import { formatDate } from './core/dates.js';
import { deriveHabitPreview, createCheckinPreview as createCheckin, streak, weeklyXp } from './core/habit.js';
import { habitEvents, habitFreezeDays, habitCandidates } from './fixtures/world.js';
import { flags } from './config/feature-flags.js';
import { icon } from './icons.js';
import { escapeHTML as esc } from './i18n.js';

// The week helper, preview derivation and check-in grants live in core/ (one
// implementation shared with Party); these names stay as thin wrappers.
export const bangkokWeek = bkkWeekDays;
export { deriveHabitPreview };
export const createCheckinPreview = () => createCheckin(homePreview.habit.rewardXP);

// One shared habit source for Home and Party (flag habitSource; Home set by default).
export function habitStats(today = bkkDate()) {
  if (flags.habitSource === 'party') return { ...habitCandidates.party, source: 'party' };
  return { streak: streak(habitEvents, habitFreezeDays, today), weeklyXP: weeklyXp(habitEvents, today), source: 'home' };
}
export function habitOverview(state) {
  const today = (bangkokClock(state.homeNow || '') || bangkokClock(homePreview.nowLocal)).date;
  const fixture = homePreview.habit;
  const demoDays = state.homeDemoDays || [];
  const activeDays = [...fixture.activeDays, ...(state.homeScenario === 'clear' ? [today] : []), ...demoDays];
  const snapshot = homePreview.nowLocal.slice(0, 10), stats = habitStats(snapshot);
  const sameWeek = bangkokWeek(today)[0] === bangkokWeek(snapshot)[0];
  return deriveHabitPreview({ today, activeDays, freezeDays: fixture.freezeDays,
    streak: today === snapshot ? stats.streak : null,
    weeklyXP: (sameWeek ? stats.weeklyXP : 0) + (state.homeDemoXP || 0), selectedDay: state.homeSelectedDay });
}
const dateLabel = (date, locale, options) => formatDate(date, { locale, ...options });
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
