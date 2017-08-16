from facebookads.objects import AdSet, TargetingSpecsField

adset = AdSet(parent_id='act_1984907604868919') #Insert account number here
adset.update({
    AdSet.Field.name: 'My Ad Set',
    AdSet.Field.campaign_group_id: 23842606518230195, #Insert Campaign id number here
    AdSet.Field.daily_budget: 1000,
    AdSet.Field.billing_event: AdSet.BillingEvent.impressions,
    AdSet.Field.optimization_goal: AdSet.OptimizationGoal.offsite_conversion,
    AdSet.Field.bid_amount: 2,
    AdSet.Field.status: paused,
    AdSet.Field.targeting: {
        TargetingSpecsField.geo_locations: {
            'countries': ['US'],
        },
    },
    AdSet.Field.status: AdSet.Status.paused,
})

adset.remote_create()
print(adset)
