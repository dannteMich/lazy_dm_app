import React from "react";
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Button, Dropdown, Menu } from "antd";

export default function ListOfActionsButton({ 
    children, data, getLabelFromData, onDataClick, 
    allLabel = null,onAllClick = null, 
    ...buttonProps 
}) {
    
    const menuItems = data.map((d, i) => <Menu.Item key={i} onClick={() => onDataClick(d)}>
        {getLabelFromData(d)}
    </Menu.Item>)

    if (!_.isEmpty(allLabel) && onAllClick != null) {
        menuItems.push(
            <Menu.Divider key="devider"/>,
            <Menu.Item key="all" onClick={() => onAllClick(data)}>{allLabel}</Menu.Item>
        )
    }
    
    return <Dropdown overlay={<Menu>{menuItems}</Menu>}>
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