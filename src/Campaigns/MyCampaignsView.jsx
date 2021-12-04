import React, { useState } from "react";
import PropTypes from 'prop-types'
import {getDocs, collection} from 'firebase/firestore'

import {Row, Col, Card} from 'antd'

import { useAuth } from '../contexts/AuthContext'
import {db} from '../firebase/firebase'
import {CampaignCreator} from "./CampaignCreator";

function CampaignCard({name, description, created}) {
    return <Card title={name} extra={created}>
        {description}
    </Card>
}
CampaignCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    created: PropTypes.string,
}

export function CampaignsList() {
    const {currentUser} = useAuth()
    const [data, setData] = useState([])
    const [error, setError] = useState()

    getDocs(collection(db, 'accounts', currentUser.uid, 'campaigns'))
        .then(querySnapshot => setData(querySnapshot.docs.map(d => d.data())))
        .catch(e => setError(e))

    if (error) return `Error: ${error}`
    if (!data) return "Loading..."
    
    return data.map((d, i) => <CampaignCard key={i} name={d.name} description={d.description} />)

}

export default function MyCampaignsView() {
    return <Row >
        <Col span={12}>
            <CampaignsList />
        </Col>
        <Col span={12}>
            <CampaignCreator />
        </Col>
    </Row>
}