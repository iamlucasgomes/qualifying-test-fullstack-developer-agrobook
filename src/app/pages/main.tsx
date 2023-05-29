'use client'
import React, { useState } from 'react';
import {
  HomeOutlined,
  UserOutlined,
  BookOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import Home from '@/modules/Home/Home';
import Authors from '@/modules/Authors/Authors';
import Books from '@/modules/Books/Books';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number] & MenuItemType;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Home', '1', <HomeOutlined />),
  getItem('Autores', '2', <UserOutlined />),
  getItem('Livros', '3', <BookOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState<React.ReactNode>('Home');
  const [breadcrumbItems, setBreadcrumbItems] = useState<React.ReactNode[]>(['Home', '']);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuItemSelect = ({ keyPath }: { keyPath: React.Key[] }) => {
    const selectedKey = keyPath[keyPath.length - 1];
    const selectedMenuItem = items.find((item) => item?.key === selectedKey);

    if (selectedMenuItem) {
      setBreadcrumbItems(['Home', selectedMenuItem.label !== 'Home' ? selectedMenuItem.label : '']);
      setPage(selectedMenuItem.label);
    }
  };

  let content: React.ReactNode;

  switch (page) {
    case 'Autores':
      content = <Authors />;
      break;
    case 'Livros':
      content = <Books />;
      break;
    default:
      content = <Home />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onSelect={handleMenuItemSelect}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumbItems.map((item, index) => (
              <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, color: 'GrayText', background: colorBgContainer }}>
            {content}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
