import React from "react";
import PropTypes from 'prop-types'
import { Spin, Typography } from 'antd'

export function LoadingSpinner({ label, style = {}, aboveNode = null, bellowNode = null }) {
    const labelnode = label && label !== '' && <Typography.Title level={3} style={{ margin: '30px' }}>
        {label}
    </Typography.Title>

    return <div style={{ width: "100%", textAlign: "center", margin: "90px 0", ...style }}>
        <div style={{width: "100%"}}>
            {aboveNode}
        </div>
        <div style={{width: "100%"}}>
            {labelnode}
        </div>
        <div style={{width: "100%"}}>
            <Spin size="large"  style={{margin: "15px"}}/>
        </div>
        <div style={{width: "100%"}}>
            {bellowNode}
        </div>
    </div>
}
LoadingSpinner.propTypes = {
    label: PropTypes.string,
    style: PropTypes.object,
    aboveNode: PropTypes.node,
    bellowNode: PropTypes.node,
}