import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Typography, Button, Row, Col } from 'antd'
import { truncate } from 'lodash'

const {Paragraph, Text} = Typography

export default function UpdateOrEmpty({value, updateValue, label, emptyLabel, createLabel}) {
    const [editMode, setEditMode] = useState(false)
    
    const startEditing = () => setEditMode(true)
    const updateAndStopEditing = v => {
        setEditMode(false); 
        updateValue(v)
    }
    
    let inner = null
    if (value != null && value !== '') {
        inner = <Paragraph editable={{onChange: updateValue}} >
            {value}
        </Paragraph>
    } else { // TODO: this should be in a component of it's own
        const empty = editMode ? 
            <Text editable={{editing: editMode, onChange: updateAndStopEditing}}/>
            : <Button size="small" onClick={startEditing}>{createLabel}</Button>
        inner = <div>
            <Text style={{margin: "0 5px"}}>{emptyLabel}</Text>
            {empty}
            
        </div>
    }

    return <Row>
        <Col flex="0" style={{margin: "0 5px"}}>{label}: </Col>
        <Col flex="1">
            {inner}
        </Col>  
    </Row>
    
}
UpdateOrEmpty.propTypes = {
    value: PropTypes.string,
    updateValue: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    emptyLabel: PropTypes.string.isRequired,
    createLabel: PropTypes.string.isRequired,
}