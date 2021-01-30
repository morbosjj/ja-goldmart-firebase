import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import FeatureSlider from './FeatureSlider';
import '../css/components/Featured.css';
import Loader from './Loader';
import { useDataContext } from '../Context';

const Featured = () => {
  const { docs, loading, getFirestoreCollection } = useDataContext();
  const featured = docs.filter((value) => value.feature === 'true');

  useEffect(() => {
    getFirestoreCollection('products', 'createdAt');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id='featured' className='bg-light text-dark py-5'>
      {loading ? (
        <Loader />
      ) : (
        <Container className='my-5'>
          <div data-aos='fade-up' data-aos-once='true'>
            <h2 className='section-title text-center'>Featured Products</h2>
            <p className=' text-center mb-4'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit quo
              commodi excepturi!
            </p>
          </div>

          <Row>
            <Col data-aos='fade-up' data-aos-once='true' data-aos-delay='800'>
              <FeatureSlider products={featured} />
            </Col>
          </Row>
        </Container>
      )}
    </section>
  );
};

export default Featured;
