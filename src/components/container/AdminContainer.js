import React, { useState, useRef } from 'react';
import { Layout } from 'antd';
import SideMenu from '../component/SideMenu';
import MenuToggle from '../component/MenuToggle';
import '../../css/components/admin/AdminContainer.css';

const AdminContainer = ({ children, title }) => {
  const [collapsed, setCollapsed] = useState(false);
  const MenuToggleRef = useRef();

  return (
    <Layout className='admin-container'>
      <SideMenu collapsed={collapsed} />

      <Layout className='admin-layout'>
        <MenuToggle
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          MenuToggleRef={MenuToggleRef}
        />

        {title ? <h3 className='m-4'>{title}</h3> : ''}

        {children}
      </Layout>
    </Layout>
  );
};

export default AdminContainer;
