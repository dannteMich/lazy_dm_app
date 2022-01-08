import React from 'react';

import ControlledTupleEditor from './ControlledTupleEditor';

export default {
  title: 'common/ComposedInput/ControlledTupleEditor',
  component: ControlledTupleEditor,
  argTypes: {
    onChange: {action: "data updated"}
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

const fields = [
    {
        key: "name",
        label: "שם",
        flexValues: "0",
        maxLength: 100,
        minWidth: 240,
    },
    {
        key: "description",
        placeholder: "תיאור כלשהו",
        allowClear: true,
    }
]

const defaultArgs = {
    allowDeletion: true,
    allowAddition: true,
    addButtonCaption: "הוספת פריט",
    fields,
    data, 
};

const Template = (args) => <ControlledTupleEditor {...args} />;

export const Full = Template.bind({});
Full.args = defaultArgs

export const LittleData = Template.bind({});
LittleData.args = {
    ...defaultArgs,
    data: data.slice(3)
}