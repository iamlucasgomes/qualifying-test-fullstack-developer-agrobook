import React, { MouseEventHandler } from 'react';
import { Button, Space } from 'antd';

const onMenuClick: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement> = (e) => {
  console.log('click', 'vou ser uma action');
};

const App: React.FC = () => (
  <Space direction="horizontal">
    <Button onClick={onMenuClick} type="primary">Adicionar Autor</Button>
  </Space>
);

export default App;