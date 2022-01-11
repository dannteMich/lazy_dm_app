import React from "react"
import PropTypes from 'prop-types'

import {Collapse} from 'antd'

const PANEL_MARGIN = "4px 0"

export default function SingleCollapsable({children, ghost=false, defaultActive=true, header=null, style={}}) {
    return <Collapse ghost={ghost} defaultActiveKey={defaultActive ? 0 : null}>
        <Collapse.Panel header={header} style={{margin: PANEL_MARGIN, borderRadius: "4px", ...style}}>
            {children}
        </Collapse.Panel>
    </Collapse>
}
SingleCollapsable.propTypes = {
    ghost: PropTypes.bool,
    defaultActive: PropTypes.bool,
    header: PropTypes.node,
    style: PropTypes.object
}