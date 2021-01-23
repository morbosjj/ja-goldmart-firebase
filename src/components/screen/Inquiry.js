import React, { useEffect, useState, useRef } from 'react';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { Layout } from 'antd';
import AdminContainer from '../container/AdminContainer';
import { useDataContext } from '../Context';
import Loader from '../Loader';
import Message from '../Message';
import { Link, useHistory } from 'react-router-dom';
import { replaceToDash } from '../Helper';
import '../../css/components/admin/Inquiries.css';

const { Content } = Layout;

function Inquiry({ match }) {
  const {
    inquiry,
    order,
    error,
    placeOrder,
    getInquiryDetails,
    updateInquiryToInquiryOnly,
    checkIfInquiryIsPlaceOrder,
  } = useDataContext();
  const inquiryId = Number(match.params.id);
  const history = useHistory();
  const { inquire } = inquiry ? inquiry : [];
  const [copy, setCopy] = useState(false);
  const [text, setText] = useState('');
  const textCopyRef = useRef(null);
  const urlLink = `${window.location.origin}/order-form/${inquiryId}`;

  // let image = images
  //   ? images.filter((x) => typeof x !== undefined).shift()
  //   : '';

  useEffect(() => {
    getInquiryDetails(inquiryId);
    checkIfInquiryIsPlaceOrder(inquiryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(order);
  console.log(placeOrder);
  const inquiryOnlyHandler = () => {
    history.push('/admin/inquiries');
    updateInquiryToInquiryOnly(inquiry.id);
  };

  const createOrderHandler = () => {
    setCopy((prevState) => !prevState);
  };

  const copyToClipboard = (e) => {
    textCopyRef.current.select();
    document.execCommand('copy');

    e.target.focus();
    setText('URL copied');
  };

  return (
    <AdminContainer>
      <Content className='layout-content'>
        {inquire ? (
          <div>
            {error && <Message variant='danger'>Inquiry Not found</Message>}

            <Row>
              <h2 className='my-3'>Inquiry {inquiryId} </h2>

              <Col md={8}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    {/* <h4 className='my-3'>Information</h4> */}

                    <p>
                      <strong>Customer Name: </strong> {inquiry.firstname}{' '}
                      {inquiry.lastname}
                    </p>

                    <p>
                      <strong>Customer Email: </strong>
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${inquiry.email}`}
                        rel='noopener noreferrer'
                        target='_blank'
                      >
                        {inquiry.email}
                      </a>
                    </p>

                    <p>
                      <strong>Customer Phone:</strong> {inquiry.phone_number}
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h4>Message</h4>

                    <div className='my-5'>
                      <p>{inquiry.message}</p>
                    </div>

                    {/* <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${inquiry.email}`}
                rel='noopener noreferrer'
                target='_blank'
              >
                <Button variant='primary'>
                  <i class='fas fa-reply'></i> Reply
                </Button>
              </a> */}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h4>Inquire Items</h4>

                    {inquire.map((item, index) => (
                      <ListGroup variant='flush' className='my-3' key={index}>
                        <ListGroup.Item key={inquiry.inquiry_id}>
                          <Row>
                            {item.product.images ? (
                              <Col md={2}>
                                <Image
                                  src={item.product.images[0].url}
                                  alt={item.product.images[0].name}
                                  fluid
                                  rounded
                                />
                              </Col>
                            ) : (
                              'No Available Image'
                            )}

                            <Col>
                              <Link
                                to={`/product/${replaceToDash(
                                  item.product.full_product_name
                                )}`}
                              >
                                {item.product.full_product_name}
                              </Link>
                            </Col>

                            <Col md={4}>
                              {item.qty} x ₱{item.product.price} = ₱
                              {item.qty * item.product.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    ))}
                  </ListGroup.Item>
                </ListGroup>
              </Col>

              {inquiry.inquire.map((item, index) => (
                <Col>
                  <Card>
                    <ListGroup variant='flush' key={index}>
                      <ListGroup.Item>
                        <h5>Inquiry Summary</h5>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Items</Col>
                          <Col>₱{item.qty * item.product.price}</Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Total</Col>
                          <Col>₱{item.qty * item.product.price}</Col>
                        </Row>
                      </ListGroup.Item>

                      {!inquiry.isInquiryOnly && (
                        <ListGroup.Item>
                          {placeOrder ? (
                            <p>
                              <strong>Status: </strong> Place Order
                            </p>
                          ) : (
                            <Row>
                              <Col>
                                <Button
                                  type='button'
                                  className='btn btn-block inquiry-btn'
                                  onClick={inquiryOnlyHandler}
                                >
                                  Inquire Only
                                </Button>
                              </Col>
                              <Col>
                                <Button
                                  type='button'
                                  className='btn btn-block order-btn'
                                  onClick={createOrderHandler}
                                >
                                  Create Order
                                </Button>
                              </Col>
                            </Row>
                          )}

                          <Row className='mt-3'>
                            {copy && (
                              <Col>
                                <div className='inquiry-url-copy'>
                                  <Form.Control
                                    type='text'
                                    defaultValue={urlLink}
                                    ref={textCopyRef}
                                  />
                                  <Button
                                    className='btn copy-btn'
                                    onClick={copyToClipboard}
                                  >
                                    <i className='fas fa-link'></i> Copy link
                                  </Button>
                                  <Form.Text muted>{text}</Form.Text>
                                </div>
                              </Col>
                            )}
                          </Row>
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <Loader />
        )}
      </Content>
    </AdminContainer>
  );
}

export default Inquiry;
