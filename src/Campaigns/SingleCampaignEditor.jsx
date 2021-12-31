import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'

import { db } from '../firebase/firebase'
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router";
import { LoadingSpinner } from "../common/Loading";
import { Row, Col, Typography } from "antd";
import { EditTwoTone } from '@ant-design/icons'
import Campaign from "./campaign";
import SessionSelector from "../Sessions/SessionSelector";

const { Title, Paragraph } = Typography

export function EditCampaignDetials({ name, description, onNameUpdate, onDescriptionUpdate }) {
    const EditNameIcon = <span style={{ fontSize: "medium" }}><EditTwoTone /></span>
    return <>
        <Title level={2} editable={{ onChange: onNameUpdate, icon: EditNameIcon, tooltip: "שינוי שם משחק"}}>
            {name}
        </Title>
        <Paragraph editable={{ onChange: onDescriptionUpdate, autoSize: { minRows: 3 }, tooltip: "שינוי תאור משחק"}}>
            {description}
        </Paragraph>
    </>
}

export function SingleCampaignDisplay({ name, description, onNameUpdate, onDescriptionUpdate }) {
    
    return <Row gutter={24} style={{margin: "20px"}}>
        <Col span={24} lg={12}>
            <EditCampaignDetials {...{name, description, onNameUpdate, onDescriptionUpdate}}/>
        </Col>
        <Col span={24} lg={12}>
            <SessionSelector />
        </Col>
    </Row>
}
SingleCampaignDisplay.propTypes = {
    name: PropTypes.string.isRequired,
    onNameUpdate: PropTypes.func.isRequired,
    onDescriptionUpdate: PropTypes.func.isRequired,
    description: PropTypes.string,
}

export default function SingleCampaignEditor() {
    const { currentUser } = useAuth()
    const { campaignId } = useParams()
    const [campaign, setCampaign] = useState()
    const [error, setError] = useState()

    const campaignRef = doc(db, 'accounts', currentUser.email, 'campaigns', campaignId)
        .withConverter(Campaign.firestoreConvertor)

    useEffect(() => {
        return onSnapshot(campaignRef, d => {
            setCampaign(d.data())
        }, e => setError(e))
    }, [campaignRef])

    const updateCampaignFields = newFields => updateDoc(campaignRef, newFields)    

    if (error) return JSON.stringify(error)
    if (!campaign) return <LoadingSpinner />

    return <SingleCampaignDisplay {...{
        ...campaign,
        onNameUpdate: (name) => updateCampaignFields({name}),
        onDescriptionUpdate: (description) => updateCampaignFields({description})
    }} />
}

// TODO: allow to delete a campaign