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
      var subject = "New Ads Needed"; //Enter your subject line for the email here
      var salutation = "Hey " + name + ",";
      var intro_text = "I hope this emails finds you well!";
      var body1 = "This is just a friendly reminder that I need some new ads written for Adwords. Just in case you need a little refresher, the guidelines doc can be found here: https://docs.google.com/a/medicuja.com/document/d/1hsD9nunX6VfmF0TDoRzYH8xpulZo3QQdg9YD9PgbuS4/edit?usp=sharing";
      var body2 = "The following links will bring you to the respective sheets: " + "\n\n" + "US: https://docs.google.com/a/medicuja.com/spreadsheets/d/1h5A7dq1O1kPZDDVZ-XRuJ7y060ZKlx72lBcW7mAn79Y/edit?usp=sharing";
      var body3 = "If you could just let me know when you have finished the new ads for me to take a look at, and then I can go ahead and upload them into Adwords, that would be great!" + "\n\n" + "All the best,";
      var link = "friends@amboss.com";
      //var unsub = "If you'd like to unsubscribe, please email us: support@amboss.com"
      var signature = "- Jordan" + "\n\n" + "Medical Knowledge Distilled" + "\n\n" + "AMBOSS" + "\n" + "Tel: +49 151 71233326 | Email: jbs@medicuja.com" + "\n" + "Δ AMBOSS  |  www.amboss.com";
      var message = salutation + "\n\n" + intro_text + "\n\n" + body1 + "\n\n" + body2 + "\n\n" + body3 + "\n\n" + signature; //+ "\n\n" + unsub;
      MailApp.sendEmail(emailAddress, subject, message);
      })(i);
   }
}
