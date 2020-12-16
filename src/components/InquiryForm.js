import React from 'react';
import { Form, Row, Col, Alert, Button } from 'react-bootstrap';
import '../css/components/InquiryForm.css';

const InquiryForm = ({ submitForm, success, loading }) => {
  return (
    <div className='inquiry-form'>
      <Form onSubmit={submitForm} className='my-5'>
        {success && (
          <Alert variant='success'>
            <i className='fas fa-check-circle'></i> Thank you. Your submission
            has been received.
          </Alert>
        )}

        <Row>
          {/* md={5} */}
          <Col>
            <Form.Group controlId='full_name'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type='text' name='full_name' required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='phone_number'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type='text' name='phone_number' required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' name='email' required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='company_name'>
              <Form.Label>Company Name</Form.Label>
              <Form.Control type='text' name='company_name' required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId='message'>
              <Form.Label>Message</Form.Label>
              <Form.Control as='textarea' rows={3} name='message' required />
            </Form.Group>
          </Col>
        </Row>

        <Button variant='custom' size='md' type='submit'>
          {loading ? 'Please wait...' : 'Submit'}
        </Button>
      </Form>
    </div>
  );
};

export default InquiryForm;
