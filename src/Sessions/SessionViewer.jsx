import React, {useState, useEffect, useCallback} from "react";
import PropTypes from 'prop-types'

import { useParams } from "react-router";
import { onSnapshot, doc } from "firebase/firestore";
import { DateTime } from "luxon";

import {  } from 'antd'

import { db } from "../firebase/firebase";
import Session from "./session";
import { useAuth } from "../contexts/AuthContext";
import { LoadingSpinner } from "../common/Loading";


export function SessionViewerComponent({session}) {
    return <>
        Session Viewer Component
        {session.date.toLocaleString(DateTime.DATE_SHORT)}
    </>
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