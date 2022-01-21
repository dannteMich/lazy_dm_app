import { DateTime } from 'luxon';
import React from 'react';

import Session from './session';
import SessionEditor from './SessionEditor';


export default {
  title: 'Sessions/SessionEditor',
  component: SessionEditor,
  args: {},
  argTypes: {}
}

const Template = (args) => {
  const {date, ...rest} = args

  return <SessionEditor session={new Session(date, rest)} />
};

export const Basic = Template.bind({});
Basic.args = {
    name: "שם של מפגש",
    date: DateTime.now(),
    description: "תיאור של מפגש"
};
