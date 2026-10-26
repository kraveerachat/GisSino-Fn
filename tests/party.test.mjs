import test from 'node:test';
import assert from 'node:assert/strict';
import {
  acceptedPartyFriends,createPartySession,exactPartyLookup,partyPeople,partyPreviewToday,partyWeek,
  rankedPartyPeople,recommendedPartyFriends,setPartyRelationship
} from '../src/party-preview.js';
import {partyBoardRows,partyFriendsSheet,partyGrid,partyVisibilitySheet} from '../src/party-ui.js';
import {translator} from '../src/i18n.js';

const state=(locale='en')=>({
  locale,shareStreak:true,shareXP:true,partyVisibility:'status',partyRankingOptIn:true,
  partySession:createPartySession()
});

test('Bangkok preview week is Monday to Sunday across the boundary',()=>{
  assert.deepEqual(partyWeek('2026-10-18'),{start:'2026-10-12',end:'2026-10-18'});
  assert.deepEqual(partyWeek('2026-10-19'),{start:'2026-10-19',end:'2026-10-25'});
  assert.deepEqual(partyWeek('2027-01-01'),{start:'2026-12-28',end:'2027-01-03'});
  assert.equal(partyWeek('2026-02-30'),null);
  assert.equal(partyWeek(partyPreviewToday).start,partyPeople[0].weekStart);
});

test('Friends ranking uses accepted relationships and weekly XP, not lifetime XP',()=>{
  const session=createPartySession();
  const rows=rankedPartyPeople({audience:'friends',relationships:session.relationships});
  assert.deepEqual(rows.map(row=>row.id),['lin','min','ton','you']);
  assert.deepEqual(rows.map(row=>row.weeklyXP),[170,135,110,92]);
  assert.equal(rows.find(row=>row.id==='you').rank,4);
  assert.equal(acceptedPartyFriends(session).length,3);
  assert.ok(!rows.some(row=>['maya','pim','ravi','hidden','optout'].includes(row.id)));
  assert.ok(!rows.some(row=>Object.hasOwn(row,'totalXP')||Object.hasOwn(row,'amount')));
});

test('Global includes opted-in friends and others, and excludes private, opt-out and blocked',()=>{
  const session=createPartySession();
  const rows=rankedPartyPeople({audience:'global',relationships:session.relationships});
  assert.deepEqual(rows.slice(0,3).map(row=>row.id),['lin','ravi','min']);
  assert.ok(rows.some(row=>row.id==='ton'));
  assert.ok(!rows.some(row=>['hidden','optout','blocked'].includes(row.id)));
  assert.equal(rankedPartyPeople({audience:'global',relationships:session.relationships,viewerVisibility:'private'}).some(row=>row.id==='you'),false);
  assert.equal(rankedPartyPeople({audience:'global',relationships:session.relationships,viewerRankingOptIn:false}).some(row=>row.id==='you'),false);
  assert.equal(rankedPartyPeople({audience:'global',relationships:session.relationships,viewerShareXP:false}).some(row=>row.id==='you'),false);
});

test('Ties are stable and share competition ranks; missing weekly metrics stay unranked',()=>{
  const people=[
    {id:'you',nickname:{en:'You'},initials:'YO',visibility:'status',rankingOptIn:true,globalOptIn:true,weeklyXP:100,weekStart:'2026-10-12'},
    {id:'aaa',nickname:{en:'A'},initials:'AA',visibility:'status',rankingOptIn:true,globalOptIn:true,weeklyXP:100,weekStart:'2026-10-12'},
    {id:'bbb',nickname:{en:'B'},initials:'BB',visibility:'status',rankingOptIn:true,globalOptIn:true,weeklyXP:50,weekStart:'2026-10-12'},
    {id:'missing',nickname:{en:'Unknown'},initials:'UK',visibility:'status',rankingOptIn:true,globalOptIn:true,weeklyXP:null,weekStart:'2026-10-12'}
  ];
  const rows=rankedPartyPeople({audience:'global',people,relationships:{},weekStart:'2026-10-12'});
  assert.deepEqual(rows.map(row=>[row.id,row.rank]),[['aaa',1],['you',1],['bbb',3]]);
  assert.equal(rankedPartyPeople({audience:'global',people,relationships:{},weekStart:'2026-10-19'}).length,0);
});

