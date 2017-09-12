var SIG_FIGS = 10000;
var APPEND = true;
//Automatic Bidding for US Geo Locations

function main () {

//Set URL for the Spreadsheet
var SPREADSHEET_URL = "https://docs.google.com/a/medicuja.com/spreadsheets/d/1NZ1OjC6xfztgxTIQXdNK4y8ax3w2sLDUiHxL6GDoZ-o/edit?usp=sharing"
   _addSpreadsheetSheets(SPREADSHEET_URL,['Geo_Data'])

//Declares sheets that will be used further
  var SheetGeo_Data = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getSheetByName('Geo_Data');
SheetGeo_Data.clear();
  _addHeadingsIfNeeded(SheetGeo_Data,['Campaign', 'Location', 'Clicks', 'Impressions', 'CTR', 'Avg. CPC', 'Cost', 'Avg. Pos.', 'Conversions', 'Cost per Conv.', 'Conv. Rate']);


//Progress tracking
Logger.log("Spreadsheets Created!")
Logger.log("Now Uploading Data")

//Write data into Pull Sheet

var Click_Threshold = 1;
  var RepIterator = AdWordsApp.report("SELECT CampaignName, Id, Clicks, Impressions, Ctr, AverageCpc, Cost, AveragePosition, Conversions, CostPerConversion, ConversionRate FROM CAMPAIGN_LOCATION_TARGET_REPORT WHERE Clicks >= 1 DURING LAST_30_DAYS");
  var KeywordIterator = RepIterator.rows();
  while (KeywordIterator.hasNext()) {
	  var KWRow = KeywordIterator.next();
	  var CamName = KWRow["CampaignName"];
    var location = KWRow["Id"]
	  var Click = KWRow["Clicks"];
	  var Impressions = KWRow["Impressions"];
    var CTR = KWRow["Ctr"];
    var Avg_CPC = KWRow["AverageCpc"];
    var Cost = KWRow["Cost"];
	  var Posi = KWRow["AveragePosition"];
    var Conv = KWRow["Conversions"];
	  var CpC = KWRow["CostPerConversion"];
	  var Conv_rate = KWRow["ConversionRate"];



    var to_write = []
   to_write.push([CamName,location,Click,Impressions,CTR,Avg_CPC,Cost,Posi,Conv,CpC,Conv_rate]);
   _writeDataToSheet(SheetGeo_Data,to_write);
  }



//Progress tracking
Logger.log("Done! Go to Spreadsheet")





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
