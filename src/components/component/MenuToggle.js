import React, { useState } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Dropdown } from 'antd';
import { Image } from 'react-bootstrap';
import { useDataContext } from '../Context';
import { Link, useHistory } from 'react-router-dom';
import '../../css/components/admin/Menu.css';

const { Header } = Layout;

const MenuToggle = ({ collapsed, setCollapsed, MenuToggleRef }) => {
  const [error, setError] = useState('');
  const { currentUser, logout } = useDataContext();
  const history = useHistory();

  const toggle = () => {
    MenuToggleRef.current.click();

    setCollapsed(!collapsed);
  };

  const handleLogout = async () => {
    setError('');

    try {
      await logout();
      history.push('/admin/login');
    } catch {
      setError('Failed to log out');
    }
  };

  const profileMenu = (
    <Menu>
      <Menu.Item>
        <Link to='/update-profile'>Profile</Link>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );
  return (
    <Header className='dashboard'>
      <span
        className='menu-admin'
        id='menu'
        ref={MenuToggleRef}
        onClick={toggle}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </span>

      <div className='profile-nav'>
        <Dropdown
          overlay={profileMenu}
          trigger={['click']}
          placement='bottomLeft'
          overlayStyle={{ top: 49 }}
          arrow
        >
          <p>
            {currentUser.displayName} <i className='fa fa-chevron-down'></i>
          </p>
        </Dropdown>

        <Image src={currentUser.photoURL} roundedCircle fluid />
      </div>
    </Header>
  );
};

export default MenuToggle;
