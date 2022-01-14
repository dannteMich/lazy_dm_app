import React from 'react'
import PropTypes from 'prop-types'

import _ from 'lodash'

import { SECTION_COLORS } from '../common/consts'
import CollapsableElementEditor from './CollapsableElementEditor'


export default function NamesEditor({names, saveNames}) {
    
    function validationFunction(newNames) {
        newNames.forEach(({category, items}) => {
            if (_.isEmpty(category)) {
                throw Error("Cant have an empty name category")
            }
            if (_.isEmpty(items)) {
                throw Error("Can't have an empty list of names")
            }
        })
    }
    
    const flattenName = ({items, ...r_name}) => ({...r_name, items: items.join(", ")})
    const rebuildNameObject = ({items, ...r_name}) => ({
        ...r_name, 
        items: items.split(/[, ]/).filter(s => !_.isEmpty(s))
    })
    
    // TODO: add previus names
    // TODO: handle used names
    
    return <CollapsableElementEditor
        header={<b>שמות</b>} 
        validateDataFunction={validationFunction}
        initialData={names.map(flattenName)} 
        onSave={newNames => saveNames(newNames.map(rebuildNameObject))}
        style={{backgroundColor: SECTION_COLORS.names}} fields={[
            {
                key: "category",
                label: "קטגוריה",
                maxLength: 30,
                maxWidth: 200
            }, {
                key: "items",
                label: "שמות",
                placeholder: "רשימת שמות מופרדת ברווחים ו/או פסיקים",
                flex: 1
            }
        ]}
    />    
}
NamesEditor.propTypes = {
    names: PropTypes.arrayOf(PropTypes.shape({
        category: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.string)
    })).isRequired,
    saveNames: PropTypes.func.isRequired,
}