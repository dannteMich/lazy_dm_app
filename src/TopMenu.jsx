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
    const {currentUser} = useAuth()
    const userItems = [
        <Menu.Item key="campaigns">
            <Link to="/campaigns">My Campagins</Link>
        </Menu.Item>
    ]
    // TODO: remove the MAIN button
    return <div>
        <Menu mode="horizontal" theme="dark">
            <Menu.Item key="main" onClick={() => navigate("/")}>
                Main
            </Menu.Item>
            {currentUser && userItems}
            <Menu.Item style={{marginLeft: "auto"}} key="user">
                <UserItem />
            </Menu.Item>
        </Menu>
        
    </div>
}


export default TopMenu;