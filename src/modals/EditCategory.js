import React from 'react';
import { Modal, Form, Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import { firestore } from '../firebase/config';
import { ErrorMessage } from '@hookform/error-message';
import InputField from '../component/InputField';

const EditCategory = ({ title, visible, setVisible, onCancel, data }) => {
  const { id, category_id, name } = data;
  const { control, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  });

  const onUpdate = (value) => {
    if (value) {
      firestore.collection('categories').doc(id).set(value);
      setVisible(false);
      message.success(`Update category successfully`);
    } else {
      message.error(`Cannot update this category`);
    }
  };

  return (
    <Modal title={title} visible={visible} onCancel={onCancel} footer={null}>
      <form onSubmit={handleSubmit(onUpdate)} className='ja-form'>
        <Form.Item
          label='Category ID'
          validateStatus={errors.category_id?.type === 'required' && 'error'}
        >
          <InputField
            name='category_id'
            control={control}
            defaultValue={category_id}
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
            defaultValue={name}
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
            Update Category
          </Button>
        </Form.Item>
      </form>
    </Modal>
  );
};

export default EditCategory;
