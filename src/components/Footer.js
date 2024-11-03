import React from 'react';
import { Input, Button, Row, Col } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className='container'>
        <Row className="mb-4">
          <Col xs={24} md={12} lg={6}>
            <h5>Krist</h5>
            <pa><PhoneOutlined /> (704) 855-0127</pa>
            <p><MailOutlined /> krist@example.com</p>
            <p>3939 Ranipe Dr, Richardson, California 62639</p>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <h5>Information</h5>
            <ul className="list-style-none">
              <li><a href="#!" className="text-light">My Account</a></li>
              <li><a href="#!" className="text-light">Login</a></li>
              <li><a href="#!" className="text-light">My Cart</a></li>
              <li><a href="#!" className="text-light">My Wishlist</a></li>
              <li><a href="#!" className="text-light">Checkout</a></li>
            </ul>
          </Col>

          <Col xs={24} md={12} lg={6}> 
            <h5>Service</h5>
            <ul className="list-style-none">
              <li><a href="#!" className="text-light">About Us</a></li>
              <li><a href="#!" className="text-light">Careers</a></li>
              <li><a href="#!" className="text-light">Delivery Information</a></li>
              <li><a href="#!" className="text-light">Privacy Policy</a></li>
              <li><a href="#!" className="text-light">Terms & Conditions</a></li>
            </ul>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <h5>Subscribe</h5>
            <p>Enter your email to be the first to know about our collections and product launches.</p>
            <Input 
              placeholder="Your Email" 
              suffix={<MailOutlined />} 
              className="mb-2"
            />
            <Button type="primary" block>Subscribe</Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <p className='mb-0'>&copy; 2024 Krist. All Rights Reserved.</p>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
