import React, {useState} from "react";
import PropTypes from 'prop-types'
import { doc, getDoc, onSnapshot } from "@firebase/firestore";

import { useParams } from "react-router";
import { DateTime } from "luxon";
import { Col, Row, Typography } from "antd";

import { db } from "../firebase/firebase";
import { useAuth } from "../contexts/AuthContext";
import Session from "./session";
import { LoadingSpinner } from "../common/Loading";

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
    
    return <SingleSessionComponent {...session} />

}