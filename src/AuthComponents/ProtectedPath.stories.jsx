import React from "react";
import 'antd/dist/antd.css'

import {NotAllowdNotice} from './ProtectedPath'

export default {
    title: 'NotAllowedPath',
    component: NotAllowdNotice,
}

const Template = (args) => <NotAllowdNotice {...args} />;

export const Basic = Template.bind({})
Basic.args = {
    loginPath: "."
}