import React from 'react';
import {
  Row,
  Col,
  Button,
  ListGroup,
  Alert,
  Image,
  Card,
  Container,
} from 'react-bootstrap';
import { firestore } from '../../firebase/config';
import { Link, useHistory } from 'react-router-dom';
import Loader from '../Loader';
import { replaceToDash, addDecimals } from '../Helper';
import { useDataContext } from '../Context';

const OrderDetails = () => {
  const { setOrderSuccess, setOrderNumber } = useDataContext();
  const order = JSON.parse(localStorage.getItem('order'));

  const {
    firstname,
    lastname,
    email,
    phone_number,
    inquiryID,
    orderID,
    isDelivered,
    isPaid,
    orderAt,
    orderItems,
    shippingAddress,
  } = order ? order : [];

  const history = useHistory();

  if (!order) {
    history.goBack();
  }

  const itemsPrice = orderItems
    ? addDecimals(
        orderItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)
      )
    : '';

  const shippingPrice =
    order &&
    addDecimals(
      order.shippingAddress.state === 'Visayas' ||
        order.shippingAddress.state === 'Mindanao'
        ? 3000
        : 0
    );
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));

  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const placeOrder = () => {
    firestore.collection('orders').add({
      orderID,
      inquiryID,
      firstname,
      lastname,
      email,
      phone_number,
      shippingAddress,
      isDelivered,
      isPaid,
      orderAt,
      orderItems,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    setOrderSuccess(true);
    setOrderNumber(order.orderID);

    localStorage.removeItem('order');
    history.push(`/order-form/${order.inquiryID}`);
  };
  return (
    <Container>
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
                      {order.shippingAddress.city} {order.shippingAddress.state}{' '}
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
                            {item.qty} x ₱{addDecimals(item.product.price)} = ₱
                            {addDecimals(
                              item.qty * addDecimals(item.product.price)
                            )}
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
                      <Col>₱{itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>₱{shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>₱{taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>₱{totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Button
                          type='button'
                          className='btn btn-block order-btn'
                          onClick={placeOrder}
                        >
                          Place Order
                        </Button>
                      </Col>
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
    </Container>
  );
};

export default OrderDetails;
