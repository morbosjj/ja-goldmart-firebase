import React from 'react';
import { Descriptions } from 'antd';
import ReactHtmlParser from 'react-html-parser';
import PreviewList from './PreviewList';
import ImagesList from './ImagesList';
import UploadPreview from './UploadPreview';

function ResultDescription({ layout, products, preview, imagesPreview }) {
  return (
    <div className='result-description'>
      <Descriptions
        className='table-details'
        layout={layout}
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        bordered
      >
        <Descriptions.Item label='Model Name' span={2}>
          {products.model_name}
        </Descriptions.Item>
        <Descriptions.Item label='Product Name' span={2}>
          {products.product_name}
        </Descriptions.Item>

        <Descriptions.Item label='Price' span={2}>
          {products.price}
        </Descriptions.Item>

        <Descriptions.Item label='Stock' span={2}>
          {products.stock}
        </Descriptions.Item>

        <Descriptions.Item label='Category' span={3}>
          {products.category}
        </Descriptions.Item>
        <Descriptions.Item label='Video' span={3}>
          {products.video}
        </Descriptions.Item>

        {preview && (
          <Descriptions.Item label='Images'>
            <PreviewList images={preview} />
          </Descriptions.Item>
        )}

        {!imagesPreview && (
          <Descriptions.Item label='Images'>
            <ImagesList image={products.images} />
          </Descriptions.Item>
        )}

        {imagesPreview && (
          <Descriptions.Item label='Images'>
            <form className='image-preview'>
              <UploadPreview type='picture-card' image={imagesPreview} />
            </form>
          </Descriptions.Item>
        )}
      </Descriptions>

      <Descriptions layout={layout} className='table-description'>
        <Descriptions.Item label='Description' span={3}>
          {ReactHtmlParser(products.description)}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default ResultDescription;
