import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Image } from 'react-bootstrap';
import {
  DashboardFilled,
  MailOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import Logo from '../img/logo.png';
import useHistoryLink from '../hooks/useHistoryLink';

const { Sider } = Layout;

const SideMenu = ({ collapsed }) => {
  const history = useHistory();
  const { path } = useHistoryLink(history);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className='sider-admin'
    >
      <Link to='/admin/dashboard'>
        <div className='companny-logo'>
          <Image src={Logo} fluid />
        </div>
      </Link>

      <Menu
        theme='light'
        mode='inline'
        defaultSelectedKeys={['Dashboard']}
        selectedKeys={[path]}
      >
        <Menu.Item key='dashboard' icon={<DashboardFilled />}>
          <Link to='/admin/dashboard'>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key='orders' icon={<InboxOutlined />}>
          <Link to='/admin/orders'>Orders</Link>
        </Menu.Item>
        <Menu.Item key='inquiries' icon={<MailOutlined />}>
          <Link to='/admin/inquiries'>Inquiry</Link>
        </Menu.Item>
        <Menu.Item key='products' icon={<InboxOutlined />}>
          <Link to='/admin/products'>Products</Link>
        </Menu.Item>
        <Menu.Item key='categories' icon={<InboxOutlined />}>
          <Link to='/admin/categories'>Categories</Link>
        </Menu.Item>
        {/* <Menu.Item key='accounts' icon={<UserOutlined />}>
          <Link to='/admin/accounts'>Accounts</Link>
        </Menu.Item> */}
      </Menu>
    </Sider>
  );
};

export default SideMenu;
