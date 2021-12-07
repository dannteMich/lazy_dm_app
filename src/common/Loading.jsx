import React from "react";
import PropTypes from 'prop-types'
import { Spin, Typography } from 'antd'

export function LoadingSpinner({ label, style = {}, aboveNode = null, bellowNode = null }) {
    const labelnode = label && label !== '' && <Typography.Title level={3} style={{ margin: '30px' }}>
        {label}
    </Typography.Title>

    return <div style={{ width: "100%", textAlign: "center", margin: "100px 0", ...style }}>
        {aboveNode}
        {labelnode}
        <Spin size="large" />
        {bellowNode}
    </div>
}
LoadingSpinner.propTypes = {
    label: PropTypes.string,
    style: PropTypes.object,
    aboveNode: PropTypes.node,
    BellowNode: PropTypes.node,
}