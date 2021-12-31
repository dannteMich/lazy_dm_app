import React from 'react';

import ListOfActionsButton from './ListOfActionsButton';

export default {
  title: 'Common/ListOfActionsButton',
  component: ListOfActionsButton,
  argTypes: {
      onDataClick: {action: "data chosen"},
      onAllClick: {action: "all chosen"},
      getLabelFromData: { control: false }
  },
}

const Template = (args) => <ListOfActionsButton {...args}>ClickMe</ListOfActionsButton>;

export const WithoutAll = Template.bind({});
WithoutAll.args = {
    data: ["hello", "my", "dear"],
    getLabelFromData: x=>x,
};

export const WithAll = Template.bind({});
WithAll.args = {
    data: ["hello", "my", "dear"],
    getLabelFromData: x=>x,
    allLabel: "Choose all",
};