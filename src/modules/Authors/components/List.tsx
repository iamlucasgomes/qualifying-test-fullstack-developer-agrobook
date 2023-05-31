import React, { useEffect, useState } from 'react';
import { Avatar, Col, List, Row } from 'antd';
import Menu from '@/modules/Authors/components/Menu';
import { UserOutlined } from '@ant-design/icons';
import { getAuthors } from '../services/services';
import Author from '../interfaces/Author';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Author[]>([]);
  const position  = 'bottom';
  const align = 'center';

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    getAuthors()
      .then((body) => {
        setData([...data, ...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Menu />
      </div>
      <List
      pagination={{ position, align }}
        size='small'
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.nome}>
            <Row>
              <Col span={24}>
                <List.Item.Meta
                  avatar={<Avatar style={{ backgroundColor: '#1677ff' }} icon={<UserOutlined />} />}
                  title={<p style={{ whiteSpace: 'nowrap' }}>{item.nome}</p>}
                  description={<p>
                    <strong style={{ color: '#000000' }}>Nascimento: </strong>
                    {new Date(item.data_nascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                  </p>}
                />
              </Col>
              <Col span={24}>
                <p>{item.biografia}</p>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
};

export default App;
