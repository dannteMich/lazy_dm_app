import React from "react";
import PropTypes from 'prop-types'

import _ from 'lodash'
import { SECTION_COLORS } from "../../common/consts";

import CollapsableElementEditor from "./CollapsableElementEditor";

const NAME_DESC_MEDIA_PROPTYPE = PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    mediaUrl: PropTypes.string
})

export function NpcsEditor({npcs=[], updateNpcs, prevNpcs}) {
    return <CollapsableElementEditor 
        header={<b>דמויות</b>} presetEntries={prevNpcs}
        initialData={npcs} onSave={updateNpcs}
        style={{backgroundColor: SECTION_COLORS.npcs}}
        fields={[
            {
                key: "name",
                placeholder: "שם הדמות",
                maxWidth: 140
            }, {
                key: "description",
                flex: 1,
                placeholder: "תיאור",
            }, {
                key: "mediaUrl",
                placeholder: "קישור לתמונה",
                maxWidth: 110
            }
        ]}
    />
}
NpcsEditor.propTypes = {
    npcs: PropTypes.arrayOf(NAME_DESC_MEDIA_PROPTYPE),
    updateNpcs: PropTypes.func.isRequired,
    prevNpcs: PropTypes.arrayOf(NAME_DESC_MEDIA_PROPTYPE),
}

export function LocationsEditor({locations, updateLocations, prevLocation}) {
    return <CollapsableElementEditor 
        header={<b>מקומות</b>} presetEntries={prevLocation}
        initialData={locations} onSave={updateLocations}
        style={{backgroundColor: SECTION_COLORS.locations}}
        fields={[
            {
                key: "name",
                placeholder: "שם המקום",
                maxWidth: 200
            }, {
                key: "description",
                flex: 1,
                placeholder: "תיאור",
                maxLength: 500,
            }, {
                key: "mediaUrl",
                placeholder: "קישור לתמונה",
                maxWidth: 110
            }
        ]}
    />
}

export function RnadomEncountersEditor({encounters, updateEncounters}) {
    return <CollapsableElementEditor 
        header={<b>Random Encounters</b>}
        initialData={encounters} onSave={updateEncounters}
        style={{backgroundColor: SECTION_COLORS.encounters}} fields={[
            {
                key: "name",
                label: "תוצאות קוביה",
                placeholder: "טווח בקוביה"
            }, {
                key: "description",
                label: "אירוע",
                placeholder: "פירוט האירוע",
                flex: 1
            }
        ]}
    />    
}
RnadomEncountersEditor.propTypes = {
    encounters: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
    })), // TODO: change the shape to be roll, description
    updateEncounters: PropTypes.func.isRequired,
}

export function ExtraMediaEditor({media, updateMedia}) {
    return <CollapsableElementEditor 
        header={<b>תמונות</b>}
        initialData={media} onSave={updateMedia}
        validateDataFunction={data => {
            if (data.some(d => _.isEmpty(d.url))) throw Error("Must provide URL")}
        } 
        style={{border: "solid 1px #c0c0c0"}} fields={[
            {
                key: "title",
                placeholder: "כותרת לתמונה"
            }, {
                key: "url",
                label: "קישור",
                placeholder: "קישור לתמונה: URL",
                flex: 1
            }
        ]}
    />
}
ExtraMediaEditor.propTypes = {
    media: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string,
    })),
    updateMedia: PropTypes.func.isRequired,
}
