import React, { useState, useEffect } from 'react';
import { Layout, Button, Form } from 'antd';
import AdminContainer from '../container/AdminContainer';
import Editor from '../component/Editor';
import UploadForm from '../component/UploadForm';
import { useForm } from 'react-hook-form';
import { useHistory, Redirect } from 'react-router-dom';
import { useDataContext } from '../Context';
import ProductView from '../component/ProductView';
import { ErrorMessage } from '@hookform/error-message';
import '../css/components/admin/Description.css';

const { Content } = Layout;

const Description = () => {
  const { addData, setValueAddModal } = useDataContext();
  const { register, setValue, errors, handleSubmit } = useForm({
    defaultValues: { description: addData.description, images: addData.images },
  });
  const { push, goBack } = useHistory();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    register('description', { required: 'Description is a required field' });
    register('images', { required: 'Images is a required field' });
  }, [register]);

  const onSubmit = (data) => {
    setValueAddModal(data);
    push('/admin/result');
  };

  const BackPage = () => {
    goBack();
  };

  return (
    <AdminContainer>
      <Content className='layout-content'>
        {Object.keys(addData).length === 0 && <Redirect to='/PageNotFound' />}

        <ProductView product={addData} />

        <form onSubmit={handleSubmit(onSubmit)} className='ja-description'>
          <Form.Item>
            <Editor setValue={setValue} desc={addData.description} />
            <ErrorMessage
              errors={errors}
              name='description'
              as='p'
              className='error-text'
            />
          </Form.Item>

          <Form.Item label='Images'>
            <UploadForm
              files={files}
              setFiles={setFiles}
              setValue={setValue}
              defaultValue={addData.images}
              multiple={true}
            />
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
            <Button type='primary' onClick={BackPage}>
              Back
            </Button>
          </div>
        </form>
      </Content>
    </AdminContainer>
  );
};

export default Description;
