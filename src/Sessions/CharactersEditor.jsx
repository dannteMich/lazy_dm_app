import React from "react";

import {Form, Input, Button, Space} from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

export default function CharactersEditor() {
    const [form] = Form.useForm()


    const onFinish = values => {
        console.log('Received values of form:', values);
      };
    
      return (
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" form={form}>
          <Form.List name="npcs">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex' }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      fieldKey={[fieldKey, 'name']}
                      rules={[{ required: true, message: 'נדרש שם' }]}
                    >
                      <Input placeholder="שם" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      fieldKey={[fieldKey, 'description']}
                      rules={[{ required: true, message: 'נדרש תיאור' }]}
                    >
                      <Input.TextArea autosize placeholder="תיאור" />
                    </Form.Item>
                    <Button onClick={() => remove(name)} icon={<MinusCircleOutlined />} type="text"/>
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block >
                    הוסף NPC
                    <PlusOutlined />
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" onClick={() => form.submit()}>
              שמור
            </Button>
          </Form.Item>
        </Form>
      );
}