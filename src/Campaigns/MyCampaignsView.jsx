import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { getDocs, collection } from 'firebase/firestore'

import { Row, Col, Button, Modal } from 'antd'
import _ from 'lodash'

import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase/firebase'
import { CampaignCreator } from "./CampaignCreator";
import CampaignCard from "./CampaignCard";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../common/Loading";
import Campaign from "./campaign";

export function CampaignListView({ data }) {
    const inner = data.map((d, i) => {
        return <Col key={i} style={{ margin: "10px", width: "500px" }}>
            <Link to={`./${d.id}`}>
                <CampaignCard {...d} />
            </Link>
        </Col>
    })
    return <Row justify="center">
        {inner}
    </Row>
}
CampaignListView.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
    })).isRequired
}

export function NoGamesYet() {
    return <div style={{ margin: "50px" }}>
        <p dir="rtl">עוד לא יצרת אף משחק.</p>
        <CampaignCreator />
    </div>

}

export default function MyCampaignsView() {
    const [modalVisible, setModalVisible] = useState(false)
    const { currentUser } = useAuth()
    const [data, setData] = useState()
    const [error, setError] = useState()

    const closeModal = () => setModalVisible(false)
    const openModal = () => setModalVisible(true)

    useEffect(() => {
        getDocs(collection(db, 'accounts', currentUser.uid, 'campaigns')
            .withConverter(Campaign.firestoreConvertor))
        .then(querySnapshot => setData(querySnapshot.docs.map(d => {
            return {
                id: d.id,
                ...d.data()
            }
        })))
        .catch(e => setError(e))
    }, [currentUser])

    if (error) return JSON.stringify(error)
    if (!data) return <LoadingSpinner />
    if (_.isEmpty(data)) return <NoGamesYet />

    return <div>
        <Modal visible={modalVisible} onCancel={closeModal} footer={null}>
            <CampaignCreator />
        </Modal>

        <Row justify="center">
            <Col>
                <Button type="primary" style={{ margin: "40px" }} size="large" onClick={openModal}>
                    צור משחק חדש
                </Button>
            </Col>
        </Row>
        <CampaignListView data={data} />
    </div>
}