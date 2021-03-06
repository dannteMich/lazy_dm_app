import React, { useState } from "react";
import PropTypes from 'prop-types'

import { DateTime } from "luxon";
import { Button, Col, Row, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

import Session from "./session";
import UpdateDate from '../common/UpdateDate'
import UpdateOrEmpty from "../common/UpdateOrEmpty";
import {SECTION_COLORS} from '../common/consts'
import CollapsableElementEditor from './editors/CollapsableElementEditor'
import NamesEditor from "./editors/NamesEditor";
import CluesEditor from "./editors/CluesEditor";
import { ExtraMediaEditor, LocationsEditor, NpcsEditor, RnadomEncountersEditor } from "./editors/ElementEditors";
import Modal from "antd/lib/modal/Modal";
import { LoadingSpinner } from "../common/Loading";

const { Title } = Typography

export function SessionInnerPropertiesEditor({session, updateSession}) {
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
            <Col flex="0">סיכום:</Col>
            <Col flex="1">
                <UpdateOrEmpty
                    autoSize={false}
                    value={description} 
                    updateValue={d => updateSession({description: d})}
                    createLabel="כתיבת סיכום"
                    emptyLabel="כרגע אין סיכום"
                />
            </Col>
        </Row>
    </>
}
SessionInnerPropertiesEditor.propTypes = {
    session: PropTypes.instanceOf(Session).isRequired,
    updateSession: PropTypes.func.isRequired,
}


export function ButtonRow({deleteSession}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalLoading, setModalLoading] = useState(false) 
    const showModal = () => setModalVisible(true)
    const hideModal = () => setModalVisible(false)
    const navigate = useNavigate()

    const onDelete = () => {
        setModalLoading(true)
        navigate('./../../../')
        deleteSession().catch(e => {
            alert(`An error accured: ${e}`)
            setModalLoading(false)
        })
    }

    return <>
    <Modal title="מחיקת הפגישה" visible={modalVisible} 
        onCancel={hideModal}
        onOk={onDelete}
    >
        <Title level={3}>בטוח שאתה שרוצה למחוק?</Title>
        {modalLoading && <LoadingSpinner bellowNode="מוחק...."/>}
    </Modal>
    <Row gutter={16}>
        <Col>
            <Link to="..">
                <Button type="primary" size="large">חזרה לצפיה</Button>
            </Link>
        </Col>
        <Col>
            <Link to="./../../..">
                <Button type="primary" size="large">חזרה לרשימת מפגשים</Button>
            </Link>
        </Col>
        <Col flex="1" />
        {deleteSession && <Col> 
            <Button size="large" style={{backgroundColor: "red", color: "white"}} onClick={showModal}>
                מחיקת סשן
            </Button>
        </Col>}
    </Row>
    </>
}
ButtonRow.propTypes = {
    deleteSession: PropTypes.func,
}

export default function SessionEditor({ session, updateSession, prevSession, deleteSession }) {
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
                <SessionInnerPropertiesEditor {...{session, updateSession}}/>
            </Col>
            <Col span={12}>
                <ButtonRow deleteSession={deleteSession}/>
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
                <CluesEditor clues={clues} updateClues={clues => updateSession({clues})}/>
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
SessionEditor.propTypes = {
    session: PropTypes.instanceOf(Session).isRequired,
    prevSession: PropTypes.instanceOf(Session),
    updateSession: PropTypes.func,
    deleteSession: PropTypes.func,
}

