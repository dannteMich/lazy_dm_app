import React, { useState } from "react";
import PropTypes from 'prop-types'

import { Button, Space, Row, Col } from 'antd'
import _ from "lodash";
import ControlledTupleEditor from "./ControlledTupleEditor";

export default function NameDescriptionEditor({ 
    initialData = [], onDataUpdate, 
    labels = ["שם:", "תיאור:"],
    placeHolders = ["", ""],
    additionButtonCaption = "הוספה"
  }) {
  const [data, setData] = useState(initialData)

  const tryToUpdateData = () => {
    if (data.some(n => _.isEmpty(n.name))) {
      alert("יש לספק את השדה הראשון של כל רשומה")
    } else {
      onDataUpdate(data)
    }
  }
  const buttons_disabled = _.isEqual(initialData,data)

  return <Space direction="vertical" size="small" style={{ width: "100%" }}>
    <ControlledTupleEditor 
      data={data}
      fields={[
        {
          key: "name",
          label: labels[0],
          placeholder: placeHolders[0],
        },
        {
          key: "description",
          label: labels[1],
          placeholder: placeHolders[1],
          allowClear: true,
        }
      ]}
      onChange={setData}
      addButtonCaption={additionButtonCaption}
    />

    <Row>
      <Col flex="0">
        <Space>
        <Button type="primary" onClick={tryToUpdateData} disabled={buttons_disabled}>
          שמירת שינויים
        </Button>
        <Button onClick={() => setData(initialData)} disabled={buttons_disabled}>ביטול שינויים</Button>
        </Space>
      </Col>
    </Row>
  </Space>
}
NameDescriptionEditor.propTypes = {
  onDataUpdate: PropTypes.func.isRequired,
  initialData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  })),
  lables: PropTypes.arrayOf(PropTypes.string),
  placeHolders: PropTypes.arrayOf(PropTypes.string),
  additionButtonCaption: PropTypes.string,
  
}