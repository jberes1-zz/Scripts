function main(){


  var BAD_COST_PER_CONV = 30;
  var BAD_BID_DECREASE = .20;

  var kw_iter = AdWordsApp.keywords()
   .withCondition("Status = ENABLED")
   .get();

  while(kw_iter.hasNext()) {
    var kw = kw_iter.next();
    var kw_stats = kw.getStatsFor("LAST_14_DAYS");
    var cost = kw_stats.getCost();
    var conversions = kw_stats.getConversions();

    if (conversions > 0) {
      var
    }
  }
}


function main() {

  var kw_iter = AdWordsApp.keywords()
  .withCondition("Status = ENABLED")
  .get();
Logger.log("Getting data to bid everything down")
  while(kw_iter.hasNext()) {
    var kw = kw_iter.next();
    var kw_stats = kw.getStatsFor("LAST_14_DAYS");
    var cost = kw_stats.getCost();
    var bid = kw.getMaxCpc();
    var newbid = bid * .20;
    var conversions = kw_stats.getConversions();
    var avg_posi = kw_stats.getAveragePosition();
    var clicks = kw_stats.getClicks();
    var CpC = cost / conversions;
Logger.log("Done!")
Logger.log("Setting new bids")
    if ((clicks > 0 && cost >= 5) || (CpC >= 30)) {
       kw.setMaxCPC(newbid)
    }
Logger.log("All done!")
  }
}
