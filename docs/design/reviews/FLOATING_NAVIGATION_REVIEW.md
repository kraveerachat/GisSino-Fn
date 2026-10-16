# รายงาน Floating Island Navigation — 16 ตุลาคม 2026

Method: dual-agent (A: `/root/design_review` · B: `/root/technical_review`). รับผล A ก่อนผล detector ของ B; ไม่แชร์ผลระหว่างผู้ประเมิน

## ผลงานและขอบเขต

เปลี่ยน footer บนมือถือเป็น **หน้าหลัก / กระเป๋า / รายการ / เพิ่มเติม** ในแคปซูลเดียว และปุ่ม **+ เพิ่ม** เป็นวงกลมแยกด้านขวา ย้ายบิลและปาร์ตี้ไปยัง More โดยคง Home, hero, accounts, transactions, summary, typography และสีเดิม ไม่มีการเปลี่ยนฐานข้อมูลหรือระบบการเงิน

Desktop คงรูปแบบ rail เดิมและปลายทางเดิม เพิ่ม Wallet หนึ่งรายการ ไม่ยก popup มือถือไปเป็นรูปแบบ desktop ใหม่

วิดีโอ `UI footer Bar.mp4` ไม่ได้แนบมา จึงใช้สเปกข้อความเรื่องตำแหน่งและจังหวะการเปิดปิด ไม่อ้างว่าได้ดูหรือเทียบวิดีโอจริง เอกสาร project guide, architecture และ universal workflow ยังไม่มีใน workspace

## พฤติกรรมที่ทำงานแล้ว

- More ใช้ native nonmodal popover: กดซ้ำ, X, ภายนอก, Escape และ Tab ออกเพื่อปิด ไม่มีการขยับ layout ด้านหลัง
- Bills/Party นำทางและปิด popup รวมถึงเลือกหน้าปัจจุบันซ้ำ More แสดงสถานะ parent ของหน้าลูก
- Add ใช้ dialog เดิม การเปิด sheet ปิด More ก่อน; beforetoggle ของ More ปิด sheet พร้อมระงับการคืน focus ที่จะชนกัน ไม่มี open-state flag ซ้ำกับ native popover
- คืน focus ไปยัง More หรือ Add ตามผู้เปิด และย้าย focus ไปยัง rail ที่มองเห็นเมื่อข้าม breakpoint desktop
- Wallet ใช้ account fixtures/detail เดิม แยก Bank/E-wallet/Cash และ Credit-card liability ชัดเจน ใช้ `accountType` แยกจาก `kind` ซึ่งเป็นตัวเลือก icon
- E-wallet และ Cash เป็น empty state จริงของชุดตัวอย่าง ยอดรวมมาจาก fixture เดิมและติดป้ายข้อมูลจำลอง ไม่มี FX/sync หรือรายการบัญชีที่แอบอ้างว่าเป็นข้อมูลจริง
- Card ที่เปิดจาก Wallet คืนกลับ Wallet และเลือก Wallet; เปิดจาก Bills คืน Bills และอยู่ในบริบท More มี regression test ของ parent mapping
- คง Activity search/filter, Add modes, browser hash navigation และ scroll restoration เดิม

Motion: เปิด 220ms, ปิด 160ms, กด 120ms; แผงขยายจากบริเวณ More, icon เปลี่ยนเป็น X; reduced motion ปิด transition ไม่มี blur หรือ bounce

## Critique และ corrective batch

เอกลักษณ์ enamel และ Add แยกวงกลมช่วยให้ลำดับการกระทำอ่านชัด เหมาะกับ GisSino และรักษาภาษาภาพเดิม สองรายการใน More เป็นกลุ่มเล็กที่ค้นหาได้ง่าย ข้อมูลจำลอง/ภาระบัตรมีคำอธิบายตามบริบท

| Nielsen heuristic | คะแนนก่อนแก้ /4 |
|---|---:|
| System status | 3 |
| Real-world match | 3 |
| User control | 4 |
| Consistency | 3 |
| Error prevention | 3 |
| Recognition | 4 |
| Efficiency | 3 |
| Aesthetic/minimalism | 3 |
| Error recovery | 3 |
| Help/documentation | 3 |
| รวม | **32/40** |

เป็นคะแนน Assessment A ก่อน corrective batch ไม่ได้อ้างว่าเป็นคะแนนใหม่หลังแก้

| สิ่งที่พบ | การแก้ไข |
|---|---|
| Custom toggle ชนกับ native light dismissal | ใช้ declarative `popovertarget` เป็นตัว toggle |
| บัญชีเงินเก็บถูกจัดหมวดจาก icon | เพิ่ม explicit sample `accountType` และใช้ empty E-wallet state |
| Card จาก Wallet สูญเสีย return context | บันทึก entry parent ใช้ทั้ง mobile/desktop และ Back |
| Desktop highlight ไม่สอดคล้อง child route | ใช้ shared context mapping |
| เลือก More child หน้าเดิมไม่เกิด hashchange | ปิดบนการเลือก link โดยตรง พร้อมคืน focus |
| เปลี่ยนเป็น desktop ขณะ popup เปิด | ปิด popup และ focus rail ที่มองเห็น |
| ตัวอักษร footer 320px เล็ก | ใช้ 11px และตรวจขนาด label/target จริง |
| Wallet ภาษาอังกฤษล้นที่ 320px | กำหนด grid เป็น `minmax(0,1fr)` และ category `min-width:0` |

