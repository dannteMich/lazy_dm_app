import React from 'react';

import CluesView from './CluesView';

import { clues_data_sample } from '../test_data_samples';

export default {
  title: 'Sessions/Special views/CluesView',
  component: CluesView,
  args: {},
}

// TODO: this is not working
const Template = (args) => <CluesView {...args} />;

export const Story = Template.bind({});
Story.args = {
    clues: clues_data_sample
};
