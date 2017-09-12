/*An email to send via email the trial code generated. Sheet 1 where the sheet with the function grabs the data, is tied to a google form which people answer
and input all their information. There are two functions, one to send the email, and the other to "reclassify them" as sent, to make sure duplicated emails
are not sent*/


function sendEmail() {
  var spreadSheet = SpreadsheetApp.getActiveSheet();
  var dataRange = spreadSheet.getDataRange();
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  var startRow = 2;
  for (var i = 1; i < data.length; i++) {
    (function(val) {
      var row = data[i];
      var name = row[0]; // Data from the first column
      var emailAddress = row[1]; //Data from the second column
      var code = row[2]; //Data from the third column
      var status = row[3]; //Data from third column
      var subject = "Your product code has been created"; //Enter your subject line for the email here
      var salutation = "Hey " + "!";
      var intro_text = "Lucky you!";
      var body1 = "The following codes have been created: " + code;
      var body2 = "";
      var signature = "Love & Peace"
      var message = salutation + "\n\n" + intro_text + "\n\n" + body1 + "\n\n" + body2 + "\n\n" + signature;
      //var range = ("
      if (status === "Done") {
          MailApp.sendEmail(emailAddress, subject, message);
           }
      else {
        //do nothing
      }
      })(i);
}
}


function statusTracker() {
  
 var spreadSheet = SpreadsheetApp.getActiveSheet();
  var dataRange = spreadSheet.getDataRange();
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  var startRow = 1;
  for (var i = 1; i < data.length; i++) {
    (function(val) {
      var row = data[i];
      var name = row[0]; // Data from the first column
      var emailAddress = row[1]; //Data from the second column
      var code = row[2]; //Data from the third column
      var status = row[3]; //Data from third column

      if (status === "Done") {
        var newStatus = "Finished"
        spreadSheet.getRange(startRow + i, 4).setValue(newStatus)
        }
      else {
        //do nothing
      }
      })(i);
}
}
