import { bkkDate, bkkWeekRange } from './core/clock.js';
import { rankFriends } from './core/ranking.js';
import { habitStats } from './habit-preview.js';

// Party-only synthetic aggregate and relationship fixtures. No finance records or network service.
// "Today" is the shared mock clock, so Party and Home show the same week.
export const partyPreviewToday = bkkDate();
const partySampleWeekStart = partyWeek(partyPreviewToday).start;
// Streak and weekly XP come from the one shared habit source; level and lifetime XP are Party-only.
const selfHabit = habitStats(partyPreviewToday);
export const partySelfStats = Object.freeze({level:8,totalXP:1240,nextLevelXP:1500,streak:selfHabit.streak,freezes:2});
export const partyBadges = Object.freeze([
  ['star','badgeFirst'],['flame','badgeWeek'],['wallet','badgeCalm'],['lock','badgeMonth']
]);
export const partyFeed = Object.freeze([
  ['flame','feedOne'],['trophy','feedTwo']
]);

export const partyPeople = Object.freeze([
  {id:'you',nickname:{th:'คุณกิส',en:'You'},username:'gissino',friendCode:'104208',initials:'GS',visibility:'status',rankingOptIn:true,globalOptIn:true,discoverable:false,weeklyXP:selfHabit.weeklyXP,weekStart:partySampleWeekStart,streak:selfHabit.streak},
  {id:'lin',nickname:{th:'ลิน',en:'Lin'},username:'lin.blue',friendCode:'281604',initials:'LN',visibility:'status',rankingOptIn:true,globalOptIn:true,discoverable:true,weeklyXP:170,weekStart:partySampleWeekStart,streak:8},
  {id:'min',nickname:{th:'มิน',en:'Min'},username:'min.day',friendCode:'462718',initials:'MN',visibility:'status',rankingOptIn:true,globalOptIn:true,discoverable:true,weeklyXP:135,weekStart:partySampleWeekStart,streak:5},
  {id:'ton',nickname:{th:'ต้น',en:'Ton'},username:'ton.steps',friendCode:'813502',initials:'TN',visibility:'status',rankingOptIn:true,globalOptIn:true,discoverable:true,weeklyXP:110,weekStart:partySampleWeekStart,streak:4},
  {id:'ravi',nickname:{th:'ราวี',en:'Ravi'},username:'ravi.week',friendCode:'576210',initials:'RV',visibility:'status',rankingOptIn:true,globalOptIn:true,discoverable:false,weeklyXP:150,weekStart:partySampleWeekStart,streak:6},
  {id:'maya',nickname:{th:'มายา',en:'Maya'},username:'maya.notes',friendCode:'351940',initials:'MY',visibility:'status',rankingOptIn:false,globalOptIn:false,discoverable:true,weeklyXP:null,weekStart:partySampleWeekStart,streak:2},
  {id:'pim',nickname:{th:'พิม',en:'Pim'},username:'pim.grows',friendCode:'640921',initials:'PM',visibility:'status',rankingOptIn:true,globalOptIn:true,discoverable:true,weeklyXP:80,weekStart:partySampleWeekStart,streak:3},
  {id:'arin',nickname:{th:'อริน',en:'Arin'},username:'arin.flow',friendCode:'739105',initials:'AR',visibility:'status',rankingOptIn:false,globalOptIn:false,discoverable:true,weeklyXP:null,weekStart:partySampleWeekStart,streak:null,suggested:true},
  {id:'nara',nickname:{th:'นารา',en:'Nara'},username:'nara.kind',friendCode:'928341',initials:'NR',visibility:'status',rankingOptIn:false,globalOptIn:false,discoverable:true,weeklyXP:null,weekStart:partySampleWeekStart,streak:null,suggested:true},
  {id:'fai',nickname:{th:'ฝ้าย',en:'Fai'},username:'fai.path',friendCode:'157684',initials:'FI',visibility:'status',rankingOptIn:false,globalOptIn:false,discoverable:true,weeklyXP:null,weekStart:partySampleWeekStart,streak:null,suggested:true},
  {id:'hidden',nickname:{th:'ตัวอย่างส่วนตัว',en:'Private sample'},username:'private.sample',friendCode:'402361',initials:'PV',visibility:'private',rankingOptIn:true,globalOptIn:true,discoverable:false,weeklyXP:999,weekStart:partySampleWeekStart,streak:12},
  {id:'optout',nickname:{th:'ตัวอย่างไม่จัดอันดับ',en:'Unranked sample'},username:'unranked.sample',friendCode:'594172',initials:'UR',visibility:'status',rankingOptIn:false,globalOptIn:true,discoverable:false,weeklyXP:888,weekStart:partySampleWeekStart,streak:10},
  {id:'blocked',nickname:{th:'ไม่พร้อมใช้งาน',en:'Unavailable'},username:'blocked.sample',friendCode:'936218',initials:'--',visibility:'private',rankingOptIn:false,globalOptIn:false,discoverable:false,weeklyXP:null,weekStart:partySampleWeekStart,streak:null,suggested:true}
]);

