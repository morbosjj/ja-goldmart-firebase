import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
import useFirestore from '../hooks/useFirestore';

const MainMenu = ({ current }) => {
  const { docs } = useFirestore('categories');
  const categories = docs;
  const match = useRouteMatch();
  const [path, setPath] = useState('');

  const categoryMenu = (
    <Menu>
      <Menu.Item>
        <Link to='/shop'>All Products</Link>
      </Menu.Item>
      {categories &&
        categories.map((category) => (
          <Menu.Item key={category.name}>
            <a href={`/category/${category.name}`} className='menu-item'>
              {category.name}
            </a>
          </Menu.Item>
        ))}
    </Menu>
  );

  useEffect(() => {
    if (match) {
      const pathname = match.url.split('/')[1];
      setPath(pathname);
    }
  }, [match]);

  return (
    <Menu mode='horizontal' defaultChecked={[' ']} selectedKeys={[path]}>
      <Menu.Item key='products'>
        <Dropdown
          overlay={categoryMenu}
          trigger={['click']}
          placement='bottomLeft'
          arrow
        >
          <Link to='/shop'>
            Products <i className='fa fa-chevron-down'></i>
          </Link>
        </Dropdown>
      </Menu.Item>

      <Menu.Item key='resources'>
        <Link to='/resources'>Resources</Link>
      </Menu.Item>

      <Menu.Item key='contacts'>
        <Link to='/contacts'>Contacts</Link>
      </Menu.Item>

      <Menu.Item key='about'>
        <Link to='/about'>About Us</Link>
      </Menu.Item>

      {/* <Button type='primary' style={{ marginLeft: 20 }}>
        Get Quote
      </Button> */}
    </Menu>
  );
};

export default MainMenu;
