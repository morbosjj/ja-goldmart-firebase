import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import '../../css/components/PageNotFound.css';

const { Content } = Layout;

function PageNotFound() {
  return (
    <Layout>
      <Content className='content-main'>
        <div className='error-page-container'>
          <h1>404 Error - Page Not Found</h1>
          <p>The page you requested could not found.</p>

          <Link to='/'>Back to Home</Link>
        </div>
      </Content>
    </Layout>
  );
}

export default PageNotFound;
