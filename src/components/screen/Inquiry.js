import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { Layout } from 'antd';
import AdminContainer from '../container/AdminContainer';
import { useDataContext } from '../Context';
import Loader from '../Loader';
import Message from '../Message';
import { Link } from 'react-router-dom';

const { Content } = Layout;

function Inquiry({ match }) {
  const { docs, loading, error, getFirestoreQuery } = useDataContext();
  const inquiryId = match.params.id;

  // let image = images
  //   ? images.filter((x) => typeof x !== undefined).shift()
  //   : '';

  useEffect(() => {
    getFirestoreQuery('inquiries', 'inquiry_id', inquiryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

                    <ListGroup.Item>
                      <h4>Inquire Items</h4>

                      {!inquiry.inquire ? (
                        <Message variant='danger'>No items</Message>
                      ) : (
                        <ListGroup variant='flush' className='my-3'>
                          <ListGroup.Item key={inquiry.inquiry_id}>
                            <Row>
                              {inquiry.inquire.images ? (
                                <Col md={2}>
                                  <Image
                                    src={inquiry.inquire.images[0].url}
                                    alt={inquiry.inquire.images[0].name}
                                    fluid
                                    rounded
                                  />
                                </Col>
                              ) : (
                                'No Available Image'
                              )}

                              <Col>
                                <Link
                                  to={`/shop/${inquiry.inquire.full_product_name}`}
                                >
                                  {inquiry.inquire.full_product_name}
                                </Link>
                              </Col>

                              <Col md={4}>₱{inquiry.inquire.price}</Col>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            ))}
          </div>
        )}
      </Content>
    </AdminContainer>
  );
}

export default Inquiry;
