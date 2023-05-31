import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, Input, List, Row } from 'antd';
import Menu from '@/modules/Books/components/Menu';
import { BookOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import Books from '../interfaces/Books';
import { deleteBook, getBooks } from '../services/services';
import { useAppContext } from '@/hooks/useAppContext';
import { FilterValue } from 'antd/es/table/interface';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Books[]>([]);
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const [authorFilter, setAuthorFilter] = useState<string>('');
  const { setIsUpdatingBook, setSelectedBook } = useAppContext();
  const position = 'bottom';
  const align = 'center';

  const loadData = () => {
    setLoading(true);
    getBooks()
      .then((body) => {
        setData([...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const removeBook = async (id: number) => {
    deleteBook(id).then(() => {
      loadData();
    }
    )
  };

  const handleAuthorFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorFilter(e.target.value);
  };

  const filterData = (data: Books[]) => {
    if (authorFilter === '') {
      return data;
    }

    return data.filter(livro => livro.autores
      .toString()
      .toLowerCase()
      .includes(authorFilter.toLowerCase()));

  };

  const filteredData = filterData(data);

  const onUpdateClick = (id: number) => {
    setIsUpdatingBook(true);
    setSelectedBook(id);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Input
          placeholder="Filtrar por Autor"
          value={authorFilter}
          onChange={handleAuthorFilterChange}
          style={{ width: 200, marginRight: '0.5%' }}
        />
        <Button onClick={() => setAuthorFilter('')} style={{ marginRight: '1%' }}>Limpar filtro</Button>
        <Menu />
      </div>
      <List
        pagination={{ position, align }}
        size='small'
        loading={loading}
        dataSource={filteredData}
        renderItem={(item) => (
          <List.Item
            key={item.nome}
            actions={[<a key={`${item.nome}-edit`} onClick={() => onUpdateClick(Number(item.id))}><EditTwoTone /></a>,
            <a key={`${item.nome}-delete`} onClick={() => removeBook(Number(item.id))}><DeleteTwoTone twoToneColor="#FF0000" /></a>]}
          >
            <Row>
              <Col span={24}>
                <List.Item.Meta
                  avatar={<Avatar style={{ backgroundColor: '#1677ff' }} icon={<BookOutlined />} />}
                  title={<p style={{ whiteSpace: 'nowrap' }}>{item.nome}</p>}
                  description={<p>
                    <strong style={{ color: '#000000' }}>
                      Lançamento: </strong>{new Date(item.data_lancamento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                  </p>}
                />
              </Col>
              <Col span={24}>
                <p><strong style={{ color: '#000000' }}>Genero: {item.categoria}</strong></p>
                <p>Escrito por {item.autores}</p>
                <p>{item.descricao}</p>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
};

export default App;
