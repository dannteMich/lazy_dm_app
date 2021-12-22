import React, { useState } from "react";
import PropTypes from 'prop-types'

import _ from 'lodash'
import { Space, Row, Col, Button, Input } from "antd";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

export default function CategorizedListEditor({ 
    initialData=[], onDataUpdate,
    style={} 
}) {
    const [data, setData] = useState(initialData)
    
    const buttons_disabled = false // TODO: should have some logic to it

    const updateCategory = (i, newName) => {
        data[i].category = newName
        setData(data.slice())
    }
    const updateItem = (i, j, newElement) => {
        data[i].items[j] = newElement
        setData(data.slice())
    }
    const addElementToCategory = i => {
        data[i].items.push('')
        setData(data.slice())
    }
    const removeElementFromCategory = (i, j) => {
        data[i].items.splice(j, 1)
        setData(data.slice())
    }
    
    return <Space direction="vertical" size="middle" style={{width: "100%", ...style}}>
        {data.map(({items, category}, i) => <Row gutter={24}>
            <Col flex={0}>
                <Input value={category} onChange={e => updateCategory(i, e.target.value)}/>
            </Col>
            <Col flex={1}>
                <Space direction="vertical" style={{width: "100%"}}>
                    {items.map((item, j) => <Row>
                        <Col>
                            <Button
                                type="text"
                                icon={<MinusCircleOutlined />}
                                onClick={() => removeElementFromCategory(i, j)}
                            />
                        </Col>
                        <Col flex="1">
                            
                            <Input value={item} onChange={e => updateItem(i, j, e.target.value)}/>
                        </Col>
                    </Row>)}
                    <Row>
                        <Col>
                            <Button type="dashed" onClick={() => addElementToCategory(i)} style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.4)" }} >
                                הוסף
                                <PlusOutlined />
                            </Button>
                        </Col>
                    </Row>
                </Space>
            </Col>
        </Row>)}
        <Row>
        <Col flex="0">
          <Space>
          <Button type="primary" onClick={() => onDataUpdate(data)} disabled={buttons_disabled}>
            שמירת שינויים
          </Button>
          <Button onClick={() => setData(initialData)} disabled={buttons_disabled}>ביטול שינויים</Button>
          </Space>
        </Col>
      </Row>
    </Space>
}
CategorizedListEditor.propTypes = {
    initialData: PropTypes.arrayOf(PropTypes.shape({
        category: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.string)
    })),
    onDataUpdate: PropTypes.func.isRequired,

    style: PropTypes.object,
}