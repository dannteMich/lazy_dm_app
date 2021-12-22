import React from 'react';

import CategorizedListEditor from './CategorizedListEditor';

export default {
  title: 'Common/CategorizedListEditor',
  component: CategorizedListEditor,
  args: {},
  argTypes: {},
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
