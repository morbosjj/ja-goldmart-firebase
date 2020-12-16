import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Carousel } from 'antd';
import { Image, Row, Col, Container } from 'react-bootstrap';
import '../css/components/Carousel.css';

const CarouselSlider = () => {
  let items = [
    {
      name: 'Industry Machine',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit mollitia cupiditate culpa, ipsa alias itaque tempore obcaecati.',
      image: 'img/product1.png',
      link: '/',
    },

    {
      name: 'Upgrade to latest Technology',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit mollitia cupiditate culpa, ipsa alias itaque tempore obcaecati.',
      image: 'img/products/air-compressor.png',
      link: '/shop',
    },

    {
      name: 'About us',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit mollitia cupiditate culpa, ipsa alias itaque tempore obcaecati.',
      image: 'img/eccentric-slotter.png',
      link: '/about',
    },
  ];
  return (
    <div className='overview-carousel'>
      <Carousel autoplay>
        {items.map((item) => (
          <Item key={item.name} item={item} />
        ))}
      </Carousel>
    </div>
  );
};

const Item = ({ item }) => {
  return (
    <>
      <div className='overlay-image'></div>

      <div className='carousel-container'>
        <Container>
          <Row>
            <Col>
              <h2>{item.name}</h2>
              <p>{item.description}</p>

              <Link to={item.link}>
                <Button type='primary'>Check it out!</Button>
              </Link>
            </Col>

            <Col>
              <Image src={item.image} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default CarouselSlider;
