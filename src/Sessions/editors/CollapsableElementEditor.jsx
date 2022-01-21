import React, {useState} from "react";
import PropTypes from 'prop-types'

import _ from 'lodash'
import {Collapse, Row, Col, Button, Space} from 'antd'

import ControlledTupleEditor from "../../common/ControlledTupleEditor";
import ListOfActionsButton from "../../common/ListOfActionsButton";
import {fields_propTypes} from '../../common/ControlledTupleEditor'

const PANEL_MARGIN = "4px 0"

export function defaultValidationFunction(newData) {
    if (newData.some(d => _.isEmpty(d.name))) {
        throw Error("A required 'name' field should not be empty")
    }
}

export default function CollapsableElementEditor({
    initialData=[], onSave, presetEntries=[], fields, header, extra,
    validateDataFunction,
    addButtonCaption="הוספה", ghost=true, defaultActive=true, style
}) {
    
    const [data, setData] = useState(initialData)
    const buttons_disabled = _.isEqual(initialData,data)

    const validateAndSave = () => {
        try {
            (validateDataFunction || defaultValidationFunction)(data)
            onSave(data)
        } catch (e) {
            alert(e.message)
        }
    }

    const addEntries = entries => {
        const newData = data.slice()
        entries.forEach(e => newData.push(e))
        setData(newData)
    }
    const addEntry = entry => addEntries([entry])

    const existingNames = data.map(d => d.name)
    const availablePresets = presetEntries.filter(d => !existingNames.includes(d.name))
    
    const fromPrevButton = _.isEmpty(availablePresets) ? null : <ListOfActionsButton 
        data={availablePresets}
        getLabelFromData={d => d.name} allLabel="להוסיף את כולם"
        onDataClick={d => addEntry(d)} onAllClick={() => addEntries(availablePresets)}
    >מסשן קודם</ListOfActionsButton>

    const controlled_tuple_fields = fields || [
        {
            key: "name",
            placeholder: "שם",
            minWdith: 150,
        },{
            key: "description",
            placeholder: "תיאור",
            allowClear: true,
            flex: 1
        }
    ]


    return <Collapse ghost={ghost} defaultActiveKey={defaultActive ? 0 : null} collapsible="header">
        <Collapse.Panel {...{header, extra}} style={{margin: PANEL_MARGIN, borderRadius: "4px", ...style}}>
            <ControlledTupleEditor data={data} onChange={setData} 
                fields={controlled_tuple_fields} addButtonCaption={addButtonCaption} />

            <Row style={{padding: "10px 0 0 0"}}>
                <Col flex="0">
                    <Space>
                        <Button type="primary" onClick={validateAndSave} disabled={buttons_disabled}>
                            שמירת שינויים
                        </Button>
                        <Button onClick={() => setData(initialData)} disabled={buttons_disabled}>
                            ביטול שינויים
                        </Button>
                        {fromPrevButton}
                    </Space>
                </Col>
            </Row>
        </Collapse.Panel>
    </Collapse>
}
CollapsableElementEditor.propTypes ={
    initialData: PropTypes.arrayOf(PropTypes.object),
    presetEntries: PropTypes.arrayOf(PropTypes.object),
    onSave: PropTypes.func.isRequired,
    header: PropTypes.node.isRequired,
    style: PropTypes.object,
    ghost: PropTypes.bool,
    addButtonCaption: PropTypes.string,
    defaultActive: PropTypes.bool,
    fields: fields_propTypes,
    validateDataFunction: PropTypes.func,
    extra: PropTypes.node,
}