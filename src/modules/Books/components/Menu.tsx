import React from 'react';
import { Button, Space } from 'antd';
import { useAppContext } from '@/hooks/useAppContext';


const App: React.FC = () => {
  const { setIsAddingBook } = useAppContext();
  const onMenuClick = () => setIsAddingBook(true);

  return (
    <Space direction="horizontal">
      <Button onClick={onMenuClick} type="primary">Adicionar Livro</Button>
    </Space>
  )
};

export default App;