import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const ResponsiveMenu = () => {
  return (
    <div className='responsive-nav-menu'>
      <Menu mode='inline'>
        <SubMenu key='sub-products' title='Products'>
          <Menu.Item>
            <Link to='/shop'>All Products</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/'>Die Cutting Machine</Link>
          </Menu.Item>

          <Menu.Item>
            <Link to='/'>Gluing Machine</Link>
          </Menu.Item>

          <Menu.Item>
            <Link to='/'>Other Machine</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key='resources'>
          <Link to='/resources'>Resources</Link>
        </Menu.Item>

        <Menu.Item key='contacts'>
          <Link to='/contacts'>Contacts</Link>
        </Menu.Item>

        <Menu.Item key='about'>
          <Link to='/about'>About Us</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default ResponsiveMenu;
