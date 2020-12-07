import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Product from './Product';
import '../css/components/Featured.css';
import Loader from './Loader';
import { useDataContext } from './Context';

const Featured = () => {
  const { docs, loading, getFirestoreCollection } = useDataContext();
  const featured = docs.filter((value) => value.feature === 'true');

  useEffect(() => {
    getFirestoreCollection('products');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid='xl' className='py-5 feature'>
      <h2 className='my-3 text-center'>Products</h2>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {featured.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <Product item={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Featured;
