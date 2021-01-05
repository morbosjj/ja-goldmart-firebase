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
      <Content className='layout-content'></Content>
    </AdminContainer>
  );
};

export default Dashboard;
