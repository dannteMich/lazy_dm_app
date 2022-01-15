import React from 'react'
import PropTypes from 'prop-types'

import _ from 'lodash'
import {Row, Col, Card} from 'antd'
import { useState } from 'react'
import Modal from 'antd/lib/modal/Modal'

const MEDIA_ENTRY_PROPTYPE = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string,
    })
])

export function InnerImageDisplay({height, width, media, style={}}) {
    const {url, title} = media
    return <div style={{display: "flex", flexDirection: "column", ...style}}>
            
    <img src={url} alt={title || ''} style={{objectFit: "cover", width: "100%", height: "100%"}}/>
    {title && <div style={{flex: 0, textAlign: "center", margin: "8px 0 0 0", fontWeight: "bold"}}>
        {title}
    </div>}
</div>
}
InnerImageDisplay.propTypes = {
    media: MEDIA_ENTRY_PROPTYPE.isRequired,
    // height: PropTypes.number,
    // width: PropTypes.number,
    onClick: PropTypes.func,
    style: PropTypes.object
}

export default function ImageGrid({media=[], cardSize = [200, 200], gutter=16}) {
    
    const [viewData, setViewData] = useState(null)
    
    const enriched_media = media.map(m => !_.isString(m) ? m : {url: m})
    const [height, width] = _.isArray(cardSize) ? cardSize : [cardSize, cardSize]

    return <>
        <Modal visible={viewData != null} onCancel={() => setViewData(null)} footer={null} closable={false}>
            {viewData && <InnerImageDisplay media={viewData} />}
        </Modal>
        
        <Row gutter={[gutter, gutter]}>
            {enriched_media.map((d) => <Col>
                <Card bodyStyle={{padding: 12}} hoverable onClick={() => setViewData(d)}>
                    <InnerImageDisplay media={d} style={{height, width}}/>
                </Card>
            </Col>)}
            
        </Row>
    </>
}
ImageGrid.propTypes = {
    links: PropTypes.arrayOf(MEDIA_ENTRY_PROPTYPE),
    cardSize: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number),
    ]),
    gutter: PropTypes.number
}