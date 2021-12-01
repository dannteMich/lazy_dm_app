import React from "react";
import {Menu} from 'antd'
import { useAuth } from "./contexts/AuthContext";
import {Link, useNavigate} from 'react-router-dom'

function UserItem() {
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()

    if (!currentUser) {
        return <span onClick={() => navigate("/login")}>
            Login
        </span>
    }
    
    const onLogout = () => logout().then(() => navigate("/"))
    return <span onClick={onLogout}>
        Logout
    </span>
}

function TopMenu() {
    const navigate = useNavigate()
    return <div>
        <Menu mode="horizontal" theme="dark">
            <Menu.Item key="main" onClick={() => navigate("/")}>
                Main
            </Menu.Item>
            <Menu.Item style={{marginLeft: "auto"}} key="user">
                <UserItem />
            </Menu.Item>
        </Menu>
        
    </div>
}


export default TopMenu;