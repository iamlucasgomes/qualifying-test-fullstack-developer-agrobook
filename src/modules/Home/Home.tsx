import React from "react";
import { Typography } from 'antd';

const { Title } = Typography;

const Home: React.FC = () => {
  return (
    <div>
      <Title style={{color: '#002140'}}>Bem vindo</Title>
    </div>
  );
};

export default Home;