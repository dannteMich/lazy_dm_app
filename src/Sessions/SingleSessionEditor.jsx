import React, { useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { doc, onSnapshot, updateDoc, query, orderBy, where, limit, collection, getDocs } from "@firebase/firestore";

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
import CategorizedListEditor from "../common/CategorizedListEditor";
import {SECTION_COLORS} from '../common/consts'
import { Link } from "react-router-dom";

const { Title } = Typography

const PANEL_MARGIN = "4px 0"

export function SingleCollapsable({children, ghost=false, defaultActive=true, header=null, style={}}) {
    return <Collapse ghost={ghost} defaultActiveKey={defaultActive ? 0 : null}>
        <Collapse.Panel header={header} style={{margin: PANEL_MARGIN, borderRadius: "4px", ...style}}>
            {children}
        </Collapse.Panel>
    </Collapse>
}
SingleCollapsable.propTypes = {
    ghost: PropTypes.bool,
    defaultActive: PropTypes.bool,
    header: PropTypes.node,
    style: PropTypes.object
}

export function SingleSessionComponent({ session, updateSession }) {
    const { date, name, description, npcs, locations, scenes, encounters, names, clues } = session

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
        <Row>
            <Col>
                <Link to="./view">צפייה</Link>
            </Col>
        </Row>
        <br/>
        <Row gutter={8}>
            <Col xl={12} span={24}>
                <SingleCollapsable ghost header={<b>דמויות</b>} style={{backgroundColor: SECTION_COLORS.npcs}}>
                    <NameDescriptionEditor 
                        initialData={npcs} onDataUpdate={npcs => updateSession({npcs})}
                        placeHolders={["שם לדמות", "תיאור לדמות"]}
                        additionButtonCaption="הוספת דמות"
                    />
                </SingleCollapsable>
                
            </Col>
            <Col xl={12} span={24}>
                <SingleCollapsable ghost header={<b>מקומות</b>} style={{backgroundColor: SECTION_COLORS.locations}}>
                    <NameDescriptionEditor 
                        initialData={locations} onDataUpdate={locations => updateSession({locations})}
                        placeHolders={["שם המקום", "תיאור המקום"]}
                        additionButtonCaption="הוספת מיקום"
                    />
                </SingleCollapsable>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <SingleCollapsable ghost header={<b>סצנות</b>} style={{backgroundColor: SECTION_COLORS.scenes}}>
                    <NameDescriptionEditor 
                        initialData={scenes} onDataUpdate={scenes => updateSession({scenes})}
                        placeHolders={["שם הסצינה", "פירוט קצר ודגשים"]}
                        additionButtonCaption="הוספת סצינה"
                    />
                </SingleCollapsable>
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
                <SingleCollapsable ghost header={<b>Random Encounters</b>} style={{backgroundColor: SECTION_COLORS.encounters}}>
                    <NameDescriptionEditor 
                        initialData={encounters} onDataUpdate={encounters => updateSession({encounters})}
                        labels={["תוצאת קוביה:", "אירוע:"]}
                        placeHolders={["טווח בקוביה", "פירוט האירוע"]}
                    />
                </SingleCollapsable>
            </Col>
            <Col xl={12} span={24}>
                <SingleCollapsable ghost header={<b>שמות</b>} style={{backgroundColor: SECTION_COLORS.names}}>
                    <CategorizedListEditor 
                        initialData={names}
                        onDataUpdate={names => updateSession({names})}
                    />    
                </SingleCollapsable>
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
            const q = query(getAllSessionsRef(), where("date", "<", retrieved_session.date.toJSDate()), orderBy("date"), limit(1))
            getDocs(q).then(snapshot => !snapshot.empty && setPrevSession(snapshot.docs[0].data()))
            setSession(retrieved_session)
        },
        e => setError(e))
    }, [getSessionRef, getAllSessionsRef])
    

    if (error) return JSON.stringify(error)
    if (!session) return <LoadingSpinner label="טוען" />

    console.log(prevSession) // TODO: not the right usage
    return <div style={{padding: "15px"}}>
        <SingleSessionComponent session={session} updateSession={d => updateDoc(getSessionRef(), d)} />
    </div>

}