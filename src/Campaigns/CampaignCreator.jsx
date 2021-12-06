import React, { useState } from "react";
import PropTypes from 'prop-types'
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'

import { Form, Input, Button, Typography, Spin } from 'antd'

import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase/firebase'
import { useNavigate } from "react-router";


const { Title } = Typography

export function CampaignCreator() {
    const [loading, setLoading] = useState(false)
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    function createCampaign({name, description=''}) {
        setLoading(true)
        addDoc(
            collection(db, "accounts", currentUser.uid, 'campaigns'), { 
                name, description, 
                created: serverTimestamp(), 
                updated: serverTimestamp() 
            })
            .then(docRef => navigate(`/campaigns/${docRef.id}`))
            .catch(e => {
                console.log(e);
                alert(`Error: ${JSON.stringify(e)}`)
                
            })
            .finally(() => setLoading(false))
    }


    return <CreateCampaignView loading={loading} handleCreate={createCampaign}/>
}

export function CreateCampaignView({ handleCreate, loading }) {

    return <div style={{ margin: "15px 0" }}>
        <Title level={3} >יצירת משחק חדש</Title>
        <Form onFinish={handleCreate} style={{ margin: '15px' }}>
            <Form.Item
                label="שם המשחק" name="name" required
                rules={[{ required: true, message: "יש לספק שם למשחק" }]}>
                <Input placeholder="שם קצר לתיאור המשחק" />
            </Form.Item>

            <Form.Item label="תיאור המשחק" name="description">
                <Input.TextArea placeholder="כמה שורות של הסבר על העולם והמשחק" />
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" type="primary" style={{ minWidth: "90px" }} disabled={loading}>
                    צור
                </Button>
            </Form.Item>

            <div style={{textAlign: "center"}}>
                {loading && <Spin size="large"/>}
            </div>

        </Form>
    </div>
}
CreateCampaignView.propTypes = {
    loading: PropTypes.bool.isRequired,
    handleCreate: PropTypes.func.isRequired,
}