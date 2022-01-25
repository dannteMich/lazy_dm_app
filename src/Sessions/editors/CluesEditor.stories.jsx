import React from 'react';

import CluesEditor from './CluesEditor';
import { clues_data_sample } from '../test_data_samples';

export default {
  title: 'Sessions/special Editors/CluesEditor',
  component: CluesEditor,
  argTypess: {
    updateClues: {action: "new clues"}
  },
}


const Template = (args) => <CluesEditor {...args} />;

export const Story = Template.bind({});
Story.args = {
    clues: clues_data_sample
};

