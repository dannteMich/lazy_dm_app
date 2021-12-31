import React from "react";
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Button, Dropdown, Menu } from "antd";

export default function ListOfActionsButton({ 
    children, data, getLabelFromData, onDataClick, 
    allLabel = null,onAllClick = null, 
    ...buttonProps 
}) {
    
    const menu = <Menu>
        {data.map((d, i) => <Menu.Item key={i} onClick={() => onDataClick(d)}>
            {getLabelFromData(d)}
        </Menu.Item>)}

        {!_.isEmpty(allLabel) && onAllClick != null && <Menu.Item key="all" onClick={() => onAllClick(data)}>
            {allLabel}            
        </Menu.Item>}
    </Menu>
    
    return <Dropdown overlay={menu}>
        <Button {...buttonProps}>
            {children}
        </Button>
    </Dropdown>
}
ListOfActionsButton.propTypes = {
    data: PropTypes.array.isRequired, 
    getLabelFromData: PropTypes.func.isRequired, 
    onDataClick: PropTypes.func.isRequired,
    allLabel: PropTypes.string,
    onAllClick: PropTypes.func
}