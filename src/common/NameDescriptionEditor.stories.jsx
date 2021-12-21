import React from 'react';

import NameDescriptionEditor from './NameDescriptionEditor';

export default {
  title: 'Common/NameDescriptionEditor',
  component: NameDescriptionEditor,
  args: {},
  argTypes: {
    onNpcsUpdate: {action: "new npcs"}
  }
}

const Template = (args) => <div style={{maxWidth: 500}}>
    <NameDescriptionEditor {...args} />
</div>

export const Story = Template.bind({});
Story.args = {
  initialData: [
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
  ],
  labels: ["שדה 1:", "שדה 2:"],
};
