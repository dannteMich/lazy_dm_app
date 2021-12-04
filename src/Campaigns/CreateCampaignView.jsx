import React from "react";
import PropTypes from 'prop-types'

import {ConfigProvider, Form, Input, Button, Typography} from 'antd'

const {Title} = Typography
export default function CreateCampaignView({handleCreate}) {

    return <ConfigProvider direction="rtl">
        <div style={{margin: "15px 0"}}>
            <Title level={3} >יצירת משחק חדש</Title>
            <Form onFinish={handleCreate} style={{margin: '15px'}}>
                <Form.Item label="שם המשחק" name="name" required>
                    <Input placeholder="שם קצר לתיאור המשחק"/>
                </Form.Item>
                
                <Form.Item label="תיאור המשחק" name="description">
                    <Input.TextArea placeholder="כמה שורות של הסבר על העולם והמשחק"/>
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit" type="primary" style={{minWidth: "90px"}}>
                        צור
                    </Button>
                </Form.Item>

            </Form>
        </div>
    </ConfigProvider>
}
CreateCampaignView.propTypes = {
    handleCreate: PropTypes.func.isRequired,
}