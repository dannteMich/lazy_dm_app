import React, { useCallback, useEffect, useState } from "react";

import { doc, onSnapshot, updateDoc, query, orderBy, where, limit, collection, getDocs } from "@firebase/firestore";
import { useParams, Routes, Route } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase/firebase";
import Session from "./session";
import { LoadingSpinner } from "../common/Loading";
import SessionViewer from "./SessionViewer";
import SessionEditor from "./SessionEditor";


export default function SingleSessionContainer() {
    const { currentUser } = useAuth();
    const { campaignId, sessionId } = useParams();

    const [session, setSession] = useState();
    const [prevSession, setPrevSession] = useState();
    const [error, setError] = useState();

    const getSessionRef = useCallback(() => doc(db,
        'accounts', currentUser.email,
        'campaigns', campaignId,
        'sessions', sessionId
    ).withConverter(Session.firestoreConvertor),
        [currentUser, campaignId, sessionId]
    );
    const getAllSessionsRef = useCallback(() => collection(db,
        'accounts', currentUser.email, 'campaigns', campaignId, 'sessions')
        .withConverter(Session.firestoreConvertor),
        [currentUser, campaignId]);

    useEffect(() => {
        return onSnapshot(getSessionRef(),
            doc => {
                const retrieved_session = doc.data();
                const q = query(getAllSessionsRef(), where("date", "<", retrieved_session.date.toJSDate()), orderBy("date", "desc"), limit(1));
                getDocs(q).then(snapshot => !snapshot.empty && setPrevSession(snapshot.docs[0].data()));
                setSession(retrieved_session);
            },
            e => setError(e));
    }, [getSessionRef, getAllSessionsRef]);


    if (error)
        return JSON.stringify(error);
    if (!session)
        return <LoadingSpinner label="טוען" />;

    return <div style={{ padding: "15px" }}>
        <Routes>
            <Route exact path="/" element={<SessionViewer session={session} />} />
            <Route path="/edit" element={<SessionEditor session={session} prevSession={prevSession} updateSession={d => updateDoc(getSessionRef(), d)} />} />
        </Routes>

    </div>;

}
