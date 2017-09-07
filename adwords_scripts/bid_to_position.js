function main() {

Logger.log("Sequence initiated, should be done in about 10 minutes or so...")
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
    var topush = bid * .20;
    var pushbid = bid + topush;
    var conversions = kw_stats.getConversions();
    var avg_posi = kw_stats.getAveragePosition();
    var clicks = kw_stats.getClicks();
    var CpC = cost / conversions;

    if ((avg_posi >= 1 && CpC >= 20))
       kw.setMaxCpc(newbid)
  }
}
Logger.log("Alles gut in da hood")
