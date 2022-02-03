import React from 'react';

import CategorizedListEditor from './CategorizedListEditor';

export default {
  title: 'Common/ComposedInput/CategorizedListEditor',
  component: CategorizedListEditor,
  args: {},
  argTypes: {
    onDataUpdate: {action: "updated data"}
  },
}

const Template = (args) => <CategorizedListEditor {...args} />;

export const Story = Template.bind({});
Story.args = {
    initialData: [
        {
            category: "היסטוריה",
            items: ["משהו ראשון", "משהו שני"]
        },
        {
            category: "כללי",
            items: ["כלי 32", "כללי 1"]
        }
        
    ]
};
