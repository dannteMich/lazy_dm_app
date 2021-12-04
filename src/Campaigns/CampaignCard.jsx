import React from "react";
import PropTypes from 'prop-types'

import { Card } from 'antd';

export default function CampaignCard({ name, description, created }) {
    const extra = created ?
        `${created.getDate()}.${created.getMonth()}.${created.getFullYear()}` : 
        "No creation date"

    return <Card span={{s: 12, l: 4}} title={name} extra={extra} style={{maxWidth: 700, minWidth: 300}}>
        {description}
    </Card>;
}
CampaignCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    created: PropTypes.instanceOf(Date),
    updated: PropTypes.instanceOf(Date),
}
