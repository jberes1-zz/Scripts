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
      var subject = "Hello from AMBOSS!"; //Enter your subject line for the email here
      var salutation = "Hey " + name + ",";
      var intro_text = "We hope you have been enjoying your access to AMBOSS!";
      var body1 = "Your access period will be over soon, and now is the best chance to continue all the benefits of our platform, including:";
      var list1 = "- Access to our extensive clinical knowledge library, with new high-yield content added daily" + "\n" + "- Access to our challenging Qbank";
      var list2 = "- In-depth images, videos and charts to analyze all clinical concepts" + "\n" + "- X-rays, CT scans and MRIs with overlays for instant review and high impact learning";
      var list3 = "- Online and offline access via desktop, iOS and Android OS" + "\n" + "- Personalized study analytics to pinpoint knowledge gaps" + "\n" + "- And much more!";
      var body2 = "We'd love for you to continue exploring all the benefits AMBOSS has to offer. Head over to our shop to check out the various packages we have to offer:";
      var body3 = "If you have any questions or feedback, please write to us at hello@amboss.com. We're just a click away.";
      var sign_off = "All the Best,"
      var link = "http://go.amboss.com/email_test";
      var signature = "- Jordan" + "\n\n" + "Customer Support / Outreach Coordinatior" + "\n\n" + "AMBOSS" + "\n" + "Tel: +49 176 66792720 | Email: kcy@amboss.com" + "\n" + "Δ AMBOSS  |  www.amboss.com";
      var message = salutation + "\n\n" + intro_text + "\n\n" + body1 + "\n\n" + list1 + "\n" + list2 + "\n" + list3 + "\n\n" + body2 + "\n\n" + link + "\n\n" + body3 + "\n\n" + sign_off + "\n\n" + signature;
      MailApp.sendEmail(emailAddress, subject, message);
      })(i);
   }
}
