import React from 'react';

import ImageGrid from './ImageGrid';

export default {
  title: 'Common/displays/ImageGrid',
  component: ImageGrid,
  argTypess: {},
}

const mediaDataOnlyLinks = [
    
    "https://i.pinimg.com/originals/d9/09/2a/d9092aad1c111a94f7b38927f6390dbd.jpg",
    "https://i.pinimg.com/originals/09/64/f8/0964f80933ced9c730f64d9ba0fb6380.jpg",
    "https://i0.wp.com/dmdavid.com/wp-content/uploads/2012/11/PZO3010SampleCard3.jpg",
    "https://i.pinimg.com/originals/d9/09/2a/d9092aad1c111a94f7b38927f6390dbd.jpg",
    "https://i.pinimg.com/originals/09/64/f8/0964f80933ced9c730f64d9ba0fb6380.jpg",
    "https://i0.wp.com/dmdavid.com/wp-content/uploads/2012/11/PZO3010SampleCard3.jpg",
    "https://i.pinimg.com/originals/d9/09/2a/d9092aad1c111a94f7b38927f6390dbd.jpg",
    "https://i.pinimg.com/originals/09/64/f8/0964f80933ced9c730f64d9ba0fb6380.jpg",
    "https://i0.wp.com/dmdavid.com/wp-content/uploads/2012/11/PZO3010SampleCard3.jpg",
    "https://i.natgeofe.com/n/b2477923-d490-4214-a739-cf0768ef1633/Zenobia_Main_HEZ-2611381.jpg",
    "https://cdn.britannica.com/w:400,h:300,c:crop/72/40172-004-165571B3/Zenobia-portrait-bust-Rome-Vatican-Museum.jpg",
    
]

const mediaDataOnlyObjects = [
    {
        url: "https://i0.wp.com/dmdavid.com/wp-content/uploads/2012/11/PZO3010SampleCard3.jpg",
        title: "Some one"
    },{
        url: "https://i.pinimg.com/originals/09/64/f8/0964f80933ced9c730f64d9ba0fb6380.jpg",
        title: "Some one else"
    }
]

const cardSize = [180, 200]

const Template = (args) => <ImageGrid {...args} />;

export const inputOnlyLinks = Template.bind({});
inputOnlyLinks.args = {
    media: mediaDataOnlyLinks,
    cardSize
};

export const inputOnlyObjects = Template.bind({});
inputOnlyObjects.args = {
    media: mediaDataOnlyObjects,
    cardSize
};

export const inputCombined = Template.bind({});
inputCombined.args = {
    media: mediaDataOnlyLinks.concat(mediaDataOnlyObjects),
    cardSize
};

export const cardSizeSingleNumber = Template.bind({})
cardSizeSingleNumber.args = {
    media: mediaDataOnlyLinks.concat(mediaDataOnlyObjects),
    cardSize: 150,
}
