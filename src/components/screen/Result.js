import React from 'react';
import { Layout } from 'antd';
import AdminContainer from '../container/AdminContainer';
import { useDataContext } from '../Context';
import { Redirect, useRouteMatch } from 'react-router-dom';
import ProductResultDescription from '../component/ProductResultDescription';
import UpdateResultDescription from '../component/UpdateResultDescription';
import '../../css/components/admin/Result.css';

const { Content } = Layout;

function Result() {
  const { product, setProduct, setValues, getDesc } = useDataContext();
  const match = useRouteMatch('/admin/result/:id');
  const id = match ? match.params.id : '';

  return (
    <AdminContainer>
      <Content className='layout-content'>
        {Object.keys(product).length === 0 && <Redirect to='/PageNotFound' />}

        {match ? (
          <UpdateResultDescription
            id={id}
            product={product}
            setProduct={setProduct}
            setValues={setValues}
            getDesc={getDesc}
          />
        ) : (
          <ProductResultDescription product={product} setProduct={setProduct} />
        )}
      </Content>
    </AdminContainer>
  );
}
export default Result;
