function main() { 
  
  var Mobile = false
  var SitelinkText1 = "Headline"
  var Stelink1Desc1 = "Description_line_1"
  var Stelink1Desc2 = "Description_line_2"
  
  
  var cancel = 0
  var sitelinkBuilder = AdWordsApp.extensions().newSitelinkBuilder();
  var AdgroupIter = AdWordsApp.adGroups()
  .withCondition("CampaignName DOES_NOT_CONTAIN_IGNORE_CASE 'Brand'")
  .withCondition("CampaignStatus  != DELETED")
  .withCondition("Status != DELETED")
  .get();
  while (AdgroupIter.hasNext()){
    var AdGroup = AdgroupIter.next();
    var sitelinkIter = AdGroup.extensions().sitelinks()
    .withCondition("Status != DELETED")
    .get();
    while (sitelinkIter.hasNext()){
      var Sitelink = sitelinkIter.next();
      var Sitelinktexts = Sitelink.getLinkText();
      if (SitelinkText1 === Sitelinktexts){
        var cancel = 1;
      }
    }     
    var FinalDeskUrl = "http://rencontre.elitesingles.ca/geash9/?CID=fr-CA_SEM_1_{campaignid}_{adgroupid}_{feeditemid}_{keyword}"
    var FinalMobUrl = "http://rencontre.elitesingles.ca/mbh70i/?CID=fr-CA_SEM_101_{campaignid}_{adgroupid}_{feeditemid}_{keyword}"
    
    if (cancel == 0){
      var sitelinkOperation = sitelinkBuilder
      .withFinalUrl(FinalDeskUrl)
      .withMobileFinalUrl(FinalMobUrl)
      .withLinkText(SitelinkText1)
      .withDescription1(Stelink1Desc1)
      .withDescription2(Stelink1Desc2) 
	  .withMobilePreferred(Mobile)	  
      .build();
      if (sitelinkOperation.isSuccessful()) {
        var sitelink = sitelinkOperation.getResult();
        AdGroup.addSitelink(sitelink)
      }
    }
    cancel=0
  }
}
