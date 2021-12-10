import React, { useEffect, useState } from "react";
import { getDocs, collection } from "@firebase/firestore";

import {useParams, Link } from 'react-router-dom'

import { LoadingSpinner } from "../common/Loading";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase/firebase";
import Session from "./session";

export default function SessionSelector() {
    const {currentUser} = useAuth()
    const {campaignId} = useParams()
    const [sessions, setSessions] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        getDocs(collection(db, 'accounts', currentUser.uid, 'campaigns', campaignId, 'sessions')
            .withConverter(Session.firestoreConvertor))
        .then(querySnapshot => setSessions(querySnapshot.docs.map(d => d.data())))
        .catch(e => setError(e))
    }, [currentUser, campaignId])
    

    if (error) return JSON.stringify(error)
    if (!sessions) return <LoadingSpinner />
    
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