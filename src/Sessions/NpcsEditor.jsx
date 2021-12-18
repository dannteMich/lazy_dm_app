import React, { useState } from "react";
import PropTypes from 'prop-types'

import { Input, Button, Space, Row, Col } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import _ from "lodash";

export default function NPCsEditor({ initialNpcs = [], onNpcsUpdate }) {
  const [npcs, setNpcs] = useState(initialNpcs)

  const removeFromArrayByIndex = (arr, i) => {
    let temp = arr.slice()
    temp.splice(i, 1)
    return temp
  }

  const updateNpc = (newNpc, i) => {
    const tempNpcs = npcs.slice()
    tempNpcs[i] = newNpc
    setNpcs(tempNpcs)
  }

  const updateName = (newName, i) => {
    return updateNpc({ ...npcs[i], name: newName }, i)
  }

  const updateDescription = (newDescription, i) => {
    return updateNpc({ ...npcs[i], description: newDescription }, i)
  }


  const tryToUpdateNpcs = () => {
    if (npcs.some(n => _.isEmpty(n.name))) {
      alert("יש לספק שם לכל הדמויות")
    } else {
      onNpcsUpdate(npcs)
    }
  }

  return <div style={{ width: "100%" }}>
    <Space direction="vertical" size="small" style={{ width: "100%" }}>
      {npcs.map((npc, i) => <Row key={i} gutter={16}>
        <Col>
          <Button
            type="text"
            icon={<MinusCircleOutlined />}
            onClick={() => setNpcs(removeFromArrayByIndex(npcs, i))}
          />
        </Col>
        <Col>
          <Input
            maxLength={240}
            onChange={e => updateName(e.target.value, i)}
            placeholder="שם לדמות"
            addonBefore="שם:"
            value={npc.name || ''}
          />
        </Col>
        <Col flex="1">
          <Input
            allowClear
            onChange={e => updateDescription(e.target.value, i)}
            placeholder="תיאור לדמות"
            addonBefore="תיאור:"
            value={npc.description || ''}
          />
        </Col>

      </Row>)}

      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Button type="dashed" onClick={() => setNpcs(npcs.concat([{}]))} style={{ width: "100%" }}>
            <PlusOutlined />
            צור NPC נוסף
            <PlusOutlined />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col flex="0">
          <Button type="primary" onClick={tryToUpdateNpcs}>
            עדכון
          </Button>
        </Col>
      </Row>
    </Space>
  </div>
}
NPCsEditor.propTypes = {
  onNpcsUpdate: PropTypes.func.isRequired,
  initialNpcs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }))
}