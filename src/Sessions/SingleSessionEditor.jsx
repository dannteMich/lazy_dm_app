import React, {useState} from "react";
import PropTypes from 'prop-types'
import { doc, onSnapshot } from "@firebase/firestore";

import { useParams } from "react-router";
import { DateTime } from "luxon";
import { Col, Row, Typography } from "antd";

import { db } from "../firebase/firebase";
import { useAuth } from "../contexts/AuthContext";
import Session from "./session";
import { LoadingSpinner } from "../common/Loading";

const {Title, Paragraph, Text} = Typography

export function SingleSessionComponent({session, updateSession=() => {}}) {
    const {date, name, description} = session

    const date_in_format = date.toLocaleString(DateTime.DATE_SHORT)
    let header_string = `מפגש ב-${date_in_format}`
    if (name) {
        header_string += `: ${name}`
    }
    
    return <div>
        <Row>
            <Col>
                <Title level={2}>{header_string}</Title>
            </Col>
        </Row>
        <Row>
            <Col>
                תאריך: {date_in_format}
                <br/>
                שם: {name || "אין"}
            </Col>
        </Row>
        <Row>
            <Col>
                <Paragraph editable={{onChange: v => alert(v), autoSize: true}}>
                    {description}
                </Paragraph>
            </Col>
        </Row>
    </div>
}
SingleSessionComponent.propTypes = {
    session: PropTypes.instanceOf(Session).isRequired,
    updateSession: PropTypes.func
}

export default function SingleSessionEditor() {
    const { currentUser } = useAuth()
    const { campaignId, sessionId } = useParams()
    const [session, setSession] = useState()
    const [error, setError] = useState()

    const sessionRef = doc(db, 
        'accounts', currentUser.uid, 
        'campaigns', campaignId,
        'sessions', sessionId
    ).withConverter(Session.firestoreConvertor)
    
    onSnapshot(sessionRef, 
        doc => setSession(doc.data()), 
        e => setError(e))

    if (error) return JSON.stringify(error)
    if (!session) return <LoadingSpinner label="טוען"/>
    
    return <SingleSessionComponent session={session} />

}