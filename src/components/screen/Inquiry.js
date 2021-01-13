import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { Layout } from 'antd';
import AdminContainer from '../container/AdminContainer';
import { useDataContext } from '../Context';
import Loader from '../Loader';
import Message from '../Message';
import { Link } from 'react-router-dom';
import { replaceToDash } from '../Helper';

const { Content } = Layout;

function Inquiry({ match }) {
  const {
    docs,
    loading,
    error,
    getFirestoreQuery,
    inquiryOnly,
  } = useDataContext();
  const inquiryId = Number(match.params.id);

  // let image = images
  //   ? images.filter((x) => typeof x !== undefined).shift()
  //   : '';

  useEffect(() => {
    getFirestoreQuery('inquiries', 'inquiryID', inquiryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(typeof inquiryId);
  return (
    <AdminContainer>
      <Content className='layout-content'>
        {loading ? (
          <Loader />
        ) : (
          <div>
            {error && <Message variant='danger'>Inquiry Not found</Message>}

            {docs.map((inquiry) => (
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

                    {inquiry.inquire.length === 0 ? (
                      <Message variant='danger'>No items</Message>
                    ) : (
                      <ListGroup.Item>
                        <h4>Inquire Items</h4>
                        {console.log(inquiry.inquire)}

                        {inquiry.inquire.map((item) => (
                          <ListGroup variant='flush' className='my-3'>
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
                    )}
                  </ListGroup>
                </Col>

                {inquiry.inquire.map((item) => (
                  <Col>
                    <Card>
                      <ListGroup variant='flush'>
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
                            <Row>
                              <Col>
                                <Button
                                  type='button'
                                  className='btn btn-block inquiry-btn'
                                  onClick={() => inquiryOnly(inquiry.id)}
                                >
                                  Inquire Only
                                </Button>
                              </Col>
                              <Col>
                                <Button
                                  type='button'
                                  className='btn btn-block order-btn'
                                >
                                  Create Order
                                </Button>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )}
                      </ListGroup>
                    </Card>
                  </Col>
                ))}
              </Row>
            ))}
          </div>
        )}
      </Content>
    </AdminContainer>
  );
}

export default Inquiry;
