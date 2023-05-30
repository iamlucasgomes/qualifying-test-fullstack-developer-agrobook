import React, { useState } from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import { postAuthor } from '../services/services';
import { useAppContext } from '@/hooks/useAppContext';

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
        <Form.Item label="Data de Nascimento" name="data_nascimento">
          <DatePicker placeholder="Selecione a Data" />
        </Form.Item>
        <Form.Item label="Biografia" name="biografia">
          <TextArea rows={4} />
        </Form.Item>
        <Button type="primary" loading={loadings} onClick={enterLoading}>
          Cadastrar
        </Button>
      </Form>
  );
};

export default App;