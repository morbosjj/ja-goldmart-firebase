import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import useStorage from '../../hooks/useStorage';
import { useHistory } from 'react-router-dom';

import ResultDescription from './ResultDescription';
import { firestore, timestamp } from '../../firebase/config';
import '../../css/components/admin/ResultDescription.css';
import SubmitForm from './SubmitForm';

function ProductResultDescription({ addData, setAddData, setValueAddModal }) {
  const history = useHistory();
  const { handleSubmit } = useForm();
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
  } = addData;
  const [disable, setDisable] = useState(true);
  const { upload } = useStorage(images, product_name);

  useEffect(() => {
    if (upload) {
      if (upload?.length > 0) {
        setDisable(false);
      }
    }
  }, [upload]);

  const addProduct = async () => {
    const createdAt = timestamp();
    const full_product_name = `${model_name} ${product_name}`;
    await firestore.collection('products').add({
      model_name,
      product_name,
      category,
      images: upload,
      price,
      stock,
      description,
      feature,
      video,
      full_product_name,
      createdAt,
    });
    message.success('Added product successfully');
    setAddData({});
    history.push('/admin/products');
  };

  const backPage = () => {
    history.goBack();
  };
  return (
    <div className='result-container'>
      <h2>Product Details</h2>
      <ResultDescription
        layout='vertical'
        products={addData}
        imagesPreview={images}
      />

      <SubmitForm
        titleSubmit='Add Product'
        handleSubmit={handleSubmit}
        backPage={backPage}
        onSubmit={addProduct}
        disable={disable}
      />
    </div>
  );
}

export default ProductResultDescription;
