import test from 'node:test';
import assert from 'node:assert/strict';
import { createPreviewFlow,updatePreviewValue,stepNavigation,setupSteps,validatePreviewFields,approximateAge,credentialDemoTarget } from '../src/preview-flow.js';

test('Preview memory rejects credentials, auth identities and legal/audit state',()=>{
  const flow=createPreviewFlow(),before={...flow};
  for(const key of ['email','password','confirm','invite','authenticated','userId','session','setup_completed_at','welcome_seen_at','consentTimestamp']){
    assert.equal(updatePreviewValue(flow,key,'secret'),false);
  }
  assert.deepEqual(flow,before);
});
test('New preview visits start fresh and never share mutable preferences',()=>{
  const first=createPreviewFlow();updatePreviewValue(first,'nickname','Guest');updatePreviewValue(first,'push',true);
  const next=createPreviewFlow();assert.equal(next.nickname,'');assert.equal(next.push,false);
});
test('Credential demo routes accept empty navigation without validating or retaining credentials',()=>{
 for(const kind of ['login','signup'])assert.deepEqual(validatePreviewFields(kind,{}),{});
 assert.equal(credentialDemoTarget('login'),'home');assert.equal(credentialDemoTarget('signup'),'setup/profile');
 for(const kind of ['about','__proto__','constructor',''])assert.equal(credentialDemoTarget(kind),null);
});
test('Six setup steps expose predictable Previous and Next links ending at Postcard',()=>{
  assert.equal(setupSteps.length,6);
  for(const [index,step] of setupSteps.entries()){
    const nav=stepNavigation('setup/'+step);assert.equal(nav.index,index);
    assert.equal(nav.previous,index?'setup/'+setupSteps[index-1]:'signup');
    assert.equal(nav.next,index===5?'postcard':'setup/'+setupSteps[index+1]);
  }
  assert.equal(stepNavigation('home'),null);
});
test('About You has optional approximate age and no age-group or eligibility thresholds',()=>{
  assert.equal(approximateAge('2000',2026),26);assert.equal(approximateAge('2026',2026),0);
  for(const year of ['2027','-1','text','', '999'])assert.equal(approximateAge(year,2026),null);
  assert.deepEqual(validatePreviewFields('about',{birthYear:''},2026),{});
  assert.equal(validatePreviewFields('about',{birthYear:'3000'},2026).birthYear,'yearFormat');
});
test('Choices are allowlisted, names bounded and account selection is independent from financial fixtures',()=>{
  const flow=createPreviewFlow();
  assert.equal(updatePreviewValue(flow,'gender','unapproved'),false);
  assert.equal(updatePreviewValue(flow,'avatar','script'),false);
  assert.equal(updatePreviewValue(flow,'currency','BTC'),false);
  updatePreviewValue(flow,'nickname','a'.repeat(200));assert.equal(flow.nickname.length,60);
  updatePreviewValue(flow,'accountType','ewallet');assert.equal(flow.providerId,'truemoney');
  assert.ok(!('balance' in flow));assert.ok(!('accounts' in flow));
});
test('Demonstration acknowledgement and notification choices are booleans without external side effects',()=>{
  const flow=createPreviewFlow();
  assert.equal(updatePreviewValue(flow,'consentDemo','true'),false);
  updatePreviewValue(flow,'consentDemo',true);updatePreviewValue(flow,'push',true);
  assert.equal(flow.consentDemo,true);assert.equal(flow.push,true);
  assert.equal(Object.keys(flow).some(key=>/token|timestamp|subscription/i.test(key)),false);
});
