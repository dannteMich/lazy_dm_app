import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { getDocs, collection } from "@firebase/firestore";

import {useParams, Link } from 'react-router-dom'
import _ from "lodash";
import { Modal, Row, Col, Button } from "antd";

import { LoadingSpinner } from "../common/Loading";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase/firebase";
import Session from "./session";
import SessionCreator from './SessionCreator'

export function SessionList({sessions}) {
    const {campaignId} = useParams()
    return <div>
        {sessions.map(session => {
            return <div key={session.id}>
                <Link to={`/campaigns/${campaignId}/sessions/${session.id}`}>
                    {session.toString()}
                </Link>
            </div>
        })}
    </div>
}
SessionList.propTypes = {
    sessions: PropTypes.arrayOf(PropTypes.instanceOf(Session)).isRequired,
}

export function NoSessionsYet() {
    return <div style={{ margin: "50px" }}>
        <p dir="rtl">עוד לא יצרת אף מפגש.</p>
        <SessionCreator />
    </div>
}

export default function SessionSelector() {
    const {currentUser} = useAuth()
    const {campaignId} = useParams()
    const [sessions, setSessions] = useState()
    const [error, setError] = useState()
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        getDocs(collection(db, 'accounts', currentUser.uid, 'campaigns', campaignId, 'sessions')
            .withConverter(Session.firestoreConvertor))
        .then(querySnapshot => setSessions(querySnapshot.docs.map(d => d.data())))
        .catch(e => setError(e))
    }, [currentUser, campaignId])
    

    if (error) return JSON.stringify(error)
    if (!sessions) return <LoadingSpinner />
    if (_.isEmpty(sessions)) return <NoSessionsYet />

    return <div>
        <Modal visible={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
            <SessionCreator />
        </Modal>

        <Row justify="center">
            <Col>
                <Button type="primary" style={{ margin: "40px" }} size="large" onClick={() => setModalVisible(true)}>
                    צור משחק חדש
                </Button>
            </Col>
        </Row>
        <SessionList sessions={sessions}/>
    </div>
}