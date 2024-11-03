import { Col, Image, Row, Typography, Button, Rate, Tag, Select } from 'antd';
import React, { useState } from 'react';
import { useProductContext } from '../../context/ProductContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { HeartOutlined } from '@ant-design/icons';
import { useAuthContext } from '../../context/AuthContext';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';


export default function ShowDetail() {
  const {user,isAuthenticated} = useAuthContext()
  const { selectedProduct } = useProductContext();
  const { Title, Text } = Typography;
  const [quantity, setQuantity] = useState(1);


  
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      window.toastify("Please log in to add items to your Cart.", 'error');
      return;
    }
    const productData = {
        title: selectedProduct.title,
        image: selectedProduct.image,
        price: selectedProduct.price,
        description: selectedProduct.description,
        id: Math.random().toString(36).slice(2),
        createProduct : new Date(),
        createByuid : {uid: user.uid},
    }
    console.log('productData :>> ', productData);
    try {
        await setDoc(doc(firestore, 'products', productData.id), productData);
        window.toastify("Successfully Added Product",'success')
    }
    catch (err) {
        window.toastify("Something went to wrong while set data",'error')
        console.log('err :>> ', err);
    }
    
  }
  
  const handleToWishList = async () => {
    if (!isAuthenticated) {
      window.toastify("Please log in to add items to your wishlist.", 'error');
      return;
    }
  
    const wishListData = {
        title: selectedProduct.title,
        image: selectedProduct.image,
        price: selectedProduct.price,
        description: selectedProduct.description,
        createAt : serverTimestamp(),
        id: Math.random().toString(36).slice(2),
        createByuid : {uid: user.uid},
      }
    
  
    try {
      await setDoc(doc(firestore, 'wishList', wishListData.id), wishListData);
      window.toastify("Successfully added product to Wishlist", 'success');
    } catch (err) {
      window.toastify("Something went wrong while adding to Wishlist", 'error');
    }
  };
  

  return (
    <main className="container mt-4">
      {/* Use gutter to add spacing between the image and content */}
      <Row gutter={[24, 24]} className="align-items-center mb-5">
        {/* Image Section */}
        <Col xs={24} md={12} className="text-center">
          <Image
            src={selectedProduct.image}
            preview={false}
            alt={selectedProduct.title}
            height={400}
            style={{objectFit : 'contain'}}
          />
        </Col>

        {/* Product Details Section */}
        <Col xs={24} md={12}>
          <div className="d-flex justify-content-between align-items-start">
            <Title level={4}>{selectedProduct.title}</Title>
          </div>

          <Rate allowHalf defaultValue={selectedProduct.rating} />
          <Text className="text-muted">(121 Reviews)</Text>

          <p className="mt-2">
            <span className="font-weight-bold h4">{selectedProduct.price}</span> &nbsp;
            <span className="text-muted text-decoration-line-through">
              {selectedProduct.originalPrice}
            </span>
          </p>

          <Text>{selectedProduct.description}</Text>
          
          <div>

          <Button type="primary" onClick={handleAddToCart} size='large' className="mt-3">
            Add to Cart
          </Button>
            <HeartOutlined onClick={() => handleToWishList(selectedProduct)} className='fs-4 ms-3' />
          </div>
        </Col>
      </Row>
    </main>
  );
}