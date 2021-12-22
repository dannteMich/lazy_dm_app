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
    const addCategory = () => {
        data.push({
            category: '',
            items: []
        })
        setData(data.slice())
    }
    const tryToUpdate = () => {
        const categories = data.map(e => e.category)    
        if ((new Set(categories)).size !== categories.length) {
            throw Error("Can't have more than one category with the same name")
        } 
        onDataUpdate(data)  
    }

    const buttons_disabled = false // TODO: This is still not wirking
    // TODO: add option to delete a category
    
    return <Space direction="vertical" size="middle" style={{width: "100%", ...style}}>
        {data.map(({items, category}, i) => <Row gutter={24}>
            <Col flex={0}>
                <Input value={category} onChange={e => updateCategory(i, e.target.value)} placeholder="קטוגריה"/>
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
                            <Input value={item} onChange={e => updateItem(i, j, e.target.value)} placeholder="פריט"/>
                        </Col>
                    </Row>)}
                    <Row>
                        <Col>
                            <Button type="dashed" onClick={() => addElementToCategory(i)} style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.4)" }} >
                                הוסף פריט
                                <PlusOutlined />
                            </Button>
                        </Col>
                    </Row>
                </Space>
            </Col>
        </Row>)}
        <Row>
            <Col>
                <Button type="dashed" onClick={addCategory} style={{backgroundColor: "rgba(255,255,255,0.4)" }} >
                    הוספת קטגוריה
                    <PlusOutlined />
                </Button>
            </Col>
        </Row>
        <Row>
        <Col flex="0">
          <Space>
          <Button type="primary" onClick={tryToUpdate} disabled={buttons_disabled}>
            שמירת שינויים
          </Button>
          <Button onClick={() => setData(initialData)} disabled={buttons_disabled}>
              ביטול שינויים
              {/* TODO: this is not working currenly */}
            </Button>
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