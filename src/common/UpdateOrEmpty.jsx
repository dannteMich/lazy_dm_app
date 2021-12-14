import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Typography, Button } from 'antd'

const {Paragraph, Text} = Typography


function EmptyMode({updateValue, createLabel, emptyLabel}) {
    const [editMode, setEditMode] = useState(false)
    
    const startEditing = () => setEditMode(true)
    const updateAndStopEditing = v => {
        setEditMode(false); 
        updateValue(v)
    }

    if (editMode) {
        return <Text 
            editable={{editing: editMode, onChange: updateAndStopEditing}}
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
}

export default function UpdateOrEmpty({value, updateValue, emptyLabel, createLabel}) {
    
    
    if (value == null || value === '') {
        return <EmptyMode {...{updateValue, createLabel, emptyLabel}}/>   
    }

    return <Paragraph editable={{onChange: updateValue}} >
        {value}
    </Paragraph>
    
    
    
}
UpdateOrEmpty.propTypes = {
    value: PropTypes.string,
    updateValue: PropTypes.func.isRequired,
    emptyLabel: PropTypes.string.isRequired,
    createLabel: PropTypes.string.isRequired,
}