import React from "react";
import {Row, Col} from 'antd'
import CreateCampaignView from "./CreateCampaignView";

export default function MyCampaignsView() {
    return <Row >
        <Col span={12}>My Campaigns View</Col>
        <Col span={12}>
            <CreateCampaignView />
        </Col>
    </Row>
}