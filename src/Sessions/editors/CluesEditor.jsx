import React from 'react'
import PropTypes from 'prop-types'

import _ from 'lodash'
import {SECTION_COLORS} from '../../common/consts'
import SingleCollapsable from '../../common/SingleCollapsable'
import CategorizedListEditor from "../../common/CategorizedListEditor";

/**
 * Chages the category_list IN PLACE and adds the item to the right category (creates it if needed)
 * @param {*} category_list 
 * @param {*} category 
 * @param {*} text 
 */
function add_clue_to_category_list(category_list, category, text) {
    let category_index = _.findIndex(category_list, c => c.category === category)
    if (category_index === -1) {
        category_list.push({category, items: []})
        category_index = category_list.length - 1
    }
    category_list[category_index].items.push(text)
}

export function parse_clues_to_used_and_unused(clues) {
    
    const [used_clues, unused_clues] = [[], []]

    clues.forEach(({category, items}) => {
        items.forEach(({text, used}) => {
            if (used) {
                add_clue_to_category_list(used_clues, category, text)
            } else {
                add_clue_to_category_list(unused_clues, category, text)
            }
        })
    })

    return {used_clues, unused_clues}
}

export default function CluesEditor({clues=[], updateClues}) {
    const {unused_clues, used_clues} = parse_clues_to_used_and_unused(clues)
    
    const saveClues = clues => {
        const new_clues = clues.map(({category, items}) => {
            let clues_group =  {
                category,
                items: items.map(i => ({text: i, used: false}))
            }
            return clues_group
        })
        used_clues.forEach(({category, items}) => {
            let category_index = _.findIndex(new_clues, c => c.category === category)
            if (category_index === -1) {
                new_clues.push({category, items: []})
                category_index = new_clues.length - 1
            }
            items.forEach(text => new_clues[category_index].items.push({text, used: true}))
        })
        
        updateClues(new_clues)
    }
    
    return <SingleCollapsable ghost header={<b>רמזים ומידע</b>} style={{backgroundColor: SECTION_COLORS.clues, border: "solid 1px #c0c0c0"}}>
        <CategorizedListEditor 
            initialData={unused_clues}
            onDataUpdate={saveClues}
        />    
    </SingleCollapsable>
}
CluesEditor.propTypes = {
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