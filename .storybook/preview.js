import {ConfigProvider, Row, Col} from 'antd'
import {BrowserRouter as Router} from 'react-router-dom'

import 'antd/dist/antd.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  Story => <Router>
    <ConfigProvider direction="rtl">
      <Row>
        <Col span={24}>
          <Story />
        </Col>
      </Row>
    </ConfigProvider>
  </Router>
];