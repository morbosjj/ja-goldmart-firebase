import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Layout } from 'antd';
import Product from '../Product';
import Loader from '../Loader';
import Menu from '../Menu';
import { useDataContext } from '../Context';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/components/Shop.css';
import MainContainer from '../container/MainContainer';

const { Content } = Layout;

const Shop = () => {
  const { docs, loading, getFirestoreCollection } = useDataContext();
  const products = docs;
  // const match = useRouteMatch('/shop/:name');

  useEffect(() => {
    getFirestoreCollection('products', 'createdAt');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainContainer>
      <Layout>
        <Content className='products-content'>
          <Layout>
            <div className='products-flex'>
              <Menu loading={loading} />

              <div className='products'>
                {loading ? (
                  <Loader />
                ) : (
                  <Container className='mt-5'>
                    <Row className='mb-5'>
                      {products.map((product) => (
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                          <Product item={product} />
                        </Col>
                      ))}
                    </Row>
                  </Container>
                )}
              </div>
            </div>
          </Layout>
        </Content>
      </Layout>
    </MainContainer>
  );
};

export default Shop;
