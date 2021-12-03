import React from "react";

import {BrowserRouter as Router} from 'react-router-dom'
import 'antd/dist/antd.css'


import {NotAllowdNotice} from './ProtectedPath'

export default {
    title: 'NotAllowedPath',
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