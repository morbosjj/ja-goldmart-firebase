import React from 'react';
import '../../css/components/admin/ProductView.css';

function ProductView({ id, product }) {
  const { model_name, product_name } = product;

  return (
    <div className='product-view-container'>
      <h2 className='m-3'>Description</h2>
      <div>
        <p>
          <strong>Model Name: </strong> {model_name}
        </p>
      </div>

      <div>
        <p>
          <strong>Product Name: </strong> {product_name}
        </p>
      </div>
    </div>
  );
}

export default ProductView;
