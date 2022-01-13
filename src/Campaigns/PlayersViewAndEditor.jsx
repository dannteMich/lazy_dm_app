import React, { useState } from "react";
import PropTypes from 'prop-types'

import { Button } from "antd";
import ControlledTupleEditor from "../common/ControlledTupleEditor";

const PLAYERS_LIST_PROPTYPE = PropTypes.arrayOf(PropTypes.shape({
    player_name: PropTypes.string.isRequired,
    character_name: PropTypes.string,
    description: PropTypes.string
}))

export default function PlayersViewAndEditor({currentPlayers, updatePlayers}) {
    const [editMode, setEditMode] = useState(false)
    const [players, setPlayers] = useState(currentPlayers)
    
    const toggle_edit_mode = () => setEditMode(!editMode)

    return <>
        <Button onClick={toggle_edit_mode}>Toggle</Button>
        <br/>
        {editMode ? 
            <PlayersEditor initialPlayers={players} updatePlayers={setPlayers}/> : 
            <PlayersViewer {...{players}}/>
        }
        
        
    </>
}
PlayersViewAndEditor.propTypes = {
    players: PLAYERS_LIST_PROPTYPE.isRequired,
    updatePlayers: PropTypes.func.isRequired,
}

export function PlayersEditor({initialPlayers, updatePlayers}) {
    const fields = [
        {
            key: "player_name",
            placeholder: "שם השחקנ/ית",
        }, {
            key: "character_name",
            placeholder: "שם הדמות",
        }, {
            key: "description",
            flex: 1,
        }
    ]
    
    return <ControlledTupleEditor 
        data={initialPlayers} fields={fields} onChange={updatePlayers}
    />
}
PlayersViewAndEditor.propTypes = {
    initialPlayers: PLAYERS_LIST_PROPTYPE.isRequired,
    updatePlayers: PropTypes.func.isRequired,
}

export function PlayersViewer({players}) {
    
    
    return <>
        Players View
    </>
}
PlayersViewer.propTypes = {
    players: PLAYERS_LIST_PROPTYPE.isRequired
}