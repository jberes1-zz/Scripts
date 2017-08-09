var SEARCH_QUERY = "label:inbox is:unread to:me";

// Credit: https://gist.github.com/oshliaer/70e04a67f1f5fd96a708
// ************ Saves emails from inbox to google sheet ***************
function getEmails_(q) {
    var emails = [];
    var threads = GmailApp.search(q);
    for (var i in threads) {
        var msgs = threads[i].getMessages();
        for (var j in msgs) {
            emails.push([msgs[j].getBody().replace(/<.*?>/g, '\n')
                .replace(/^\s*\n/gm, '').replace(/^\s*/gm, '').replace(/\s*\n/gm, '\n')
            ]);
        }
    }
    return emails;
}

function appendData_(sheet, array2d) {
    sheet.getRange(sheet.getLastRow() + 1, 1, array2d.length, array2d[0].length).setValues(array2d);
}

function saveEmails() {
    var array2d = getEmails_(SEARCH_QUERY);
    if (array2d) {
        appendData_(SpreadsheetApp.getActiveSheet(), array2d);
    }
}

/** This script will extract email address from your Gmail mailbox **/
/**   Written by Amit Agarwal on 06/13/2013    **/

function extractEmailAddresses() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];

  var monitor = sheet.getRange("A2").getValue();
  var processed = sheet.getRange("B2").getValue();

  var label = GmailApp.getUserLabelByName(processed);
  var search = "in:" + monitor + " -in:" + processed;

  // Process 50 Gmail threads in a batch to prevent script execution errors
  var threads = GmailApp.search(search, 0, 50);

  var row, messages, from, email;

  try {

    for (var x=0; x<threads.length; x++) {

      // Use Regular Expression to extract valid email address
      from = threads[x].getMessages()[0].getFrom();
      from = from.match(/\S+@\S+\.\S+/g);

      if ( from.length ) {

        email = from[0];
        email = email.replace(">", "");
        email = email.replace("<", "");

        row   = sheet.getLastRow() + 1;
        // If an email address if found, add it to the sheet
        sheet.getRange(row,1).setValue(email);
      }

      threads[x].addLabel(label);

    }

  }

  catch (e) {
    Logger.log(e.toString());
    Utilities.sleep(5000);
  }

  // All messages in the label have been processed?
  if ( threads.length === 0 ) {
    GmailApp.sendEmail(Session.getActiveUser().getEmail(), "Extraction Done",
                       "Download the sheet from " + ss.getUrl());
  }
}


// Remove Duplicate Email addresses
function cleanList() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getRange(4, 1, sheet.getLastRow()).getValues();
  var newData = new Array();
  for(i in data){
    var row = data[i];
    var duplicate = false;
    for(j in newData){
      if(row[0] == newData[j][0]){
        duplicate = true;
      }
    }
    if(!duplicate){
      newData.push(row);
    }
  }

  // Put the unique email addresses in the Google sheet
  sheet.getRange(4, 2, newData.length, newData[0].length).setValues(newData);
}



// ****************** Another Sample ****************

function myFunction() {

  var ss = SpreadsheetApp.getActiveSheet();

  var label = GmailApp.getUserLabelByName("MyLabel");
  var threads = label.getThreads();

  for (var i=0; i<threads.length; i++)
  {
    var messages = threads[i].getMessages();

    for (var j=0; j<messages.length; j++)
    {
      var msg = messages[j].getBody();
      var sub = messages[j].getSubject();
      var dat = messages[j].getDate();

      ss.appendRow([msg, sub, dat])
    }
      threads[i].removeLabel(label);
  }
}
