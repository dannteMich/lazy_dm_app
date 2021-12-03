import React from "react";
import PropTypes from 'prop-types'

export function NotAllowdNotice({loginPath}) {
    return <div>Not Allowed Notice {loginPath}</div>
}
NotAllowdNotice.propTypes = {
    loginPath: PropTypes.string.isRequired
}

export default function ProtctedPath({children}) {
    return <div>
        {children}
    </div>
}