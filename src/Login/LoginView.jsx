import React from 'react'
import {Button, Input, Typography, Form} from 'antd'


import {useAuth} from '../contexts/AuthContext'

const {Title} = Typography



function LoginView() {
    
    const {loginWithEmailAndPassword} = useAuth()
    
    
    const finish = values => {
        const {email, password} = values
        loginWithEmailAndPassword(email, password)
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
                <Button htmlType="submit">Submit</Button>
            </Form.Item>

        </Form>
        
    </div>
    
}

export default LoginView