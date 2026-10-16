// Display identity only. This registry never stores balances or establishes ownership.
// Accent HEX values are GisSino UI proposals, not certified corporate brand values.
const BANK_SOURCE = 'https://www.bot.or.th/th/fi-branch.html';
const PAYMENT_SOURCE = 'https://www.bot.or.th/th/our-roles/payment-systems/payment-act-oversight/business-provider.html';
const reviewedAt = '2026-10-16';
// Owner-supplied local artwork. Names/bytes preserved; no official rights certification implied.
const suppliedLogos = Object.freeze({baac:'baac.png',bbl:'bbl.png',cimb:'cimb.png',gsb:'gsb.png',kbank:'kbank.png',krungsri:'krungsri.png',ktb:'ktb.png',scb:'scb.png',ttb:'ttb.png',uob:'uob.png',truemoney:'truemoney.png',shopeepay:'shoppeepay.png',paotang:'Paotang.png'});
const entries = [
  ['bbl','bank','ธนาคารกรุงเทพ','Bangkok Bank','#3677c8','https://www.bangkokbank.com/en'],
  ['kbank','bank','ธนาคารกสิกรไทย','Kasikornbank','#399b78','https://www.kasikornbank.com/en/personal'],
  ['ktb','bank','ธนาคารกรุงไทย','Krungthai Bank','#37a8d2','https://krungthai.com/en/personal'],
  ['scb','bank','ธนาคารไทยพาณิชย์','Siam Commercial Bank','#9b7cc9','https://www.scb.co.th/en/personal-banking.html'],
  ['krungsri','bank','ธนาคารกรุงศรีอยุธยา','Bank of Ayudhya (Krungsri)','#d2b24d','https://www.krungsri.com/en/personal'],
  ['ttb','bank','ธนาคารทหารไทยธนชาต','TMBThanachart (ttb)','#528ad2','https://www.ttbbank.com/en'],
  ['gsb','bank','ธนาคารออมสิน','Government Savings Bank','#ce7aa2','https://www.gsb.or.th/'],
  ['ghb','bank','ธนาคารอาคารสงเคราะห์','Government Housing Bank','#d69b56','https://www.ghbank.co.th/'],
  ['baac','bank','ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร','Bank for Agriculture and Agricultural Cooperatives','#75a16f','https://www.baac.or.th/'],
  ['kkp','bank','ธนาคารเกียรตินาคินภัทร','Kiatnakin Phatra Bank','#9a88b6','https://bank.kkpfg.com/th/home'],
  ['tisco','bank','ธนาคารทิสโก้','TISCO Bank','#6a88bf','https://www.tisco.co.th/en/'],
  ['cimb','bank','ธนาคารซีไอเอ็มบี ไทย','CIMB Thai Bank','#ca717c','https://www.cimbthai.com/en/personal/home.html'],
  ['uob','bank','ธนาคารยูโอบี','United Overseas Bank (Thai)','#6a87b0','https://www.uob.co.th/'],
  ['lhb','bank','ธนาคารแลนด์ แอนด์ เฮ้าส์','Land and Houses Bank','#8490c0','https://www.lhbank.co.th/en/personal/'],
  ['thai-credit','bank','ธนาคารไทยเครดิต','Thai Credit Bank','#dc955a','https://www.thaicreditbank.com/'],
  ['truemoney','ewallet','ทรูมันนี่','TrueMoney','#dc9a54','https://www.truemoney.com/','บริษัท ทรู มันนี่ จำกัด'],
  ['shopeepay','ewallet','ช้อปปี้เพย์','ShopeePay','#d98566','https://shopeepay.co.th/contact-us','บริษัท ช้อปปี้เพย์ (ประเทศไทย) จำกัด'],
  ['deeppocket','ewallet','ดีพพ็อกเก็ต','DeepPocket','#8f88c9','https://www.t2pco.com/en/t2p-deeppocket','บริษัท ทีทูพี จำกัด'],
  ['paotang','ewallet','เป๋าตัง','Paotang','#43a8c6','https://paotang-auth.krungthai.com/','ธนาคารกรุงไทย']
];
export const providers = Object.freeze(Object.fromEntries(entries.map(([providerId,providerType,nameTh,nameEn,primaryColor,officialWebsite,legalEntityTh]) => [providerId,Object.freeze({
  providerId,providerType,nameTh,nameEn,legalEntityTh:legalEntityTh||nameTh,
  primaryColor,safeForegroundColor:'#102136',secondaryAccent:'#dbe6f2',
  colorStatus:'PROPOSED_UI_ACCENT',logoPath:suppliedLogos[providerId]?`/assets/providers/${suppliedLogos[providerId]}`:null,
  logoStatus:suppliedLogos[providerId]?'OWNER_SUPPLIED':'VERIFY',assetSource:suppliedLogos[providerId]?'Owner-provided banks directory':null,
  officialWebsite,verificationSource:providerId==='paotang'?officialWebsite:providerType==='bank'?BANK_SOURCE:PAYMENT_SOURCE,
  verifiedAt:reviewedAt,verificationStatus:'IDENTITY_LISTED',
  icon:providerType==='bank'?'bank':'wallet'
})])));
const fallback = (providerType) => Object.freeze({
  providerId:providerType==='cash'?'cash':`other-${providerType}`,
  providerType,nameTh:providerType==='cash'?'เงินสด':providerType==='ewallet'?'อีวอลเล็ตอื่น':'ธนาคารอื่น',
  nameEn:providerType==='cash'?'Physical cash':providerType==='ewallet'?'Other E-Wallet':'Other bank',
  primaryColor:providerType==='cash'?'#c7b28a':'#8faacb',safeForegroundColor:'#102136',
  secondaryAccent:'#dbe6f2',colorStatus:'GISSINO_NEUTRAL',logoPath:null,logoStatus:'FALLBACK',
  officialWebsite:null,verificationSource:null,verifiedAt:null,verificationStatus:'NOT_AN_INSTITUTION',
  icon:providerType==='bank'?'bank':'wallet'
});
export const fallbackProviders = Object.freeze({bank:fallback('bank'),ewallet:fallback('ewallet'),cash:fallback('cash')});
export function resolveProvider(providerId, accountType='bank') {
  const type=['bank','ewallet','cash'].includes(accountType)?accountType:'bank';
  const provider=Object.hasOwn(providers,providerId||'')?providers[providerId]:null;
  return provider?.providerType===type?provider:fallbackProviders[type];
}
export function providerTheme(provider) {
  // Only known classes can reach markup. No user-supplied CSS or inline styles.
  return Object.hasOwn(providers,provider.providerId)?`provider-${provider.providerId}`:`provider-${provider.providerType==='cash'?'cash':'neutral'}`;
}
export const providerOptions = type => [...Object.values(providers).filter(p=>p.providerType===type),fallbackProviders[type]].filter(Boolean);
