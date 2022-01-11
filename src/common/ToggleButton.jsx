import React from "react";
import PropTypes from 'prop-types'

import {Button} from 'antd'
import { useState } from "react";

const DO_NOTHING = () => {}

export default function ToggleButton({
    children, 
    onCheck=DO_NOTHING, onUncheck: onUnCheck=DO_NOTHING,
    ...ButtonProps
}) {
    
    const [isChecked, setIsChecked] = useState(false)
    const toggle = () => {
        if (isChecked) {
            onUnCheck()
            setIsChecked(false)
        } else {
            onCheck()
            setIsChecked(true)
        }
    }

    const buttonProps = {
        type: isChecked ? 'dashed' : 'primary',
        ...ButtonProps
    }

    const allStyle = {
        borderRadius: "10px"
    }

    const unCheckedStyle = {
        ...allStyle,
        fontWeight: "bolder"
    }
    const checkedStyle = {
        ...allStyle,
        color: "grey"
    }

    return <Button onClick={toggle} {...buttonProps} 
                style={isChecked ? checkedStyle : unCheckedStyle}>
        {children}
    </Button>
}
ToggleButton.propTypes = {
    ButtonProps: PropTypes.object,
}