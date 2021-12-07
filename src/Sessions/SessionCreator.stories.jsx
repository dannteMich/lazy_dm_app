import React from 'react';

import { SessionCreatorForm } from './SessionCreator';

export default {
    title: 'Sessions/SessionCreator',
    component: SessionCreatorForm,
    argTypes: {
        handleCreate: {action: "created"}
    },
    args: {
        loading: false
    }
}



const Template = (args) => <div style={{width: "600px", margin: "auto"}}>
        <SessionCreatorForm {...args} />
    </div>

export const Basic = Template.bind({});


