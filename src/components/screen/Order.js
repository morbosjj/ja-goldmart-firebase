import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  ListGroup,
  Alert,
  Button,
  Image,
} from 'react-bootstrap';
import { Layout } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import AdminContainer from '../container/AdminContainer';
import Loader from '../Loader';
import { useDataContext } from '../Context';
import { replaceToDash, addDecimals } from '../Helper';
import '../../css/components/admin/Order.css';

const { Content } = Layout;

const Order = ({ match }) => {
  const {
    order,
    getOrderDetails,
    updateOrderToDelivered,
    updateOrderToPaid,
  } = useDataContext();
  const orderId = Number(match.params.id);
  const history = useHistory();
  const date = moment().format('MMMM Do YYYY, h:mm:ss a');
  const method = 'Credit/Debit Card';
  const { orderItems } = order ? order : [];

  useEffect(() => {
    getOrderDetails(orderId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deliverHandler = () => {
    updateOrderToDelivered(order.id, date);
    history.push('/admin/orders');
  };

  const paidHandler = () => {
    updateOrderToPaid(order.id, date, method);
    history.push('/admin/orders');
  };

  return (
    <AdminContainer>
      <Content className='layout-content'>
        {orderItems ? (
          <div className='order-details-container'>
            <h1>Order {order.orderID}</h1>

            <Row>
              <Col md={8}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Shipping</h2>

                    <p>
                      <strong>Name: </strong> {order.firstname} {order.lastname}
                    </p>

                    <p>
                      <strong>Email: </strong>
                      <a href={`mailto:${order.email}`}>{order.email}</a>
                    </p>

                    {order.shippingAddress && (
                      <p>
                        <strong>Address:</strong>
                        {order.shippingAddress.address_line}{' '}
                        {order.shippingAddress.address_line_2},{' '}
                        {order.shippingAddress.city}{' '}
                        {order.shippingAddress.state}{' '}
                        {order.shippingAddress.zip}
                      </p>
                    )}

                    {order.isDelivered ? (
                      <Alert variant='success'>
                        Delivered on {order.deliveredAt}
                      </Alert>
                    ) : (
                      <Alert variant='danger'>Not Delivered</Alert>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Payment</h2>
                    <p>
                      <strong>Method: </strong>
                      {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <Alert variant='success'>Paid on {order.paidAt}</Alert>
                    ) : (
                      <Alert variant='danger'>Not Paid</Alert>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Order Items</h2>

                    {orderItems.map((item, index) => (
                      <ListGroup variant='flush' key={index}>
                        <ListGroup.Item>
                          <Row>
                            {item.product.images && (
                              <Col md={2}>
                                <Image
                                  src={item.product.images[0].url}
                                  alt={item.product.images[0].name}
                                  fluid
                                  rounded
                                />
                              </Col>
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
                              {item.qty} x ₱{addDecimals(item.product.price)} =
                              ₱{order.itemsPrice}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    ))}
                  </ListGroup.Item>
                </ListGroup>
              </Col>

              <Col md={4}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h5>Order Summary</h5>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Items</Col>
                        <Col>₱{order.itemsPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>₱{order.shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>₱{order.taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>₱{order.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        {!order.isPaid && (
                          <Col>
                            <Button
                              type='button'
                              className='btn btn-block inquiry-btn'
                              onClick={paidHandler}
                            >
                              Mark as Paid
                            </Button>
                          </Col>
                        )}

                        {!order.isDelivered && (
                          <Col>
                            <Button
                              type='button'
                              className='btn btn-block order-btn'
                              onClick={deliverHandler}
                            >
                              Mark as Delivered
                            </Button>
                          </Col>
                        )}
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </div>
        ) : (
          <Loader />
        )}
      </Content>
    </AdminContainer>
  );
};

export default Order;
