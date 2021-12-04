import React from "react";
import {CreateCampaignView} from "./CampaignCreator";



export default {
    title: 'Campaigns/CreateCampaignView',
    component: CreateCampaignView,
    argTypes: {
        handleCreate: {action: "created"}
    }
}

const Template = (args) => <CreateCampaignView {...args} />

export const Basic = Template.bind({})
Basic.args = {
    loading: false
}