import React from "react";
import PropTypes from 'prop-types'
import { Spin } from 'antd'

export function LoadingSpinner({ style = {} }) {
    return <div style={{ width: "100%", textAlign: "center", margin: "100px 0", ...style }}>
        <Spin size="large" />
    </div>
}
LoadingSpinner.propTypes = {
    style: PropTypes.object
}