import React from "react";
import CampaignCard from "./CampaignCard";
import {ConfigProvider} from 'antd'


export default {
    title: 'Campaigns/CampaignCard',
    component: CampaignCard,
}

const Template = (args) => <ConfigProvider direction="rtl">
    <CampaignCard {...args} />
</ConfigProvider>

export const Basic = Template.bind({})
Basic.args = {
    name: "משחק כלשהו",
    description: "פה זה התיאור"
}