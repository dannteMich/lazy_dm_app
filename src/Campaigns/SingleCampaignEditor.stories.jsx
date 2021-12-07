import React from "react";

import {SingleCampaignDisplay} from './SingleCampaignEditor'

export default {
    title: 'Campaigns/SingleCampaignDisplay',
    component: SingleCampaignDisplay,
    argTypes: {
        onNameUpdate: {action: "name updated"},
        onDescriptionUpdate: {action: "description updated"},
    }
}

const Template = (args) => <SingleCampaignDisplay {...args} />

export const Basic = Template.bind({})
Basic.args = {
    name: "משחק",
    description: "Just a description",
}