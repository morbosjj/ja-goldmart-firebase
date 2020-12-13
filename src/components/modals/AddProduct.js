import React, { useEffect } from 'react';
import { Modal, Form, Select, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDataContext } from '../Context';
import useFirestore from '../../hooks/useFirestore';
import { ErrorMessage } from '@hookform/error-message';
import InputField from '../component/InputField';
import '../../css/components/admin/Modal.css';

const AddProductModal = ({ title, visible, setVisible, onCancel }) => {
  const { product, setValues } = useDataContext();
  const { docs } = useFirestore('categories');
  const { register, control, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    defaultValues: {
      model_name: product.model_name,
      product_name: product.product_name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      video: product.video,
      feature: product.feature,
    },
  });
  const options = docs.map(({ name }) => ({ value: name, label: name }));
  const { push } = useHistory();

  useEffect(() => {
    Object.keys(product).length === 0 ? setVisible(false) : setVisible(true);
  }, [product, setVisible]);

  const onSubmit = (data) => {
    if (!data) {
      return;
    }

    setValues(data);
    push('/admin/description');
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
            rules={{
              required: 'Product Name is a required field',
              pattern: {
                value: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
                message: 'Please input valid',
              },
            }}
          />
          {/* /^[A-Za-z ]+$/ */}
          <ErrorMessage errors={errors} name='product_name' as='p' />
        </Form.Item>

        <Form.Item
          label='Category'
          hasFeedback={!errors.category && 'success'}
          validateStatus={errors.category?.type === 'required' && 'error'}
        >
          <Controller
            name='category'
            as={<Select placeholder='Select Category' options={options} />}
            control={control}
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
          <InputField
            name='price'
            control={control}
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
          <InputField
            name='stock'
            control={control}
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
            rules={{ required: 'Video url is a required field' }}
          />
          <ErrorMessage errors={errors} name='video' as='p' />
        </Form.Item>

        <Form.Item label='Feature' validateStatus={errors.feature && 'error'}>
          <label className='radio'>
            <input ref={register} name='feature' type='radio' value={true} />
            <span>true</span>
          </label>

          <label className='radio'>
            <input
              ref={register}
              name='feature'
              type='radio'
              value={false}
              defaultChecked
            />
            <span>false</span>
          </label>
        </Form.Item>
      </form>
    </Modal>
  );
};

export default AddProductModal;