/*
This script Pushes the bid in Paris for the selected campaign in the evening
This Script has to run jointly with the 'Paris Evening Pull' Script to ensure the bids are reduced after the evening push
*/
function main() {
  var TargIter = AdWordsApp.targeting().targetedLocations().withCondition("CampaignName CONTAINS 'Dating Site {b+}'").get();
  while (TargIter.hasNext()){
    var Targ = TargIter.next()
    var name = Targ.getName()
    var bid = Targ.getBidModifier()
    if (name =='Quebec') {
	  var newbid = Targ.setBidModifier(1)
	  }
	if (name =='Ontario') {
	  var newbid = Targ.setBidModifier(1)
	  }
	if (name =='Montreal') {
	  var newbid = Targ.setBidModifier(1)
	  }
	if (name =='Ottawa') {
	  var newbid = Targ.setBidModifier(1)
	  }
	if (name =='Toronto') {
	  var newbid = Targ.setBidModifier(1)
	  }
	if (name =='Mississauga') {
	  var newbid = Targ.setBidModifier(1)
	  }
	if (name =='Hamilton') {
	  var newbid = Targ.setBidModifier(1)
	  }
	if (name =='London') {
	  var newbid = Targ.setBidModifier(1)
	  }
  }
  var TargIter = AdWordsApp.targeting().targetedLocations().withCondition("CampaignName CONTAINS 'Dating site Combi {b+}'").get();
  while (TargIter.hasNext()){
    var Targ = TargIter.next()
    var name = Targ.getName()
    var bid = Targ.getBidModifier()
    if (name =='Quebec') {
	  var newbid = Targ.setBidModifier(1)
	  }
	if (name =='Ontario') {
	  var newbid = Targ.setBidModifier(1)
	  }
	if (name =='Montreal') {
	  var newbid = Targ.setBidModifier(1)
	  }
	if (name =='Ottawa') {
	  var newbid = Targ.setBidModifier(1)
	  }
	if (name =='Toronto') {
	  var newbid = Targ.setBidModifier(1)
	  }
	if (name =='Mississauga') {
	  var newbid = Targ.setBidModifier(1)
	  }
	if (name =='Hamilton') {
	  var newbid = Targ.setBidModifier(1)
	  }
	if (name =='London') {
	  var newbid = Targ.setBidModifier(1)
	  }
  }
}
