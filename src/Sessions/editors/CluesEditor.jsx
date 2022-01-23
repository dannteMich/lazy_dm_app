import React from 'react'
import PropTypes from 'prop-types'

import _ from 'lodash'
import {SECTION_COLORS} from '../../common/consts'
import SingleCollapsable from '../../common/SingleCollapsable'
import CategorizedListEditor from "../../common/CategorizedListEditor";

export default function CluesEditor({clues=[], updateClues}) {
    
    const clues_to_display = clues.map(({category, items}) => {
        const unused_items = items.filter(i => _.isString(i) || !i.used)
        return {
            category,
            items: unused_items.map(i => _.isString(i) ? i : i.text)
        }
    })

    const saveClues = clues => {
        const new_clues = clues.map(({category, items}) => {
            return {
                category,
                items: items.map(i => ({text: i, used: false}))
            }
        })
        console.log(new_clues)
        // TODO: need to add the used ones before continuing
        updateClues(clues)
    }
    
    
    return <SingleCollapsable ghost header={<b>רמזים ומידע</b>} style={{backgroundColor: SECTION_COLORS.clues, border: "solid 1px #c0c0c0"}}>
        <CategorizedListEditor 
            initialData={clues_to_display}
            onDataUpdate={saveClues}
        />    
    </SingleCollapsable>
}
CluesEditor.propTypes = {
    clues: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string, // TODO: not in the future
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            used: PropTypes.bool.isRequired
        })
    ])),
    updateClues: PropTypes.func.isRequired
}