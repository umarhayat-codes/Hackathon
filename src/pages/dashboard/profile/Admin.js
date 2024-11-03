import React, { useState } from 'react';
import {
   EnvironmentOutlined, HeartOutlined, NotificationOutlined,
  SettingOutlined, ShoppingOutlined, UserOutlined,
} from '@ant-design/icons';

import { Button, ConfigProvider, Empty, Space, Table } from 'antd';
import { useCallback, useEffect } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';

import { Layout, Menu } from 'antd';
import PersonalInfo from './PersonalInfo';
import {  useNavigate } from 'react-router-dom';
import User from './User';



function Order() {
  const [order, setOrder] = useState([]);

  const navigate = useNavigate()
  const getOrders = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(firestore, 'products') )
      );
      const array = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        array.push(data);
        console.log(doc.id, ' => ', data);
      });
      setOrder(array);
    } catch (err) {
      console.error('Error fetching products: ', err);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const handleDeleteCart = async (product) => {
    console.log('product :>> ', product);

    try {
      await deleteDoc(doc(firestore, 'products', product.id));
      const filteredProducts = order.filter((item) => item.id !== product.id);
      setOrder(filteredProducts);
      window.toastify('Product Successfully Deleted!');
      // Update subtotal and grand total after deletion

    } catch (err) {
      console.error('Error deleting product: ', err);
    }
  };

  const handleUpdateCart = (product) => {
    navigate(`/dashboard/update-dish/${product.id}`)
  }

  const renderEmpty = (componentName) => {
    if (componentName === 'Table.filter' /** 👈 5.20.0+ */) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Filter(Custom)" />;
    }
  };
  const columns = [
    
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render : (text) => <img src={text} style={{objectFit : 'contain',height : 70, }} />
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Date',
      dataIndex: 'createProduct',
      key: 'createProduct',
      render: (text)=><p>{new Date(text*1000).toLocaleString()}</p>
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
        type="primary"
        ghost
        onClick={() => handleUpdateCart(record)}>Edit</Button>
          <Button onClick={() => handleDeleteCart(record)} danger >Delete</Button>
        </Space>
      ),
      },

  ];

  return (
    <ConfigProvider renderEmpty={renderEmpty}>
      <div
        style={{
          marginBlock: 8,
        }}
      />
      <Table
        bordered
        dataSource={order}
        columns={columns}
        locale={{
          emptyText: <Empty description="No Data"></Empty>,
        }}
      />
    </ConfigProvider>
  );
}


function WishList() {
  const { user } = useAuthContext();
  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate()
  const renderEmpty = (componentName) => {
    if (componentName === 'Table.filter' /** 👈 5.20.0+ */) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Filter(Custom)" />;
    }
  };
  const getWishList = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(query(collection(firestore, 'wishList')));
      const array = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        array.push(data);
        console.log(doc.id, ' => ', data);
      });
      setWishlist(array);
    } catch (err) {
      console.error('Error fetching products: ', err);
    }
  }, []);

  useEffect(() => {
    getWishList();
  }, [getWishList])

  const handleDeleteCart = async (product) => {
    console.log('product :>> ', product);

    try {
      await deleteDoc(doc(firestore, 'wishList', product.id));
      const filteredProducts = wishlist.filter((item) => item.id !== product.id);
      setWishlist(filteredProducts);
      window.toastify('Product Successfully Deleted!');
      // Update subtotal and grand total after deletion

    } catch (err) {
      console.error('Error deleting product: ', err);
    }
  };

  const handleUpdateCart = (product) => {
    navigate(`/dashboard/update-dish/${product.id}`)
  }

  const columns = [
    
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render : (text) => <img src={text} style={{objectFit : 'contain',height : 70, }} />
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Date',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (text)=><p>{new Date(text*1000).toLocaleString()}</p>
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleDeleteCart(record)} danger >Delete</Button>
        </Space>
      ),
      },

  ];

  return (
    <ConfigProvider renderEmpty={renderEmpty}>
      <div
        style={{
          marginBlock: 8,
        }}
      />
      <Table
        bordered
        dataSource={wishlist}
        columns={columns}
        locale={{
          emptyText: <Empty description="No Data"></Empty>,
        }}
      />
    </ConfigProvider>
  );
}



const { Sider, Content } = Layout;


export default function Admin() {
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
      case '5':
        return <User />;
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
          <Menu.Item key="5" icon={<UserOutlined />}>
            Users
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





