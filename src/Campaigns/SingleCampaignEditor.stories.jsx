import React from "react";

import {SingleCampaignDisplay} from './SingleCampaignEditor'
import {ConfigProvider} from 'antd'

export default {
    title: 'Campaigns/SingleCampaignDisplay',
    component: SingleCampaignDisplay,
    argTypes: {
        onNameUpdate: {action: "name updated"},
        onDescriptionUpdate: {action: "description updated"},
    }
}

const Template = (args) => <ConfigProvider direction="rtl">
        <SingleCampaignDisplay {...args} />
    </ConfigProvider>

export const Basic = Template.bind({})
Basic.args = {
    name: "משחק",
    description: "Just a description",
}