import React, { useState } from 'react';
import { Form, Col, Row, Container, Button, Alert } from 'react-bootstrap';
import { Layout, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import emailjs from 'emailjs-com';
import moment from 'moment';
import { firestore, timestamp } from '../../firebase/config';
import '../../css/components/Inquire.css';
import { useDataContext } from '../Context';
import { replaceToDash } from '../Helper';
import MainContainer from '../container/MainContainer';

const { Content } = Layout;

function Inquire() {
  const { inquire } = useDataContext();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function sendEmail(e) {
    e.preventDefault();
    const { full_name, phone_number, email, company_name, message } = e.target;
    const date = moment().format('MMMM Do YYYY, h:mm:ss a');
    const createdAt = timestamp();
    const inquiry_id = uuidv4();

    setLoading(true);

    try {
      await emailjs.sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_USER_ID
      );

      setLoading(false);
      setSuccess(true);

      await firestore.collection('inquiries').add({
        inquiry_id,
        full_name: full_name.value,
        phone_number: phone_number.value,
        email: email.value,
        company_name: company_name.value,
        message: message.value,
        inquire,
        date,
        createdAt,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <MainContainer>
      <Content className='content-main inquire-content'>
        <div className='breadcrumb-container mb-5'>
          <div className='breadcrumb-link'>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to='/shop'>Shop</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Inquire</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Container>
          <Row>
            <Col>
              <h2>Inquiry</h2>

              <br />

              {inquire.model_name ? (
                <p>
                  Product Name:{' '}
                  <strong>
                    <Link
                      to={`/product/${replaceToDash(
                        inquire.full_product_name
                      )}`}
                    >
                      {inquire.model_name} {inquire.product_name}
                    </Link>
                  </strong>
                </p>
              ) : (
                ''
              )}
            </Col>
          </Row>

          <Form onSubmit={sendEmail} className='my-5'>
            {success && (
              <Alert variant='success'>
                <i className='fas fa-check-circle'></i> Thank you. Your
                submission has been received.
              </Alert>
            )}

            <Row>
              {/* md={5} */}
              <Col>
                <Form.Group controlId='full_name'>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type='text' name='full_name' required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='phone_number'>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type='text' name='phone_number' required />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' name='email' required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='company_name'>
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control type='text' name='company_name' required />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId='inquiry'>
                  <Form.Label>Inquiry</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    name='message'
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant='custom' size='md' type='submit'>
              {loading ? 'Please wait...' : 'Submit'}
            </Button>
          </Form>
        </Container>
      </Content>
    </MainContainer>
  );
}

export default Inquire;
