import React from "react";

import {NotAllowdNotice} from './ProtectedPath'

export default {
    title: 'Common/NotAllowedNotice',
    component: NotAllowdNotice,
}

const Template = (args) => <NotAllowdNotice {...args} />

export const Basic = Template.bind({})
Basic.args = {
    loginPath: ".",
    signupPath: "."
}