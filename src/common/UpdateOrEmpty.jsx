import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Typography, Button } from 'antd'

const {Paragraph, Text} = Typography

const autoSizePropType = PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
        minRows: PropTypes.number,
        maxRows: PropTypes.number,
    })
])


function EmptyMode({updateValue, createLabel, emptyLabel, autoSize}) {
    const [editMode, setEditMode] = useState(false)
    
    const startEditing = () => setEditMode(true)
    const updateAndStopEditing = v => {
        setEditMode(false); 
        updateValue(v)
    }

    if (editMode) {
        return <Text 
            editable={{editing: editMode, onChange: updateAndStopEditing, autoSize}}
            style={{margin: "0 15px"}}
        />
    }
        
    return <div dir="rtl">
        <Text style={{margin: "0 5px"}}>{emptyLabel}</Text>
        <Button size="small" onClick={startEditing}>{createLabel}</Button>
        
    </div>
}
EmptyMode.propTypes = {
    updateValue: PropTypes.func.isRequired,
    emptyLabel: PropTypes.string.isRequired,
    createLabel: PropTypes.string.isRequired,
    autoSize: autoSizePropType,
}

export default function UpdateOrEmpty({value, updateValue, emptyLabel, createLabel, autoSize=true}) {
    
    
    if (value == null || value === '') {
        return <EmptyMode {...{updateValue, createLabel, emptyLabel, autoSize}}/>   
    }

    return <Paragraph editable={{onChange: updateValue, autoSize}} >
        {value}
    </Paragraph>
    
    
    
}
UpdateOrEmpty.propTypes = {
    value: PropTypes.string,
    updateValue: PropTypes.func.isRequired,
    emptyLabel: PropTypes.string.isRequired,
    createLabel: PropTypes.string.isRequired,
    autoSize: autoSizePropType,
}