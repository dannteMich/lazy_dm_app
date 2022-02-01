import React from 'react';

import UpdateOrEmpty from './UpdateOrEmpty';

export default {
  title: 'Common/Inputs/UpdateOrEmpty',
  component: UpdateOrEmpty,
  args: {},
  argTypes: {
      updateValue: {action: "new value"}
  }
}

const Template = (args) => <UpdateOrEmpty {...args} />;

export const WithString = Template.bind({});
WithString.args = {
    label: "תיאור",
    value: "בעל ערך כלשהו",
    emptyLabel: "כרגע אין תיאור",
    createLabel: "הוסף תיאור",
};

export const WithNull = Template.bind({});
WithNull.args = {
    label: "תיאור",
    value: null,
    emptyLabel: "כרגע אין תיאור",
    createLabel: "הוסף תיאור",
};

export const AutoSizeBool = Template.bind({});
AutoSizeBool.args = {
    label: "תיאור",
    value: "ערך כלשהו",
    emptyLabel: "כרגע אין תיאור",
    createLabel: "הוסף תיאור",
    autoSize: false
};

export const AutoSizeObj = Template.bind({});
AutoSizeObj.args = {
    label: "תיאור",
    value: "ערך כלשהו",
    emptyLabel: "כרגע אין תיאור",
    createLabel: "הוסף תיאור",
    autoSize: {
        minRows: 2,
        maxRows: 10,
    }
};