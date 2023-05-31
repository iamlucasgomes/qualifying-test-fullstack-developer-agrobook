import React, { useState } from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import { postAuthor } from '../services/services';
import { useAppContext } from '@/hooks/useAppContext';
import { CloseOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [loadings, setLoadings] = useState(false);

  const { setAddingAuthor } = useAppContext();

  const enterLoading = () => {
    form.validateFields().then(async (values) => {
      form.resetFields();
      setLoadings(true);
      const response = await postAuthor(values);
      if (response.status === 'success') {
        setLoadings(false);
        setAddingAuthor(false);
      }
    });
  };

  const { TextArea } = Input;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <a onClick={() => setAddingAuthor(false)}><CloseOutlined /></a>
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
        <Form.Item rules={[{ required: true, message: 'Por Favor, Preencha o nome do Autor' }]} label="Nome" name="nome">
          <Input />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Por Favor, Selecione a Data de Nascimento do Autor' }]} label="Data de Nascimento" name="data_nascimento">
          <DatePicker placeholder="Selecione a Data" />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Por Favor, Preencha a Biografia do Autor' }]} label="Biografia" name="biografia">
          <TextArea rows={4} />
        </Form.Item>
        <Button type="primary" loading={loadings} onClick={enterLoading}>
          Cadastrar
        </Button>
      </Form>
    </div>
  );
};

export default App;
