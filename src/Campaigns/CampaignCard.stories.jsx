import React from "react";
import CampaignCard from "./CampaignCard";


export default {
    title: 'Campaigns/CampaignCard',
    component: CampaignCard,
}

const Template = (args) => <CampaignCard {...args} />

export const Basic = Template.bind({})
Basic.args = {
    name: "משחק כלשהו",
    description: "פה זה התיאור"
}