import React from 'react';

import MediaGrid from './MediaGrid';

export default {
  title: 'Common/displays/MediaGrid',
  component: MediaGrid,
  argTypess: {},
}

const mediaDataOnlyLinks = [
    "https://a.storyblok.com/f/89243/1050x700/b9aaad5c52/photo-1591035897819-f4bdf739f446.webp",
    "https://i.pinimg.com/originals/d9/09/2a/d9092aad1c111a94f7b38927f6390dbd.jpg",
    "https://i.pinimg.com/originals/09/64/f8/0964f80933ced9c730f64d9ba0fb6380.jpg",
    "https://i0.wp.com/dmdavid.com/wp-content/uploads/2012/11/PZO3010SampleCard3.jpg",
]

const mediaDataOnlyObjects = [
    {
        url: "https://i0.wp.com/dmdavid.com/wp-content/uploads/2012/11/PZO3010SampleCard3.jpg",
        title: "Some one"
    }
]

const Template = (args) => <MediaGrid {...args} />;

export const inputOnlyLinks = Template.bind({});
inputOnlyLinks.args = {
    media: mediaDataOnlyLinks
};

export const inputOnlyObjects = Template.bind({});
inputOnlyObjects.args = {
    media: mediaDataOnlyObjects
};

export const inputCombined = Template.bind({});
inputCombined.args = {
    media: mediaDataOnlyObjects.concat(mediaDataOnlyLinks)
};
