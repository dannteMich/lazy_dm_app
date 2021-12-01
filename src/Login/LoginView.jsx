import React, { useState } from 'react'
import {Button, Input, Typography, Form} from 'antd'

import {useAuth} from '../contexts/AuthContext'
import {useNavigate} from 'react-router-dom'

const {Title} = Typography



function LoginView() {
    const [loading, setLoading] = useState(false)
    const {loginWithEmailAndPassword} = useAuth()
    const navigate = useNavigate()
    
    const finish = values => {
        const {email, password} = values
        setLoading(true)
        loginWithEmailAndPassword(email, password)
            .then(() => navigate("/"))
    }

    return <div style={{maxWidth: "500px", margin: "20px auto"}}>
        <Title>Login</Title>
        <Form onFinish={finish}>
            <Form.Item label="Email" name="email" rules={[{required: true}]}>
                <Input />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{required: true}]}>
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" disabled={loading}>Submit</Button>
            </Form.Item>

        </Form>
        
    </div>
    
}

export default LoginView