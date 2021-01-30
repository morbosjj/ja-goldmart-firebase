import React from 'react';
import '../css/components/admin/ImagesList.css';

export default function ImagesList({ image }) {
  return (
    <div className='images-list'>
      {image && (
        <div>
          {image.map((item) => (
            <div className='list-img'>
              <img src={item.url} alt='preview' />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
