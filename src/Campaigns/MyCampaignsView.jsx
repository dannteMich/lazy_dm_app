import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import {getDocs, collection} from 'firebase/firestore'

import {Row, Col, ConfigProvider, Button, Modal} from 'antd'
import _ from 'lodash'

import { useAuth } from '../contexts/AuthContext'
import {db} from '../firebase/firebase'
import {CampaignCreator} from "./CampaignCreator";
import CampaignCard from "./CampaignCard";


export function CampaignListView({data})
{
    const inner = data.map(d => {return {
        name: d.name,
        description: d.description, 
        created: d.created.toDate(),
        updated: d.updated.toDate(),
    }}).sort((d1, d2) => d1.updated < d2.updated).map((d, i) => {
        return <Col key={i} style={{margin: "10px", width: "500px"}}>
            <CampaignCard {...d} />
        </Col>})
    return <Row justify="center">
        {inner}
    </Row>
}
CampaignListView.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        created: PropTypes.object,
        updated: PropTypes.object,
    })).isRequired
}

export function CampaignsList() {
    const {currentUser} = useAuth()
    const [data, setData] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        getDocs(collection(db, 'accounts', currentUser.uid, 'campaigns'))
        .then(querySnapshot => setData(querySnapshot.docs.map(d => d.data())))
        .catch(e => setError(e))
    }, [currentUser])

    if (error) return `Error: ${error}`
    if (!data) return "Loading..."
    if (_.isEmpty(data)) return "You don't have games yet"
    
    return <CampaignListView data={data} />

}

export default function MyCampaignsView() {
    const [modalVisible, setModalVisible] = useState(false)
    
    const closeModal = () => setModalVisible(false)
    const openModal = () => setModalVisible(true)

    return <ConfigProvider direction="rtl">
        <Modal visible={modalVisible} onCancel={closeModal} footer={null}>
            <CampaignCreator />
        </Modal>
        
        <Row justify="center">
            <Col>
                <Button type="primary" style={{margin: "40px"}} size="large" onClick={openModal}>
                    צור משחק חדש
                </Button>
            </Col>    
        </Row>
        <CampaignsList />
    </ConfigProvider>
}