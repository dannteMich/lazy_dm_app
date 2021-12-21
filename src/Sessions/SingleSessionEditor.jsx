import React, { useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { doc, onSnapshot, updateDoc } from "@firebase/firestore";

import { useParams } from "react-router";
import { DateTime } from "luxon";
import { Col, Collapse, Row, Typography } from "antd";

import { db } from "../firebase/firebase";
import { useAuth } from "../contexts/AuthContext";
import Session from "./session";
import { LoadingSpinner } from "../common/Loading";
import UpdateDate from '../common/UpdateDate'
import UpdateOrEmpty from "../common/UpdateOrEmpty";
import NameDescriptionEditor from "../common/NameDescriptionEditor";

const { Title } = Typography

export function SingleSessionComponent({ session, updateSession }) {
    const { date, name, description, npcs } = session

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
                תאריך:
                <UpdateDate currentDate={date} updateDate={d => updateSession({date: d.toJSDate()})} />
            </Col>
        </Row>
        <Row gutter={16}>
            <Col flex="0">שם:</Col>
            <Col flex="1">
                <UpdateOrEmpty 
                    value={name}
                    updateValue={name => updateSession({name})}
                    createLabel="צור שם"
                    emptyLabel="כרגע אין שם"
                />
            </Col>
        </Row>
        <Row gutter={16}>
            <Col flex="0">תיאור:</Col>
            <Col flex="1">
                <UpdateOrEmpty 
                    value={description} 
                    updateValue={d => updateSession({description: d})}
                    createLabel="צור תיאור"
                    emptyLabel="כרגע אין תיאור"
                />
            </Col>
        </Row>
        <Row style={{margin: "20px 0"}}>
            <Col span={24}>
                <Collapse ghost>
                    <Collapse.Panel header="דמויות">
                        <NameDescriptionEditor 
                            initialData={npcs} onDataUpdate={npcs => updateSession({npcs})}
                            placeHolders={["שם לדמות", "תיאור לדמות"]}
                        />
                    </Collapse.Panel>
                </Collapse>
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

    const getSessionRef = useCallback(() => doc(db,
        'accounts', currentUser.uid,
        'campaigns', campaignId,
        'sessions', sessionId
    ).withConverter(Session.firestoreConvertor),
    [currentUser, campaignId, sessionId]
    )

    useEffect(() => {
        return onSnapshot(getSessionRef(),
        doc => {
            setSession(doc.data())
        },
        e => setError(e))
    }, [getSessionRef])
    

    if (error) return JSON.stringify(error)
    if (!session) return <LoadingSpinner label="טוען" />

    return <div style={{padding: "15px"}}>
        <SingleSessionComponent session={session} updateSession={d => updateDoc(getSessionRef(), d)} />
    </div>

}