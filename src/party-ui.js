import {icon} from './icons.js';
import {escapeHTML as esc} from './i18n.js';
import {
  acceptedPartyFriends,partyBadges,partyFeed,partyPeople,partyPreviewToday,partySelfStats,
  partyWeek,rankedPartyPeople,recommendedPartyFriends,relationFor
} from './party-preview.js';
import {formatDateRange} from './core/dates.js';

const name=(person,locale)=>person.nickname?.[locale]||person.nickname?.th||'';
const number=(value,locale)=>new Intl.NumberFormat(locale==='th'?'th-TH':'en-US').format(value);
const weekLabel=(locale)=>{
  const week=partyWeek(partyPreviewToday);
  return formatDateRange(week.start,week.end,{locale,day:'numeric',month:'short',year:'numeric'});
};
const policy=state=>({
  viewerVisibility:state.partyVisibility||'status',
  viewerRankingOptIn:state.partyRankingOptIn!==false,
  viewerShareXP:state.shareXP!==false
});
// Home check-in XP from this page session also counts for the viewer here.
const withSessionXP=state=>partyPeople.map(person=>person.id==='you'&&state.homeDemoXP?{...person,weeklyXP:person.weeklyXP+state.homeDemoXP}:person);
export const partyBoardRows=(audience,state,session)=>rankedPartyPeople({
  audience,people:withSessionXP(state),relationships:session.relationships,weekStart:partyWeek(partyPreviewToday).start,...policy(state)
});
const avatar=(person,extra='')=>`<span class="avatar party-avatar ${extra}" aria-hidden="true">${esc(person.initials)}</span>`;
const row=(person,state,t,ownRow=false)=>`<div class="party-rank-row ${person.id==='you'?'is-you':''} ${ownRow?'is-own-position':''}">
  <span class="party-rank-number" aria-label="${esc(t('partyRank',{n:person.rank}))}">${person.rank}</span>
  ${avatar(person)}
  <span class="party-rank-person"><strong>${esc(name(person,state.locale))}</strong><small>${person.id==='you'&&state.shareStreak===false?t('hiddenFromParty'):Number.isSafeInteger(person.streak)?t('partyStreakContext',{n:number(person.streak,state.locale)}):t('partyMetricUnavailable')}</small></span>
  <strong class="party-weekly-value">${esc(number(person.weeklyXP,state.locale))}<small> ${t('partyWeeklyXPUnit')}</small></strong>
</div>`;

function board(audience,state,t,session) {
  const rows=partyBoardRows(audience,state,session);
  const friends=acceptedPartyFriends(session);
  const isFriends=audience==='friends';
  const title=t(isFriends?'partyFriendsRanking':'partyGlobalRanking');
  const intro=t(isFriends?'partyFriendsRankingIntro':'partyGlobalRankingIntro');
  const empty=isFriends&&!friends.length?'partyNoFriendsBoard':isFriends?'partyMetricUnavailable':'partyNoGlobalBoard';
  const top=isFriends&&!friends.length?[]:rows.slice(0,3);
  const own=!isFriends&&rows.length>3?rows.find(item=>item.id==='you'&&!top.some(topItem=>topItem.id==='you')):null;
  return `<section class="panel party-board party-board-${audience}" aria-labelledby="party-${audience}-title">
    <div class="party-board-heading"><div><h2 id="party-${audience}-title">${title}</h2><p>${intro}</p></div><span class="party-board-icon" aria-hidden="true">${icon(isFriends?'party':'globe')}</span></div>
    <p class="party-period">${icon('calendar')}${esc(weekLabel(state.locale))}</p>
    ${top.length?`<div class="party-rank-list">${top.map(person=>row(person,state,t)).join('')}</div>`:`<div class="party-board-empty"><p>${t(empty)}</p>${isFriends&&!friends.length?`<button type="button" class="button secondary" data-action="party-friends-open" data-tab="search">${icon('plus')}${t('partyAddFriend')}</button>`:''}</div>`}
    ${own?row(own,state,t,true):''}
    ${rows.length>3?`<button type="button" class="party-view-all" data-action="party-board-all" data-board="${audience}">${t('viewAll')}${icon('arrow')}</button>`:''}
    <p class="party-sample-note">${t('partySampleLabel')}</p>
  </section>`;
}

