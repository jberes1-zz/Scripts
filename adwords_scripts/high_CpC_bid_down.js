function main() {

  var kw_iter = AdWordsApp.keywords()
  .withCondition("Status = ENABLED")
  .get();

  while(kw_iter.hasNext()) {
    var kw = kw_iter.next();
    var kw_stats = kw.getStatsFor("LAST_14_DAYS");
    var cost = kw_stats.getCost();
    var bid = kw.getMaxCpc();
    var tocut = bid * .20; //should produce cents to bid down
    var newbid = bid - tocut;
    var conversions = kw_stats.getConversions();
    var avg_posi = kw_stats.getAveragePosition();
    var clicks = kw_stats.getClicks();
    var CpC = cost / conversions;

    if ((clicks > 0 && cost >= 5) || (CpC >= 30)) {
       kw.setMaxCpc(newbid);
    }
    if (conversions == 0 && cost >= 1 && avg_posi < 2) {
      kw.setMaxCpc(newbid);
    }
  }
}
Logger.log("Shit be done son")
