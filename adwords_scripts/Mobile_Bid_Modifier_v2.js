/*
Hello fellow AdWords enthusiast! This script is an improvement on Mobile_Bid_Adj, where you can now do multiple campaigns
and adgroups all within one script.
TO BE RUN WITH BID INCREASE AS WELL AS THE DECREASE SCRIPT
*/
function main() {

//**for a NEW CAMPAIGN, start to copy from here**
  var iter_adgroup = AdWordsApp.adGroups().withCondition("CampaignName = '<insert campaign name here>'").get();//Insert your desired campaign name
  while (iter_adgroup.hasNext()){
    var Targ = iter_adgroup.next()
    var name = Targ.getName()
    var bid = Targ.getMobileBidModifier()

/*Here you can input your adgroups and the bid increases you want.*/
  var adgroup1_bid = 0.2
	var adgroup2_bid = 0.2
	var adgroup3_bid = 0.2

/*Here you input your adgroup names*/
    if (name =='<insert adgroup name>') {
	  Targ.setMobileBidModifier(bid + adgroup1_bid)//Notice adgroup1 is here, so your increase you wrote above applies here
	  }
	  else if (name =='<insert adgroup name>') {
	  Targ.setMobileBidModifier(bid + adgroup2_bid)
	  }
	  else if (name =='<insert adgroup name>') {
	  Targ.setMobileBidModifier(bid + adgroup3_bid)
	  }
  }

  /**STOP COPYING!!!!**
and paste above this bracket*/
}
