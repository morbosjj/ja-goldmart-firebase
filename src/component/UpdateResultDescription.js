import React from 'react';
import { message } from 'antd';
import ResultDescription from './ResultDescription';
import SubmitForm from './SubmitForm';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { firestore, timestamp } from '../firebase/config';
import '../css/components/admin/ResultDescription.css';

function UpdateResultDescription({
  id,
  editData,
  setProduct,
  setValueEditModal,
  getDesc,
}) {
  const {
    model_name,
    product_name,
    category,
    images,
    price,
    stock,
    description,
    feature,
    video,
  } = editData;

  const { handleSubmit } = useForm();
  const history = useHistory();
  console.log(editData);
  const updateProduct = () => {
    const createdAt = timestamp();

    if (id) {
      firestore.collection('products').doc(id).set({
        model_name,
        product_name,
        category,
        images,
        price,
        stock,
        description,
        feature,
        video,
        createdAt,
      });
      message.success(`Update category successfully`);
      // setProduct({});
      history.push('/admin/products');
    } else {
      message.error('Cannot update this product');
    }
  };

  const backPage = () => {
    getDesc(description);
    setValueEditModal(editData);
    history.goBack();
  };

  return (
    <div className='result-container'>
      <h2>Update Details</h2>

      <ResultDescription layout='vertical' products={editData} />

      <SubmitForm
        titleSubmit='Update Product'
        handleSubmit={handleSubmit}
        backPage={backPage}
        onSubmit={updateProduct}
      />
    </div>
  );
}

export default UpdateResultDescription;
