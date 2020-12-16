import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
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
import InquiryForm from '../InquiryForm';

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

export default Inquire;
