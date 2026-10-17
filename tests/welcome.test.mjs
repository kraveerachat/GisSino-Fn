import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { welcomeScreen,publicRoutes,isPublicRoute,welcomeArt } from '../src/welcome.js';
import { translator } from '../src/i18n.js';
const render=(route='welcome',locale='th')=>welcomeScreen({route,locale},translator(locale));

test('Welcome and destination previews are public routes, while dashboard routes remain separate',()=>{
  assert.deepEqual(publicRoutes,['welcome','login','signup']);
  for(const r of publicRoutes)assert.equal(isPublicRoute(r),true);
  for(const r of ['home','wallet','settings','__proto__'])assert.equal(isPublicRoute(r),false);
});
test('A01 has one canonical image logo, live product text and distinct login/signup destinations',()=>{
  const html=render();
  assert.equal(html.split('src="/assets/brand/gissino-s-shield.png"').length-1,1);
  assert.match(html,/<h1[^>]*>GisSino<\/h1>/);
  assert.match(html,/href="#login"/);assert.match(html,/href="#signup"/);
  assert.ok(!html.includes('href="#home"'));
});
test('Public previews never contain authenticated shell, finances or credential forms',()=>{
  for(const route of publicRoutes){const html=render(route);
    for(const item of ['desktop-sidebar','floating-islands','data-action="add"','account-board','folder-balance','<form','type="password"'])assert.ok(!html.includes(item));
    assert.match(html,/id="main"/);assert.match(html,/welcome-disclosure/);
  }
});
test('Login and signup expose only honest placeholders with a route back to Welcome',()=>{
  for(const route of ['login','signup']){const html=render(route,'en');assert.ok(html.includes('authentication not implemented'));assert.match(html,/href="#welcome"/);assert.ok(!html.includes('href="#home"'));}
});
test('Thai and English use the shared locale callback with the selected locale preserved',()=>{
  for(const locale of ['th','en']){const html=render('welcome',locale);assert.ok(html.includes(`value="${locale}" selected`));assert.match(html,/data-control="locale"/);assert.ok(html.includes(translator(locale)('welcomeDescription')));}
});
test('Art direction has desktop first and orientation/height-aware tablet variants',()=>{
  assert.equal(welcomeArt[0].media,'(min-width: 1280px)');
  assert.ok(welcomeArt[1].media.includes('(orientation: landscape)'));
  assert.ok(welcomeArt[2].media.includes('(orientation: portrait)'));
  for(const art of welcomeArt.slice(1))assert.ok(art.media.includes('(min-height: 600px)'));
  const html=render();assert.equal((html.match(/<source /g)||[]).length,3);assert.match(html,/src="\/assets\/welcome\/mobile.webp"/);
});
test('All delivery variants are real WebP containers, modest in size, with preserved source filenames in provenance',async()=>{
  const provenance=await readFile(new URL('../assets/welcome/README.md',import.meta.url),'utf8');
  for(const name of ['mobile','tablet-portrait','tablet-landscape','desktop']){
    const bytes=await readFile(new URL(`../assets/welcome/${name}.webp`,import.meta.url));
    assert.equal(bytes.subarray(0,4).toString(),'RIFF');assert.equal(bytes.subarray(8,12).toString(),'WEBP');assert.ok(bytes.length<500000);assert.ok(provenance.includes(`${name}.webp`));
  }
  for(const name of ['mobile_2160x3840','ipad_portrait_2304x3072','ipad_landscape_3072x2304','desktop_3840x2160'])assert.ok(provenance.includes(`gissino_premium_${name}.png`));
});
