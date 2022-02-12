import React from "react";
import PropTypes from 'prop-types'

import {Typography, Collapse} from 'antd'

import { SECTION_COLORS } from "../../common/consts";
import { DESCRIPTION_STYLE } from "../SessionViewer";

const {Title} = Typography

// TODO: play with the style of the collapse to make it more compact
export default function LocationsView({locations}) {
    const all_keys = locations.map(l => l.name)
    
    return <div style={{ ...DESCRIPTION_STYLE, backgroundColor: SECTION_COLORS.locations }}>
        <Title level={4}>מקומות</Title>
        <Collapse ghost defaultActiveKey={all_keys}>
            {locations.map(({name, description}) => {
                return <Collapse.Panel key={name} header={<b>{name}</b>} >
                    {description}
                </Collapse.Panel>;
            })}
        </Collapse>
    </div>
}
LocationsView.propTypes = {
    locations: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        mediaUrl: PropTypes.string,
    }))
}