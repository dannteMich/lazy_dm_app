import React, { useState } from "react";
import PropTypes from 'prop-types'

import _ from 'lodash'
import {List, Typography, Checkbox} from 'antd'
import { SECTION_COLORS } from "../../common/consts";


const {Title} = Typography

export default function CluesView({clues}) {

    const [cluesState, setCluesState] = useState(clues)

    function process_clues_to_node_list(clues) {
        let res = []
        clues.forEach(({category, items, used}) => {
            
            const mapped_items = items ? items.map(i => <Checkbox>
                {i}
            </Checkbox>) : []
            
            const mapped_used = used ? used.map(u => <Checkbox checked>
                <span style={{color: "grey", textDecoration: "line-through"}}>{u}</span>
            </Checkbox>) : []
            
            res = res.concat(<b>{category}</b>,mapped_items,mapped_used)
            })
        return res
    
    }

    return <List 
        header={<Title level={4}>רמזים ומידע</Title>}
        style={{backgroundColor: SECTION_COLORS.clues, borderRadius: "10px"}}
        size="small"    
        bordered
        dataSource={process_clues_to_node_list(cluesState)}
        renderItem={item => <List.Item>
            {item}
        </List.Item>}
    />
}
CluesView.propTypes = {
    clues: PropTypes.arrayOf(PropTypes.shape({
        category: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.string),
        used: PropTypes.arrayOf(PropTypes.string),
    }))
}