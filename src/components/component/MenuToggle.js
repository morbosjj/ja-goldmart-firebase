import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import '../../css/components/admin/Menu.css';

const { Header } = Layout;

const MenuToggle = ({ collapsed, setCollapsed, MenuToggleRef }) => {
  const toggle = () => {
    MenuToggleRef.current.click();

    setCollapsed(!collapsed);
  };

  return (
    <Header>
      <span
        className='menu-admin'
        id='menu'
        ref={MenuToggleRef}
        onClick={toggle}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </span>
    </Header>
  );
};

export default MenuToggle;
