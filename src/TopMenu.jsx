import React from "react";
import {Menu} from 'antd'

function TopMenu() {
    return <div>
        <Menu mode="horizontal" theme="dark">
            <Menu.Item key="main">
                Main
            </Menu.Item>
            <Menu.Item style={{marginLeft: "auto"}} key="user">
                Login options
            </Menu.Item>
        </Menu>
        
    </div>
}


export default TopMenu;