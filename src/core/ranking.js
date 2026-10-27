// Weekly-XP ranking (D34; flag rankingKey 'weekly_xp'). Competition ranks with a
// stable-ID tie order. Private, opted-out, blocked, missing-metric and wrong-week
// people are unranked. Moved from party-preview.js rankedPartyPeople.
export function rankFriends({ audience, people, relationships, weekStart, viewerVisibility = 'status', viewerRankingOptIn = true, viewerShareXP = true }) {
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
