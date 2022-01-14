import React, { useState } from "react";
import PropTypes from 'prop-types'

import _ from 'lodash'
import { Button, Typography, Descriptions } from "antd";
import ControlledTupleEditor from "../common/ControlledTupleEditor";

const PLAYERS_LIST_PROPTYPE = PropTypes.arrayOf(PropTypes.shape({
    player_name: PropTypes.string.isRequired,
    character_name: PropTypes.string,
    description: PropTypes.string
}))

const {Title} = Typography

export default function PlayersViewAndEditor({currentPlayers, updatePlayers}) {
    const [editMode, setEditMode] = useState(_.isEmpty(currentPlayers))
    
    return <>
        <Title level={4}>שחקנים</Title>
        {editMode ? 
            <PlayersEditor 
                initialPlayers={currentPlayers} 
                updatePlayers={updatePlayers}
                finishEditing={() => setEditMode(false)}
            /> : 
            <PlayersViewer players={currentPlayers} startEdit={() => setEditMode(true)}/>
        }
    </>
}
PlayersViewAndEditor.propTypes = {
    currentPlayers: PLAYERS_LIST_PROPTYPE.isRequired,
    updatePlayers: PropTypes.func.isRequired,
}

export function PlayersEditor({initialPlayers, updatePlayers, finishEditing}) {
    const [players, setPlayers] = useState(initialPlayers)
    
    const fields = [
        {
            key: "player_name",
            placeholder: "שם השחקנ/ית",
            maxWidth: 120,
        }, {
            key: "character_name",
            placeholder: "שם הדמות",
        }, {
            key: "description",
            placeholder: "כמה מילים לתיאור הדמות",
            flex: 1,
        }
    ]
    
    const onSave = () => {
        updatePlayers(players)
        finishEditing && finishEditing()
    }

    return <div>
        <ControlledTupleEditor data={players} fields={fields} onChange={setPlayers} addButtonCaption="הוספת שחקנ/ית"/>
        <div style={{margin: "10px 0", display: "flex"}}>
            <div style={{flex: 1}}>
                <Button type="primary" onClick={onSave} style={{width: "100%"}}>
                    שמור
                </Button>
            </div>
            
            {finishEditing && <div style={{flex: 0, margin: "0 10px 0 0"}}>
                <Button onClick={finishEditing} style={{flex: 0}}> 
                    ביטול
                </Button>
            </div>}
        </div>
        
    </div>
}
PlayersEditor.propTypes = {
    initialPlayers: PLAYERS_LIST_PROPTYPE.isRequired,
    updatePlayers: PropTypes.func.isRequired,
    finishEditing: PropTypes.func,
}

export function PlayersViewer({players, startEdit}) {

    function getLabel(player, character=null) {
        let label = player
        if (character) label += ` - ${character}`
        return label
    }

    return <>
        <Descriptions column={1} size="small">
            {players.map(({player_name, character_name, description}) => {
            
            return <Descriptions.Item 
                    key={player_name} 
                    label={<b>{getLabel(player_name, character_name)}</b>}
                > 
                {description || "אין תיאור"}
            </Descriptions.Item>})}
        </Descriptions>
        <Button  onClick={startEdit} style={{margin: "10px 0"}}>
            עריכה
        </Button>
    </>
}
PlayersViewer.propTypes = {
    players: PLAYERS_LIST_PROPTYPE.isRequired,
    startEdit: PropTypes.func.isRequired,
}