import React from "react";
import { Typography } from 'antd';

const { Title } = Typography;

const Home: React.FC = () => {
  return (
    <div>
      <Title style={{color: '#1677FF'}}>Bem vindo a Livraria</Title>
    </div>
  );
};

export default Home;