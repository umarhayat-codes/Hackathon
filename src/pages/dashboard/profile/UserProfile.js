import React, { useState } from 'react';
import {
  CreditCardOutlined, EnvironmentOutlined, HeartOutlined, NotificationOutlined,
  SettingOutlined, ShoppingOutlined, UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Order from './Order';
import WishList from './WishList';
import PersonalInfo from './PersonalInfo';

const { Sider, Content } = Layout;

export default function UserProfile() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('1');

  const renderContent = () => {
    switch (selectedMenu) {
      case '1':
        return <PersonalInfo />;
      case '2':
        return <Order />;
      case '3':
        return <WishList />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="profile-avatar" style={{ textAlign: 'center', padding: '16px' }}>
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="User Avatar"
            style={{ borderRadius: '50%', width: collapsed ? '40px' : '80px' }}
          />
          {!collapsed && (
            <div>
              <span>Hello,</span>
              <br />
              <span>Robert Fox</span>
              <hr />
            </div>
          )}
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} onClick={(e) => setSelectedMenu(e.key)}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Personal Information
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingOutlined />}>
            My Orders
          </Menu.Item>
          <Menu.Item key="3" icon={<HeartOutlined />}>
            My Wishlist
          </Menu.Item>
          <Menu.Item key="4" icon={<EnvironmentOutlined />}>
            Manage Addresses
          </Menu.Item>
          <Menu.Item key="5" icon={<CreditCardOutlined />}>
            Saved Cards
          </Menu.Item>
          <Menu.Item key="6" icon={<NotificationOutlined />}>
            Notifications
          </Menu.Item>
          <Menu.Item key="7" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content style={{ margin: '24px', padding: '24px', backgroundColor: '#fff', minHeight: '280px' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}
