import React from "react";
import PropTypes from 'prop-types'

import {Typography, Form, Input, DatePicker, Button} from 'antd'

import { LoadingSpinner } from "../common/Loading";

const {Title} = Typography

export function SessionCreatorForm({handleCreate, loading}) {
    return <div>
        <Title level={3} style={{margin: "20px 0"}}>יצירת סשן חדש</Title>
        <Form onFinish={handleCreate}>
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

            {loading && <LoadingSpinner />}

        </Form>
    </div>
}
SessionCreatorForm.propTypes = {
    handleCreate: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
}
