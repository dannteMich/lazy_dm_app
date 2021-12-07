import React from "react";
import PropTypes from 'prop-types'
import { DateTime } from "luxon";

import {Typography, Form, Input, DatePicker, Button} from 'antd'

import { LoadingSpinner } from "../common/Loading";

const {Title} = Typography

export function SessionCreatorForm({handleCreate, loading}) {
    
    const onFinish = ({name, date}) => {
        const luxon_date = DateTime.fromJSDate(date.toDate())
        handleCreate({name, date: luxon_date})
    }
    
    return <div>
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
