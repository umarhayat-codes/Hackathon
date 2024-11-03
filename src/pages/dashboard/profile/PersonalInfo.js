import { Col, Form, Input, Row } from 'antd'
import React from 'react'
import { useAuthContext } from '../../../context/AuthContext'

export default function PersonalInfo() {
  const {user} = useAuthContext()
  return (
    <>
    <Col xs={24} md={16} lg={18}>
      <Form layout={'vertical'}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="First Name">
            <Input name='firstName' type='text' className='form-control' value={user.firstName} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Name">
            <Input name='lastName' type='text' className='form-control' value={user.lastName} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Email">
            <Input name='email' type='email' className='form-control' value={user.email} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Phone Number">
            <Input type='text' name='phone' className='form-control' />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Address">
        <Input type='text' name='address' className='form-control' />
      </Form.Item>
    </Form> 
    </Col>
    </>
  )
}
