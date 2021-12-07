import React from "react";

import {BrowserRouter as Router} from 'react-router-dom'


import {NotAllowdNotice} from './ProtectedPath'

export default {
    title: 'Common/NotAllowedNotice',
    component: NotAllowdNotice,
}

const Template = (args) => <Router>
    <NotAllowdNotice {...args} />
    </Router>

export const Basic = Template.bind({})
Basic.args = {
    loginPath: ".",
    signupPath: "."
}