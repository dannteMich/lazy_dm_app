import React from 'react';

import CharactersEditor from './CharactersEditor';

export default {
  title: 'Sessions/Editors/CharactersEditor',
  component: CharactersEditor,
  args: {},
}

const Template = (args) => <CharactersEditor {...args} />;

export const Story = Template.bind({});
Story.args = {};
