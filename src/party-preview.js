// Party-only synthetic aggregate and relationship fixtures. No finance records or network service.
export const partyPreviewToday = (() => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'
  }).formatToParts(new Date());
  const value = type => parts.find(part => part.type === type)?.value;
  return `${value('year')}-${value('month')}-${value('day')}`;
})();
const partySampleWeekStart = partyWeek(partyPreviewToday).start;
export const partySelfStats = Object.freeze({level:8,totalXP:1240,nextLevelXP:1500,streak:7,freezes:2});
export const partyBadges = Object.freeze([
  ['star','badgeFirst'],['flame','badgeWeek'],['wallet','badgeCalm'],['lock','badgeMonth']
]);
export const partyFeed = Object.freeze([
  ['flame','feedOne'],['trophy','feedTwo']
]);

export const partyPeople = Object.freeze([
  {id:'you',nickname:{th:'คุณกิส',en:'You'},username:'gissino',friendCode:'104208',initials:'GS',visibility:'status',rankingOptIn:true,globalOptIn:true,discoverable:false,weeklyXP:92,weekStart:partySampleWeekStart,streak:7},
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

export function partyWeek(date=partyPreviewToday) {
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return null;
  const day=new Date(`${date}T00:00:00Z`);
  if(Number.isNaN(day.getTime())||day.toISOString().slice(0,10)!==date)return null;
  const mondayOffset=(day.getUTCDay()+6)%7;
  const monday=new Date(day.getTime()-mondayOffset*86400000);
  const sunday=new Date(monday.getTime()+6*86400000);
  return {start:monday.toISOString().slice(0,10),end:sunday.toISOString().slice(0,10)};
}

export function rankedPartyPeople({audience,people=partyPeople,relationships=initialRelationships,weekStart=partyWeek()?.start,viewerVisibility='status',viewerRankingOptIn=true,viewerShareXP=true}={}) {
  if(!['friends','global'].includes(audience)||!weekStart)return [];
  const eligible=people.filter(person=>{
    const isViewer=person.id==='you';
    const visibility=isViewer?viewerVisibility:person.visibility;
    const optedIn=isViewer?viewerRankingOptIn&&viewerShareXP:person.rankingOptIn;
    if(visibility==='private'||!optedIn||person.weekStart!==weekStart)return false;
    if(audience==='friends')return isViewer||relationships[person.id]==='accepted';
    return (isViewer||person.globalOptIn===true)&&relationships[person.id]!=='blocked';
  });
  const sorted=eligible.filter(person=>Number.isSafeInteger(person.weeklyXP)&&person.weeklyXP>=0)
    .sort((a,b)=>b.weeklyXP-a.weeklyXP||a.id.localeCompare(b.id));
  let rank=0;
  return sorted.map((person,index)=>{
    if(!index||person.weeklyXP!==sorted[index-1].weeklyXP)rank=index+1;
    return {id:person.id,nickname:person.nickname,initials:person.initials,
      weeklyXP:person.weeklyXP,streak:person.streak,rank};
  });
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
