var SIG_FIGS = 10000;
var APPEND = true;
// A/B Testing Script to run alongside the A/B testing labeling script found within the account
// The A/B labeling script should be set to run everyday to continuously find ads, and then this script would run weekly to update which ads need to be updated

function main () {

//Set URL for the Spreadsheet
var SPREADSHEET_URL = "https://docs.google.com/a/medicuja.com/spreadsheets/d/1sd38PyfeQdoaa2MTxHZ9eGxIvs1RGUv7GjkgyH0Jsbs/edit?usp=sharing"
   _addSpreadsheetSheets(SPREADSHEET_URL,['Ad_Data']);
   _addSpreadsheetSheets(SPREADSHEET_URL,['Winning_Ads']);

//Declares sheets that will be used further
  var SheetAds = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getSheetByName('Ad_Data');
SheetAds.clear();
  _addHeadingsIfNeeded(SheetAds,['Campaign','Adgroup','Headline 1','Headline 2','Description','Path1','Path2','Label','Clicks','Impressions','CTR','Avg. CPC','Cost','Avg. Position','Conversions','Cost per Conversion','Conversion Rate']);

  var SheetWinner = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getSheetByName('Winning_Ads');
SheetWinner.clear();
  _addHeadingsIfNeeded(SheetWinner,['Campaign','Adgroup','Headline 1', 'Headline 2','Description','Path1','Path2']);


//Progress tracking
Logger.log("Spreadsheets Created!")
Logger.log("Now Uploading Ad_Data")

//Write data into Ads Sheet
  var RepIterator = AdWordsApp.report("SELECT CampaignName, AdGroupName,LabelIds, HeadlinePart1, HeadlinePart2, Description, Path1, Path2, Labels, Clicks, Impressions, Ctr, AverageCpc, Cost, AveragePosition, Conversions, CostPerConversion, ConversionRate FROM AD_PERFORMANCE_REPORT WHERE CampaignStatus = ENABLED AND Impressions > 500 during LAST_14_DAYS");
  var KeywordIterator = RepIterator.rows();
  while (KeywordIterator.hasNext()) {
	var KWRow = KeywordIterator.next();
	var Campaign = KWRow["CampaignName"];
    var Adgroup = KWRow["AdGroupName"];
    var Headline1 = KWRow["HeadlinePart1"];
    var Headline2 = KWRow["HeadlinePart2"];
    var Description = KWRow["Description"];
    var Path1 = KWRow["Path1"];
    var Path2 = KWRow["Path2"];
    var Label = KWRow["Labels"]
    var LabelIds = KWRow["LabelIds"];
    var Clicks = KWRow["Clicks"];
    var Impressions = KWRow["Impressions"];
    var CTR = KWRow["Ctr"];
    var Avg_CPC = KWRow["AverageCpc"];
    var Cost = KWRow["Cost"];
    var Avg_Posi = KWRow["AveragePosition"];
    var Conversions = KWRow["Conversions"];
    var Cost_Conv = KWRow["CostPerConversion"];
    var Conv_rate = KWRow["ConversionRate"];

    var to_write = []
	  to_write.push([Campaign,Adgroup,Headline1,Headline2,Description,Path1,Path2,Label,Clicks,Impressions,CTR,Avg_CPC,Cost,Avg_Posi,Conversions,Cost_Conv,Conv_rate]);
	  _writeDataToSheet(SheetAds,to_write);
   }


//Grab the winner and print it into a Google sheet

var RepIterator = AdWordsApp.report("SELECT CampaignName, AdGroupName, HeadlinePart1, HeadlinePart2, Description, Path1, Path2, Labels, LabelIds FROM AD_PERFORMANCE_REPORT WHERE CampaignStatus = ENABLED AND LabelIds CONTAINS_ANY ['1486840370'] during LAST_14_DAYS");
var KeywordIterator = RepIterator.rows();
while (KeywordIterator.hasNext()) {
  var KWRow = KeywordIterator.next();
  var Campaign = KWRow["CampaignName"];
  var Adgroup = KWRow["AdGroupName"];
  var Headline1 = KWRow["HeadlinePart1"];
  var Headline2 = KWRow["HeadlinePart2"];
  var Description = KWRow["Description"];
  var Path1 = KWRow["Path1"];
  var Path2 = KWRow["Path2"];
  var Label = KWRow["Labels"]
  var Clicks = KWRow["Clicks"];
  var Impressions = KWRow["Impressions"];
  var CTR = KWRow["Ctr"];
  var Avg_CPC = KWRow["AverageCpc"];
  var Cost = KWRow["Cost"];
  var Avg_Posi = KWRow["AveragePosition"];
  var Conversions = KWRow["Conversions"];
  var Cost_Conv = KWRow["CostPerConversion"];
  var Conv_rate = KWRow["ConversionRate"];



  var to_write = []
  to_write.push([Campaign,Adgroup,Headline1,Headline2,Description,Path1,Path2]);
  _writeDataToSheet(SheetWinner,to_write);
 }


function adCleaning () {
  var adGroupIterator = AdWordsApp.adGroups().get();
  if (adGroupIterator.hasNext()) {
    var adGroup = adGroupIterator.next();
    var adsIterator = adGroup.ads()
      .withCondition('LabelIds = "1486841342"')
      .withCondition("CampaignStatus = ENABLED")
      .withCondition("AdGroupStatus = ENABLED")
      .get();
    while (adsIterator.hasNext()) {
      var ad = adsIterator.next();
      ad.pause();
    }
  }
}

/* ******************* TEST B *******************


var RepIterator = AdWordsApp.report("SELECT CampaignName, AdGroupName, HeadlinePart1, HeadlinePart2, Description, Path1, Path2, Labels, Clicks, Impressions, Ctr, AverageCpc, Cost, AveragePosition, Conversions, CostPerConversion, ConversionRate FROM AD_PERFORMANCE_REPORT WHERE CampaignStatus = ENABLED AND LabelIds CONTAINS_ANY ['1432878320'] AND Impressions > 100 during LAST_14_DAYS");
var KeywordIterator = RepIterator.rows();
while (KeywordIterator.hasNext()) {
  var KWRow = KeywordIterator.next();
  var Ad2_Campaign = KWRow["CampaignName"];
  var Ad2_Adgroup = KWRow["AdGroupName"];
  var Ad2_Headline1 = KWRow["HeadlinePart1"];
  var Ad2_Headline2 = KWRow["HeadlinePart2"];
  var Ad2_Description = KWRow["Description"];
  var Ad2_Path1 = KWRow["Path1"];
  var Ad2_Path2 = KWRow["Path2"];
  var Ad2_Label = KWRow["Labels"]
  var Ad2_Clicks = KWRow["Clicks"];
  var Ad2_Impressions = KWRow["Impressions"];
  var Ad2_CTR = KWRow["Ctr"];
  var Ad2_Avg_CPC = KWRow["AverageCpc"];
  var Ad2_Cost = KWRow["Cost"];
  var Ad2_Avg_Posi = KWRow["AveragePosition"];
  var Ad2_Conversions = KWRow["Conversions"];
  var Ad2_Cost_Conv = KWRow["CostPerConversion"];
  var Ad2_Conv_rate = KWRow["ConversionRate"];


function Test()


/* ******************* TEST C *******************


  var RepIterator = AdWordsApp.report("SELECT CampaignName, AdGroupName, HeadlinePart1, HeadlinePart2, Description, Path1, Path2, Labels, Clicks, Impressions, Ctr, AverageCpc, Cost, AveragePosition, Conversions, CostPerConversion, ConversionRate FROM AD_PERFORMANCE_REPORT WHERE CampaignStatus = ENABLED AND LabelIds CONTAINS_ANY ['1432879457'] AND Impressions > 100 during LAST_14_DAYS");
  var KeywordIterator = RepIterator.rows();
  while (KeywordIterator.hasNext()) {
    var KWRow = KeywordIterator.next();
    var Ad3_Campaign = KWRow["CampaignName"];
    var Ad3_Adgroup = KWRow["AdGroupName"];
    var Ad3_Headline1 = KWRow["HeadlinePart1"];
    var Ad3_Headline2 = KWRow["HeadlinePart2"];
    var Ad3_Description = KWRow["Description"];
    var Ad3_Path1 = KWRow["Path1"];
    var Ad3_Path2 = KWRow["Path2"];
    var Ad3_Label = KWRow["Labels"]
    var Ad3_Clicks = KWRow["Clicks"];
    var Ad3_Impressions = KWRow["Impressions"];
    var Ad3_CTR = KWRow["Ctr"];
    var Ad3_Avg_CPC = KWRow["AverageCpc"];
    var Ad3_Cost = KWRow["Cost"];
    var Ad3_Avg_Posi = KWRow["AveragePosition"];
    var Ad3_Conversions = KWRow["Conversions"];
    var Ad3_Cost_Conv = KWRow["CostPerConversion"];
    var Ad3_Conv_rate = KWRow["ConversionRate"];

*/
//Progress tracking
   Logger.log("Done!")


// Functions used for the spreadsheets
 function _addSpreadsheetSheets(url,sheet_names) {
     var spreadsheet = SpreadsheetApp.openByUrl(url);
     var all_sheets = spreadsheet.getSheets();
     var all_sheet_names = [];
     for(var i in all_sheets) {
       all_sheet_names.push(all_sheets[i].getName());
     }
     for(var i in sheet_names) {
       var name = sheet_names[i];
       if(all_sheet_names.indexOf(name) == -1) {
         spreadsheet.insertSheet(name);
       } else {
         if(!APPEND) {
           spreadsheet.getSheetByName(name).clear();
         }
       }
     }
   }



   function _writeDataToSheet(sheet,to_write) {
     var last_row = sheet.getLastRow();
     var numRows = sheet.getMaxRows();
     if((numRows-last_row) < to_write.length) {
       sheet.insertRows(last_row+1,to_write.length-numRows+last_row);
     }
     var range = sheet.getRange(last_row+1,1,to_write.length,to_write[0].length);
     range.setValues(to_write);
   }


   function _addHeadingsIfNeeded(sheet,headings) {
     if(sheet.getRange('A1:A1').getValues()[0][0] == "") {
       sheet.clear();
       sheet.appendRow(headings);
     }
   }
   }
