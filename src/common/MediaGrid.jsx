import React from 'react'
import PropTypes from 'prop-types'

import _ from 'lodash'
import {Row, Col, Card} from 'antd'

const MEDIA_ENTRY_PROPTYPE = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string,
    })
])

export default function MediaGrid({media=[], cardSize = [180, 150]}) {
    
    const enriched_media = media.map(m => !_.isString(m) ? m : {url: m})
    const [height, width] = cardSize

    return <Row gutter={[8, 8]}>
        {enriched_media.map(({url, title}) => <Col>
            <Card hoverable style={{backgroundImage: `url(${url})`, height: height, width: width, backgroundPosition: "center", backgroundSize: "cover"}}>
                
            </Card>
        </Col>)}
        
    </Row>
}
MediaGrid.propTypes = {
    links: PropTypes.arrayOf(MEDIA_ENTRY_PROPTYPE),
    cardSize: PropTypes.arrayOf(PropTypes.number),
}