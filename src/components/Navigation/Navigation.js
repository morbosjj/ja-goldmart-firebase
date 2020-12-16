import React, { useState } from 'react';
import { Drawer, Button, Layout } from 'antd';
import ResponsiveMenu from './ResponsiveMenu';
import { Link } from 'react-router-dom';

import MainMenu from './MainMenu';
import '../../css/components/Header.css';
import AlgoliaSearch from '../AlgoliaSearch';

const { Header } = Layout;

const Navigation = () => {
  const [current, setCurrent] = useState('home');
  const [visible, setVisible] = useState(false);

  const showHamburger = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Header>
      <div className='header'>
        <div className='sub-head'>
          <div className='sub-contacts'>
            <strong className='mr-3'>jagoldmart@gmail.com</strong>

            <p>
              Call us now: <span className='contact-number'>1234567890</span>
            </p>
          </div>
        </div>

        <div className='main-navigation'>
          <div className='nav'>
            <MainMenu current={current} />
          </div>

          <div className='search'>
            <AlgoliaSearch />
          </div>
        </div>

        <div className='main-nav-container'>
          <div className='logo'>
            <div className='img-logo'>
              <Link to='/'>
                <img src='/img/logo.png' width='120px' alt='logo' />
              </Link>
            </div>
          </div>

          <div className='responsive-nav-container'>
            <div className='responsive-btn'>
              <Button type='primary' onClick={showHamburger}>
                <i className='fas fa-bars'></i>
              </Button>
            </div>
          </div>

          <Drawer
            className='header-drawer'
            placement='right'
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <div className='responsive-btn'>
              <Button type='primary' onClick={onClose}>
                <i className='fas fa-times'></i>
              </Button>
            </div>
            <div className='responsive-alogia-search'>
              <AlgoliaSearch />
            </div>
            <ResponsiveMenu />
          </Drawer>
        </div>
      </div>
    </Header>
  );
};

export default Navigation;
