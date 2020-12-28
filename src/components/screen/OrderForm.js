import React from 'react';
import {
  Container,
  Form,
  Table,
  Row,
  Col,
  ListGroup,
  Card,
} from 'react-bootstrap';
import Logo from '../../img/logo.png';
import '../../css/components/OrderForm.css';

const OrderForm = () => {
  return (
    <div className='order'>
      <Container>
        <div className='order-form-container'>
          <div class='order-form-content'>
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
                  Date By order: <strong>12/20/2020</strong>
                </p>
              </div>

              <Form>
                <Row>
                  <Col>
                    <label>Full Name</label>
                  </Col>

                  <Col md>
                    <Form.Group controlId='firstname'>
                      <Form.Control type='text' />
                      <Form.Text className='text-muted'>First Name</Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md>
                    <Form.Group controlId='lastname'>
                      <Form.Control type='text' />
                      <Form.Text className='text-muted'>Last Name</Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <label>Phone Number</label>
                  </Col>
                  <Col md>
                    <Form.Group controlId='phone_number'>
                      <Form.Control type='number' />
                      <Form.Text className='text-muted'>Phone Number</Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <label>E-mail</label>
                  </Col>

                  <Col md>
                    <Form.Group controlId='email'>
                      <Form.Control type='email' />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <label>Delivery Address</label>
                  </Col>

                  <Col>
                    <Form.Group controlId='street_address'>
                      <Form.Control type='text' />
                      <Form.Text className='text-muted'>
                        Street Address
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId='street_address'>
                      <Form.Control type='text' />
                      <Form.Text className='text-muted'>
                        Street Address
                      </Form.Text>
                    </Form.Group>

                    <Row>
                      <Col>
                        <Form.Group controlId='city'>
                          <Form.Control />
                          <Form.Text className='text-muted'>City</Form.Text>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId='state'>
                          <Form.Control />
                          <Form.Text className='text-muted'>
                            State / Province
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group controlId='zip'>
                      <Form.Control />
                      <Form.Text className='text-muted'>Zip</Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>

              <div className='order-products'>
                <Table borderless={true} hover>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Sub total</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>JS 1200 Manual Stitcher</td>
                      <td>$ 200</td>
                      <td>1</td>
                      <td>$ 200</td>
                    </tr>
                    <tr>
                      <td>JS 1200 Manual Stitcher</td>
                      <td>$ 200</td>
                      <td>1</td>
                      <td>$ 200</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div className='order-summary'>
                <h2>Order Summary</h2>

                <Row>
                  <Col>Subtotal:</Col>
                  <Col>$500.00</Col>
                </Row>

                <Row>
                  <Col>Tax:</Col>
                  <Col>$1.00</Col>
                </Row>

                <Row>
                  <Col>Shipping:</Col>
                  <Col>$9.00</Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderForm;
