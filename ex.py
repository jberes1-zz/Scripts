from facebookads.api import FacebookAdsApi
from facebookads import objects

my_app_id = '1940705959532182'
my_app_secret = 'fb78e9567f4d01402e9a7e54fbf646e7'
my_access_token = 'EAAblD9FU1pYBAIamHQPAwd6KcxCOPkXUsd7i3HepQaHUi4ilvYfGSUkFCmtBnm7cWBCzRw4caDnOfG83sGQ4AxdJSt2CLVvZCnqzlRWxxUxTXMucdomdiCQnZCkRKvoMnlkZBCXp1ZAM8AWtqWpLZAfrQ4GTUpXzqLPkG8HZCZAJgZDZD'
FacebookAdsApi.init(my_app_id, my_app_secret, my_access_token)


from facebookads.adobjects.campaign import Campaign

campaign = Campaign(parent_id='act_2052697514756594')
campaign.update({
    Campaign.Field.name: 'My First Campaign',
    Campaign.Field.objective: 'CONVERSIONS',
})

campaign.remote_create(params={
    'status': Campaign.Status.paused,
})
print(campaign)
