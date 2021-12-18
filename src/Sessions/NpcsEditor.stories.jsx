import React from 'react';

import NPCsEditor from './NpcsEditor';

export default {
  title: 'Sessions/Editors/NPCsEditor',
  component: NPCsEditor,
  args: {},
  argTypes: {
    onNpcsUpdate: {action: "new npcs"}
  }
}

const Template = (args) => <div style={{maxWidth: 500}}>
    <NPCsEditor {...args} />
</div>

export const Story = Template.bind({});
Story.args = {
  initialNpcs: [
    {
      name: "שם ראשון",
      description: "תיאור ראשון",
    },
    {
      name: "שם שני",
      description: "תיאור שני",
    },
    {
      name: "שם שלישי",
      description: "תיאור שלישי",
    },
  ]
};
