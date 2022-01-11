import React from 'react';

import CollapsableElementEditor from './CollapsableElementEditor';

export default {
  title: 'Sessions/CollapsableElementEditor',
  component: CollapsableElementEditor,
  argTypes: {
    style: {control: false},
    onSave: {action: "data to save"}
  },
}

const data = [
    {
        name: "שם ראשון",
        description: "תיאור ראשון",
    },
    {
        name: "שם שני",
        description: "תיאור שני",
    },
    {
        name: "שם שלישי",
        description: "תיאור שלישי",
    },
    {
        name: "שם בלי תיאור"
    },
    {
        description: "תיאור בלי שם"
    }
]

const prevData = [
    {
        name: "שם ישן 1",
        description: "תיאור ישן 1",
    }, {
        name: "שם ישן 2",
        description: "תיאור ישן 2",
    }
]

const Template = (args) => <CollapsableElementEditor {...args} />;

export const Story = Template.bind({});
Story.args = {
    header: "כותרת כלשהי",
    initialData: data,
    presetEntries: prevData
};


