import React, {useState, useEffect, useCallback} from "react";
import PropTypes from 'prop-types'

import { useParams } from "react-router";
import { onSnapshot, doc } from "firebase/firestore";
import { DateTime } from "luxon";

import { Descriptions, Row, Col, Space } from 'antd'

import { db } from "../firebase/firebase";
import Session from "./session";
import { useAuth } from "../contexts/AuthContext";
import { LoadingSpinner } from "../common/Loading";
import { SECTION_COLORS } from "../common/consts";
import { Link } from "react-router-dom";

const DESCRIPTION_STYLE = {padding: "2px 10px", borderRadius: "10px"}


export function SessionPairDescription({title, data, style={}}) {
    return <Descriptions title={title} layout="horizontal" column={1} style={{...DESCRIPTION_STYLE, ...style}}>
    {data.map(({name, description}) => <Descriptions.Item key={name} label={<b>{name}</b>}>
        {description}
    </Descriptions.Item>)}
</Descriptions>
}
SessionPairDescription.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    style: PropTypes.object,
    title: PropTypes.node.isRequired
}

export function SessionViewerComponent({session}) {
    return <Space direction="vertical" size={"middle"}>
        <Row>
            <Col span={24}>
            Session Viewer Component {session.date.toLocaleString(DateTime.DATE_SHORT)}
            <Link to="./..">עריכה</Link>
            </Col>
        </Row>
        
        <Row gutter={16}>
            <Col span={12}>
                <SessionPairDescription 
                    title="דמויות" data={session.npcs} 
                    style={{backgroundColor: SECTION_COLORS.npcs}}
                />
            </Col>
            <Col span={12}>
                <SessionPairDescription 
                    title="מקומות" data={session.locations} 
                    style={{backgroundColor: SECTION_COLORS.locations}}
                />
            </Col>
        </Row>

        <Row gutter={16}>
            <Col span={12}>
                <SessionPairDescription 
                    title="סצנות" data={session.scenes} 
                    style={{backgroundColor: SECTION_COLORS.scenes}}
                />
            </Col>
            <Col span={12}>
                <SessionPairDescription 
                    title="Encounters" data={session.encounters} 
                    style={{backgroundColor: SECTION_COLORS.encounters}}
                />
            </Col>
        </Row>
        
    </Space>
}
SessionViewerComponent.propTypes = {
    session: PropTypes.instanceOf(Session)
}

export default function SessionViewer() {
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
        <SessionViewerComponent session={session}/>
    </div>
}