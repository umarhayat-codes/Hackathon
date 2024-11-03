import React from 'react'

import { Button, Card, Col,  Row } from 'antd'
import heroSection from '../../assets/hero-section.jpg'


import {categories } from '../../data/dummydata'
import { useNavigate } from 'react-router-dom'
 
// const {Title} = Typography

export default function Home() {
  const navigate = useNavigate()
  const handleToGo = (path) => {
    navigate(`/${path}`)        
  }

  return (
    <div>
      <section className="women-collection-section py-5">
      <Row className="align-items-center">
        <Col xs={24} md={12}>
          <div className="text-center text-md-left">
            <h1>Delicious Delights</h1>
            <h2 className="display-4 font-weight-bold">Chef's Special Menu</h2>
            <h3 className="text-muted">EXCLUSIVE DISCOUNTS TODAY</h3>
            <Button type="primary" size="large" className="mt-3">
              View Menu
            </Button>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="d-flex justify-content-center">
            <img
              src={heroSection} 
              alt="Women's Collection"
              className="img-fluid"
              style={{ maxHeight: '500px' }}
            />
          </div>
        </Col>
      </Row>
    </section>

    <section className="shop-by-categories-section py-5">
      <div className="text-center mb-5">
        <h2>Select by Categories</h2>
      </div>

      <Row>
        {categories.map((category, index) => (
          <Col key={index} xs={24} md={12} lg={6} className="mb-4">
            <Card
            onClick={() => handleToGo(category.name)}
            
            bordered={false}
              cover={
                <img
                  alt={category.name}
                  src={category.image}
                  className="img-fluid"
                  style={{ height: '200px', objectFit: 'contain',cursor : 'pointer' }}
                />
              }
              className="text-center"
            >
              <h5>{category.name}</h5>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
      
   
    </div>
  )
}
