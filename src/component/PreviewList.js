import React from 'react';
import '../css/components/admin/PreviewList.css';

function PreviewList({ images }) {
  return (
    <div className='preview-list'>
      {images && (
        <>
          {images.map((image, index) => (
            <div className='preview-img' key={index}>
              <img src={image} alt='preview' />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PreviewList;
