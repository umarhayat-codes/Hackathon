import { Button, Image, Space, Table, Typography, Input, Row, Col, Card } from 'antd';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { firestore } from '../../config/firebase';
import { DeleteOutlined } from '@ant-design/icons';
import { useAuthContext } from '../../context/AuthContext';

const { Title, Text } = Typography;

export default function Cart() {
  const { user } = useAuthContext();
  const [state, setState] = useState([]);
  const [discountCode, setDiscountCode] = useState('');

  
  
  const getProduct = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(query(collection(firestore, 'products'), where('createByuid.uid', '==', user.uid)));
      const array = [];
      let total = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        array.push({ ...data, id: doc.id }); // Include doc id
        total += data.price; // Calculate total
      });

      setState(array);
      
    } catch (err) {
      console.error('Error fetching products: ', err);
    }
  }, [user.uid]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const handleDelete = async (product) => {
    try {
      await deleteDoc(doc(firestore, 'products', product.id));
      const filteredProducts = state.filter((item) => item.id !== product.id);
      setState(filteredProducts);
      window.toastify('Product Successfully Deleted!');
      // Update subtotal and grand total after deletion

    } catch (err) {
      console.error('Error deleting product: ', err);
    }
  };

  const columns = [
    {
      title: 'Products',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <Image src={text} style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type='primary' onClick={() => handleDelete(record)}><DeleteOutlined /></Button>
        </Space>
      ),
    },
  ];

  const subtotal = state.reduce((acc, item) => {
    // Ensure price is treated as a string, replace dollar sign, and convert to a number
    const price = item.price ? parseFloat(String(item.price).replace('$', '')) : 0;
    console.log('price :>> ', price); // Log the individual price
    return acc + price; // Add the price to the accumulator
  }, 0);
  

  let grandTotal = subtotal + 5
  return (
    <div className="container mt-4">
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Title level={4}>Checkout</Title>
          <Table columns={columns} dataSource={state} pagination={false} rowKey="id" />
          
        </Col>
        <Col span={8} className='mt-4' >
        <Card className="border"  style={{ width: 300 }}>
      {/* <Title level={4}>Checkout Summary</Title> */}
      <div className='d-flex justify-content-between'>
        <Text strong>Subtotal:</Text>
        <Text strong>${subtotal}</Text> 
        
      </div>    
      <div className="mt-3">
        <strong>Enter Discount Code:</strong>
        <Input 
          value={discountCode} 
          onChange={(e) => setDiscountCode(e.target.value)} 
          className="mb-2" 
        />
        <Button type="primary"  className="mb-3">Apply</Button>
      </div>
      
      <div className='d-flex justify-content-between'>
        <Text strong >Delivery Charge</Text>
        <Text>$5</Text>
      </div>
      <div className='d-flex justify-content-between'>
        <Text strong>Grand Total:</Text>
        <Text strong>${grandTotal}</Text>
      </div>
      <Button type="primary" className="w-100" >Proceed to Checkout</Button>
    
    </Card>
           
        </Col>
      </Row>
    </div>
  );
}
