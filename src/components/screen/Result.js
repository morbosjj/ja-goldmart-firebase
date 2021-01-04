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
  const {
    addData,
    setAddData,
    setValueAddModal,
    editData,
    setValueEditModal,
    setProduct,
    setValues,
    getDesc,
  } = useDataContext();
  const match = useRouteMatch('/admin/result/:id');
  const id = match ? match.params.id : '';

  return (
    <AdminContainer>
      <Content className='layout-content'>
        {/* {Object.keys(addData).length === 0 ||
          (Object.keys(editData).length === 0 && (
            <Redirect to='/PageNotFound' />
          ))} */}

        {match ? (
          <UpdateResultDescription
            id={id}
            editData={editData}
            setProduct={setProduct}
            setValueEditModal={setValueEditModal}
            getDesc={getDesc}
          />
        ) : (
          <ProductResultDescription
            addData={addData}
            setAddData={setAddData}
            setValueAddModal={setValueAddModal}
          />
        )}
      </Content>
    </AdminContainer>
  );
}
export default Result;
