import { DateTime } from 'luxon';
import React from 'react';

import Session from './session';
import SessionEditor from './SessionEditor';


export default {
  title: 'Sessions/SessionEditor',
  component: SessionEditor,
  args: {},
  argTypes: {
    deleteSession: {action: "delete session"}
  }
}

const Template = (args) => {
  const {date, deleteSession, updateSession, ...rest} = args
  const session = new Session(date, rest)
  return <SessionEditor {...{session, updateSession, deleteSession}} />
};

export const Basic = Template.bind({});
Basic.args = {
    name: "שם של מפגש",
    date: DateTime.now(),
    description: "תיאור של מפגש",
};
