var SIG_FIGS = 10000;
var APPEND = true;
//Automatic Bidding for US Geo Locations

function main () {

//Set URL for the Spreadsheet
var SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1ewxvXmMz8SXDr9ZqdBAA2RxIK5jjpgQA89rbZsh6yRg/edit?usp=sharing"
   _addSpreadsheetSheets(SPREADSHEET_URL,['Pull'])
   _addSpreadsheetSheets(SPREADSHEET_URL,['Push'])

//Declares sheets that will be used further
  var SheetPull = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getSheetByName('Pull');
SheetPull.clear();
  _addHeadingsIfNeeded(SheetPull,['Conversions','Click','Old Bid Mod.','Conv Value','Average Pos.','Cost per Conv.','Cost','Campaign','Location ID','New Bid Mod.']);
  var SheetPush = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getSheetByName('Push');
SheetPush.clear();
  _addHeadingsIfNeeded(SheetPush,['Conversions','Click','Old Bid Mod.','Conv Value','Average Pos.','Cost per Conv.','Cost','Campaign','Location ID','New Bid Mod.']);


//Progress tracking
Logger.log("Spreadsheets Created!")
Logger.log("Now Uploading Pull Data")

//Write data into Pull Sheet

var Click_Threshold = 1;
  var RepIterator = AdWordsApp.report("SELECT Id, BidModifier, CampaignName, Clicks, Cost, Conversions, AveragePosition, CostPerConversion, AllConversionValue FROM CAMPAIGN_LOCATION_TARGET_REPORT WHERE Cost > 9000000 AND Clicks >= 1 DURING LAST_14_DAYS");
  var KeywordIterator = RepIterator.rows();
  while (KeywordIterator.hasNext()) {
	  var KWRow = KeywordIterator.next();
	  var CamName = KWRow["CampaignName"];
	  var location_id = KWRow["Id"];
    var bid = KWRow["BidModifier"];
	  var Click = KWRow["Clicks"];
	  var Rev = KWRow["AllConversionValue"];
	  var Posi = KWRow["AveragePosition"];
	  var CpC = KWRow["CostPerConversion"];
	  var Conversions = KWRow["Conversions"];
	  var cost = KWRow["Cost"];

//Convert KPIs into Floats
	  var a = parseFloat(bid);
	  var b = parseFloat(Rev);
	  var c = parseFloat(CpC);
	  var d = parseFloat(Conversions);
	  var e = parseFloat(Posi);
	  var f = parseFloat(Click);
	  var g = parseFloat(cost);



//***********************Conditions to apply bidding**************************

//Sorts out locations that shouldn't be bidded down
   if ((b > d) || (c > 16.00 && b > d) || (c < 16.00 && d > 0))  {
	   var newbid = a
   }

//Applies adjustment decreases
   else if ((d == b && c > 16.0) || (d = 0 && f >= 1) || (e < 2.0 && d == 0) || (f >= 2 && g > 8))  {
	  var newbid = a - 20.0
    }

//Everything else that pops up, no bid adjustment
	else {
		var newbid = a
	}

	  var to_write = []
	  to_write.push([d,f,bid,b,e,c,g,CamName,location_id,newbid]);
	  _writeDataToSheet(SheetPull,to_write);
   }

//Progress tracking
   Logger.log("Done!")
   Logger.log("Now Uploading Push Data")




//Write data into Push Sheet

var Click_Threshold = 1;
  var RepIterator = AdWordsApp.report("SELECT Id, BidModifier, CampaignName, Clicks, Cost, Conversions, AveragePosition, CostPerConversion, AllConversionValue FROM CAMPAIGN_LOCATION_TARGET_REPORT WHERE Cost > 9000000 AND Clicks >= 1 DURING LAST_14_DAYS");
  var KeywordIterator = RepIterator.rows();
  while (KeywordIterator.hasNext()) {
	  var KWRow = KeywordIterator.next();
	  var CamName = KWRow["CampaignName"];
	  var location_id = KWRow["Id"];
      var bid = KWRow["BidModifier"];
	  var Click = KWRow["Clicks"];
	  var Rev = KWRow["AllConversionValue"];
	  var Posi = KWRow["AveragePosition"];
	  var CpC = KWRow["CostPerConversion"];
	  var Conversions = KWRow["Conversions"];
	  var cost = KWRow["Cost"];

//Convert KPIs into Floats
	  var a = parseFloat(bid);
	  var b = parseFloat(Rev);
	  var c = parseFloat(CpC);
	  var d = parseFloat(Conversions);
	  var e = parseFloat(Posi);
	  var f = parseFloat(Click);
	  var g = parseFloat(cost);

//***********************Conditions to apply bidding**************************

//Makes sure that locations in Position 1 are NOT bid up
   if (e < 2.0) {
	  var newbid = a
   }

//If conversion value is more than conversions or the cost/conv. is below CPL threshold, bid up
   else if ((b > d && c < 16.0) || (c < 16.0 && d >= 2))  {
	  var newbid = a + 20.0
    }

	else {
		var newbid = a
	}

//If conversions value is above 100 and position is lower than 1.9, bid up 40%
   if (b > 100.0 && e > 1.9) {
	  var newbid = a + 40.0
    }
    else {
		var newbid = a
	}

	  var to_write = []
	  to_write.push([d,f,bid,b,e,c,g,CamName,location_id,newbid]);
	  _writeDataToSheet(SheetPush,to_write);
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
