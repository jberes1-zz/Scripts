/*This is an automated email to send to users who have a free trial, and have been active,
but are about to lose their free access. It runs off of data input into a Google Sheet which
can be found here: https://docs.google.com/a/medicuja.com/spreadsheets/d/1EbyWeat-jEvNlhZSE1sTuxOymyIrlr04i5sMXWhN2HM/edit?usp=sharing*/

//send 2 days after expiration
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
      var subject = "Hello from AMBOSS!"; //Enter your subject line for the email here
      var salutation = "Hey " + name + ",";
      var intro_text = "We hope you have been enjoying your access to AMBOSS!";
      var body1 = "We just wanted to let you know that your one month subscription is about to end. Which means you'll lose access to all of our great content to help you prepare for your exams, which includes:";
      var list1 = "- Access to our extensive clinical knowledge library, with new high-yield content added daily" + "\n" + "- Access to our challenging Qbank";
      var list2 = "- In-depth images, videos and charts to analyze all clinical concepts" + "\n" + "- X-rays, CT scans and MRIs with overlays for instant review and high impact learning";
      var list3 = "- Online and offline access via iOS and Android OS devices" + "\n" + "- Personalized study analytics to pinpoint knowledge gaps" + "\n" + "- And much more!";
      var body2 = "We'd love for you to continue exploring all the benefits AMBOSS has to offer. So head over to our shop to check out the various packages we have to offer:";
      var body3 = "If you have any questions or feedback, please write to us at hello@amboss.com. We're just a click away." + "\n\n" + "All the best,";
      var link = "http://go.amboss.com/learn-more"
      var unsub = "If you'd like to unsubscribe, please email us: support@amboss.com"
      var signature = "Your AMBOSS Team" + "\n\n" + "Medical Knowledge Distilled" + "\n\n" + "AMBOSS" + "\n" + "Tel: +49 176 66792720 | Email: hello@amboss.com" + "\n" + "Δ AMBOSS  |  www.amboss.com";
      var message = salutation + "\n\n" + intro_text + "\n\n" + body1 + "\n\n" + list1 + "\n" + list2 + "\n" + list3 + "\n\n" + body2 + "\n\n" + link + "\n\n" + body3 + "\n\n" + signature + "\n\n" + unsub;
      MailApp.sendEmail(emailAddress, subject, message);
      })(i);
   }
}
