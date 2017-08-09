/*This is an automated email to send to users who have a free trial, and have been active,
but are about to lose their free access. It runs off of data input into a Google Sheet which
can be found here: https://docs.google.com/a/medicuja.com/spreadsheets/d/1EbyWeat-jEvNlhZSE1sTuxOymyIrlr04i5sMXWhN2HM/edit?usp=sharing*/


function sendEmail() {
  var spreadSheet = SpreadsheetApp.getActiveSheet();
  var dataRange = spreadSheet.getDataRange();
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 1; i < data.length; i++) {
    (function(val) {
      var row = data[i];
      var emailAddress = row[1]; //Data from the first cell
      var name = row[0]; // Data from the second cell
      var subject = "We are looking for an AMBOSSador at your school :-)!"; //Enter your subject line for the email here
      var salutation = "Hey " + name + ",";
      // var intro_text = "We hope this email finds you well.";
      var body1 = "We wanted to say THANK YOU for being so engaged with AMBOSS! It really ";
      var body2 = "We are looking forward to hearing back from you." + "\n\n" + "All the best,";
      var link = "friends@amboss.com";
      var unsub = "If you'd like to unsubscribe, please email us: support@amboss.com"
      var signature = "- Your AMBOSS Team" + "\n\n" + "Medical Knowledge Distilled" + "\n\n" + "AMBOSS" + "\n" + "Tel: +49 176 66792720 | Email: friends@amboss.com" + "\n" + "Δ AMBOSS  |  www.amboss.com";
      var message = salutation + "\n\n" + intro_text + "\n\n" + body1 + "\n\n" + body2 + "\n\n" + signature + "\n\n" + unsub;
      MailApp.sendEmail(emailAddress, subject, message);
      })(i);
   }
}