test('Lookup requires exact username or six digits, with self and blocked states',()=>{
  const session=createPartySession();
  assert.deepEqual(exactPartyLookup('lin.blue',session),{kind:'found',personId:'lin'});
  assert.deepEqual(exactPartyLookup('@LIN.BLUE',session),{kind:'found',personId:'lin'});
  assert.deepEqual(exactPartyLookup('281604',session),{kind:'found',personId:'lin'});
  assert.equal(exactPartyLookup('lin',session).kind,'notFound');
  assert.equal(exactPartyLookup('12345',session).kind,'invalidCode');
  assert.equal(exactPartyLookup('104208',session).kind,'self');
  assert.equal(exactPartyLookup('blocked.sample',session).kind,'unavailable');
  assert.equal(exactPartyLookup('private.sample',session).kind,'unavailable');
  assert.equal(exactPartyLookup('unknown.name',session).kind,'notFound');
});

test('Suggestions are capped and exclude self, friends, pending, blocked and private people',()=>{
  const session=createPartySession();
  const extended=partyPeople.map(person=>({...person,suggested:true}));
  assert.deepEqual(recommendedPartyFriends(session,extended).map(person=>person.id),['arin','nara','fai']);
  assert.ok(recommendedPartyFriends(session,extended).length<=3);
  assert.ok(!recommendedPartyFriends(session,extended).some(person=>['you','lin','maya','pim','blocked','hidden'].includes(person.id)));
});

test('Requests and accept/decline affect only a session copy',()=>{
  const first=createPartySession();
  const fixtureRelation=first.relationships.pim;
  assert.equal(setPartyRelationship(first,'arin','request'),true);
  assert.equal(first.relationships.arin,'outgoing');
  assert.equal(setPartyRelationship(first,'pim','accept'),true);
  assert.equal(first.relationships.pim,'accepted');
  assert.equal(setPartyRelationship(first,'lin','request'),false);
  assert.equal(setPartyRelationship(first,'blocked','request'),false);
  const second=createPartySession();
  assert.equal(second.relationships.arin,undefined);
  assert.equal(second.relationships.pim,fixtureRelation);
  assert.equal(setPartyRelationship(second,'pim','decline'),true);
  assert.equal(second.relationships.pim,'declined');
});

test('Party UI retains personal status, badges and feed, then Friends and Global boards',()=>{
  const s=state(),t=translator('en');
  const html=partyGrid(s,t,s.partySession);
  assert.ok(html.indexOf('Friends Weekly Ranking')<html.indexOf('Global Ranking'));
  assert.match(html,/1,240/);
  assert.match(html,/badge-gallery/);
  assert.match(html,/A little encouragement/);
  assert.match(html,/My friends/);
  assert.match(html,/Synthetic data for design review/);
  assert.doesNotMatch(html,/Share the encouragement\. Keep the balances\./);
  assert.doesNotMatch(html,/accountDaily|txCoffee|balanceMinor|transaction-list/);
  assert.deepEqual(partyBoardRows('friends',s,s.partySession).map(row=>row.id),['lin','min','ton','you']);
});

test('Empty friends board, friend sheet tabs, visibility tiers and Thai copy render honestly',()=>{
  const s=state(),t=translator('en');
  s.partySession.relationships={};
  const empty=partyGrid(s,t,s.partySession);
  assert.match(empty,/No friends on the ranking yet/);
  assert.match(empty,/data-action="party-friends-open"/);
  const sheet=partyFriendsSheet(s,t,s.partySession);
  assert.match(sheet,/Find friends/);
  assert.match(sheet,/Requests/);
  assert.match(sheet,/People you may know/);
  assert.match(sheet,/No request is sent or saved/);
  const visibility=partyVisibilitySheet(s,t);
  assert.match(visibility,/Private/);
  assert.match(visibility,/Status only/);
  assert.match(visibility,/Full/);
  assert.match(visibility,/Join habit rankings/);
  assert.match(partyGrid(state('th'),translator('th'),createPartySession()),/อันดับเพื่อนประจำสัปดาห์/);
});
