import React from "react";
import PropTypes from 'prop-types'

import _ from 'lodash';
import { Descriptions, Typography } from 'antd';

import { DESCRIPTION_STYLE } from "../SessionViewer";

const {Title} = Typography

export default function SessionPairDescription({ title, data, style = {} }) {

    const title_element = _.isString(title) ? <Title level={4}>{title}</Title> : title;

    return <div style={{ ...DESCRIPTION_STYLE, ...style }}>
        {title_element}
        <Descriptions layout="horizontal" column={1} size="small">
            {data.map(({ name, description }) => {
                return <Descriptions.Item key={name} label={<b>{name}</b>}>
                    {description}
                </Descriptions.Item>;
            })}
        </Descriptions>
    </div>;
}
SessionPairDescription.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    style: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired
}
