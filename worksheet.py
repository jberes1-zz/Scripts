#import sendgrid
import os
import test_email.xlsx

names = sh.col_values(0, start_rowx=1)
emails = sh.col_values(1, start_rowx=1)

# sg = sendgrid.SendGridAPIClient(apikey=os.environ.get('SENDGRID_API_KEY'))
data = {
  "personalizations": [
    {
      "to": [
        {
          "email": emails
        }
      ],
      "subject": "Hello from AMBOSS!"
    }
  ],
  "from": {
    "email": "Hello@amboss.com"
  },
  "content": [
    {
      "type": "text/plain",
      "value": "Hey" + name + "welcome to amboss blah blah blah"
    }
  ]
}
#response = sg.client.mail.send.post(request_body=data)
#print(response.status_code)
#print(response.body)
#print(response.headers)
print data
