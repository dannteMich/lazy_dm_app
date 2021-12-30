import React, { useState } from 'react'
import {Button, Input, Typography, Form} from 'antd'

import {useAuth} from '../contexts/AuthContext'
import {useNavigate, Link} from 'react-router-dom'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const {Title, Paragraph} = Typography




function LoginView() {
    const [loading, setLoading] = useState(false)
    const {loginWithEmailAndPassword} = useAuth()
    const navigate = useNavigate()
    const auth = getAuth();
    
    function signInWithGoogle() {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // The signed-in user info.
            // const user = result.user;
            navigate("/")
            // ...
        }).catch((error) => {
            // Handle Errors here.
            // const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage)
            // The email of the user's account used.
            // const email = error.email;
            // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
    
    const signInWithEmailAndPassword = values => {
        const {email, password} = values
        setLoading(true)
        loginWithEmailAndPassword(email, password)
            .then(() => navigate("/"))
    }

    return <div style={{maxWidth: "500px", margin: "20px auto"}}>
        <Title>Login</Title>
        <Form onFinish={signInWithEmailAndPassword}>
            <Form.Item label="Email" name="email" rules={[{required: true}]}>
                <Input />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{required: true}]}>
                <Input.Password />
            </Form.Item>

            <Paragraph>
                Don't have an account it? <Link to="/signup">Create an account</Link>
            </Paragraph>

            <Form.Item>
                <Button htmlType="submit" disabled={loading}>Submit</Button>
            </Form.Item>
            
            <Button onClick={signInWithGoogle}>
                התחברות עם GOOGLE
            </Button>

        </Form>
        
    </div>
    
}

export default LoginView