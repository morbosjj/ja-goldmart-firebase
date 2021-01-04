import React from 'react';
import { Modal, Form, Select, Button, InputNumber } from 'antd';
import InputField from '../component/InputField';
import { ErrorMessage } from '@hookform/error-message';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useFirestore from '../../hooks/useFirestore';
import { useDataContext } from '../Context';

function EditProduct({ title, visible, setVisible, onCancel, data }) {
  const { setValues, getDesc, getImages } = useDataContext();
  const {
    id,
    model_name,
    product_name,
    category,
    images,
    price,
    stock,
    feature,
    description,
    video,
  } = data;
  const { control, handleSubmit, errors, register } = useForm({
    defaultValues: {
      feature,
    },
  });

  const { docs } = useFirestore('categories');
  const options = docs.map(({ name }) => ({ value: name, label: name }));
  const { push } = useHistory();

  const onSubmit = (value) => {
    if (!data) {
      return;
    }
    getDesc(description);
    getImages(images);
    setValues(value);
    push(`/admin/edit/${id}`);
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={
        <form onSubmit={handleSubmit(onSubmit)} className='ja-form'>
          <Button type='primary' htmlType='submit'>
            Go to Description
          </Button>
        </form>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className='ja-form'>
        <Form.Item
          label='Model Name'
          validateStatus={errors.model_name?.type === 'required' && 'error'}
        >
          <InputField
            name='model_name'
            control={control}
            defaultValue={model_name}
            rules={{ required: 'Model Name is a required field' }}
          />
          <ErrorMessage errors={errors} name='model_name' as='p' />
        </Form.Item>

        <Form.Item
          label='Product Name'
          hasFeedback={!errors.product_name && 'success'}
          validateStatus={errors.product_name && 'error'}
        >
          <InputField
            name='product_name'
            control={control}
            defaultValue={product_name}
            rules={{
              required: 'Product Name is required',
              pattern: {
                value: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
                message: 'Please input valid',
              },
            }}
          />
          <ErrorMessage errors={errors} name='product_name' as='p' />
        </Form.Item>

        <Form.Item
          label='Category'
          hasFeedback={!errors.category && 'success'}
          validateStatus={errors.category?.type === 'required' && 'error'}
        >
          <Controller
            name='category'
            as={
              <Select
                placeholder='Select Category'
                options={options}
                defaultValue={category}
              />
            }
            control={control}
            defaultValue={category}
            onChange={([selected]) => {
              return { value: selected };
            }}
            rules={{ required: 'Category is a required field' }}
          />
          <ErrorMessage errors={errors} name='category' as='p' />
        </Form.Item>

        <Form.Item
          label='Price'
          hasFeedback={!errors.price && 'success'}
          validateStatus={errors.price && 'error'}
        >
          <Controller
            as={InputNumber}
            name='price'
            control={control}
            defaultValue={price}
            maxLength={7}
            rules={{
              required: 'Price is a required field',
              pattern: {
                value: /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/,
                message: 'Price should not contain characters',
              },
            }}
          />
          <ErrorMessage errors={errors} name='price' as='p' />
        </Form.Item>

        <Form.Item
          label='Stock'
          hasFeedback={!errors.stock && 'success'}
          validateStatus={errors.stock && 'error'}
        >
          <Controller
            as={InputNumber}
            name='stock'
            control={control}
            defaultValue={stock}
            maxLength={2}
            rules={{
              required: 'Stock is a required field',
              pattern: {
                value: /^(0|[1-9][0-9]*)$/,
                message: 'Stock should not contain characters',
              },
            }}
          />

          <ErrorMessage errors={errors} name='stock' as='p' />
        </Form.Item>

        <Form.Item
          label='Video'
          validateStatus={errors.video?.type === 'required' && 'error'}
        >
          <InputField
            name='video'
            control={control}
            defaultValue={video}
            rules={{ required: 'Video url is a required field' }}
          />
          <ErrorMessage errors={errors} name='video' as='p' />
        </Form.Item>

        <Form.Item label='Feature' validateStatus={errors.feature && 'error'}>
          <div>
            <label className='radio'>
              <input
                type='radio'
                name='feature'
                ref={register}
                value={true}
                defaultChecked={feature === 'true'}
              />
              <span>true</span>
            </label>

            <label className='radio'>
              <input
                type='radio'
                name='feature'
                ref={register}
                value={false}
                defaultChecked={feature === 'false'}
              />
              <span>false</span>
            </label>
          </div>
        </Form.Item>
      </form>
    </Modal>
  );
}

export default EditProduct;
