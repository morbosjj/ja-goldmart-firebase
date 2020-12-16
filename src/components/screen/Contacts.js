import React, { useState } from 'react';
import { Row, Col, ListGroup, Container } from 'react-bootstrap';
import { Layout } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import emailjs from 'emailjs-com';
import moment from 'moment';
import { firestore, timestamp } from '../../firebase/config';
import InquiryForm from '../InquiryForm';
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

          <InquiryForm
            submitForm={sendEmail}
            success={success}
            loading={loading}
          />
        </Container>
      </Content>
    </MainContainer>
  );
}

export default Contacts;
