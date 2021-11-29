import React, {useState} from 'react'
import {Button, Input, Typography, Form} from 'antd'
import firebaseApp from '../firebase/firebaseConfig'
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import _ from 'lodash'

const {Title} = Typography



function LoginView() {
    const [user, setUser] = useState()
    const auth = getAuth()
    
    onAuthStateChanged(auth, newUser => setUser(newUser))
    
    const finish = values => {
        const {email, password} = values
        createUserWithEmailAndPassword(auth, email, password)
            .then(cred => console.log(cred))
            .catch(err => console.log(err))
    }

    if (user) return <div>
        <Button onClick={() => signOut(auth)}>
            SignOut
        </Button>
    </div>

    return <div>
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