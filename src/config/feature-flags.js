// Owner decision gates from the remediation plan §2. Every default is the
// current canonical behaviour; an alternative value needs a dated DECISIONS.md
// entry and a separate small PR before it is switched on.
export const flags = Object.freeze({
  heroLiabilityLine: false,          // D-1, Q10 OPEN
  safeToSpendChip: false,            // D-2, D31: no Safe to Spend on Home
  dailyClose: false,                 // D-3, Guide §6: no login/app-open XP
  rankingKey: 'weekly_xp',           // D-4, D34
  globalBoard: 'shown',              // D-5, D34 synthetic preview; Q7 OPEN
  savingsAsTransfer: false,          // D-6 OPEN
  installmentNesting: false,         // D-7 OPEN
  dateEra: 'CE',                     // D-8, Architecture §5.6; 'BE' is the option
  appLock: false,                    // D-9
  offlineWrites: false,              // D-10
  templates: false,                  // D-11
  monthCompare: false,               // D-14
  fundingCheck: false,               // D-14
  needsDetailsXp: 'on_entry',        // D-16, Guide §6.1
  activityChart: 'd33_donut',        // D-17, D33
  copyRevision2026_10: false,        // D-18
  habitSource: 'home',               // D36: owner kept the Home set (3 / 80); 'party' (7 / 92) not adopted
  homeScenarioExtras: false          // WP-19: hide the no-op "Spending shortfall" and "Sample group context" Home scenarios
});
