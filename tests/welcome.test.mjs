import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { welcomeScreen,publicRoutes,isPublicRoute,welcomeArt } from '../src/welcome.js';
import { createPreviewFlow } from '../src/preview-flow.js';
import { translator } from '../src/i18n.js';
const render=(route='welcome',locale='th',flow=createPreviewFlow())=>welcomeScreen({route,locale},translator(locale),flow);

test('All eleven pre-Home screens are public while dashboard destinations remain separate',()=>{
  assert.equal(publicRoutes.length,11);
  for(const route of ['welcome','entry','login','signup','setup/profile','setup/about','setup/consent','setup/accounts','setup/notifications','setup/install','postcard'])assert.ok(isPublicRoute(route));
  for(const route of ['home','wallet','settings','__proto__','setup/unknown'])assert.equal(isPublicRoute(route),false);
});
test('Welcome has one Get Started action to Entry and one canonical logo',()=>{
  const html=render('welcome','en');
  assert.equal((html.match(/class="welcome-cta /g)||[]).length,1);
  assert.match(html,/href="#entry"/);assert.match(html,/Get Started/);
  assert.ok(!html.includes('href="#login"'));assert.ok(!html.includes('href="#signup"'));assert.ok(!html.includes('href="#home"'));
  assert.equal(html.split('src="/assets/brand/gissino-s-shield.png"').length-1,1);
  assert.match(html,/<h1[^>]*>GisSino<\/h1>/);
});
test('Account Entry alone exposes the separate Login and normal signup choice',()=>{
  const html=render('entry','en');assert.match(html,/href="#login"/);assert.match(html,/href="#signup"/);assert.match(html,/href="#welcome"/);
});
test('Every public route has one main, one logo and one compact header demo indicator without dashboard chrome',()=>{
  for(const route of publicRoutes){
    const html=render(route);
    assert.equal((html.match(/id="main"/g)||[]).length,1);
    assert.equal((html.match(/class="brand-mark"/g)||[]).length,1);
    for(const item of ['desktop-sidebar','floating-islands','data-action="add"','account-board','folder-balance'])assert.ok(!html.includes(item),route+': '+item);
    assert.equal((html.match(/class="demo-mode"/g)||[]).length,1);assert.match(html,/<header[^>]*>[\s\S]*class="demo-mode"/);assert.match(html,/id="demo-description"/);assert.ok(!html.includes('welcome-disclosure'));
  }
});
test('Login presents normal fields, Google and one credential action without real authentication',()=>{
 const html=render('login','en');for(const field of ['email','password'])assert.ok(html.includes('name="'+field+'"'));
 assert.match(html,/data-preview-form="login"/);assert.match(html,/Continue with Google/);assert.match(html,/data-preview-action="google"/);
 assert.match(html,/Forgot password\?/);assert.match(html,/disabled aria-describedby="demo-description"/);
 assert.ok(!html.includes('href="#home"'));assert.ok(!html.includes('data-auth-status'));assert.ok(!html.includes('action="/'));
});
test('Signup has no invitation, normal signup presentation and Google without required credentials',()=>{
 const html=render('signup','en');for(const field of ['email','password','confirm'])assert.ok(html.includes('name="'+field+'"'));
 assert.match(html,/Create your GisSino account/);assert.match(html,/Sign up with Google/);
 for(const forbidden of ['name="invite"','invitation','required','minlength=','pattern=','skipCredentialPreview'])assert.ok(!html.includes(forbidden),forbidden);
});
test('Profile and About You remain separate and model values are escaped in output',()=>{
  const flow=createPreviewFlow();flow.nickname='<img src=x onerror=alert(1)>';
  assert.match(render('setup/profile','en',flow),/&lt;img/);
  assert.ok(!render('setup/profile').includes('name="birthYear"'));
  assert.ok(!render('setup/about').includes('name="nickname"'));
  assert.ok(!render('postcard','en',flow).includes('<img src=x'));
});
test('Setup uses natural copy, one header Back and one primary action; Postcard has one Home action',()=>{
 for(const locale of ['th','en'])for(const route of publicRoutes){
 const html=render(route,locale);
 for(const text of ['welcome-disclosure','ไม่มีผลทางกฎหมาย','ข้อมูลสมมติเท่านั้น','No registration has been saved','No browser permission','data-auth-status'])assert.ok(!html.includes(text),route+text);
 if(route!=='welcome')assert.equal((html.match(/class="flow-back"/g)||[]).length,1);
 if(route.startsWith('setup/')||route==='postcard')assert.equal((html.match(/class="welcome-cta /g)||[]).length,1);
 }
 assert.match(render('postcard','en'),/href="#home"/);
});
test('Shared locale and complete catalogs render every step in both languages',()=>{
  for(const locale of ['th','en'])for(const route of publicRoutes){
    const html=render(route,locale);assert.ok(html.includes('value="'+locale+'" selected'));assert.match(html,/data-control="locale"/);
    assert.ok(!html.includes('undefined'));assert.ok(!html.includes('[object Object]'));
  }
});
test('Orientation and short-side art direction distinguishes iPad landscape from desktop',()=>{
  assert.equal(welcomeArt[0].name,'tablet-portrait');
  assert.equal(welcomeArt[1].name,'tablet-landscape');assert.match(welcomeArt[1].media,/max-width: 1439px/);
  assert.equal(welcomeArt[2].name,'desktop');assert.equal(welcomeArt[2].media,'(min-width: 1280px)');
});
test('Delivery artwork remains the original four optimized WebPs',async()=>{
  const provenance=await readFile(new URL('../assets/welcome/README.md',import.meta.url),'utf8');
  for(const name of ['mobile','tablet-portrait','tablet-landscape','desktop']){
    const bytes=await readFile(new URL('../assets/welcome/'+name+'.webp',import.meta.url));
    assert.equal(bytes.subarray(0,4).toString(),'RIFF');assert.equal(bytes.subarray(8,12).toString(),'WEBP');assert.ok(bytes.length<500000);assert.ok(provenance.includes(name+'.webp'));
  }
});
