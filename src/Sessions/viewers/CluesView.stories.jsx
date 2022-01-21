import React from 'react';

import CluesView from './CluesView';

export default {
  title: 'Sessions/Special views/CluesView',
  component: CluesView,
  args: {},
}

// TODO: this is not working
const Template = (args) => <CluesView {...args} />;

export const Story = Template.bind({});
Story.args = {
    clues: [
        {
            category: "דוגמא",
            items: ["שם", "שם אחר"],
            used: ["נמסר"]
        }, {
            category: "דוגמא אחרת",
            items: ["שם", "שם אחר"]
        }
    ]
};
