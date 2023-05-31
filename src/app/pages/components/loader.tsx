
import React from 'react';
import { Spin, theme } from 'antd';
const {
  token: { colorBgContainer },
} = theme.useToken();

const App: React.FC = () => (
  <div style={{ padding: 24, minHeight: 360, color: 'GrayText', background: colorBgContainer }}>
    <Spin size="large" />
  </div>

);

export default App;