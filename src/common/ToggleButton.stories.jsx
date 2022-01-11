import React from 'react';

import ToggleButton from './ToggleButton';

export default {
  title: 'Common/inputs/ToggleButton',
  component: ToggleButton,
  args: {},
}

const Template = (args) => <ToggleButton {...args}>
    press me
</ToggleButton>;

export const Story = Template.bind({});
Story.args = {};
