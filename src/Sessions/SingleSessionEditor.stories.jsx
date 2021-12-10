import { DateTime } from 'luxon';
import React from 'react';

import { SingleSessionComponent } from './SingleSessionEditor';

export default {
  title: 'Sessions/SingleSessionComponent',
  component: SingleSessionComponent,
  args: {},
  argTypes: {}
}

const Template = (args) => <SingleSessionComponent {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    name: "סשן ראשון",
    date: DateTime.now()
};
