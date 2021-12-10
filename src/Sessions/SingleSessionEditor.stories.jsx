import { DateTime } from 'luxon';
import React from 'react';

import Session from './session';
import { SingleSessionComponent } from './SingleSessionEditor';

export default {
  title: 'Sessions/SingleSessionComponent',
  component: SingleSessionComponent,
  args: {},
  argTypes: {}
}

const Template = (args) => {
  const {date, ...rest} = args

  return <SingleSessionComponent session={new Session(date, rest)} />
};

export const Basic = Template.bind({});
Basic.args = {
    name: "שם של מפגש",
    date: DateTime.now(),
    description: "תיאור של מפגש"
};
