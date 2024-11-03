import { Card, Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import Meta from 'antd/es/card/Meta';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';

export default function Order() {
  const { user } = useAuthContext();
  const [order, setOrder] = useState([]);

  const getOrders = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(firestore, 'products'), where('createByuid.uid', '==', user.uid))
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
  }, [user.uid]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <Row gutter={[16, 16]} style={{ padding: '24px' }}>
      {order.map((product) => (
        <Col
          xs={24} 
          md={12} 
          lg={8}
          key={product.id}
        >
          <Card
            hoverable
            cover={
              <img
                alt={product.title}
                src={product.image}
                style={{ height: '200px', objectFit: 'cover' }}
              />
            }
          >
            <Meta
              title={product.title}
              description={
                <>
                  <p>{product.description}</p>
                  <p>
                    <span className="font-weight-bold">{product.price}</span>
                  </p>
                </>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
