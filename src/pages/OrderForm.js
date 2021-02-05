import React, { useEffect } from 'react';
import Meta from '../component/Meta';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Logo from '../img/logo.png';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import { useDataContext } from '../Context';
import { useForm } from 'react-hook-form';
import PageNotFound from './PageNotFound';
import Loader from '../component/Loader';
import { randomFixedInteger } from '../Helper';
import '../css/components/OrderForm.css';

const OrderForm = () => {
  const {
    order,
    orderError,
    orderSuccess,
    orderNumber,
    inquiry,
    getInquiryDetails,
    getOrderIfExist,
  } = useDataContext();

  const params = useParams();
  const history = useHistory();
  const id = Number(params.inquiryID);
  const date = moment().format('L');
  const orderAt = moment().format('MMMM Do YYYY, h:mm:ss a');
  const year = moment().format('YYYY');
  const month = moment().format('MM');
  const day = moment().format('DD');
  const orderTypeNumber = 2000;
  const randomNumber = randomFixedInteger(4);
  const orderID = Number(
    `${orderTypeNumber}${year}${month}${day}${randomNumber}`
  );

  const { inquire } = inquiry ? inquiry : [];

  const { register, handleSubmit } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    getInquiryDetails(id);
    getOrderIfExist(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data, e) => {
    const {
      firstname,
      lastname,
      email,
      phone_number,
      address_line,
      address_line_2,
      city,
      state,
      zip,
      shippingPrice,
    } = data;

    localStorage.setItem(
      'order',
      JSON.stringify({
        inquiryID: id,
        orderID,
        firstname,
        lastname,
        email,
        phone_number,
        shippingAddress: {
          address_line,
          address_line_2,
          city,
          state,
          zip,
        },
        shippingPrice,
        orderItems: inquire,
        isPaid: false,
        isDelivered: false,
        orderAt,
      })
    );
    history.push('/order-details');
  };

  return (
    <div className='order'>
      <Meta title='Order Form | JA Goldmart Enterprise' />
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

                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Row className='form-order-details'>
                        <Col>
                          <label>Full Name</label>
                        </Col>

                        <Col md>
                          <Form.Group controlId='firstname'>
                            <Form.Control
                              type='text'
                              defaultValue={inquiry.firstname}
                              ref={register}
                              name='firstname'
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
                              ref={register}
                              name='lastname'
                              required
                            />
                            <Form.Text className='text-muted'>
                              Last Name
                            </Form.Text>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className='form-order-details'>
                        <Col md={4}>
                          <label>Phone Number</label>
                        </Col>
                        <Col md>
                          <Form.Group controlId='phone_number'>
                            <Form.Control
                              type='number'
                              defaultValue={inquiry.phone_number}
                              ref={register}
                              name='phone_number'
                              required
                            />
                            <Form.Text className='text-muted'>
                              Phone Number
                            </Form.Text>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className='form-order-details'>
                        <Col md={4}>
                          <label>E-mail</label>
                        </Col>

                        <Col md>
                          <Form.Group controlId='email'>
                            <Form.Control
                              type='email'
                              defaultValue={inquiry.email}
                              ref={register}
                              name='email'
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className='form-order-details'>
                        <Col md={4}>
                          <label>Delivery Address</label>
                        </Col>

                        <Col>
                          <Form.Group controlId='address_line'>
                            <Form.Control
                              type='text'
                              ref={register}
                              name='address_line'
                              required
                            />
                            <Form.Text className='text-muted'>
                              Address Line 1
                            </Form.Text>
                          </Form.Group>
                          <Form.Group controlId='address_line_2'>
                            <Form.Control
                              type='text'
                              ref={register}
                              name='address_line_2'
                              required
                            />
                            <Form.Text className='text-muted'>
                              Address Line 2
                            </Form.Text>
                          </Form.Group>

                          <Row>
                            <Col>
                              <Form.Group controlId='city'>
                                <Form.Control
                                  type='text'
                                  ref={register}
                                  name='city'
                                  required
                                />
                                <Form.Text className='text-muted'>
                                  City
                                </Form.Text>
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group controlId='state'>
                                <Form.Control
                                  type='text'
                                  ref={register}
                                  name='state'
                                  required
                                />
                                <Form.Text className='text-muted'>
                                  State / Province
                                </Form.Text>
                              </Form.Group>
                            </Col>
                          </Row>

                          <Form.Group controlId='zip'>
                            <Form.Control
                              type='text'
                              ref={register}
                              name='zip'
                              required
                            />
                            <Form.Text className='text-muted'>Zip</Form.Text>
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className='order-shipping'>
                        <label>Shipping Method</label>
                        <Row>
                          <Col>
                            <Form.Group controlId='shippingPrice'>
                              <Form.Check type='radio'>
                                <Form.Check.Input
                                  type='radio'
                                  name='shippingPrice'
                                  ref={register}
                                  value={0}
                                  label='M'
                                />
                                <Form.Check.Label>
                                  Metro Manila ₱ 0.00 <span>Free Shipping</span>
                                </Form.Check.Label>
                              </Form.Check>

                              <Form.Check type='radio'>
                                <Form.Check.Input
                                  type='radio'
                                  name='shippingPrice'
                                  ref={register}
                                  value={300}
                                />
                                <Form.Check.Label>
                                  Nothern Luzon ₱ 300.00
                                </Form.Check.Label>
                              </Form.Check>

                              <Form.Check type='radio'>
                                <Form.Check.Input
                                  type='radio'
                                  name='shippingPrice'
                                  ref={register}
                                  value={400}
                                />
                                <Form.Check.Label>
                                  Southern Luzon ₱ 400.00
                                </Form.Check.Label>
                              </Form.Check>

                              <Form.Check type='radio'>
                                <Form.Check.Input
                                  type='radio'
                                  name='shippingPrice'
                                  ref={register}
                                  value={450}
                                />
                                <Form.Check.Label>
                                  Visayas ₱ 450.00
                                </Form.Check.Label>
                              </Form.Check>

                              <Form.Check type='radio'>
                                <Form.Check.Input
                                  type='radio'
                                  name='shippingPrice'
                                  ref={register}
                                  value={500}
                                />
                                <Form.Check.Label>
                                  Mindanao ₱ 500.00
                                </Form.Check.Label>
                              </Form.Check>
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>

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
                                    {inquire.map((item, index) => (
                                      <tr key={index}>
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

                      <div className='order-action'>
                        {/* <Button type='button' className='btn pdf-btn'>
                          Generate PDF
                        </Button> */}

                        <Button type='submit' className='btn  order-btn'>
                          Continue
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
