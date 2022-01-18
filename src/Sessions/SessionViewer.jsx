import React from "react";
import PropTypes from 'prop-types'

import _ from 'lodash'
import { DateTime } from "luxon";

import { Row, Col, Space, List, Typography } from 'antd'

import Session from "./session";
import { SECTION_COLORS } from "../common/consts";
import { Link } from "react-router-dom";
import ImageGrid from "../common/ImageGrid";
import { SessionPairDescription } from "./viewers/SessionPairDescription";

const {Title} = Typography

export const DESCRIPTION_STYLE = {padding: "2px 10px", borderRadius: "10px"}



function process_names_to_name_descriptions(names) {
    return names.map(({category, items}) =>  {
        return {
            name: category,
            description: items.join(", ")
        }
    })
}

function process_clues_to_node_list(clues) {
    let res = []
    clues.forEach(({category, items}) => {
        res.push(<b>{category}</b>)
        items.forEach(e => res.push(e))
    })
    return res

}

function parse_media_from_session(session) {
    return _.concat([],
        session.npcs.filter(x => _.has(x, 'mediaUrl')).map(x => ({title: x.name, url: x.mediaUrl})),
        session.locations.filter(x => _.has(x, 'mediaUrl')).map(x => ({title: x.name, url: x.mediaUrl})),
        session.media,
    )
}

export default function SessionViewer({session}) {
    const names_data = process_names_to_name_descriptions(session.names)
    const clues_data = process_clues_to_node_list(session.clues)

    return <Space direction="vertical" size={"middle"} >
        <Row gutter={16}>
            <Col span={12}>
                <Title level={5}>
                    {session.date.toLocaleString(DateTime.DATE_SHORT)} {session.name}
                </Title>
            </Col>
            <Col span={12}>
                <Link to="./edit">עריכה</Link>
            </Col>
        </Row>
        
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <SessionPairDescription 
                    title="דמויות" data={session.npcs} 
                    style={{backgroundColor: SECTION_COLORS.npcs}}
                />
            </Col>
            <Col span={12}>
                <SessionPairDescription 
                    title="מקומות" data={session.locations} 
                    style={{backgroundColor: SECTION_COLORS.locations}}
                />
            </Col>
            <Col span={12}>
                <SessionPairDescription 
                    title="סצנות" data={session.scenes} 
                    style={{backgroundColor: SECTION_COLORS.scenes}}
                />
            </Col>
            <Col span={12}>
                <SessionPairDescription 
                    title="Encounters" data={session.encounters} 
                    style={{backgroundColor: SECTION_COLORS.encounters}}
                />
            </Col>
            <Col span={12}>
                <SessionPairDescription 
                    title="שמות" data={names_data} 
                    style={{backgroundColor: SECTION_COLORS.names}}
                />
            </Col>
            <Col span={12}>
                <List 
                    header={<Title level={4}>רמזים ומידע</Title>}
                    style={{backgroundColor: SECTION_COLORS.clues, borderRadius: "10px"}}
                    size="small"    
                    bordered
                    dataSource={clues_data}
                    renderItem={item => <List.Item>
                        {item}
                    </List.Item>}
                />
            </Col>
            <Col span={24}>
                <ImageGrid media={parse_media_from_session(session)}/>
            </Col>
        </Row>
        
    </Space>
}
SessionViewer.propTypes = {
    session: PropTypes.instanceOf(Session)
}