function friendCard(state,t,session) {
  const friends=acceptedPartyFriends(session);
  return `<section class="panel members-panel party-friends-card" aria-labelledby="party-my-friends">
    <div class="party-card-title"><h2 id="party-my-friends">${t('partyMyFriends')}</h2><strong class="party-count">${number(friends.length,state.locale)}</strong></div>
    ${friends.length?`<div class="party-friend-summary"><div class="member-stack">${friends.slice(0,4).map(person=>avatar(person)).join('')}</div><span>${t('partyFriendsCount',{n:number(friends.length,state.locale)})}</span></div>`:`<p class="party-friend-summary">${t('partyNoFriendsYet')}</p>`}
    <button type="button" class="button primary full-width" data-action="party-friends-open" data-tab="search">${icon('plus')}${t('partyAddFriend')}</button>
    <button type="button" class="party-view-friends" data-action="party-friends-open" data-tab="friends">${t('partyViewFriends')}${icon('arrow')}</button>
  </section>`;
}

export function partyGrid(state,t,session) {
  const s=partySelfStats;
  return `<div class="party-v2"><div class="party-grid"><div class="party-primary">
    <section class="party-status enamel"><div class="party-status-header"><span class="avatar avatar-large">GS</span><div><span>${t('myProgress')}</span><h2>${t('hello')}</h2></div><span class="level-pill">${t('level',{n:s.level})}</span></div><div class="xp-line"><strong>${number(s.totalXP,state.locale)} <span>${t('xp')}</span></strong><span>${t('nextLevel')}</span></div><progress max="${s.nextLevelXP}" value="${s.totalXP}" aria-label="${t('xp')}"></progress><div class="party-stats"><div>${icon('flame')}<span>${t('dayStreak')}<strong>${t('days',{n:s.streak})}</strong></span></div><div>${icon('snow')}<span>${t('freezes')}<strong>${t('freezeCount')}</strong></span></div></div></section>
    <section class="panel badges-panel"><div class="section-heading"><h2>${t('badges')}</h2></div><div class="badge-gallery">${partyBadges.map(([glyph,key],index)=>`<div class="badge-item ${index===3?'locked':''}"><span class="medallion">${icon(glyph)}</span><strong>${t(key)}</strong>${index===3?`<small>${t('locked')}</small>`:''}</div>`).join('')}</div></section>
    ${board('friends',state,t,session)}
    ${board('global',state,t,session)}
  </div><div class="party-secondary">
    ${friendCard(state,t,session)}
    <section class="panel feed-panel"><div class="section-heading"><h2>${t('activityFeed')}</h2></div>${partyFeed.map(([glyph,key])=>`<div class="feed-item"><span class="well-icon">${icon(glyph)}</span><div><strong>${t(key)}</strong><small>${t('feedTime')}</small></div></div>`).join('')}<p class="party-sample-note">${t('partySampleLabel')}</p></section>
  </div></div></div>`;
}

function candidate(person,state,t,session,compact=false) {
  const relation=relationFor(session,person.id);
  const action=relation==='none'
    ?`<button type="button" class="party-person-action" data-action="party-friend-request" data-id="${esc(person.id)}">${t('partyAddFriend')}</button>`
    :relation==='incoming'
    ?`<span class="party-request-actions"><button type="button" class="party-person-action" data-action="party-friend-accept" data-id="${esc(person.id)}">${t('partyAccept')}</button><button type="button" class="party-person-action is-secondary" data-action="party-friend-decline" data-id="${esc(person.id)}">${t('partyDecline')}</button></span>`
    :`<span class="party-relationship is-${relation}">${t(relation==='outgoing'?'partyPending':relation==='accepted'?'partyAlreadyFriends':'partyUnavailable')}</span>`;
  return `<div class="party-person-row">${avatar(person)}<span class="party-person-copy"><strong>${esc(name(person,state.locale))}</strong><small>${compact?t('partySamplePerson'):`@${esc(person.username)}`}</small></span>${action}</div>`;
}
function lookupResult(state,t,session) {
  if(!session.lookup||session.lookup.kind==='idle')return '';
  const result=session.lookup;
  if(result.kind!=='found')return `<div id="party-search-result" class="party-search-message" role="status" tabindex="-1">${t(({invalidCode:'partyInvalidCode',self:'partySelfSearch',unavailable:'partyUnavailable',notFound:'partyNoResult'})[result.kind]||'partyNoResult')}</div>`;
  const person=partyPeople.find(item=>item.id===result.personId);
  if(!person)return '';
  return `<div id="party-search-result" class="party-search-result" tabindex="-1"><h3>${t('partySearchResult')}</h3>${candidate(person,state,t,session)}</div>`;
}

