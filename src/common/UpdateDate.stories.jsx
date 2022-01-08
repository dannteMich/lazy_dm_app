import { DateTime } from 'luxon';
import React from 'react';

import UpdateDate from './UpdateDate';

export default {
  title: 'Common/Inputs/UpdateDate',
  component: UpdateDate,
  args: {},
  argTypes: {
      updateDate: {action: "New Date"}
  }
}

const Template = (args) => <UpdateDate {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    currentDate: DateTime.now()
};
