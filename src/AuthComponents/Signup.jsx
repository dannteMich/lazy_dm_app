import React, { useState } from 'react'
import {Button, Input, Typography, Form} from 'antd'
import {useNavigate, Link} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'

const {Title, Paragraph, Text} = Typography


function SignupView() {
    const {signup} = useAuth()
    const navigate = useNavigate()
    const [problems, setProblems] = useState()

    const finish = values => {
        const {email, password, password_confirm} = values
        if (password !== password_confirm) {
            setProblems("Passwords are not identical")
            return
        }
        setProblems(null)
        signup(email, password)
            .then(() => navigate("/"))
            .catch(err => alert(JSON.stringify(err)))
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

            <Form.Item label="Confirm password" name="password_confirm" rules={[{required: true}]}>
                <Input.Password />
            </Form.Item>
            {problems && <Text type="danger">{problems}</Text>}


            <Paragraph>
                Already have an account? <Link to="/login">Login</Link>
            </Paragraph>

            <Form.Item>
                <Button htmlType="submit">Submit</Button>
            </Form.Item>

        </Form>
        
    </div>
    
}

export default SignupView