function searchTab(state,t,session) {
  const suggestions=recommendedPartyFriends(session);
  return `<form id="party-friend-search" class="party-friend-search" role="search" novalidate><label for="party-friend-query">${t('partySearchLabel')}</label><div class="party-search-control"><input id="party-friend-query" name="query" type="search" maxlength="40" autocomplete="off" spellcheck="false" value="${esc(session.query)}" placeholder="${t('partySearchPlaceholder')}"><button type="submit" class="button primary">${icon('search')}<span>${t('search')}</span></button></div><p>${t('partyExactSearchHint')}</p></form>
    ${lookupResult(state,t,session)}
    <section class="party-suggestions" aria-labelledby="party-suggestion-title"><div class="party-subheading"><h3 id="party-suggestion-title" tabindex="-1">${t('partySuggestions')}</h3><span>${t('partySampleLabel')}</span></div>${suggestions.length?suggestions.map(person=>candidate(person,state,t,session,true)).join(''):`<p class="party-empty-copy">${t('partyNoSuggestions')}</p>`}</section>`;
}
function requestsTab(state,t,session) {
  const requests=partyPeople.filter(person=>['incoming','outgoing'].includes(relationFor(session,person.id)));
  return `<section class="party-sheet-list" aria-label="${t('partyRequests')}">${requests.length?requests.map(person=>candidate(person,state,t,session)).join(''):`<p class="party-empty-copy">${t('partyNoRequests')}</p>`}</section>`;
}
function friendsTab(state,t,session) {
  const friends=acceptedPartyFriends(session);
  return `<section class="party-sheet-list" aria-label="${t('partyMyFriends')}">${friends.length?friends.map(person=>candidate(person,state,t,session)).join(''):`<p class="party-empty-copy">${t('partyNoFriendsYet')}</p>`}</section>`;
}
export function partyFriendsSheet(state,t,session) {
  const tab=['search','requests','friends'].includes(session.tab)?session.tab:'search';
  const labels={search:'partyFindFriends',requests:'partyRequests',friends:'partyMyFriends'};
  return `<div class="party-friends-sheet"><p class="sheet-subtitle">${t('partyFindSubtitle')}</p><div class="party-sheet-tabs" role="group" aria-label="${t('partyFriendsTabs')}">${Object.entries(labels).map(([key,label])=>`<button type="button" data-action="party-friends-tab" data-tab="${key}" aria-pressed="${tab===key}">${t(label)}</button>`).join('')}</div><div class="party-tab-panel">${tab==='search'?searchTab(state,t,session):tab==='requests'?requestsTab(state,t,session):friendsTab(state,t,session)}</div><p class="sheet-disclaimer">${icon('shield')}${t('partyFriendsPreviewNote')}</p></div>`;
}
export function partyRankingSheet(audience,state,t,session) {
  const rows=partyBoardRows(audience,state,session);
  return `<div class="party-ranking-sheet"><p class="sheet-subtitle">${t('partyWeeklyHabit')} · ${esc(weekLabel(state.locale))}</p><p class="party-sample-note">${t('partySampleLabel')}</p>${rows.length?`<div class="party-rank-list">${rows.map(person=>row(person,state,t)).join('')}</div>`:`<p class="party-empty-copy">${t(audience==='friends'?'partyNoFriendsBoard':'partyNoGlobalBoard')}</p>`}</div>`;
}
export function partyVisibilitySheet(state,t) {
  const levels=['private','status','full'];
  return `<div class="party-visibility-sheet"><p class="sheet-subtitle">${t('partyVisibilityIntro')}</p><fieldset class="party-visibility-levels"><legend>${t('partyVisibilityLevel')}</legend>${levels.map(level=>`<label class="party-visibility-choice"><input type="radio" name="party-visibility" data-control="party-visibility" value="${level}" ${(state.partyVisibility||'status')===level?'checked':''}><span><strong>${t('partyVisibility'+level[0].toUpperCase()+level.slice(1))}</strong><small>${t('partyVisibility'+level[0].toUpperCase()+level.slice(1)+'Help')}</small></span></label>`).join('')}</fieldset><label class="switch-row"><span>${t('partyRankingOptIn')}</span><input type="checkbox" role="switch" data-control="party-ranking-opt-in" ${state.partyRankingOptIn!==false?'checked':''}><span class="switch-track" aria-hidden="true"></span></label><p class="party-visibility-hint">${t('partyRankingSeparate')}</p><div class="visibility-options">${[['shareStreak','share-streak'],['shareXP','share-xp']].map(([key,id])=>`<label class="switch-row"><span>${t(key)}</span><input type="checkbox" role="switch" id="${id}" data-control="${key}" ${state[key]?'checked':''}><span class="switch-track" aria-hidden="true"></span></label>`).join('')}</div><p class="sheet-disclaimer">${icon('shield')}${t('partyVisibilityPreviewNote')}</p></div>`;
}
