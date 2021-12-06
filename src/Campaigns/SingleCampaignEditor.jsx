import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import {collection, getDoc, doc} from 'firebase/firestore'

import {db} from '../firebase/firebase'
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router";
import { LoadingSpinner } from "../common/Loading";

export function SingleCampaignDisplay({name, description, created, updated}) {
    return <div>
        <p>{name}</p>
        <p>{description}</p>
        <p>{created.toISOString()}</p>
        <p>{updated.toISOString()}</p>
    </div>
}
SingleCampaignDisplay.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    created: PropTypes.instanceOf(Date),
    updated: PropTypes.instanceOf(Date),
}

export default function SingleCampaignEditor() {
    const {currentUser} = useAuth()
    const {campaignId} = useParams()
    const [campaign, setCampaign] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        getDoc(doc(db, 'accounts', currentUser.uid, 'campaigns', campaignId))
        .then(doc => doc.data()).then(data => setCampaign({
            ...data,
            created: data.created.toDate(),
            updated: data.updated.toDate(),
        }))
        .catch(e => setError(e))
    })
    
    if (error) return JSON.stringify(error)
    if (!campaign) return <LoadingSpinner />

    return <SingleCampaignDisplay {...campaign} />
}