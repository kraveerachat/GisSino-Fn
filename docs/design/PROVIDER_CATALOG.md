---
id: DESIGN-PROVIDER-CATALOG
type: design
level: 2
status: CURRENT
updated: 2026-10-16
up: Design-Hub.md
related:
  - UI_DATA_CONTRACTS.md
  - ../pages/home/Page-Home.md
  - ../pages/wallet/Page-Wallet.md
---
# Thai financial-provider presentation catalog

## Current state

18 provider identities are listed in [providers.js](../../src/providers.js): 15 bank candidates and 3 consumer E-Wallet candidates. Reviewed 2026-10-16. This is a display registry, not a comprehensive national list, license certification, endorsement, bank integration, or statement of account ownership. Home and Wallet use the same provider resolution and account adapter. Unknown or mismatched providers receive an explicit Other bank / Other E-Wallet fallback; cash is not an institution.

## Evidence and limits

- Bank identity source: [Bank of Thailand financial-institution branch directory](https://www.bot.or.th/th/fi-branch.html), cross-checked against official sites below where accessible. Directory names alone do not certify every current retail product or permission to reuse artwork.
- E-money legal-entity source: [Bank of Thailand regulated payment businesses](https://www.bot.or.th/th/our-roles/payment-systems/payment-act-oversight/business-provider.html). It lists True Money, ShopeePay (Thailand), and T2P entities; product-to-entity mapping additionally uses official provider material. TrueMoney consumer wallet appears on its [fund-out page](https://www.truemoney.com/fund-out/); DeepPocket mapping appears on [T2P's product page](https://www.t2pco.com/en/t2p-deeppocket). ShopeePay's official contact page confirms the entity; current consumer service scope remains VERIFY.
- Krungthai's fetched page returned no readable body; GHBank and UOB subpage fetches failed. Those identities rely on directory evidence; their retail-site content was not independently verified. Dynamic BOT license-check/comparison apps did not yield individual certificates. Do not upgrade IDENTITY_LISTED to a live authorization assertion.

## Registry

All colors below are **PROPOSED_UI_ACCENT**, selected for GisSino readability rather than asserted official brand HEX values. Foreground is navy `#102136`; neutral secondary accent is `#dbe6f2`. Full names are retained in details; BAAC uses truthful short labels ธ.ก.ส. / BAAC on compact folders.

| ID | Type | Thai display name | English display name | UI accent | Official source |
|---|---|---|---|---|---|
| bbl | bank | ธนาคารกรุงเทพ | Bangkok Bank | #3677c8 | [Provider site](https://www.bangkokbank.com/en) |
| kbank | bank | ธนาคารกสิกรไทย | Kasikornbank | #399b78 | [Provider site](https://www.kasikornbank.com/en/personal) |
| ktb | bank | ธนาคารกรุงไทย | Krungthai Bank | #37a8d2 | [Provider site](https://krungthai.com/en/personal) |
| scb | bank | ธนาคารไทยพาณิชย์ | Siam Commercial Bank | #9b7cc9 | [Provider site](https://www.scb.co.th/en/personal-banking.html) |
| krungsri | bank | ธนาคารกรุงศรีอยุธยา | Bank of Ayudhya (Krungsri) | #d2b24d | [Provider site](https://www.krungsri.com/en/personal) |
| ttb | bank | ธนาคารทหารไทยธนชาต | TMBThanachart (ttb) | #528ad2 | [Provider site](https://www.ttbbank.com/en) |
| gsb | bank | ธนาคารออมสิน | Government Savings Bank | #ce7aa2 | [Provider site](https://www.gsb.or.th/) |
| ghb | bank | ธนาคารอาคารสงเคราะห์ | Government Housing Bank | #d69b56 | [Provider site](https://www.ghbank.co.th/) |
| baac | bank | ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร | Bank for Agriculture and Agricultural Cooperatives | #75a16f | [Provider site](https://www.baac.or.th/) |
| kkp | bank | ธนาคารเกียรตินาคินภัทร | Kiatnakin Phatra Bank | #9a88b6 | [Provider site](https://bank.kkpfg.com/th/home) |
| tisco | bank | ธนาคารทิสโก้ | TISCO Bank | #6a88bf | [Provider site](https://www.tisco.co.th/en/) |
| cimb | bank | ธนาคารซีไอเอ็มบี ไทย | CIMB Thai Bank | #ca717c | [Provider site](https://www.cimbthai.com/en/personal/home.html) |
| uob | bank | ธนาคารยูโอบี | United Overseas Bank (Thai) | #6a87b0 | [Provider site](https://www.uob.co.th/) |
| lhb | bank | ธนาคารแลนด์ แอนด์ เฮ้าส์ | Land and Houses Bank | #8490c0 | [Provider site](https://www.lhbank.co.th/en/personal/) |
| thai-credit | bank | ธนาคารไทยเครดิต | Thai Credit Bank | #dc955a | [Provider site](https://www.thaicreditbank.com/) |
| truemoney | ewallet | ทรูมันนี่ | TrueMoney | #dc9a54 | [Provider site](https://www.truemoney.com/) |
| shopeepay | ewallet | ช้อปปี้เพย์ | ShopeePay | #d98566 | [Provider site](https://shopeepay.co.th/contact-us) |
| deeppocket | ewallet | ดีพพ็อกเก็ต | DeepPocket | #8f88c9 | [Provider site](https://www.t2pco.com/en/t2p-deeppocket) |

## Logos, provenance, and color

Official logos included: **NONE**. Every provider has `logoPath: null` and `logoStatus: VERIFY` because reusable artwork and redistribution rights were not established. No logo was traced, recolored, downloaded, or invented. The bank and wallet line icons are the prototype's original generic symbols, explicitly fallback badges. Future authorized assets require provenance and usage review before replacing them. Other-provider accent is `#8faacb`; cash uses `#c7b28a`.

Identity never depends on color alone: account name, provider text, type, currency and available masked suffix remain visible. Two KBank accounts use separate IDs/names/suffixes; KBank and BAAC greens also have distinct text. Registry fields carry review date, evidence URL, legal entity, status, and separate accent/logo verification. Real account IDs and balances never belong in this catalog.

## Change log

- 2026-10-16 — Added researched display registry and explicit fallback/rights boundaries for [TASK-GS-UI-ACCOUNT-BOARD-001](../worklog/10-Tasks/TASK-GS-UI-ACCOUNT-BOARD-001.md).
