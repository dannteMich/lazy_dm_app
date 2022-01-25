import React from "react";
import PropTypes from 'prop-types'

// import _ from 'lodash'  TODO: use or delete
import {List, Typography, Checkbox} from 'antd'
import { SECTION_COLORS } from "../../common/consts";


const {Title} = Typography

export default function CluesView({clues}) {

    // const [cluesState, setCluesState] = useState(clues) TODO: use or delete

    function process_clues_to_node_list(clues) {
        let res = []
        clues.forEach(({category, items}) => {
            

            const unused_items = items.filter(i => !i.used).map(i => <Checkbox>
                {i.text}
            </Checkbox>)
            
            const mapped_used = items.filter(i => i.used).map(u => <Checkbox checked>
                <span style={{color: "grey", textDecoration: "line-through"}}>{u.text}</span>
            </Checkbox>)
            
            res = res.concat(<b>{category}</b>,unused_items,mapped_used)
            })
        return res
    
    }

    return <List 
        header={<Title level={4}>רמזים ומידע</Title>}
        style={{backgroundColor: SECTION_COLORS.clues, borderRadius: "10px"}}
        size="small"    
        bordered
        dataSource={process_clues_to_node_list(clues)} // TODO: should use cluesState
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