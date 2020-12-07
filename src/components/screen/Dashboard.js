import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { Layout } from 'antd';
import AdminContainer from '../container/AdminContainer';
import { Link, useHistory } from 'react-router-dom';
import { useDataContext } from '../Context';

const { Content } = Layout;

const Dashboard = () => {
  const [error, setError] = useState('');
  const { currentUser, logout } = useDataContext();
  const history = useHistory();

  const handleLogout = async () => {
    setError('');

    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to log out');
    }
  };

  return (
    <AdminContainer title='Dashboard'>
      <Content className='layout-content'>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <strong>Email: </strong> {currentUser.email}
            <Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
              Update Profile
            </Link>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          <Button variant='link' onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </Content>
    </AdminContainer>
  );
};

export default Dashboard;
