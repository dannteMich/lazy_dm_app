import React, { useState } from "react";
import PropTypes from 'prop-types'

import _ from 'lodash'
import { Space, Row, Col, Button, Input } from "antd";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

export default function CategorizedListEditor({ 
    initialData=[], onDataUpdate,
    placeHolders=["קטגוריה", "פריט"],
    style={}
}) {
    const [data, setData] = useState(initialData)

    const updateCategory = (i, newName) => {
        const newData = _.cloneDeep(data)
        newData[i].category = newName
        setData(newData)
    }
    const updateItem = (i, j, newElement) => {
        const newData = _.cloneDeep(data)
        newData[i].items[j] = newElement
        setData(newData)
    }
    const addElementToCategory = i => {
        const newData = _.cloneDeep(data)
        newData[i].items.push('')
        setData(newData)
    }
    const removeElementFromCategory = (i, j) => {
        const newData = _.cloneDeep(data)
        newData[i].items.splice(j, 1)
        setData(newData)
    }
    const addCategory = () => {
        const newData = _.cloneDeep(data)
        newData.push({
            category: '',
            items: []
        })
        setData(newData)
    }
    const removeCategory = i => {
        if (!_.isEmpty(data[i].items)) {
            alert("Can't delete non empty category")
            return
        }
        const newData = _.cloneDeep(data)
        newData.splice(i, 1)
        setData(newData)
    }

    const tryToUpdate = () => {
        const categories = data.map(e => e.category)    
        if ((new Set(categories)).size !== categories.length) {
            throw Error("Can't have more than one category with the same name")
        } 
        onDataUpdate(data)  
    }

    const buttons_disabled = _.isEqual(data, initialData)
    
    return <Space direction="vertical" size="middle" style={{width: "100%", ...style}}>
        {data.map(({items, category}, i) => <Row gutter={24}>
            <Col flex={0}>
                <Row>
                    <Col>
                        <Button
                            type="text" tabIndex="-1"
                            icon={<MinusCircleOutlined />}
                            onClick={() => removeCategory(i)}
                            disabled={!_.isEmpty(data[i].items)}
                        />
                    </Col>
                    <Col>
                        <Input 
                            value={category} 
                            onChange={e => updateCategory(i, e.target.value)} 
                            placeholder={placeHolders[0]}
                            autoFocus
                        />
                    </Col>
                </Row>
            </Col>
            <Col flex={1}>
                <Space direction="vertical" style={{width: "100%"}}>
                    {items.map((item, j) => <Row>
                        <Col>
                            <Button
                                type="text" tabIndex="-1"
                                icon={<MinusCircleOutlined />}
                                onClick={() => removeElementFromCategory(i, j)}
                            />
                        </Col>
                        <Col flex="1">
                            <Input 
                                value={item} autoFocus allowClear
                                onChange={e => updateItem(i, j, e.target.value)} 
                                placeholder={placeHolders[1]}
                            />
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