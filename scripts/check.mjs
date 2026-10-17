import { spawnSync } from 'node:child_process';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { messages } from '../src/i18n.js';
const root=path.resolve(new URL('..',import.meta.url).pathname.replace(/^\/(?=[A-Za-z]:)/,''));
async function filesAt(dir) {
  const entries=await readdir(dir,{withFileTypes:true});
  return (await Promise.all(entries.map(e=>e.isDirectory()?filesAt(path.join(dir,e.name)):[path.join(dir,e.name)]))).flat();
}
const files=[...await filesAt(path.join(root,'src')),...await filesAt(path.join(root,'scripts')),...await filesAt(path.join(root,'tests')),path.join(root,'server.mjs')];
for(const file of files.filter(p=>/\.(mjs|js)$/.test(p))) {
  const check=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});
  if(check.status!==0) { console.error(check.stderr);process.exit(1); }
}
if(JSON.stringify(Object.keys(messages.th).sort())!==JSON.stringify(Object.keys(messages.en).sort())) throw new Error('Locale key mismatch');
for(const file of ['index.html','assets/fonts/noto-sans-thai.ttf','assets/fonts/OFL.txt','src/fixtures.js']) await access(path.join(root,file));
const html=await readFile(path.join(root,'index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="(\/(?!\/)[^"]+)"/g)) await access(path.join(root,match[1]));
for(const file of ['src/app.js','src/screens.js','src/welcome.js']) {
  if(/[\u0E00-\u0E7F]/u.test(await readFile(path.join(root,file),'utf8'))) throw new Error(`Thai text must come from catalog: ${file}`);
}
console.log(`PASS: syntax, locale parity (${Object.keys(messages.th).length} keys per locale), local assets, and catalog-only Thai UI copy.`);
