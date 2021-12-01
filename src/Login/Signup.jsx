import React from 'react'
import {Button, Input, Typography, Form} from 'antd'
import {useNavigate} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'

const {Title} = Typography


function SignupView() {
    const {signup} = useAuth()
    const navigate = useNavigate()

    const finish = values => {
        const {email, password} = values
        signup(email, password)
            .then(() => navigate("/"))
    }

    return <div style={{maxWidth: "500px", margin: "20px auto"}}>
        <Title>Sign Up</Title>
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

export default SignupView