const initialRelationships = Object.freeze({
  lin:'accepted',min:'accepted',ton:'accepted',maya:'outgoing',pim:'incoming',blocked:'blocked'
});
const validRelations = new Set(['none','accepted','incoming','outgoing','blocked','declined']);
export function createPartySession() {
  return {relationships:{...initialRelationships},tab:'search',query:'',lookup:null};
}
export const relationFor = (session,id) => session.relationships[id] || 'none';
export function setPartyRelationship(session,id,action,people=partyPeople) {
  if(!people.some(person=>person.id===id&&id!=='you'))return false;
  const current=relationFor(session,id);
  const next=action==='request'&&current==='none'?'outgoing'
    :action==='accept'&&current==='incoming'?'accepted'
    :action==='decline'&&current==='incoming'?'declined':null;
  if(!next||!validRelations.has(next))return false;
  session.relationships={...session.relationships,[id]:next};
  return true;
}

// Thin wrapper over the shared Bangkok week (merged with Home's bangkokWeek).
export function partyWeek(date=partyPreviewToday) {
  try { const {start,end}=bkkWeekRange(date); return {start,end}; } catch { return null; }
}

export function rankedPartyPeople({audience,people=partyPeople,relationships=initialRelationships,weekStart=partyWeek()?.start,viewerVisibility='status',viewerRankingOptIn=true,viewerShareXP=true}={}) {
  return rankFriends({audience,people,relationships,weekStart,viewerVisibility,viewerRankingOptIn,viewerShareXP});
}

export function acceptedPartyFriends(session,people=partyPeople) {
  return people.filter(person=>person.id!=='you'&&person.visibility!=='private'&&relationFor(session,person.id)==='accepted');
}
export function recommendedPartyFriends(session,people=partyPeople) {
  return people.filter(person=>person.id!=='you'&&person.suggested===true&&person.discoverable===true
    &&person.visibility!=='private'&&relationFor(session,person.id)==='none').slice(0,3);
}

export function exactPartyLookup(query,session,people=partyPeople) {
  const raw=String(query||'').trim();
  if(!raw)return {kind:'idle'};
  if(/^\d+$/.test(raw)&&!/^\d{6}$/.test(raw))return {kind:'invalidCode'};
  const normalized=raw.replace(/^@/,'').toLocaleLowerCase('en-US');
  const person=people.find(item=>/^\d{6}$/.test(raw)?item.friendCode===raw:item.username.toLocaleLowerCase('en-US')===normalized);
  if(!person)return {kind:'notFound'};
  if(person.id==='you')return {kind:'self'};
  if(relationFor(session,person.id)==='blocked'||person.visibility==='private'||person.discoverable!==true)return {kind:'unavailable'};
  return {kind:'found',personId:person.id};
}
