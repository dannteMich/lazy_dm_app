import React from 'react'
import PropTypes from 'prop-types'

import _ from 'lodash'
import {Row, Col, Card} from 'antd'
import { useState } from 'react'
import Modal from 'antd/lib/modal/Modal'

const MEDIA_ENTRY_PROPTYPE = PropTypes.oneOfType([ // TODO: should be only the shape
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
    onClick: PropTypes.func,
    style: PropTypes.object
}


function getImageWithDivider(imgWidth, imgHeight) {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * 0.82 // the modal starts a bit lower
    return _.max([imgWidth/vw, imgHeight/vh, 1])
}

function callbackOnImageSize(imgUrl, callBack) {
    var img = new Image();
    img.src = imgUrl;
    img.onload = function() { callBack(this.width, this.height); }
}

export function MediaModal({media, onClose}) {
    const [imgSize, setImgSize] = useState([null, null])
    if (media == null) return null
    
    callbackOnImageSize(media.url, (w, h) => setImgSize([w,h]))
    const [imgWidth, imgHeight] = imgSize
    const divider = getImageWithDivider(imgWidth, imgHeight)
    
    return <Modal visible={media != null} footer={null} closable={false} 
            onCancel={onClose} width={imgWidth / divider}>
        {media && <InnerImageDisplay media={media} />}
    </Modal>
}
MediaModal.propTypes = {
    media: PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired
}

export default function ImageGrid({media=[], cardSize = [200, 200], gutter=16}) {
    
    const [viewData, setViewData] = useState(null)
    
    const enriched_media = media.map(m => !_.isString(m) ? m : {url: m})
    const [height, width] = _.isArray(cardSize) ? cardSize : [cardSize, cardSize]

    return <>
        <MediaModal media={viewData} onClose={() => setViewData(null)}/>
        <Row gutter={[gutter, gutter]}>
            
            {enriched_media.map((d, i) => <Col key={i}>
                <Card bodyStyle={{padding: 12}} hoverable onClick={() => setViewData(d)}>
                    <InnerImageDisplay media={d} style={{height, width}}/>
                </Card>
            </Col>)}

        </Row>
    </>
}
ImageGrid.propTypes = {
    media: PropTypes.arrayOf(MEDIA_ENTRY_PROPTYPE),
    cardSize: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number),
    ]),
    gutter: PropTypes.number
}