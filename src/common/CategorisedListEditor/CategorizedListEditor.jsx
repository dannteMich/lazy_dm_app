import React, { useState } from "react";
import PropTypes from 'prop-types'

import _ from 'lodash'
import { Space, Row, Col, Button, Input } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import MinusButtton from "../MinusButton";

const DATA_PROP_TYPE = PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string)
}))

export default function CategorizedListEditor({
    initialData = [], onDataUpdate,
    placeHolders = ["קטגוריה", "פריט"],
    style = {}
}) {
    const [data, setData] = useState(initialData)

    const updateCategory = (i, newName) => {
        const newData = _.cloneDeep(data)
        newData[i].category = newName
        setData(newData)
    }
    const updateItemInCategory = (i, j, newElement) => {
        const newData = _.cloneDeep(data)
        newData[i].items[j] = newElement
        setData(newData)
    }
    const addItemToCategory = i => {
        const newData = _.cloneDeep(data)
        newData[i].items.push('')
        setData(newData)
    }
    const removeItemFromCategory = (i, j) => {
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
    const resetData = () => setData(initialData)

    return <CategorisedListEditorView {...{
        data, placeHolders, style,
        addCategory, removeCategory, updateCategory,
        addItemToCategory, removeItemFromCategory, updateItemInCategory,

        changesMade: !_.isEqual(data, initialData),
        onTryToSave: tryToUpdate,
        onReset: resetData
    }} />


}
CategorizedListEditor.propTypes = {
    initialData: DATA_PROP_TYPE,
    onDataUpdate: PropTypes.func.isRequired,
    placeHolders: PropTypes.arrayOf(PropTypes.string),
    style: PropTypes.object,
}

export function CategorisedListEditorView({ data,
    addCategory, removeCategory, updateCategory,
    addItemToCategory, removeItemFromCategory, updateItemInCategory,
    changesMade, onTryToSave, onReset,
    placeHolders, style
}) {
    return <Space direction="vertical" size="middle" style={{ width: "100%", ...style }}>
        {data.map(({ items, category }, i) => <Row gutter={24} key={i}>
            <Col flex={0}>
                <Row>
                    <Col>
                        <MinusButtton onClick={() => removeCategory(i)} disabled={!_.isEmpty(data[i].items)} />
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
                <Space direction="vertical" style={{ width: "100%" }}>
                    {items.map((item, j) => <Row key={j}>
                        <Col>
                            <MinusButtton onClick={() => removeItemFromCategory(i, j)} />
                        </Col>
                        <Col flex="1">
                            <Input
                                value={item} autoFocus allowClear
                                onChange={e => updateItemInCategory(i, j, e.target.value)}
                                placeholder={placeHolders[1]}
                            />
                        </Col>
                    </Row>)}
                    <Row>
                        <Col>
                            <Button type="dashed" onClick={() => addItemToCategory(i)} style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.4)", right: "32px", padding: "0 35px" }} >
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
                <Button type="dashed" onClick={addCategory} style={{ backgroundColor: "rgba(255,255,255,0.4)", right: "32px", padding: "0 24px" }} >
                    הוספת קטגוריה
                    <PlusOutlined />
                </Button>
            </Col>
        </Row>

        <Row gutter={16}>
            <Col flex="0">

                <Button type="primary" onClick={onTryToSave} disabled={!changesMade}>
                    שמירת שינויים
                </Button>
            </Col>
            <Col>
                <Button onClick={onReset} disabled={!changesMade}>
                    ביטול שינויים
                </Button>
            </Col>
        </Row>
    </Space>
}
CategorisedListEditorView.propTypes = {
    data: DATA_PROP_TYPE.isRequired,
    
    addCategory: PropTypes.func.isRequired,
    removeCategory: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired,
    addItemToCategory: PropTypes.func.isRequired,
    removeItemFromCategory: PropTypes.func.isRequired,
    updateItemInCategory: PropTypes.func.isRequired,
    onTryToSave: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    
    changesMade: PropTypes.bool.isRequired,
    
    placeHolders: PropTypes.arrayOf(PropTypes.string),
    style: PropTypes.object,
    
}