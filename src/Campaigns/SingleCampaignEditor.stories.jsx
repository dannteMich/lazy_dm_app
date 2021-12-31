import React from "react";

import {EditCampaignDetials} from './SingleCampaignEditor'

export default {
    title: 'Campaigns/SingleCampaignDisplay',
    component: EditCampaignDetials,
    argTypes: {
        onNameUpdate: {action: "name updated"},
        onDescriptionUpdate: {action: "description updated"},
    }
}

const Template = (args) => <EditCampaignDetials {...args} />

export const Basic = Template.bind({})
Basic.args = {
    name: "משחק",
    description: "Just a description",
}