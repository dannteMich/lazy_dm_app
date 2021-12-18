import React, { useState } from "react";
import PropTypes from 'prop-types'

import {Input, Button, Space} from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import _ from "lodash";

export default function NPCsEditor({initialNpcs=[], onNpcsUpdate}) {
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
      return updateNpc({...npcs[i], name: newName}, i)
    }

    const updateDescription = (newDescription, i) => {
      return updateNpc({...npcs[i], description: newDescription}, i)
    }

    const allNpcsHaveNames = () => npcs.every(v => !_.isEmpty(v.name))

    const tryToUpdateNpcs = () => {
      if (npcs.some(n => _.isEmpty(n.name))) {
        alert("יש לספק שם לכל הדמויות")
      } else {
        onNpcsUpdate(npcs)
      }
    }

    return <>
      <Space direction="vertical" size="middle">
        {npcs.map((npc, i) => <Space direction="horizontal" size="small">
          <Button 
            type="text" 
            icon={<MinusCircleOutlined />} 
            onClick={() => setNpcs(removeFromArrayByIndex(npcs, i))}
          />
          <Input 
            onChange={e => updateName(e.target.value, i)}
            placeholder="שם לדמות"
            addonBefore="שם:"
            value={npc.name || ''} 
          />
          <Input 
            onChange={e => updateDescription(e.target.value, i)}
            placeholder="תיאור לדמות"
            addonBefore="תיאור:"
            value={npc.description || ''}
          />
          
        </Space>)}

      <Button type="dashed" onClick={() => setNpcs(npcs.concat([ {} ]))} style={{width: "100%"}}>
      <PlusOutlined />
        צור NPC נוסף
        <PlusOutlined />
      </Button>

      <Button type="primary" onClick={tryToUpdateNpcs}>
        עדכון
      </Button>
      </Space>
    </>
}
NPCsEditor.propTypes = {
  onNpcsUpdate: PropTypes.func.isRequired,
  initialNpcs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }))
}