import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDataContext } from '../Context';
import AuthContainer from '../container/AuthContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForgotPassword = () => {
  const emailRef = useRef();

  const { resetPassword } = useDataContext();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  // const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
    }

    setLoading(false);
  };

  return (
    <AuthContainer>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Password Reset</h2>

          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} />
            </Form.Group>

            <Button disabled={loading} className='w-100' type='submit'>
              {loading ? 'Please wait' : 'Reset Password'}
            </Button>
          </Form>

          <div className='w-100 text-center mt-3'>
            <Link to='/login'>Login?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/register'>Sign up</Link>
      </div>
    </AuthContainer>
  );
};

export default ForgotPassword;
