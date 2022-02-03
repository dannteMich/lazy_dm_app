import React from "react";

import {Button} from 'antd'
import { MinusCircleOutlined } from '@ant-design/icons';

export default function MinusButtton({
    onClick, disabled=false, 
    ...buttonProps
}) {
    return <Button
        type="text" tabIndex="-1"
        icon={<MinusCircleOutlined />}
        onClick={onClick}
        disabled={disabled}
        {...buttonProps}
    />
}