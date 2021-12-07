import {ConfigProvider} from 'antd'

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
  (Story) => (<ConfigProvider direction="rtl">
    <Story />
  </ConfigProvider>),
];