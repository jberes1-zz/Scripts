import smtplib

content = "blah blah blah"

mail = smtplib.SMTP('smtp.gmail.com', 587)

mail.ehlo()

mail.starttls()

mail.login('beres.jordan@gmail.com', 'yvxcyubvqnjoxkkr')

mail.sendmail('beres.jordan@gmail.com','jbs@medicuja.com',content)

mail.close()
