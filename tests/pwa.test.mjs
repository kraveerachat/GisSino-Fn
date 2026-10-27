import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { createInstaller, installEnvironment, installGuide, wasDismissed, dismissInstall, dismissalDays, shouldOfferInstall, badgeCount, updateBadge } from '../src/pwa-install.js';
import { translator } from '../src/i18n.js';
const iphone = { userAgent:'Mozilla/5.0 (iPhone) Version/18.0 Mobile Safari/604.1' };
const desktop = installEnvironment({userAgent:'Chrome'});
const fakeStorage = () => { const data = new Map(); return {getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,value)}; };
test('Install mode detects iPhone/iPad Safari, desktop-mode iPad, Android, desktop and standalone', () => {
  assert.deepEqual(installEnvironment(iphone),{standalone:false,ios:true,safari:true,platform:'ios'});
  assert.equal(installEnvironment({userAgent:'iPad Safari'}).platform,'ipad');
  assert.equal(installEnvironment({userAgent:'Macintosh Safari',platform:'MacIntel',maxTouchPoints:5}).platform,'ipad');
  assert.equal(installEnvironment({userAgent:'iPhone CriOS Safari'}).safari,false);
  assert.equal(installEnvironment({userAgent:'Android Chrome'}).platform,'android');
  assert.equal(installEnvironment({standalone:true}).standalone,true);
});
test('Dismissal boundary is fourteen days and blocked, empty, malformed or future storage is safe', () => {
  const storage=fakeStorage(),now=1000000000; dismissInstall(storage,now);
  assert.equal(wasDismissed(storage,now+dismissalDays-1),true);
  assert.equal(wasDismissed(storage,now+dismissalDays),false);
  assert.equal(wasDismissed(storage,now-1),false);
  assert.equal(wasDismissed({getItem:()=> 'invalid'},now),false);
  assert.equal(wasDismissed({getItem:()=>{throw Error();}}),false);
  assert.doesNotThrow(()=>dismissInstall({setItem:()=>{throw Error();}}));
});
test('Install offer requires a confirmed preview; arrival, unsupported browsers and standalone cannot offer', () => {
  const base={standalone:false,confirmed:true,dismissed:false,promptReady:true,ios:false};
  assert.equal(shouldOfferInstall(base),true);
  for(const override of [{confirmed:false},{standalone:true},{dismissed:true},{promptReady:false}])assert.equal(shouldOfferInstall({...base,...override}),false);
  assert.equal(shouldOfferInstall({...base,promptReady:false,ios:true}),true);
});
test('Captured prompt is one-use, only explicit prompt invokes browser, acceptance awaits appinstalled',async()=>{
  let prompts=0,prevented=0;
  const model=createInstaller({environment:desktop,storage:fakeStorage()});
  model.capture({preventDefault(){prevented++;},async prompt(){prompts++;},userChoice:Promise.resolve({outcome:'accepted'})});
  assert.equal(model.snapshot().offer,false);assert.equal(prompts,0);assert.equal(prevented,1);
  model.confirm();assert.equal(model.snapshot().offer,true);
  assert.equal(await model.prompt(),'accepted');assert.equal(prompts,1);assert.equal(model.snapshot().standalone,false);
  assert.equal(await model.prompt(),'unavailable');model.installed();assert.equal(model.snapshot().offer,false);assert.equal(model.snapshot().standalone,true);
});
test('Dismissed prompt persists cooldown and rejected prompt returns recoverable error',async()=>{
  const storage=fakeStorage(),model=createInstaller({environment:desktop,storage,now:()=>1000});
  model.capture({preventDefault(){},async prompt(){},userChoice:Promise.resolve({outcome:'dismissed'})});
  assert.equal(await model.prompt(),'dismissed');assert.equal(wasDismissed(storage,1001),true);
  model.capture({preventDefault(){},async prompt(){throw Error();}});
  assert.equal(await model.prompt(),'error');assert.equal(model.snapshot().busy,false);
});
test('Install dismissal and standalone changes suppress offers without granting financial or habit state',()=>{
  const model=createInstaller({environment:installEnvironment(iphone),storage:fakeStorage()});
  model.confirm();assert.equal(model.snapshot().offer,true);model.dismiss();assert.equal(model.snapshot().offer,false);
  model.setStandalone(true);assert.equal(model.snapshot().standalone,true);model.setStandalone(false);assert.equal(model.snapshot().offer,false);
});
test('One guide localizes four platforms, separates Share positions and suppresses all installed prompts',()=>{
  for(const locale of ['th','en'])for(const platform of ['ios','ipad','android','desktop']) {
    const html=installGuide(translator(locale),{platform});
    assert.match(html,new RegExp(`data-platform="${platform}"`));assert.doesNotMatch(html,/undefined|Missing translation/);
  }
  assert.match(installGuide(translator('en'),{platform:'ios'}),/bottom toolbar/);
  assert.doesNotMatch(installGuide(translator('en'),{platform:'ipad',promptReady:true}),/data-pwa-action="install"/);
  assert.match(installGuide(translator('en'),{platform:'ipad'}),/top right/);
  assert.match(installGuide(translator('en'),{ios:true,safari:false}),/Open this page in Safari/);
  assert.match(installGuide(translator('en'),{promptReady:true}),/data-pwa-action="install"/);
  assert.doesNotMatch(installGuide(translator('en'),{standalone:true,promptReady:true}),/button|data-install-guide/);
});
test('Badges sum only counts, clear zero and tolerate absent/denied platform APIs',async()=>{
  assert.equal(badgeCount(1,1),2);assert.equal(badgeCount(-1,1),0);assert.equal(badgeCount(Number.MAX_SAFE_INTEGER,1),0);
  let set=0,clear=0;const nav={setAppBadge:async n=>set=n,clearAppBadge:async()=>clear++};
  await updateBadge(nav,2);await updateBadge(nav,0);assert.equal(set,2);assert.equal(clear,1);
  await updateBadge({},2);await updateBadge({setAppBadge:async()=>{throw Error();}},2);
});
async function workerHarness() {
  const listeners={},stores=new Map(),calls=[]; let online=true,skip=0,claims=0;
  const store=name=>{ if(!stores.has(name))stores.set(name,new Map());return stores.get(name); };
  const cache=name=>({addAll:async paths=>{for(const p of paths)store(name).set(p,new Response('shell',{headers:{'content-type':'text/html'}}));},put:async(key,value)=>store(name).set(typeof key==='string'?key:key.url,value.clone()),match:async key=>store(name).get(typeof key==='string'?key:key.url)?.clone()});
  const self={location:{origin:'https://gissino.test'},GISSINO_SHELL:{version:'new',paths:['/index.html','/src/app.js']},addEventListener:(name,fn)=>listeners[name]=fn,clients:{claim:async()=>claims++},skipWaiting:async()=>skip++};
  const caches={open:async name=>cache(name),keys:async()=>[...stores.keys()],delete:async name=>stores.delete(name)};
  vm.runInNewContext(await readFile(new URL('../sw.js',import.meta.url),'utf8'),{self,caches,importScripts(){},URL,Set,Response,AbortController,setTimeout,clearTimeout,fetch:async request=>{calls.push(request.url);if(!online)throw Error('offline');return new Response('network',{headers:{'content-type':'text/html'}});}});
  async function emit(name,properties={}) {const pending=[];let response;listeners[name]({...properties,waitUntil:p=>pending.push(p),respondWith:p=>response=p});await Promise.all(pending);return response?await response:null;}
  return {emit,stores,calls,store,offline:()=>online=false,skip:()=>skip,claims:()=>claims};
}
test('Worker install precaches allowlist and waits; activation removes only older GisSino caches',async()=>{
  const w=await workerHarness();w.store('other-app');w.store('gissino-shell-old');await w.emit('install');assert.equal(w.skip(),0);
  assert.equal(w.store('gissino-shell-new').has('/index.html'),true);
  await w.emit('activate');assert.equal(w.stores.has('gissino-shell-old'),false);assert.equal(w.stores.has('other-app'),true);assert.equal(w.claims(),1);
  await w.emit('message',{data:{type:'ACTIVATE_UPDATE'}});assert.equal(w.skip(),1);
});
test('Worker HTML is network first with offline root/query fallback; only listed assets cache first',async()=>{
  const w=await workerHarness();await w.emit('install');
  const req=(url,mode='navigate')=>({url:'https://gissino.test'+url,method:'GET',mode});
  assert.equal(await (await w.emit('fetch',{request:req('/?source=pwa')})).text(),'network');
  w.offline();assert.equal(await (await w.emit('fetch',{request:req('/')})).text(),'network');
  assert.equal(await (await w.emit('fetch',{request:req('/src/app.js','cors')})).text(),'shell');
});
test('Worker ignores API paths, writes, unknown/query assets and cross-origin requests entirely',async()=>{
  const w=await workerHarness();
  for(const request of [{url:'https://gissino.test/api/accounts',method:'GET',mode:'cors'},{url:'https://gissino.test/src/app.js?private=1',method:'GET'},{url:'https://other.test/src/app.js',method:'GET'},{url:'https://gissino.test/',method:'POST',mode:'navigate'}])assert.equal(await w.emit('fetch',{request}),null);
  assert.equal(w.calls.length,0);assert.equal(w.stores.size,0);
});
test('Worker reports a shell timestamp, never financial payloads',async()=>{
  const w=await workerHarness();await w.emit('install');let message;
  await w.emit('message',{data:{type:'GET_SHELL_STATUS'},source:{postMessage:m=>message=m}});
  assert.equal(message.type,'SHELL_STATUS');assert.ok(Number.isFinite(Date.parse(message.cachedAt)));
});
test('Manifest/icon dimensions, shortcuts and cache inventory resolve to actual allowed shell files',async()=>{
  const root=new URL('../',import.meta.url),manifest=JSON.parse(await readFile(new URL('manifest.webmanifest',root),'utf8'));
  assert.equal(manifest.display,'standalone');assert.equal(manifest.scope,'/');assert.equal(manifest.start_url,'/?source=pwa#home');
  for(const icon of manifest.icons){const png=await readFile(new URL(icon.src.slice(1),root));assert.equal(`${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`,icon.sizes);}
  const shell={};vm.runInNewContext(await readFile(new URL('assets/pwa/shell.js',root),'utf8'),{self:shell});
  for(const path of shell.GISSINO_SHELL.paths){assert.doesNotMatch(path,/api|__gissino|docs|tests|screenshots/);await readFile(new URL(path.slice(1),root));}
  const html=await readFile(new URL('index.html',root),'utf8');assert.match(html,/viewport-fit=cover/);assert.match(html,/apple-touch-icon/);
});
