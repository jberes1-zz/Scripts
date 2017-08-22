/*Email to send reminders to colleagues about pending projects*/


function sendEmail() {
  var spreadSheet = SpreadsheetApp.getActiveSheet();
  var dataRange = spreadSheet.getDataRange();
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 1; i < data.length; i++) {
    (function(val) {
      var row = data[i];
      var emailAddress = row[1]; //Data from the second column
      var name = row[0]; // Data from the first column
      var subject = "Email Platform Reminder"; //Enter your subject line for the email here
      var salutation = "Hey " + name + ",";
      var intro_text = "I hope this emails finds you well!";
      var body1 = "I just wanted to send a reminder that I sent you an email about picking a new provider and am still waiting on a response. ";
      var body2 = "As soon as I get a decision from you I will be able to move forward to get everything done, so please answer at your earliest convenience" + "\n\n" + "All the best,";
      var link = "friends@amboss.com";
      var unsub = "If you'd like to unsubscribe, please email us: support@amboss.com"
      var signature = "- Jordan" + "\n\n" + "Medical Knowledge Distilled" + "\n\n" + "AMBOSS" + "\n" + "Tel: +49 151 71233326 | Email: jbs@miamed.de" + "\n" + "Δ AMBOSS  |  www.amboss.com";
      var message = salutation + "\n\n" + intro_text + "\n\n" + body1 + "\n\n" + body2 + "\n\n" + signature + "\n\n" + unsub;
      MailApp.sendEmail(emailAddress, subject, message);
      })(i);
   }
}
