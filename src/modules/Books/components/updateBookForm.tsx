import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { useAppContext } from '@/hooks/useAppContext';
import { CloseOutlined } from '@ant-design/icons';
import { patchBook } from '../services/services';
import { getAuthors } from '@/modules/Authors/services/services';
import updateBooks from '../interfaces/updateBooks';

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [loadings, setLoadings] = useState(false);
  const [authors, setAuthors] = useState([]);
  const { selectedBook, setIsAddingBook, setIsUpdatingBook } = useAppContext();

  useEffect(() => {
    getAuthors().then((response) => {
      const map = response.map((author: any) => {
        return {
          label: author.nome,
          value: author.id,
        }
      })
      setAuthors(map);
    });
  }, []);

  const enterLoading = () => {
    form.validateFields().then(async (values) => {
      const { nome, data_lancamento, descricao, categoria, autores } = values;
      const book: updateBooks = {
        nome,
        data_lancamento,
        descricao,
        categoria,
        autores: [autores],
      }
      form.resetFields();
      setLoadings(true);
      const response = await patchBook(selectedBook, book);
      console.log(response);
      if (response.status === 'success') {
        setLoadings(false);
        setIsAddingBook(false);
      }
      setLoadings(false);
    });
  };

  const { TextArea } = Input;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <a onClick={() => setIsUpdatingBook(false)}><CloseOutlined /></a>
      </div>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size="small"
        style={{ maxWidth: 800 }}
        labelAlign="left"
      >
        <Form.Item label="Nome" name="nome">
          <Input />
        </Form.Item>
        <Form.Item label="Data de Lançamento" name="data_lancamento">
          <DatePicker placeholder="Selecione a Data" />
        </Form.Item>
        <Form.Item label="Descrição" name="descricao">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Genero" name="categoria">
          <Input required />
        </Form.Item>
        <Form.Item label="Autor" name="autores">
          <Select options={authors} />
        </Form.Item>
        <Button type="primary" loading={loadings} onClick={enterLoading}>
          Atualizar
        </Button>
      </Form>
    </div >
  );
};

export default App;
