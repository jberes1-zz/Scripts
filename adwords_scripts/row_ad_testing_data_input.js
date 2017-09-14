var SIG_FIGS = 10000;
var APPEND = true;
// A/B Testing Script to run alongside the A/B testing labeling script found within the account
// The A/B labeling script should be set to run everyday to continuously find ads, and then this script would run weekly to update which ads need to be updated

function main () {

//Set URL for the Spreadsheet
var SPREADSHEET_URL = "https://docs.google.com/a/medicuja.com/spreadsheets/d/1sd38PyfeQdoaa2MTxHZ9eGxIvs1RGUv7GjkgyH0Jsbs/edit?usp=sharing"
   _addSpreadsheetSheets(SPREADSHEET_URL,['Ad_Data']);
   _addSpreadsheetSheets(SPREADSHEET_URL,['Winning_Ads']);
   _addSpreadsheetSheets(SPREADSHEET_URL,['Loser_Ads']);

//Declares sheets that will be used further
  var SheetAds = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getSheetByName('Ad_Data');
SheetAds.clear();
  _addHeadingsIfNeeded(SheetAds,['Campaign','Adgroup','Headline 1','Headline 2','Description','Path1','Path2','Label','Clicks','Impressions','CTR','Avg. CPC','Cost','Avg. Position','Conversions','Cost per Conversion','Conversion Rate']);

  var SheetWinner = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getSheetByName('Winning_Ads');
SheetWinner.clear();
  _addHeadingsIfNeeded(SheetWinner,['Campaign','Adgroup','Headline 1', 'Headline 2','Description','Path1','Path2']);

  var SheetLoser = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getSheetByName('Loser_Ads');
SheetLoser.clear();
  _addHeadingsIfNeeded(SheetLoser,['Campaign','Adgroup','Headline 1', 'Headline 2','Description','Path1','Path2']);


//Progress tracking
Logger.log("Spreadsheets Created!")
Logger.log("Now Uploading Ad_Data")

//Write data into Ads Sheet
  var RepIterator = AdWordsApp.report("SELECT CampaignName, AdGroupName, HeadlinePart1, HeadlinePart2, Description, Path1, Path2, Labels, Clicks, Impressions, Ctr, AverageCpc, Cost, AveragePosition, Conversions, CostPerConversion, ConversionRate FROM AD_PERFORMANCE_REPORT WHERE CampaignStatus = ENABLED AND Impressions > 100 during LAST_14_DAYS");
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
  var Label = KWRow["Labels"];
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

 //Grab the loser and print it into a Google sheet

 var RepIterator = AdWordsApp.report("SELECT CampaignName, AdGroupName, HeadlinePart1, HeadlinePart2, Description, Path1, Path2, Labels, LabelIds FROM AD_PERFORMANCE_REPORT WHERE CampaignStatus = ENABLED AND LabelIds CONTAINS_ANY ['1486841342'] during LAST_14_DAYS");
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
   var Label = KWRow["Labels"];
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
   _writeDataToSheet(SheetLoser,to_write);
  }

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
