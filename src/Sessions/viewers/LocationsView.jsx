import React from "react";
import PropTypes from 'prop-types'

import {Typography, Collapse} from 'antd'
import _ from 'lodash'

import { SECTION_COLORS } from "../../common/consts";
import { DESCRIPTION_STYLE } from "../SessionViewer";
import "./LocationsView.css"

const {Title} = Typography

const LENGTH_OF_DEFAULT_OPEN = 120

export default function LocationsView({locations}) {
    const open_keys = 
        locations.filter(l =>  _.size(l.description) < LENGTH_OF_DEFAULT_OPEN && !_.isEmpty(l.description))
        .map(l => l.name)
    
    return <div style={{ ...DESCRIPTION_STYLE, backgroundColor: SECTION_COLORS.locations }} className="locations-view">
        <Title level={4}>מקומות</Title>
        <Collapse ghost defaultActiveKey={open_keys}>
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