import { Card, Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import Meta from 'antd/es/card/Meta';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';

export default function WishList() {
  const { user } = useAuthContext();
  const [wishlist, setWishlist] = useState([]);

  const getWishList = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(query(collection(firestore, 'wishList'), where('createByuid.uid', '==', user.uid)));
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
  }, [user.uid]);

  useEffect(() => {
    getWishList();
  }, [getWishList])

  return (
    <Row gutter={[16, 16]} style={{ padding: '24px' }}>
      {wishlist.map((product) => (
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
