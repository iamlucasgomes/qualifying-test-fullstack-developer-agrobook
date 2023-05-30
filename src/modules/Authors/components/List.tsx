import React, { useEffect, useState } from 'react';
import { Avatar, Col, Divider, List, Row, Skeleton, Space, Dropdown } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import mockAuthors from '../mocks/mockAuthor';
import Menu from '@/modules/Authors/components/Menu';
import { UserOutlined } from '@ant-design/icons';

interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
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
    <div
      id="scrollableDiv"
      className="custom-scrollbar"
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Menu />
      </div>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>Isso é tudo🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          size='small'
          dataSource={mockAuthors}
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
      </InfiniteScroll>
    </div>
  );
};

export default App;
