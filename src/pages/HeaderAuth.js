import React from 'react';
import { Row, Col, Image, Container } from 'react-bootstrap';
import Logo from '../img/logo.png';

const HeaderAuth = () => {
  return (
    <Container className='d-flex align-items-center justify-content-center mb-3'>
      <Row>
        <Col>
          <Image src={Logo} fluid />
        </Col>
      </Row>
    </Container>
  );
};

export default HeaderAuth;
