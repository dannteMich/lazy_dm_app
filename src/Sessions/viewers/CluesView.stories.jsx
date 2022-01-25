import React from 'react';

import CluesView from './CluesView';

import { clues_data_sample } from '../test_data_samples';

export default {
  title: 'Sessions/Special views/CluesView',
  component: CluesView,
  argTypes: {
      updateClues: {action: "new clues"}
  },
}

const Template = (args) => <CluesView {...args} />;

export const WithUpdateCallback = Template.bind({});
WithUpdateCallback.args = {
    clues: clues_data_sample
};

export const WitouthUpdateCallback = Template.bind({});
WitouthUpdateCallback.args = {
    clues: clues_data_sample,
    updateClues: null,
};
