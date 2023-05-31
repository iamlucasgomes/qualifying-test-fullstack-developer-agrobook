import React from 'react';
import { Button, Space } from 'antd';
import { useAppContext } from '@/hooks/useAppContext';


const App: React.FC = () => {
  const { setAddingAuthor } = useAppContext();
  const onMenuClick = () => setAddingAuthor(true);

  return (
    <Space direction="horizontal">
      <Button onClick={onMenuClick} type="primary">Adicionar Autor</Button>
    </Space>
  )
};

export default App;