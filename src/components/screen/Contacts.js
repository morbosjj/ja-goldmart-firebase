import React, { useState } from 'react';
import {
  Row,
  Col,
  ListGroup,
  Container,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';
import { Layout } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import emailjs from 'emailjs-com';
import moment from 'moment';
import { firestore, timestamp } from '../../firebase/config';
import '../../css/components/Contacts.css';
import MainContainer from '../container/MainContainer';

const { Content } = Layout;

function Contacts() {
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
        date,
        createdAt,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <MainContainer>
      <Content className='content-main contacts-content'>
        <Container>
          <Row>
            <Col>
              <h2>Contacts</h2>

              <p>
                Contact us today using the enquiry form below, call, email or
                visit us.
              </p>
            </Col>
          </Row>

          <Row className='my-5'>
            <Col>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>Get in Touch</h4>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Mobile</Col>
                    <Col>
                      <strong>(+63) 922-8070307 </strong>
                      <br />
                      <strong>(+63) 917-5587109 </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Landline</Col>
                    <Col>
                      <strong>(+632) 8-9865263</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Email</Col>
                    <Col>
                      <strong>jza.jagoldmartent@gmail.com</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>B2B Online</Col>
                    <Col md={7}>
                      <strong>Alibaba Trade Manager Account</strong>
                      <br />
                      <p>Member ID: ph105705437</p>

                      <strong>Trade Key</strong>
                      <br />
                      <p>Member ID: jari283</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>Visit Us</h4>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Address</Col>
                    <Col>
                      <strong>
                        19B Earth St. F. Santiago E & E Compound Parada
                        Valenzuela City Philippines 1444{' '}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Opening Times</Col>
                    <Col>
                      <strong>Monday-Saturday 9:00AM - 5:00PM</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <br />
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
                  <Form.Label>Message</Form.Label>
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

export default Contacts;
