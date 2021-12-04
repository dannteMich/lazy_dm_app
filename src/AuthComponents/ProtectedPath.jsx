import React from "react";
import PropTypes from 'prop-types'

import { Typography } from "antd";
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

const { Paragraph, Title } = Typography

export function NotAllowdNotice({ loginPath, signupPath, style = {} }) {
    const divStyle = {
        maxWidth: 500,
        textAlign: "center",
        border: "gray solid 2px",
        borderRadius: "5px",
        padding: 10,
        ...style
    }

    return <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}></div>
        <div style={divStyle}>
            <Title level={3}>Restricted Access</Title>
            <Paragraph>
                The Page you are trying to access is restricted to registered users only.
            </Paragraph>
            <Paragraph>
                If you already have an account you can <Link to={loginPath}>Login</Link>
                <br />
                If you don't you can always <Link to={signupPath}>Signup</Link>
            </Paragraph>
        </div>
        <div style={{ flex: "1" }}></div>
    </div>

}
NotAllowdNotice.propTypes = {
    loginPath: PropTypes.string.isRequired,
    signupPath: PropTypes.string.isRequired,
    style: PropTypes.object
}

export default function ProtctedPath({ children }) {
    const { currentUser } = useAuth()

    if (!currentUser) {
        return <NotAllowdNotice
            signupPath="/signup"
            loginPath="/login"
            style={{ margin: 15 }}
        />
    }

    return <div>
        {children}
    </div>
}