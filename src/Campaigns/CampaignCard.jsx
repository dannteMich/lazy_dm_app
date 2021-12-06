import React from "react";
import PropTypes from 'prop-types'

import { Card } from 'antd';

export default function CampaignCard({ name, description }) {

    return <Card span={{s: 12, l: 4}} title={name} style={{maxWidth: 700, minWidth: 300}}>
        {description}
    </Card>;
}
CampaignCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
}
