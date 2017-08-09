// This constant is written in column C for rows for which an email
// has been sent successfully.
var EMAIL_SENT = "EMAIL_SENT";
var replyTo = "hello@amboss.com"
function sendEmails2() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 1;  // First row of data to process
  var numRows = 4;   // Number of rows to process
  // Fetch the range of cells A2:B3
  var dataRange = sheet.getRange(startRow, 1, numRows, 4)
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var name = row[0]; //First column
    var emailAddress = row[1];  // Second column
    var link = row[2]; //Third column
    var emailSent = row[3];     // Third column
    if (emailSent != EMAIL_SENT) {  // Prevents sending duplicates
      var subject = "Hello from AMBOSS!";
      var text = "This is Jordan from AMBOSS and I just wanted to let you know that your Free Trial is unfortunately ending tomorrow. Should you want to continue studying for your exams, just click the link below, and for just $5 you can continue to test your medical knowledge!" + "\n\n" +  "Have a great day!";
      var message = "Hey" + name + "\n\n" + text "\n\n" + link;
      MailApp.sendEmail(emailAddress, replyTo, subject, message);
      sheet.getRange(startRow + i, 3).setValue(EMAIL_SENT);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    }
  }
}


function emailImage(){
  var replyTo = "hello@amboss.com"
  var EMAIL_SENT = "EMAIL_SENT";
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var numRows = 20;   // Number of rows to process
  var data = sheet.getRange(startRow, 1, numRows, 20).getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var name = row[0]; // First column
    var emailAddress = row[1];  // Second column
    var image = UrlFetchApp.fetch(row[2]).getBlob();   // Third column
    var emailSent = row[3];     // Fourth column
    if (emailSent != EMAIL_SENT) {  // Prevents sending duplicates
      MailApp.sendEmail(emailAddress, replyTo, subject, message, options);
      sheet.getRange(startRow + i, 3).setValue(EMAIL_SENT);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    }
  }
}

function emailImage(){
  var replyTo = "hello@amboss.com"
  var EMAIL_SENT = "EMAIL_SENT";
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var numRows = 20;   // Number of rows to process
  var data = sheet.getRange(startRow, 1, numRows, 20).getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var name = row[0]; // First column
    var emailAddress = row[1];  // Second column
    var image = row[2];   // Third column
    var emailSent = row[3];     // Fourth column
    if (emailSent != EMAIL_SENT) {  // Prevents sending duplicates
      var subject = "Hello from AMBOSS!";
      var text = "This is Jordan from AMBOSS and I just wanted to let you know that your Free Trial is unfortunately ending tomorrow. Should you want to continue studying for your exams, just click the link below, and for just $5 you can continue to test your medical knowledge!" + "\n\n" + "Have a great day!";
      var message = "Hey" + ""name"" + "\n\n" + text;
      MailApp.sendEmail(emailAddress, replyTo, subject, message, {attachments: [image]});
      sheet.getRange(startRow + i, 3).setValue(EMAIL_SENT);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    }
  }
}

// This code fetches the Google and YouTube logos, inlines them in an email
// and sends the email
function inlineImage() {
  var googleLogoUrl = "http://www.google.com/intl/en_com/images/srpr/logo3w.png";
  var youtubeLogoUrl =
        "https://developers.google.com/youtube/images/YouTube_logo_standard_white.png";
  var googleLogoBlob = UrlFetchApp
                         .fetch(googleLogoUrl)
                         .getBlob()
                         .setName("googleLogoBlob");
  var youtubeLogoBlob = UrlFetchApp
                          .fetch(youtubeLogoUrl)
                          .getBlob()
                          .setName("youtubeLogoBlob");
  MailApp.sendEmail({
    to: "recipient@example.com",
    subject: "Logos",
    htmlBody: "inline Google Logo<img src='cid:googleLogo'> images! <br>" +
              "inline YouTube Logo <img src='cid:youtubeLogo'>",
    inlineImages:
      {
        googleLogo: googleLogoBlob,
        youtubeLogo: youtubeLogoBlob
      }
  });
}
