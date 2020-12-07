import React, { useEffect } from 'react';
import { Layout, Button, Form } from 'antd';
import AdminContainer from '../container/AdminContainer';
import Editor from '../component/Editor';
import { useForm } from 'react-hook-form';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { useDataContext } from '../Context';
import ProductView from '../component/ProductView';
import EditImagesList from '../component/EditImagesList';
import { ErrorMessage } from '@hookform/error-message';
import '../../css/components/admin/Description.css';

const { Content } = Layout;

const EditDescription = () => {
  const { product, desc, images, setValues } = useDataContext();
  const { register, setValue, handleSubmit, errors } = useForm({
    defaultValues: { description: desc },
  });
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    register('description', { required: 'Description is a required field' });
    // register('images', { required: 'Images is a required field' });
  }, [register]);

  const onSubmit = (data) => {
    setValues(data);
    push(`/admin/result/${id}`);
  };

  return (
    <AdminContainer>
      <Content className='layout-content'>
        {Object.keys(product).length === 0 && <Redirect to='/PageNotFound' />}

        <ProductView key={id} product={product} />

        <form onSubmit={handleSubmit(onSubmit)} className='ja-description'>
          <Form.Item>
            <Editor
              setValue={setValue}
              desc={product.description ? product.description : desc}
            />
            <ErrorMessage
              errors={errors}
              name='description'
              as='p'
              className='error-text'
            />
          </Form.Item>

          <Form.Item>
            <EditImagesList images={images} setValue={setValue} />
            <ErrorMessage
              errors={errors}
              name='images'
              as='p'
              className='error-text'
            />
          </Form.Item>

          <div className='description-bottom'>
            <Button type='primary' htmlType='submit'>
              Review Details
            </Button>
          </div>
        </form>
      </Content>
    </AdminContainer>
  );
};

export default EditDescription;
