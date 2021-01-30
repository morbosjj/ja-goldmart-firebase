import React from 'react';
import { Upload } from 'antd';
import '../css/components/admin/UploadPreview.css';

function UploadPreview({ type, image, preview }) {
  return (
    <Upload listType={type} fileList={image} defaultFileList={image}>
      <div className='upload-preview'>
        {/* {!preview && <h3>No image found</h3>} */}

        {preview &&
          preview.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt='preview' />
          ))}
      </div>
    </Upload>
  );
}

export default UploadPreview;
