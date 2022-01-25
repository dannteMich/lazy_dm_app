import React, {useState} from "react";
import PropTypes from 'prop-types'

import _ from 'lodash'  
import {List, Typography, Checkbox, Button} from 'antd'
import { SECTION_COLORS } from "../../common/consts";


const {Title} = Typography

const used_clues_style = {color: "grey", textDecoration: "line-through"}
const panel_style = {
    padding: "2px 10px",
    border: "1px solid #d9d9d9", 
    borderRadius: "10px", 
    backgroundColor: SECTION_COLORS.clues, 
}

export default function CluesView({clues, updateClues}) {

    const [cluesState, setCluesState] = useState(clues)

    function toggle_clue(category_index, item_index) {
        const newClues = cluesState.slice()
        newClues[category_index] = Object.assign({}, newClues[category_index], {items: newClues[category_index].items})
        newClues[category_index].items = cluesState[category_index].items.slice()
        const item = newClues[category_index].items[item_index]

        newClues[category_index].items[item_index] = Object.assign({}, item, {used: !item.used})
        setCluesState(newClues)
    }
    
    
    function process_clues_to_node_list() {
        let res = []
        cluesState.forEach(({category, items}, category_index) => {
            
            const item_nodes = items.map(({text, used}, item_index) => <Checkbox
                checked={used} 
                style={used ? used_clues_style : {}}
                onChange={() => toggle_clue(category_index, item_index)}
            >
                {text}
            </Checkbox>)
            
            
            res = res.concat(<b>{category}</b>,item_nodes)
        })
        return res
    }

    return <div style={panel_style}>
        <div style={{display: "flex"}}>
            <Title level={4} style={{flex: 1}}>רמזים ומידע</Title>
            <Button size="small" style={{flex: 0, margin: 6}} 
                disabled={_.isEqual(cluesState, clues)}
            >
                שמירה
            </Button>
        </div>

        <List             
            size="small"    
            dataSource={process_clues_to_node_list()}
            renderItem={item => <List.Item>
                {item}
            </List.Item>}
        />
    </div>
}
CluesView.propTypes = {
    clues: PropTypes.arrayOf(PropTypes.shape({
        category: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                text: PropTypes.string.isRequired,
                used: PropTypes.bool.isRequired
            })
        ),
    })),  
    updateClues: PropTypes.func.isRequired
}