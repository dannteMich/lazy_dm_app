import React from "react";
import {CreateCampaignView} from "./CampaignCreator";
import { ConfigProvider } from "antd";



export default {
    title: 'Campaigns/CreateCampaignView',
    component: CreateCampaignView,
    argTypes: {
        handleCreate: {action: "created"}
    }
}

const Template = (args) => <ConfigProvider direction="rtl">
        <CreateCampaignView {...args} />
    </ConfigProvider>

export const Basic = Template.bind({})
Basic.args = {
    loading: false
}