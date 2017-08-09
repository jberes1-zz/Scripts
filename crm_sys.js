// Adapted from https://gist.github.com/Ferrari/9678772
function processInboxToSheet() {

  // Have to get data separate to avoid google app script limit!

  var start = 0;
  var label = GmailApp.getUserLabelByName("Test");
  var threads = label.getThreads();

  var sheet = SpreadsheetApp.getActiveSheet();
  var result = [];



  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();

    var content = messages[0].getPlainBody();

    // implement your own parsing rule inside
    if (content) {
      var tmp;
      tmp = content.match(/Name and Surname:\n([A-Za-z0-9\s]+)(\r?\n)/);
      var username = (tmp && tmp[1]) ? tmp[1].trim() : 'No username';

      tmp = content.match(/Phone Number:\n([\s\S]+)/);
      var phone = (tmp && tmp[1]) ? tmp[1] : 'No phone';

      tmp = content.match(/Email Address:\n([A-Za-z0-9@.]+)/);
      var email = (tmp && tmp[1]) ? tmp[1].trim() : 'No email';

      tmp = content.match(/Prefered contact office:\n([\s\S]+)/);
      var comment = (tmp && tmp[1]) ? tmp[1] : 'No office';



      sheet.appendRow([username, phone, email, comment]);

      Utilities.sleep(500);
    }
  }
};
