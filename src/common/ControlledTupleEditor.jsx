import React from "react";
import PropTypes from 'prop-types'

import {Space, Input, Col, Row, Button} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import MinusButtton from "./MinusButton";

const DEFAULT_MAX_LENGTH = 240

export const fields_propTypes = PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    allowClear: PropTypes.bool,
    maxLength: PropTypes.number,
    minWdith: PropTypes.number,
    maxWidth: PropTypes.number,
    flex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}))

export function AdditionButton({onClick, caption}) {
    const inButton = [<PlusOutlined key="0"/>]
    if (caption) {
        inButton.push(<span key="1">{caption}</span>, <PlusOutlined key="2"/>)
    }

    return <Button 
        type="dashed" onClick={onClick} 
        style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.4)" }} 
    >
        {inButton}    
    </Button>
}

export default function ControlledTupleEditor({
    data, fields, onChange, 
    allowDeletion=true, allowAddition=true, addButtonCaption
}) {
    
    function addEntry() {
        const newData = data.slice()
        newData.push({})
        onChange(newData)
    }

    function deleteEntry(entry_index) {
        const newData = data.slice()
        newData.splice(entry_index, 1)
        onChange(newData)
    }

    function updateFeiledInEntry(entry_index, field, new_value) {
        const newData = data.slice()
        newData[entry_index] = Object.assign(
            {}, data[entry_index], {[field]: new_value})
        onChange(newData)
    }

    const linesOfData = data.map((d, i) => <Row key={i} gutter={16}>
        {allowDeletion && <Col flex="0">
            <MinusButtton onClick={() => deleteEntry(i)}/>
        </Col>}

        {fields.map((f, j) => <Col key={f.key} flex={f.flex || null}>
            <Input
                style={{minWidth: f.minWidth, maxWidth: f.maxWidth}}
                maxLength={f.maxLength || DEFAULT_MAX_LENGTH}
                onChange={e => updateFeiledInEntry(i, f.key, e.target.value)}
                placeholder={f.placeholder || null}
                addonBefore={f.label || null}
                value={d[f.key] || ''}
                autoFocus={j===0}
                allowClear={f.allowClear || false}
            />
        </Col>)}        
    </Row>)
    
    return <Space direction="vertical" size="small" style={{ width: "100%" }}>
        {linesOfData}
        {allowAddition && <Row>
            <Col span={24}>
                <AdditionButton caption={addButtonCaption} onClick={addEntry} />
            </Col>
        </Row>}
    </Space>
}
ControlledTupleEditor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    fields: fields_propTypes.isRequired,
    allowDeletion: PropTypes.bool,
    allowAddition: PropTypes.bool,
    addButtonCaption: PropTypes.node,
}