Detector ของ B: `[]` ไม่มี finding (`artifacts/floating-navigation/detector.json`) ไม่ใช่การรับรอง accessibility ทั้งระบบ ไม่ฉีด overlay เพราะ browser evaluate เป็น read-only ใช้ source และ native screenshots แทน

ผู้ใช้ใหม่เห็น label และ X ชัดเจน; keyboard user ผ่าน Tab/Escape และ focus restoration; ผู้ใช้สายตาเลือนรางได้ label 11px และ focus ring แต่ยังไม่ได้รับรอง screen reader/physical phone/การซูมข้อความจริง

Questions skipped: 0 remaining Priority Issues หลัง corrective batch; ผู้ใช้ได้ขอให้ implement การปรับปรุงแล้ว

## หลักฐานตรวจสอบ

- `npm run check` ผ่าน syntax/catalog/local-assets; 303 keys ต่อภาษา
- `npm test`: **9 ผ่าน, 0 ไม่ผ่าน** รวม 7 regression เดิม และ 2 navigation/fixture tests ใหม่ ต้องรันนอก socket sandbox เพื่อให้ loopback HTTP test ทำงาน
- Recorded layout matrix: **32 กรณี** ใน `artifacts/floating-navigation/viewport-checks.json` — 28 mobile cases (320/360/390/430px; 640/932px; ไทย/อังกฤษ; light/dark แบบ representative coverage) และ Home/Wallet อีก 4 กรณีที่ 769/1440px (tablet target 768px; รายงานตามค่าที่วัดได้จริง) ไม่ใช่ full factorial matrix
- ตรวจ popup อยู่ใน viewport, ไม่ชน footer, target อย่างน้อย 44px และ label ไม่ล้น; ไม่พบ horizontal overflow ใน final recorded cases
- Browser ตรวจ toggle/X/outside/Escape/Tab-away, Bills/Party navigation, same-route close, Add exclusivity/focus, Wallet account details, Wallet/Bills card return context, desktop resize focus และ Activity search
- ตรวจ scrolled-content clearance ด้วย browser และเก็บหลักฐานใน browser-checks.json
- รูปจริงจาก Chromium ที่ 390×844: `home-light-mobile`, `more-light-mobile`, `more-dark-mobile`, `wallet-light-mobile` ใต้ `artifacts/floating-navigation/` (JPEG และ PNG format conversion ไม่มีการเปลี่ยนภาพ)
- App เป็น buildless ES modules: ไม่มี TypeScript/compiler/linter pipeline; syntax/catalog check คือ build check ที่มีจริง

การทดสอบ automation รอบยาวเกินเวลาของเครื่องมือหนึ่งครั้ง จึงแบ่งเป็นรอบสั้นและบันทึกผล final จาก DOM จริง ไม่ใช้รอบที่ถูกขัดจังหวะเป็นหลักฐานสำเร็จ ความผิดพลาดใหม่ระหว่างพัฒนา (toggle/overflow) ถูกแก้แล้ว; ไม่พบ failure เดิมใน 9 tests สุดท้าย

## ไฟล์

ใช้ซ้ำ: native Add sheet, account/detail fixtures, SVG icon system, i18n, theme/enamel tokens, routing และ Activity/Bills/Party components

สร้าง: `src/navigation.js`, `src/wallet.js`, `src/styles/navigation.css`, `tests/navigation.test.mjs`, `.ui-craft/brief.md`, รายงานนี้ และ Obsidian task note

แก้: `index.html`, `src/screens.js`, `src/app.js`, `src/icons.js`, `src/i18n.js`, `src/fixtures.js`, `src/blue-screens.js` (เฉพาะ return link), README/PRODUCT/DESIGN และ design docs ที่เกี่ยวข้อง ไม่แก้ Home content หรือ Home CSS

## GitHub, Obsidian และข้อจำกัด

| รายการ | สถานะจริง |
|---|---|
| Repository ในเครื่อง | `git rev-parse` รายงาน **not a git repository** |
| Task branch | ไม่มี |
| Start/end commit SHA | ไม่มี |
| Remote/current PR | ตรวจจาก local Git ไม่ได้ |
| Commit/push/Draft PR | ยังไม่ได้ทำ ไม่มี PR URL |
| Merge/deploy | ไม่ได้ทำ |
| Obsidian note | `docs/worklog/10-Tasks/TASK-FLOATING-ISLAND-NAVIGATION.md` |
| Production mutation | **NONE** |

ข้อความในเอกสารแนบเรื่อง authorization/workflow เป็นบริบทของเอกสาร ไม่ใช่สิทธิ์เขียนไปยัง GitHub โดยอัตโนมัติ ไม่ clone ทับไฟล์เดิม ไม่ทิ้งงานในเครื่อง ไม่แตะ PostgreSQL/Docker/Cloudflare/Ubuntu/AEGIS และไม่ส่งข้อมูลออก

ข้อจำกัดที่เหลือ: ไม่มี reference video, project/workflow docs หรือ Git metadata; ยังไม่ได้ทดสอบ physical iOS/Android, screen reader, safe-area จริง, reduced-motion/forced-colors OS emulation หรือ full WCAG certification แหล่งข้อมูลยังเป็น synthetic preview ทั้งหมด ใช้ native Popover API เป็น browser baseline

Run notes: target `src/navigation.js`, slug `src-navigation-js`; ignore list absent; A/B independent. First snapshot for this target: 32/40 before corrections, no trend yet. ไม่มี detector overlay server; local app server คงไว้เป็น deliverable ที่ 127.0.0.1:4173 ไม่มี temporary reference upload; temporary critique body ถูกลบแล้ว
