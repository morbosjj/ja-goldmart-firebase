import React from 'react';
import { Modal, Form, Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import { firestore, timestamp } from '../firebase/config';
import { ErrorMessage } from '@hookform/error-message';
import InputField from '../component/InputField';

const AddCategory = ({ title, visible, setVisible, onCancel }) => {
  const { control, handleSubmit, errors, reset } = useForm({
    mode: 'onBlur',
  });

  const submitCategory = (data) => {
    const { category_id, name } = data;
    const createdAt = timestamp();

    if (data) {
      reset({
        category_id: '',
        name: '',
      });

      firestore.collection('categories').add({ category_id, name, createdAt });
      setVisible(false);
      message.success('Added category successfully');
    } else {
      message.error('Cannot add a category');
    }
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={submitCategory}
      onCancel={onCancel}
      footer={null}
    >
      <form onSubmit={handleSubmit(submitCategory)} className='ja-form'>
        <Form.Item
          label='Category ID'
          validateStatus={errors.category_id?.type === 'required' && 'error'}
        >
          <InputField
            name='category_id'
            control={control}
            rules={{ required: 'Category ID is a required field' }}
          />
          <ErrorMessage errors={errors} name='category_id' as='p' />
        </Form.Item>

        <Form.Item
          label='Name'
          hasFeedback={!errors.name && 'success'}
          validateStatus={errors.name && 'error'}
        >
          <InputField
            name='name'
            control={control}
            rules={{
              required: 'Category name is a required field',
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: 'Category name should not contain numbers',
              },
            }}
          />
          <ErrorMessage errors={errors} name='name' as='p' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Add Category
          </Button>
        </Form.Item>
      </form>
    </Modal>
  );
};

export default AddCategory;
