import React from 'react';

import NamesEditor from './NamesEditor';

export default {
  title: 'Sessions/Editors/NamesEditor',
  component: NamesEditor,
  argTypes: {
    saveNames: {action: "new names"}
  },
}

const names = [
    {
        category: "גברים",
        items: ["מיכאל", "רומי"]
    },{
        category: "נשים",
        items: ["דני"]
    },
]

const Template = (args) => <NamesEditor {...args} />;

export const Story = Template.bind({});
Story.args = {
    names,
};
