import React, { useState } from 'react';
import Meta from '../component/Meta';
import { Col, Row, Container } from 'react-bootstrap';
import { Layout, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import moment from 'moment';
import { firestore } from '../firebase/config';
import '../css/components/Inquire.css';
import { useDataContext } from '../Context';
import { replaceToDash, randomFixedInteger } from '../Helper';
import MainContainer from '../container/MainContainer';
import InquiryForm from '../component/InquiryForm';

const { Content } = Layout;

function Inquire() {
  const { item } = useDataContext();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const year = moment().format('YYYY');
  const month = moment().format('MM');
  const day = moment().format('DD');

  async function sendEmail(e) {
    e.preventDefault();
    const inquireTypeNumber = 1000;
    const randomNumber = randomFixedInteger(4);
    const inquiryID = Number(
      `${inquireTypeNumber}${year}${month}${day}${randomNumber}`
    );

    const {
      firstname,
      lastname,
      phone_number,
      email,
      company_name,
      message,
    } = e.target;
    const inquiryAt = moment().format('MMMM Do YYYY, h:mm:ss a');

    setLoading(true);

    const inquire = [];
    inquire.push(item);

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
        inquiryID,
        firstname: firstname.value,
        lastname: lastname.value,
        phone_number: phone_number.value,
        email: email.value,
        company_name: company_name.value,
        message: message.value,
        inquire,
        isPaid: false,
        isDelivered: false,
        isInquiryOnly: false,
        inquiryAt,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <MainContainer>
      <Meta title='Inquire | JA Goldmart Enterprise' />
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

              {item.product ? (
                <p>
                  Product Name:{' '}
                  <strong>
                    <Link
                      to={`/product/${replaceToDash(
                        item.product.full_product_name
                      )}`}
                    >
                      {item.product.model_name} {item.product.product_name}
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
