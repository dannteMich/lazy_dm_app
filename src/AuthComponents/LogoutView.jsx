import React from "react";

import {Button, Typography} from 'antd'

import { useAuth } from "../contexts/AuthContext";

const {Paragraph, Title} = Typography

export default function LogoutView() {
    const {logout} = useAuth()
    
    return <div style={{maxWidth: "500px", margin: "20px auto"}}>
        <Title level={5}>
            You seemed to be logged in
        </Title>
        <Paragraph>
            Would you like to LogOut?
        </Paragraph>
        <Button size="large" onClick={logout}>
            SignOut
        </Button>

    </div>
}