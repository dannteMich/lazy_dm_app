import React from "react";
import PropTypes from 'prop-types'

import { Card, Typography } from "antd";
import { useParams, Link } from 'react-router-dom';
import Session from "./session";
import { padArray } from "../common/utils";

const {Title} = Typography



export function SessionList({ sessions }) {
    const { campaignId } = useParams();
    
    const cards = sessions.sort((s1, s2) => s1.date < s2.date).map(session => {      
        const cardHeader = <Title level={4}>
            {session.getDateString()} - {session.name}
        </Title>
        
        return <div key={session.id}>
            <Link to={`/campaigns/${campaignId}/sessions/${session.id}`}>
                <Card title={cardHeader} hoverable>
                    {session.description || "אין תיאור נוסף"}
                </Card>
            </Link>
        </div>;
    })

    const cards_with_deviders = padArray(cards, () => <div style={{display: "flex", height: "60px", padding: "4px"}}>
        <div style={{flex: "1"}} />
        
        <div style={{flex: "1"}} />

    </div>)
    
    return <div>
        {cards_with_deviders}
    </div>;
}
SessionList.propTypes = {
    sessions: PropTypes.arrayOf(PropTypes.instanceOf(Session)).isRequired,
}