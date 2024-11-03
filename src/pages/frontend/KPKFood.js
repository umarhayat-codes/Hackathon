
import React from 'react';
import { Button, Card, Col, Layout, Menu, Row, Breadcrumb } from 'antd';
import { useProductContext } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { kpkDishes } from '../../data/dummydata';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Content, Sider } = Layout
const { Meta } = Card;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const sidebarItems = [
  getItem('Product Categories', 'sub1', <PieChartOutlined />, [
    getItem('Punfab', '1'),
    getItem('Sindh', '2'),
    getItem('Balochistan', '3'),
    getItem('KPK', '4'),
  ]),
  getItem('Filter by Price', '5', <DesktopOutlined />),
];

export default function KPKFood() {
  const { dispatch } = useProductContext();
  const navigate = useNavigate();

  const handleToDetail = (product) => {
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: product });
    navigate("/dashboard/show-detail");
  };

  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider collapsible width={250}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={sidebarItems}
        />
      </Sider>

      <Layout>
        {/* Header */}

        {/* Breadcrumb */}
        <Content style={{ padding: '0 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>KPK Food</Breadcrumb.Item>
          </Breadcrumb>

          {/* Main Content */}
          <div style={{ padding: 24, minHeight: 280, background: '#fff' }}>
        
           

            {/* Product Grid */}
            <Row gutter={[16, 16]}>
              {kpkDishes.map((product) => (
                <Col
                  xs={24} // 1 col on extra-small screens
                  md={12} // 2 cols on md screens
                  lg={8} // 3 cols on large screens
                  key={product.id}
                >
                  <Card
                  style={{height : 500}}
                    hoverable
                    cover={
                      <img
                        alt={product.title}
                        src={product.image}
                        style={{ height: '250px', objectFit: 'cover' }}
                      />
                    }
                    actions={[
                      <Button block size="large" onClick={() => handleToDetail(product)} type="primary">
                        Show Detail
                      </Button>,
                    ]}
                  >
                    <Meta
                      title={product.title}
                      description={
                        <>
                          <p>{product.description}</p>
                          <p>
                            <span className="font-weight-bold">{product.price}</span> &nbsp;
                            <span className="text-muted text-decoration-line-through">
                              {product.originalPrice}
                            </span>
                          </p>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4">
              <Button>1</Button>
              <Button>2</Button>
              <Button>3</Button>
            </div>
          </div>
        </Content>

        {/* Footer */}
        
      </Layout>
    </Layout>
  );
}
