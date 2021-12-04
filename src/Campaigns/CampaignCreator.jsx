import React, { useState } from "react";
import PropTypes from 'prop-types'
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'

import { ConfigProvider, Form, Input, Button, Typography } from 'antd'

import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase/firebase'


const { Title } = Typography

export function CampaignCreator() {
    const [loading, setLoading] = useState(false)
    const { currentUser } = useAuth()

    function createCampaign({name, description=''}) {
        setLoading(true)
        addDoc(
            collection(db, "accounts", currentUser.uid, 'campaigns'), { 
                name, description, 
                created: serverTimestamp(), 
                updated: serverTimestamp() 
            })
            .then(() => alert(`המשחק $ {name} נוצר בהצלחה`)) // TODO: navigate to Single Campaign view
            .catch(e => {
                console.log(e);
                alert(`Error: ${JSON.stringify(e)}`)
                setLoading(false)
            })
    }


    return <CreateCampaignView loading={loading} handleCreate={createCampaign}/>
}

export function CreateCampaignView({ handleCreate, loading }) {

    return <ConfigProvider direction="rtl">
        <div style={{ margin: "15px 0" }}>
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

            </Form>
        </div>
    </ConfigProvider>
}
CreateCampaignView.propTypes = {
    loading: PropTypes.bool.isRequired,
    handleCreate: PropTypes.func.isRequired,
}