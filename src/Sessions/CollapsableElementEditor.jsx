import React, {useState} from "react";
import PropTypes from 'prop-types'

import _ from 'lodash'
import {Collapse, Row, Col, Button, Space} from 'antd'

import ControlledTupleEditor from "../common/ControlledTupleEditor";
import ListOfActionsButton from "../common/ListOfActionsButton";

const PANEL_MARGIN = "4px 0"

export function SingleCollapsable({
    ghost=false, defaultActive=true, header=null, 
    children, style={},
}) {
    return <Collapse ghost={ghost} defaultActiveKey={defaultActive ? 0 : null}>
        <Collapse.Panel header={header}
            style={{margin: PANEL_MARGIN, borderRadius: "4px", ...style}} 
        >
            {children}
        </Collapse.Panel>
    </Collapse>
}
SingleCollapsable.propTypes = {
    ghost: PropTypes.bool,
    defaultActive: PropTypes.bool,
    header: PropTypes.node,
    style: PropTypes.object,
    
}

export default function CollapsableElementEditor({
    initialData=[], onSave, presetEntries,
    header, style,
}) {
    
    const [data, setData] = useState(initialData)
    const buttons_disabled = _.isEqual(initialData,data)

    const validateAndSave = () => {
        if (data.some(d => _.isEmpty(d.name))) {
            alert("A required 'name' field should not be empty")
        } else {
            onSave(data)
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

    return <SingleCollapsable header={<b>{header}</b>} style={style}>
        <ControlledTupleEditor 
            data={data} onChange={setData}
            fields={[
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
            ]}
            addButtonCaption="הוספה"
        />

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
    </SingleCollapsable>
}
CollapsableElementEditor.propTypes ={
    initialData: PropTypes.arrayOf(PropTypes.object),
    presetEntries: PropTypes.arrayOf(PropTypes.object),
    onSave: PropTypes.func.isRequired,
    header: PropTypes.node,
    style: PropTypes.object,
}