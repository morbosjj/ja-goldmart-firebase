import React, { useEffect } from 'react';
import MainContainer from '../container/MainContainer';
import { useDataContext } from '../Context';
import { Container, Row, Col } from 'react-bootstrap';
import { Layout } from 'antd';
import Menu from '../Menu';
import Loader from '../component/Loader';
import Product from '../component/Product';

const CategoryShop = ({ match }) => {
  const category_name = match.params.name;
  const { docs, loading, error, getFirestoreQuery } = useDataContext();

  useEffect(() => {
    getFirestoreQuery('products', 'category', category_name);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainContainer>
      <Layout>
        <Layout.Content className='products-content'>
          <div className='products-flex'>
            <Menu />
            <div className='products'>
              {loading ? (
                <Loader />
              ) : (
                <Container className='mt-5'>
                  <Row className='mb-5'>
                    {docs.map((item) => (
                      <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
                        <Product item={item} />
                      </Col>
                    ))}
                  </Row>
                </Container>
              )}

              {error && <h3> Products not found</h3>}
            </div>
          </div>
        </Layout.Content>
      </Layout>
    </MainContainer>
  );
};

export default CategoryShop;
