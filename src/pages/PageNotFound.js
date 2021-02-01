import React from 'react';
import Meta from '../component/Meta';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import '../css/components/PageNotFound.css';

const { Content } = Layout;

function PageNotFound() {
  return (
    <Layout>
      <Meta title='404 Page Not Found' />
      <Content className='content-main'>
        <div className='error-page-container'>
          <h1>Error 404</h1>
          <p>The page you requested was not found.</p>

          <Link to='/'>Go back to homepage</Link>
        </div>
      </Content>
    </Layout>
  );
}

export default PageNotFound;
