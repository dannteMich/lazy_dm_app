import React, { useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types'

import { doc, onSnapshot, updateDoc, query, orderBy, where, limit, collection, getDocs } from "@firebase/firestore";

// import {  } from "react-router";
import { DateTime } from "luxon";
import { Button, Col, Row, Space, Typography } from "antd";
import { Link, useParams, Routes, Route } from "react-router-dom";

import { db } from "../firebase/firebase";
import { useAuth } from "../contexts/AuthContext";
import Session from "./session";
import { LoadingSpinner } from "../common/Loading";
import UpdateDate from '../common/UpdateDate'
import UpdateOrEmpty from "../common/UpdateOrEmpty";
import CategorizedListEditor from "../common/CategorizedListEditor";
import {SECTION_COLORS} from '../common/consts'
import SingleCollapsable from '../common/SingleCollapsable'
import CollapsableElementEditor from './editors/CollapsableElementEditor'
import NamesEditor from "./editors/NamesEditor";
import { ExtraMediaEditor, LocationsEditor, NpcsEditor, RnadomEncountersEditor } from "./ElementEditors";
import SessionViewer from "./SessionViewer";

const { Title } = Typography

export function SessionInnerPopertiesEditor({session, updateSession}) {
    const {name, date, description} = session
    return <>
        <Row gutter={8}>
            <Col>
                תאריך:
                <UpdateDate currentDate={date} updateDate={d => updateSession({date: d.toJSDate()})} />
            </Col>
        </Row>
        <Row gutter={8}>
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
        <Row gutter={8}>
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
    </>
}
SessionInnerPopertiesEditor.propTypes = {
    session: PropTypes.instanceOf(Session).isRequired,
    updateSession: PropTypes.func.isRequired,
}


export function SingleSessionComponent({ session, updateSession, prevSession }) {
    const { date, name, npcs, locations, scenes, encounters, names, clues, media } = session

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
            <Col span={12}>
                <SessionInnerPopertiesEditor {...{session, updateSession}}/>
            </Col>
            <Col span={12}>
                <Space>
                    <Link to="..">
                        <Button type="primary" size="large">חזרה לצפיה</Button>
                    </Link>
                    <Link to="./../..">
                        <Button type="primary" size="large">חזרה לרשימת מפגשים</Button>
                    </Link>
                </Space>
            </Col>
        </Row>
        <br/>
        <Row gutter={8}>
            <Col xl={12} span={24}>
                <NpcsEditor npcs={npcs} updateNpcs={npcs => updateSession({npcs})}
                    prevNpcs={prevSession && prevSession.npcs}/>                
            </Col>
            <Col xl={12} span={24}>
                <LocationsEditor locations={locations} updateLocations={locations => updateSession({locations})} 
                    prevLocation={prevSession && prevSession.locations}/>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <CollapsableElementEditor  // TODO: should Extract it into the ElementEditors file
                    header={<b>סצנות</b>}
                    initialData={scenes} onSave={scenes => updateSession({scenes})}
                    style={{backgroundColor: SECTION_COLORS.scenes}}
                />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            <SingleCollapsable ghost header={<b>רמזים ומידע</b>} style={{backgroundColor: SECTION_COLORS.clues, border: "solid 1px #c0c0c0"}}>
                <CategorizedListEditor 
                    initialData={clues}
                    onDataUpdate={clues => updateSession({clues})}
                />    
            </SingleCollapsable>
            </Col>
        </Row>
        <Row gutter={8}>
            <Col xl={12} span={24}>
                <RnadomEncountersEditor encounters={encounters} updateEncounters={encounters => updateSession({encounters})}/>
            </Col>
            <Col xl={12} span={24}>
                <NamesEditor names={names} saveNames={names => updateSession({names})}/>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <ExtraMediaEditor media={media} updateMedia={media => updateSession({media})}/>
            </Col>
        </Row>
    </div>
}
SingleSessionComponent.propTypes = {
    session: PropTypes.instanceOf(Session).isRequired,
    prevSession: PropTypes.instanceOf(Session),
    updateSession: PropTypes.func
}

export default function SingleSessionEditor() { // TODO: move this to a separate file
    const { currentUser } = useAuth()
    const { campaignId, sessionId } = useParams()
    
    const [session, setSession] = useState()
    const [prevSession, setPrevSession] = useState()
    const [error, setError] = useState()

    const getSessionRef = useCallback(() => doc(db,
        'accounts', currentUser.email,
        'campaigns', campaignId,
        'sessions', sessionId
    ).withConverter(Session.firestoreConvertor),
    [currentUser, campaignId, sessionId]
    )
    const getAllSessionsRef = useCallback(() => collection(db,
        'accounts', currentUser.email, 'campaigns', campaignId,'sessions')
            .withConverter(Session.firestoreConvertor), 
        [currentUser, campaignId])

    useEffect(() => {
        return onSnapshot(getSessionRef(),
        doc => {
            const retrieved_session = doc.data()
            const q = query(getAllSessionsRef(), where("date", "<", retrieved_session.date.toJSDate()), orderBy("date", "desc"), limit(1))
            getDocs(q).then(snapshot => !snapshot.empty && setPrevSession(snapshot.docs[0].data()))
            setSession(retrieved_session)
        },
        e => setError(e))
    }, [getSessionRef, getAllSessionsRef])
    

    if (error) return JSON.stringify(error)
    if (!session) return <LoadingSpinner label="טוען" />

    return <div style={{padding: "15px"}}>
        <Routes>
            <Route exact path="/" element={<SessionViewer session={session}/>} />
            <Route path="/edit" element={<SingleSessionComponent session={session} prevSession={prevSession} updateSession={d => updateDoc(getSessionRef(), d)} />}/>
        </Routes>
        
    </div>

}