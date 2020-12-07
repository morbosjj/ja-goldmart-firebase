import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDataContext } from '../Context';
import AuthContainer from '../container/AuthContainer';
import HeaderAuth from './HeaderAuth';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useDataContext();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  if (currentUser) {
    history.push('/dashboard');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/dashboard');
    } catch {
      setError('Failed to log in');
    }

    setLoading(false);
  };

  return (
    <AuthContainer>
      <HeaderAuth />
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log in</h2>

          {error && <Alert variant='danger'>{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} />
            </Form.Group>

            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} />
            </Form.Group>

            <Button disabled={loading} className='w-100' type='submit'>
              {loading ? 'Please wait' : 'Login'}
            </Button>
          </Form>

          <div className='w-100 text-center mt-3'>
            <Link to='/forgot-password'>Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/register'>Sign up</Link>
      </div>
    </AuthContainer>
  );
};

export default Signup;
