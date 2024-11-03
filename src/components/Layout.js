import React from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
//   UserOutlined,
} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
const {Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];
const LayoutComponent = ({children}) => {
  
  return (
    <Layout
      style={{
        minHeight: '100vh',
        
      }}
    >
      <Sider>
        <div className="demo-logo-vertical" />
        <Menu style={{backgroundColor : 'white'}} theme="light" defaultSelectedKeys={['1']} mode="inline" className='text-dark' items={items} />
      </Sider>
      <Layout>
        <Content>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutComponent;