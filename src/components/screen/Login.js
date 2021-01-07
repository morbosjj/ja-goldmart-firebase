import React, { useState } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDataContext } from '../Context';
import AuthContainer from '../container/AuthContainer';
import HeaderAuth from './HeaderAuth';
import '../../css/components/admin/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const { loginGoogle, currentUser } = useDataContext();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  if (currentUser) {
    history.push('/admin/dashboard');
  }

  return (
    <AuthContainer>
      <Card className='login-page'>
        <Card.Body>
          <HeaderAuth />

          <h2>Welcome back!</h2>
          <p>Please sign in to continue</p>

          {error && <Alert variant='danger'>{error}</Alert>}

          <Button
            disabled={loading}
            className='w-100'
            type='button'
            onClick={loginGoogle}
          >
            <i class='fab fa-google'></i>{' '}
            {loading ? 'Please wait' : 'Login with Google'}
          </Button>
        </Card.Body>
      </Card>
    </AuthContainer>
  );
};

export default Signup;
