import React, { useState } from "react";
import PropTypes from 'prop-types'
import { Button, DatePicker     } from 'antd'

import { DateTime } from "luxon";

export default function UpdateDate({ currentDate, updateDate }) {
    const [editMode, setEditMode] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null)

    if (editMode) {
        return <div style={{ display: "inline", margin: "0 5px" }}>
            <DatePicker
                style={{ margin: "5px 10px" }}
                defaultValue={null}
                onChange={d => setSelectedDate(DateTime.fromJSDate(d.toDate()))}
            />
            <Button onClick={() => setEditMode(false)}>
                ביטול
            </Button>
            <Button type="primary" disabled={selectedDate == null}
                onClick={() => { updateDate(selectedDate); setEditMode(false) }}
            >
                עדכון
            </Button>
        </div>
    }

    return <div style={{ display: "inline", margin: "0 5px" }}>
        {currentDate.toLocaleString(DateTime.DATE_SHORT)}
        <Button style={{ margin: "5px 15px" }} onClick={() => setEditMode(true)} size="small">
            שינוי תאריך
        </Button>
    </div>
}
UpdateDate.propTypes = {
    currentDate: PropTypes.instanceOf(DateTime).isRequired,
    updateDate: PropTypes.func.isRequired,
}