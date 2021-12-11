import React, { useState } from "react";
import PropTypes from 'prop-types'
import {Button, DatePicker, Typography} from 'antd'

import { DateTime } from "luxon";

const {Paragraph} = Typography

export default function UpdateDate({currentDate, updateDate}) {
    const [editMode, setEditMode] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null)

    if (editMode) {
        return <Paragraph>
            <span>
                תאריך חדש: 
            </span>
            <DatePicker 
                style={{margin: "5px 10px"}} 
                defaultValue={null} 
                onChange={d => setSelectedDate(DateTime.fromJSDate(d.toDate()))}
            />
            <Button onClick={() => setEditMode(false)}>
                ביטול
            </Button>
            <Button type="primary" disabled={selectedDate == null} 
                onClick={() => {updateDate(selectedDate); setEditMode(false)}}
            >
                עדכון
            </Button>
        </Paragraph>
    }
    
    return <Paragraph >
    {currentDate.toLocaleString(DateTime.DATE_SHORT)}
        <Button style={{margin: "5px 15px"}} onClick={() => setEditMode(true)}>
            שינוי תאריך
        </Button>
    </Paragraph>
}
UpdateDate.propTypes = {
    currentDate: PropTypes.instanceOf(DateTime).isRequired,
    updateDate: PropTypes.func.isRequired,
}