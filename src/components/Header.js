import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, firestore } from '../config/firebase'
import { signOut } from 'firebase/auth'


import { useAuthContext } from '../context/AuthContext'

import { Avatar, Badge, Button, Col, Divider, Dropdown, Empty, List,  Row, Space, Typography } from 'antd'
import {ShoppingOutlined,HeartOutlined,DeleteOutlined} from '@ant-design/icons'




const {Title, Text} = Typography



const WishListDropDown = ({wishList}) => (
  <div className='card' style={{width : 500}} >
  {wishList.length > 0 ?
    <List
    itemLayout="horizontal"
    dataSource={wishList}
    renderItem={(item, index) => (
      <List.Item className='px-3'  actions={[<Button ghost className='fs-3 text-danger' key="list-loadmore-edit"><DeleteOutlined /></Button>]}>
        <List.Item.Meta
          avatar={<Avatar src={item.image} shape='square' size={100} /> }
          title={<Title level={4}>{item.title}</Title>}
          />
      </List.Item>
    )}
    />
    : <Empty description={'No Wish List'} />
  }
  </div>
)

const CartItemDropDown = ({ cartItem }) => {
  const subtotal = cartItem.reduce((acc, item) => {
    const price = parseFloat(String(item.price).replace('$', '')); 
    return acc + price; 
  }, 0);

  


  return (
    <div className="card p-3" style={{ width: 400 }}>
      <Title level={5} className="mb-4">{`You have ${cartItem.length} items in your cart`}</Title>

      {cartItem.length > 0 ? (
        <>
          <List
            itemLayout="horizontal"
            dataSource={cartItem}
            
            renderItem={(item) => (
              <List.Item
                className="px-3"
                actions={[
                  <Button
                    ghost
                    className="fs-3 text-danger"
                    key="list-loadmore-edit"
                  >
                    <DeleteOutlined />
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image} shape="square" size={70} />}
                  title={
                    <div>
                      <Title level={5}>{item.title}</Title>
                      <Text>{item.price}</Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />

          <Row justify="space-between" align="middle" className="my-3">
            <Col>
              <Text strong>Subtotal</Text>
            </Col>
            <Col>
              <Text strong>{subtotal}</Text>
            </Col>
          </Row>

          <Divider />
          <Link to='/dashboard/cart' className='btn btn-dark ' type="primary" >
            Checkout
          </Link>
        </>
      ) : (
        <Empty description="Your cart is empty" />
      )}
    </div>
  );
};

const DropDownShopCategory = () => {
  const navigate = useNavigate(); 

  const handleToGo = (path) => {
    navigate(`/${path}`); 
  }

  return (
    <div style={{ width: 500, padding: '16px', display: 'flex', flexDirection: 'column', backgroundColor: 'white', border: '1px solid black' }}>
  <Row gutter={[16, 16]}>
    <Col span={6}>
      <h5 style={{ cursor: 'pointer' }} onClick={() => handleToGo('punjab')}>Punjab</h5>
      <ul className="list-unstyled">
        <li>Biryani</li>
        <li>Butter Chicken</li>
        <li>Sarson Ka Saag & Makki Ki Roti</li>
        <li>Haleem</li>
        <li>Chicken Karahi</li>
      </ul>
      <h6>Special Dishes</h6>
      <ul className="list-unstyled">
        <li>Paaye</li>
        <li>Keema Naan</li>
      </ul>
    </Col>

    <Col span={6}>
      <h5 style={{ cursor: 'pointer' }} onClick={() => handleToGo('sindh')}>Sindh</h5>
      <ul className="list-unstyled">
        <li>Sindhi Biryani</li>
        <li>Sai Bhaji</li>
        <li>Karhi</li>
        <li>Bhugha Chawal</li>
        <li>Thadal</li>
      </ul>
      <h6>Traditional Snacks</h6>
      <ul className="list-unstyled">
        <li>Daal Pakwan</li>
        <li>Laasi</li>
      </ul>
    </Col>

    <Col span={6}>
      <h5 style={{ cursor: 'pointer' }} onClick={() => handleToGo('balochistan')}>Balochistan</h5>
      <ul className="list-unstyled">
        <li>Sajji</li>
        <li>Kaak</li>
        <li>Landhi</li>
        <li>Rosh</li>
        <li>Dumpukht</li>
      </ul>
      <h6>Popular Dishes</h6>
      <ul className="list-unstyled">
        <li>Chapli Kebab</li>
        <li>Khaddi Kebab</li>
      </ul>
    </Col>

    <Col span={6}>
      <h5 style={{ cursor: 'pointer' }} onClick={() => handleToGo('kpk')}>KPK</h5>
      <ul className="list-unstyled">
        <li>Chapli Kebab</li>
        <li>Kabuli Pulao</li>
        <li>Peshawari Naan</li>
        <li>Lamb Karahi</li>
        <li>Mantu</li>
      </ul>
      <h6>Special Dishes</h6>
      <ul className="list-unstyled">
        <li>Afghani Pulao</li>
        <li>Shinwari Karahi</li>
      </ul>
    </Col>
  </Row>
</div>

  );
}

export default function Header() {
    const {user} = useAuthContext()
    const {isAuthenticated,isAdmin} = useAuthContext()
    const [state,setState] = useState([])
    const [wish,setWish] = useState([])


    const navigate = useNavigate()
    const getProduct = useCallback(async () => {
      try {
        const querySnapshot = await getDocs(query(collection(firestore, 'products'), where('createByuid.uid', '==', user.uid)));
        const array = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          array.push(data);
        });
        setState(array);
      } catch (err) {
        console.error('Error fetching products: ', err);
      }
    }, [user.uid]);
    
    useEffect(() => {
      getProduct();
    }, [getProduct]);

    const getWishList = useCallback(async () => {
      try {
        const querySnapshot = await getDocs(query(collection(firestore, 'wishList'), where('createByuid.uid', '==', user.uid)));
        const array = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          array.push(data);
        });
        setWish(array);
      } catch (err) {
        console.error('Error fetching products: ', err);
      }
    }, [user.uid]);
  
    useEffect(() => {
      getWishList();
    }, [getWishList]);

    const handleToLogin = () => {
      navigate('/auth/login')
    }

    const handleLogout = async () => {
      
      try {
          await signOut(auth);
          window.toastify("Successfully Logout",'error')

      }
    
      catch (error) {
        console.error("Error during sign-out:", error);
      }
    };
    
  return (
    <header>
        <nav className="navbar bg-body-tertiary  navbar-expand-lg sticky-top">
  <div className="container">
    <h5 className="navbar-brand" >Restaurant</h5>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end justify-content-md-center align-items-lg-center flex-grow-1 pe-3">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" >Home</a>
          </li>
          <li className="nav-item">
            <Dropdown placement='bottom' trigger={['click']} dropdownRender={() => <DropDownShopCategory />} >
              <Button style={{cursor : 'pointer', border : 0, backgroundColor : 'whitesmoke'}} >Shop</Button>
            </Dropdown>
          </li>
          
        </ul>
        <div className="d-flex">
            {!isAuthenticated ? <Button type='primary' onClick={handleToLogin}>Login</Button> 
            : 
          <Space size={'middle'}>
            <Dropdown placement="bottomRight" trigger={['click']} dropdownRender={() => <WishListDropDown wishList={wish} />}>
              <Badge count={wish.length}>
                <HeartOutlined className='fs-3'  />
              </Badge>
            </Dropdown>
            
            <Dropdown placement="bottomRight" trigger={'click'} dropdownRender={() => <CartItemDropDown cartItem={state} />} >
              <Badge count={state.length}>
                <ShoppingOutlined className='fs-3' />
              </Badge>
            </Dropdown>
            {!isAdmin && <Link to='/dashboard/profile' className='btn btn-dark' >Profile</Link>} 
            {isAdmin &&
            <>
              <Link className='btn btn-dark' to='/dashboard/admin' type='primary' >Dashboard</Link>
            </>
            }
            <Link className='btn btn-dark' to='/auth/register' onClick={handleLogout}>Logout</Link>
            </Space>
            }
            
            
            
        </div>
      </div>
    </div>
  </div>
</nav>
    </header>
  )
}
