import React, { useState } from "react";
import PropTypes from 'prop-types'

import { Input, Button, Space, Row, Col } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import _ from "lodash";

export default function NameDescriptionEditor({ 
    initialData = [], onDataUpdate, 
    labels = ["שם:", "תיאור:"],
    placeHolders = ["", ""],
    additionButtonCaption = "הוספה"
  }) {
  const [data, setData] = useState(initialData)

  const removeFromArrayByIndex = (arr, i) => {
    let temp = arr.slice()
    temp.splice(i, 1)
    return temp
  }

  const updateEntry = (newEntry, i) => {
    const tempData = data.slice()
    tempData[i] = newEntry
    setData(tempData)
  }

  const updateName = (newName, i) => {
    return updateEntry({ ...data[i], name: newName }, i)
  }

  const updateDescription = (newDescription, i) => {
    return updateEntry({ ...data[i], description: newDescription }, i)
  }


  const tryToUpdateData = () => {
    if (data.some(n => _.isEmpty(n.name))) {
      alert("יש לספק את השדה הראשון של כל רשומה")
    } else {
      onDataUpdate(data)
    }
  }
  // TODO: add save on delete?
  // TODO: make this more flexiable with key names
  const buttons_disabled = _.isEqual(initialData,data)

  return <Space direction="vertical" size="small" style={{ width: "100%" }}>
    {data.map((entry, i) => <Row key={i} gutter={16}>
      <Col>
        <Button
          type="text" tabIndex="-1"
          icon={<MinusCircleOutlined />}
          onClick={() => setData(removeFromArrayByIndex(data, i))}
        />
      </Col>
      <Col>
        <Input
          maxLength={240}
          onChange={e => updateName(e.target.value, i)}
          placeholder={placeHolders[0]}
          addonBefore={labels[0]}
          value={entry.name || ''}
          autoFocus
        />
      </Col>
      <Col flex="1">
        <Input
          allowClear
          onChange={e => updateDescription(e.target.value, i)}
          placeholder={placeHolders[1]}
          addonBefore={labels[1]}
          value={entry.description || ''}
        />
      </Col>

    </Row>)}

    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Button type="dashed" onClick={() => setData(data.concat([{}]))} style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.4)" }} >
          <PlusOutlined />
          {additionButtonCaption}
          <PlusOutlined />
        </Button>
      </Col>
    </Row>
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
  onNpcsUpdate: PropTypes.func.isRequired,
  initialNpcs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  })),
  lables: PropTypes.arrayOf(PropTypes.string),
  placeHolders: PropTypes.arrayOf(PropTypes.string),
  additionButtonCaption: PropTypes.string,
  
}