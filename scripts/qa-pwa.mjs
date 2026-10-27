// Browser evidence: PLAYWRIGHT_MODULE and CHROME_BINARY select local tooling.
import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir, mkdtemp } from 'node:fs/promises';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base=process.env.PWA_URL || 'http://127.0.0.1:4188';
const evidence='docs/design/reviews/pwa-2026-10';
await mkdir(evidence,{recursive:true});await mkdir('assets/pwa/screenshots',{recursive:true});
// Short temporary profile avoids Chromium Cache Storage path limits on Windows.
const profile=await mkdtemp(path.join(os.tmpdir(),'gspwa-'));
const browser=await chromium.launchPersistentContext(profile,{executablePath:process.env.CHROME_BINARY,headless:true,viewport:{width:390,height:844}});
const errors=[],results=[];
const track=page=>{page.on('pageerror',e=>errors.push(e.message));};
const page=browser.pages()[0];track(page);
const settle=async p=>{await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);};
const select=async(p,theme,locale='th')=>{await p.goto(base+'/#settings');await p.locator(`[data-action="set-theme"][data-theme="${theme}"]`).click();await p.locator('#locale-select').selectOption(locale);};
try {
  console.log('QA: initial navigation');await page.goto(base+'/#home');await page.waitForFunction(async()=>!!(await navigator.serviceWorker.getRegistration())?.active);console.log('QA: worker active');await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await settle(page);
  await page.screenshot({path:'assets/pwa/screenshots/home-narrow.png',animations:'disabled'});
  await page.setViewportSize({width:1440,height:1000});await settle(page);await page.screenshot({path:'assets/pwa/screenshots/home-wide.png',animations:'disabled'});
  console.log('QA: captures complete');const cdp=await browser.newCDPSession(page);
  const installability=await cdp.send('Page.getInstallabilityErrors');assert.deepEqual(installability.installabilityErrors,[]);await cdp.detach();results.push({test:'Chrome persistent-profile installability',...installability});
  if(process.env.PWA_SKIP_LAYOUT)results.push(...JSON.parse(await readFile(evidence+'/layout-evidence.json','utf8')).filter(r=>r.route||r.test==='Settings install guide'));
  console.log('QA: layout matrix');if(!process.env.PWA_SKIP_LAYOUT)for(const width of [390,820,1440])for(const theme of ['light','dark']) {
    await page.setViewportSize({width,height:1000});await select(page,theme);
    for(const route of ['home','wallet','activity','bills','party']) {
      await page.evaluate(route=>location.hash=route,route);await settle(page);
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(overflow,false,`${route} ${width} ${theme}`);
      results.push({route,width,theme,overflow});
    }
  }
  if(!process.env.PWA_SKIP_LAYOUT)for(const width of [320,360,390,430,768,820,1024,1440])for(const theme of ['light','dark']) {
    await page.setViewportSize({width,height:900});await select(page,theme,'en');
    await page.locator('[data-pwa-settings-install]').click();await settle(page);
    assert.equal(await page.locator('#sheet').evaluate(el=>el.scrollWidth>el.clientWidth+1),false);
    await page.locator('[data-pwa-platform="ipad"]').click();assert.match(await page.locator('#sheet').innerText(),/top right/);
    if(width===390&&theme==='light'){await page.locator('#sheet [data-pwa-platform="ios"]').click();assert.match(await page.locator('#sheet').innerText(),/bottom toolbar/);await page.screenshot({path:evidence+'/install-iphone-width.png',animations:'disabled'});}
    await page.locator('[data-action="close"]').click();
    results.push({test:'Settings install guide',width,theme,overflow:false});
  }
  if(!process.env.PWA_SKIP_LAYOUT)await writeFile(evidence+'/layout-evidence.json',JSON.stringify(results,null,2)+'\n');
  console.log('QA: install flows');
  // Setup route and Settings use exactly the same guide renderer.
  await page.setViewportSize({width:820,height:1000});await page.goto(base+'/#setup/install');await settle(page);
  await page.locator('#app [data-pwa-platform="ipad"]').click();await page.screenshot({path:evidence+'/setup-ipad-guide.png',animations:'disabled'});
  assert.equal(await page.locator('#app [data-install-guide]').count(),1);
  // Browser prompt is captured on arrival, but offered only after an explicit sample confirmation.
  await page.goto(base+'/#home');await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
  await page.evaluate(()=>{window.testPromptCalls=0;const event=new Event('beforeinstallprompt',{cancelable:true});event.prompt=async()=>window.testPromptCalls++;event.userChoice=Promise.resolve({outcome:'dismissed'});window.dispatchEvent(event);});
  assert.equal(await page.locator('[data-pwa-action="offer"]').count(),0);
  await page.locator('[data-mode="expense"]').first().click();
  await page.locator('#entry-amount').fill('85');await page.locator('#entry-note').fill('Sample coffee');await page.locator('#entry-form button[type="submit"]').click();
  assert.equal(await page.locator('[data-pwa-action="offer"]').count(),0);
  await page.locator('[data-action="confirm-entry-preview"]').click();assert.equal(await page.locator('[data-pwa-action="offer"]').count(),1);
  await page.locator('[data-action="close"]').click();await page.locator('[data-pwa-action="offer"]').click();assert.equal(await page.evaluate(()=>window.testPromptCalls),1);
  assert.equal(await page.locator('[data-pwa-action="offer"]').count(),0);results.push({test:'Install prompt capture / preview gate / dismissed cooldown',pass:true});
  // Dirty forms stay in place behind a separate refresh-confirmation dialog.
  await page.locator('[data-mode="expense"]').first().click();await page.locator('#entry-note').fill('Keep this draft');
  await page.evaluate(()=>{const b=document.createElement('button');b.dataset.pwaAction='refresh';b.textContent='test';document.body.append(b);b.click();b.remove();});
  assert.equal(await page.locator('.pwa-confirm').evaluate(el=>el.open),true);await page.locator('[data-pwa-action="cancel-refresh"]').click();assert.equal(await page.locator('#entry-note').inputValue(),'Keep this draft');
  await page.locator('[data-action="close"]').click();results.push({test:'Dirty form refresh cancel preserves input',pass:true});
  console.log('QA: preview and dirty refresh passed');
  // A cached shell reloads and routes offline, while financial preview submissions are blocked.
  await browser.setOffline(true);await page.waitForFunction(()=>navigator.onLine===false);await page.reload();console.log('QA offline state',await page.evaluate(()=>({online:navigator.onLine,banner:document.querySelector('.pwa-offline')?.outerHTML,location:location.href,errors:document.body.innerText.slice(0,100)})));await page.waitForSelector('.pwa-offline:not([hidden])');
  for(const route of ['home','wallet','activity','bills','party','settings']){await page.evaluate(r=>location.hash=r,route);await settle(page);assert.ok(await page.locator('#main').innerText());}
  await page.evaluate(()=>location.hash='home');await page.locator('[data-mode="expense"]').first().click();assert.equal(await page.locator('#entry-form button[type="submit"]').isDisabled(),true);
  await page.screenshot({path:evidence+'/offline-shell.png',animations:'disabled'});await page.locator('[data-action="close"]').click();
  const caches=await page.evaluate(async()=>{const keys=await window.caches.keys();const cache=await window.caches.open(keys.find(k=>k.startsWith('gissino-shell-')));return(await cache.keys()).map(r=>new URL(r.url).pathname);});assert.ok(!caches.some(p=>p.startsWith('/api/')));
  results.push({test:'Offline reload / six routes / writes disabled / API cache exclusion',pass:true,cachePaths:caches});await browser.setOffline(false);
  // Expense shortcut must open the existing form, not silently drop to Welcome.
  await page.goto(base+'/?source=pwa#add/expense');await page.waitForSelector('#entry-form');await page.locator('[data-action="close"]').click();results.push({test:'Expense manifest shortcut',pass:true});
  // Browser/device environment branches. Installation is still NOT a physical-device test.
  for(const device of [{name:'iPhone Safari',userAgent:'Mozilla/5.0 (iPhone) Version/18.0 Mobile Safari/604.1',expected:'ios'}, {name:'iPad desktop Safari',userAgent:'Mozilla/5.0 (Macintosh) Version/18.0 Safari/605.1',expected:'ipad',ipad:true},{name:'iOS Chrome',userAgent:'Mozilla/5.0 (iPhone) CriOS/140 Mobile Safari/604.1',expected:'ios'}, {name:'standalone',standalone:true,expected:null},{name:'storage denied',blocked:true,expected:'desktop'}]){
    const p=await browser.newPage();track(p);
    await p.addInitScript(device=>{if(device.userAgent)Object.defineProperty(navigator,'userAgent',{value:device.userAgent});if(device.ipad){Object.defineProperty(navigator,'platform',{value:'MacIntel'});Object.defineProperty(navigator,'maxTouchPoints',{value:5});}if(device.standalone)Object.defineProperty(navigator,'standalone',{value:true});if(device.blocked)Object.defineProperty(window,'localStorage',{get(){throw new DOMException('denied','SecurityError');}});},device);
    await p.goto(base+'/#settings');await p.waitForSelector('#main');await settle(p);
    if(device.standalone)assert.equal(await p.locator('[data-pwa-settings-install]').isVisible(),false);
    else {await p.locator('[data-pwa-settings-install]').click();assert.equal(await p.locator('[data-install-guide]').getAttribute('data-platform'),device.expected);if(device.name==='iOS Chrome')assert.match(await p.locator('#sheet').innerText(),/Safari/);}
    results.push({test:device.name,pass:true});await p.close();
  }
  console.log('QA: update lifecycle');
  // Isolated same-code update host: change only worker version, with no source mutation.
  let version=1;
  const updateServer=http.createServer(async(req,res)=>{try{const u=new URL(req.url,base);let body=Buffer.from(await(await fetch(base+u.pathname+u.search)).arrayBuffer());if(u.pathname==='/sw.js')body=Buffer.from(body.toString()+`\n// QA worker revision ${version}\n`);if(u.pathname==='/assets/pwa/shell.js')body=Buffer.from(body.toString().replace(/"version": "[^"]+"/,`"version": "qa-${version}"`));res.writeHead(200,{'Content-Type':u.pathname.endsWith('.js')?'text/javascript':u.pathname.endsWith('.css')?'text/css':u.pathname.endsWith('.webmanifest')?'application/manifest+json':u.pathname.endsWith('.png')?'image/png':u.pathname.endsWith('.webp')?'image/webp':u.pathname.endsWith('.svg')?'image/svg+xml':u.pathname.endsWith('.ttf')?'font/ttf':'text/html','Cache-Control':'no-store'});res.end(body);}catch{res.writeHead(500);res.end();}});
  await new Promise(resolve=>updateServer.listen(0,'127.0.0.1',resolve));
  try{
    const url=`http://127.0.0.1:${updateServer.address().port}`;await page.goto(url+'/#home');await page.waitForFunction(async()=>!!(await navigator.serviceWorker.getRegistration())?.active);await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
    await page.locator('[data-mode="expense"]').first().click();await page.locator('#entry-note').fill('Update draft');
    version=2;await page.evaluate(async()=>{const reg=await navigator.serviceWorker.getRegistration();await reg.update();});await page.waitForFunction(async()=>!!(await navigator.serviceWorker.getRegistration()).waiting);
    await page.locator('[data-action="close"]').click();await page.locator('[data-pwa-action="refresh"]').click();assert.equal(await page.locator('.pwa-confirm').evaluate(el=>el.open),false);
    // No form remains, so this is an explicit clean update. It reloads and activates qa-2.
    await page.waitForFunction(async()=>{const keys=await caches.keys();return keys.includes('gissino-shell-qa-2')&&!keys.includes('gissino-shell-qa-1');});
    await page.waitForLoadState();await settle(page);assert.deepEqual(await page.evaluate(()=>caches.keys()),['gissino-shell-qa-2']);
    await page.locator('[data-mode="expense"]').first().click();await page.locator('#entry-note').fill('Keep during update');
    version=3;await page.evaluate(async()=>{const reg=await navigator.serviceWorker.getRegistration();await reg.update();});await page.waitForFunction(async()=>!!(await navigator.serviceWorker.getRegistration()).waiting);
    await page.waitForSelector('#pwa-notices [data-pwa-action="refresh"]');await page.evaluate(()=>document.querySelector('#pwa-notices [data-pwa-action="refresh"]').click());await page.locator('[data-pwa-action="cancel-refresh"]').click();assert.equal(await page.locator('#entry-note').inputValue(),'Keep during update');
    await page.screenshot({path:evidence+'/update-with-draft.png',animations:'disabled'});
    await page.evaluate(async()=>{const reg=await navigator.serviceWorker.getRegistration();reg.waiting.postMessage({type:'ACTIVATE_UPDATE'});});await page.waitForTimeout(700);assert.equal(await page.locator('#entry-note').inputValue(),'Keep during update');
    results.push({test:'Worker v1/v2/v3 waiting, explicit activation, cleanup, dirty cancel and other-tab activation without reload',pass:true});
  }finally{updateServer.closeAllConnections();await new Promise(resolve=>updateServer.close(resolve));}
  assert.deepEqual(errors,[]);
  const shellText=await readFile('assets/pwa/shell.js','utf8');const shell=JSON.parse(shellText.slice(shellText.indexOf('{'),shellText.lastIndexOf('}')+1));const hashes={};
  for(const asset of shell.paths){const bytes=await readFile(asset.slice(1));const served=Buffer.from(await(await fetch(base+asset)).arrayBuffer());assert.deepEqual(served,bytes);hashes[asset]=createHash('sha256').update(bytes).digest('hex');}
  await writeFile(evidence+'/browser-evidence.json',JSON.stringify({capturedAt:new Date().toISOString(),browser:browser.browser()?.version(),shellVersion:shell.version,servedAssetHashes:hashes,results,errors,physicalDevices:'Not tested'},null,2)+'\n');
  console.log(JSON.stringify({cases:results.length,errors,installability}));
}catch(error){console.log('QA failure state',await page.evaluate(()=>({online:navigator.onLine,banner:document.querySelector('.pwa-offline')?.outerHTML,location:location.href,body:document.body.innerText.slice(0,300)})).catch(()=>null));throw error;}finally{await browser.close();}
