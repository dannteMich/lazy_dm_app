import React from 'react';

import CharactersEditor from './CharactersEditor';

export default {
  title: 'Sessions/Editors/CharactersEditor',
  component: CharactersEditor,
  args: {},
}

const Template = (args) => <div style={{maxWidth: 500}}>
    <CharactersEditor {...args} />;
</div>

export const Story = Template.bind({});
Story.args = {};
