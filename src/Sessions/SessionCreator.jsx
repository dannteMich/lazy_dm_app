import React, {useState} from "react";
import PropTypes from 'prop-types'

import { DateTime } from "luxon";
import {Typography, Form, Input, DatePicker, Button} from 'antd'
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router";
import { addDoc, collection } from "@firebase/firestore";

import { db } from "../firebase/firebase";
import { LoadingSpinner } from "../common/Loading";
import Session from './session'

const {Title} = Typography

export default function SessionCreator() {
    const [loading, setLoading] = useState(false)
    const { currentUser } = useAuth()
    const {campaignId} = useParams()
    const navigate = useNavigate()

    function createSession({date, name}) {
        setLoading(true)
        addDoc(collection(
            db, 'accounts', currentUser.email, 'campaigns', campaignId, 'sessions')
                .withConverter(Session.firestoreConvertor),
            new Session(date, {name}))
        .then(docRef => navigate(`/campaigns/${campaignId}/sessions/${docRef.id}`))
        .catch(e => {
            console.log(e);
            alert(`Error: ${JSON.stringify(e)}`)
            
        })
        .finally(() => setLoading(false))
    }

    return <SessionCreatorForm loading={loading} handleCreate={createSession}/>

}

export function SessionCreatorForm({handleCreate, loading, style}) {
    
    const onFinish = ({name, date}) => {
        const luxon_date = DateTime.fromJSDate(date.toDate())
        handleCreate({name, date: luxon_date})
    }
    
    return <div style={{maxWidth: "800px", ...style}}>
        <Title level={3} style={{margin: "20px 0"}}>יצירת סשן חדש</Title>
        <Form onFinish={onFinish}>
            <Form.Item 
                label="תאריך הסשן"
                name="date"
                rules={[{required: true, message: "יש לבחור תאריך למפגש"}]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item label="שם לסשן (אם יש כזה)" name="name">
                <Input placeholder=""/>
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" type="primary" style={{ minWidth: "90px" }} disabled={loading}>
                    צור
                </Button>
            </Form.Item>

            {loading && <LoadingSpinner style={{margin: "30px 0"}} bellowNode="יוצר סשן"/>}

        </Form>
    </div>
}
SessionCreatorForm.propTypes = {
    handleCreate: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
}
