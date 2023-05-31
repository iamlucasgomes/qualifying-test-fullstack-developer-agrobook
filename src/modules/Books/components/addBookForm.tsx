import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { useAppContext } from '@/hooks/useAppContext';
import { CloseOutlined } from '@ant-design/icons';
import { postBook } from '../services/services';
import Books from '../interfaces/Books';
import { getAuthors } from '@/modules/Authors/services/services';

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [loadings, setLoadings] = useState(false);
  const [authors, setAuthors] = useState([]);
  const { setIsAddingBook } = useAppContext();

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
      const book: Books = {
        nome,
        data_lancamento,
        descricao,
        categoria,
        autores: [autores],
      }
      form.resetFields();
      setLoadings(true);
      const response = await postBook(book);
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
        <a onClick={() => setIsAddingBook(false)}><CloseOutlined /></a>
      </div>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size="small"
        style={{ maxWidth: 900 }}
        labelAlign="left"
      >
        <Form.Item rules={[{ required: true, message: 'Por Favor, Preencha o nome do Livro' }]} label="Nome" name="nome">
          <Input />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Por Favor, Escolha a data de lançamento do Livro' }]} label="Data de Lançamento" name="data_lancamento">
          <DatePicker placeholder="Selecione a Data" />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Por Favor, Insira uma breve descrição do Livro' }]} label="Descrição" name="descricao">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Por Favor, Preencha a categoria do Livro' }]} label="Genero" name="categoria">
          <Input required />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Por Favor, Escolha o autor do Livro' }]} label="Autor" name="autores">
          <Select options={authors} />
        </Form.Item>
        <Button type="primary" loading={loadings} onClick={enterLoading}>
          Cadastrar
        </Button>
      </Form>
    </div >
  );
};

export default App;
