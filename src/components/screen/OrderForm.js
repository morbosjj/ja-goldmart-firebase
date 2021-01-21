import React, { useEffect, useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Logo from '../../img/logo.png';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useDataContext } from '../Context';
import PageNotFound from './PageNotFound';
import Loader from '../Loader';
import { addDecimals, randomFixedInteger } from '../Helper';
import { firestore } from '../../firebase/config';
import '../../css/components/OrderForm.css';

const OrderForm = () => {
  const {
    order,
    orderError,
    inquiry,
    getInquiryDetails,
    getOrderIfExist,
  } = useDataContext();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const params = useParams();
  const id = Number(params.inquiryID);
  const date = moment().format('L');
  const orderAt = moment().format('MMMM Do YYYY, h:mm:ss a');
  const year = moment().format('YYYY');
  const month = moment().format('MM');
  const day = moment().format('DD');
  const { inquire } = inquiry ? inquiry : [];

  useEffect(() => {
    getInquiryDetails(id);
    getOrderIfExist(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const itemsPrice = inquire
    ? addDecimals(
        inquire.reduce((acc, item) => acc + item.product.price * item.qty, 0)
      )
    : '';

  const shippingPrice = 100;
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));

  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderTypeNumber = 2000;
    const randomNumber = randomFixedInteger(4);
    const orderID = Number(
      `${orderTypeNumber}${year}${month}${day}${randomNumber}`
    );

    const {
      firstname,
      lastname,
      phone_number,
      email,
      address_line,
      address_line_2,
      city,
      state,
      zip,
    } = e.target;

    try {
      await firestore.collection('orders').add({
        orderID,
        inquiryID: id,
        firstname: firstname.value,
        lastname: lastname.value,
        phone_number: phone_number.value,
        email: email.value,
        orderItems: inquire,
        shippingAddress: {
          address_line: address_line.value,
          address_line_2: address_line_2.value,
          city: city.value,
          state: state.value,
          zip: zip.value,
        },
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        isPaid: false,
        isDelivered: false,
        orderAt,
      });
    } catch (error) {
      console.log(error);
    }
    setOrderSuccess(true);
    setOrderNumber(orderID);
    console.log('Your order submitted');
  };

  return (
    <div className='order'>
      <Container>
        <div className='order-form-container'>
          {orderSuccess ? (
            <div className='order-message-container'>
              <div className='about-header'>
                <div className='logo-wrapper'>
                  <img src={Logo} alt='company' className='about-image' />
                </div>
                <h2>JA Goldmart Enterprise</h2>
              </div>

              <div className='order-message'>
                <h1>Thank you.</h1>
                <p>Your order has been placed and is being processed.</p>

                <p>
                  We've received your order and will contact you as soon as your
                  package is shipped.
                </p>
                <p>
                  Order number is:{' '}
                  <strong>{orderNumber ? orderNumber : order.orderID}</strong>
                </p>
              </div>
            </div>
          ) : order.orderID ? (
            <div className='order-message-container'>
              <div className='about-header'>
                <div className='logo-wrapper'>
                  <img src={Logo} alt='company' className='about-image' />
                </div>
                <h2>JA Goldmart Enterprise</h2>
              </div>

              <div className='order-message'>
                <h1>Thank you.</h1>

                {order.isDelivered && order.isPaid ? (
                  <p>Your order is completed and already shipped</p>
                ) : (
                  <div>
                    <p>Your order has been placed and is being processed.</p>
                    <p>
                      We've received your order and will contact you as soon as
                      your package is shipped.
                    </p>
                  </div>
                )}

                <p>
                  Order number is:{' '}
                  <strong>{orderNumber ? orderNumber : order.orderID}</strong>
                </p>
              </div>
            </div>
          ) : (
            <div>
              {inquire ? (
                <div className='order-form-content'>
                  <div className='about-header'>
                    <div className='logo-wrapper'>
                      <img src={Logo} alt='company' className='about-image' />
                    </div>
                    <h2>JA Goldmart Enterprise</h2>
                  </div>

                  <div className='order-form-title'>
                    <h2>Order Form</h2>
                  </div>

                  <div className='order-form'>
                    <div className='order-form-header'>
                      <span></span>
                      <p>
                        Date By order: <strong>{date}</strong>
                      </p>
                    </div>

                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col>
                          <label>Full Name</label>
                        </Col>

                        <Col md>
                          <Form.Group controlId='firstname'>
                            <Form.Control
                              type='text'
                              defaultValue={inquiry.firstname}
                              required
                            />
                            <Form.Text className='text-muted'>
                              First Name
                            </Form.Text>
                          </Form.Group>
                        </Col>
                        <Col md>
                          <Form.Group controlId='lastname'>
                            <Form.Control
                              type='text'
                              defaultValue={inquiry.lastname}
                              required
                            />
                            <Form.Text className='text-muted'>
                              Last Name
                            </Form.Text>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={4}>
                          <label>Phone Number</label>
                        </Col>
                        <Col md>
                          <Form.Group controlId='phone_number'>
                            <Form.Control
                              type='number'
                              defaultValue={inquiry.phone_number}
                              required
                            />
                            <Form.Text className='text-muted'>
                              Phone Number
                            </Form.Text>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={4}>
                          <label>E-mail</label>
                        </Col>

                        <Col md>
                          <Form.Group controlId='email'>
                            <Form.Control
                              type='email'
                              defaultValue={inquiry.email}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={4}>
                          <label>Delivery Address</label>
                        </Col>

                        <Col>
                          <Form.Group controlId='address_line'>
                            <Form.Control type='text' required />
                            <Form.Text className='text-muted'>
                              Address Line 1
                            </Form.Text>
                          </Form.Group>
                          <Form.Group controlId='address_line_2'>
                            <Form.Control type='text' required />
                            <Form.Text className='text-muted'>
                              Address Line 2
                            </Form.Text>
                          </Form.Group>

                          <Row>
                            <Col>
                              <Form.Group controlId='city'>
                                <Form.Control type='text' required />
                                <Form.Text className='text-muted'>
                                  City
                                </Form.Text>
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group controlId='state'>
                                <Form.Control type='text' required />
                                <Form.Text className='text-muted'>
                                  State / Province
                                </Form.Text>
                              </Form.Group>
                            </Col>
                          </Row>

                          <Form.Group controlId='zip'>
                            <Form.Control type='text' required />
                            <Form.Text className='text-muted'>Zip</Form.Text>
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className='order-products'>
                        <Row>
                          <Col>
                            <div className='dashboard-card'>
                              <div className='dashboard-card-header'>
                                Order Items
                                <div className='panel'>
                                  <div className='btn-group-sm btn-group'>
                                    {/* <button className='btn btn-focus'>
                         Add Product
                       </button> */}
                                  </div>
                                </div>
                              </div>

                              <div className='table-responsive'>
                                <table className='table table-hover'>
                                  <thead>
                                    <tr>
                                      <th className='text-center'>Model No.</th>
                                      <th>Product Name</th>
                                      <th className='text-center'>Price</th>
                                      <th className='text-center'>Quantity</th>
                                      <th className='text-center'>Sub total</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {inquire.map((item) => (
                                      <tr>
                                        <td className='text-center'>
                                          {item.product.model_name}
                                        </td>
                                        <td>{item.product.product_name}</td>
                                        <td className='text-center'>
                                          ₱ {item.product.price}
                                        </td>
                                        <td className='text-center'>
                                          {item.qty}
                                        </td>
                                        <td className='text-center'>
                                          ₱ {item.product.price * item.qty}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>

                      <div className='order-summary my-5'>
                        <h3>Order Summary</h3>

                        <Row>
                          <Col className='order-summary-col' md={2}>
                            <p>Subtotal:</p>
                          </Col>
                          <Col className='order-summary-col' md={2}>
                            <span>₱ {itemsPrice}</span>
                          </Col>
                        </Row>

                        <Row>
                          <Col className='order-summary-col' md={2}>
                            <p>Tax:</p>
                          </Col>
                          <Col className='order-summary-col' md={2}>
                            <span>₱ {taxPrice}</span>
                          </Col>
                        </Row>

                        <Row>
                          <Col className='order-summary-col' md={2}>
                            <p>Shipping:</p>
                          </Col>
                          <Col className='order-summary-col' md={2}>
                            <span>₱ {shippingPrice}</span>
                          </Col>
                        </Row>

                        <Row>
                          <Col className='order-summary-col' md={2}>
                            <h3>Total:</h3>
                          </Col>
                          <Col className='order-summary-col' md={2}>
                            ₱ {totalPrice}
                          </Col>
                        </Row>
                      </div>

                      <div className='order-action'>
                        {/* <Button type='button' className='btn pdf-btn'>
                          Generate PDF
                        </Button> */}

                        <Button type='submit' className='btn  order-btn'>
                          Place Order
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              ) : !inquire && orderError ? (
                <PageNotFound />
              ) : (
                <Loader />
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default OrderForm;
