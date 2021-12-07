import React, {useState} from "react";
import PropTypes from 'prop-types'

import { useParams } from "react-router";
import { DateTime } from "luxon";
import { Col, Row, Typography } from "antd";

import { useAuth } from "../contexts/AuthContext";

const {Title, Paragraph} = Typography

export function SingleSessionComponent({name, date, description}) {
    let header_string = date.toLocaleString(DateTime.DATE_SHORT)
    if (name) {
        header_string = name + " - " +header_string
    }
    
    return <div>
        <Row>
            <Col>
                <Title level={2}>{header_string}</Title>
            </Col>
        </Row>
        {description && <Row>
            <Col>
                <Paragraph>
                    {description}
                </Paragraph>
            </Col>
        </Row>}
    </div>
}
SingleSessionComponent.propTypes = {
    date: PropTypes.instanceOf(DateTime),
    name: PropTypes.string,   
    description: PropTypes.string,   
}

// export default function SingleSessionEditor() {
//     const { currentUser } = useAuth()
//     const { campaignId, sessionId } = useParams()
//     const [session, setSession] = useState()
//     const [error, setError] = useState()

//     const sessionRef = doc

// }