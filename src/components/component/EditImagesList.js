import React, { useState, useEffect } from 'react';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const EditImagesList = ({ images, setValue }) => {
  const [files, setFiles] = useState(images);

  useEffect(() => {
    setValue('images', files);
  });

  const handleChange = (data) => {
    console.log(data);
    // setValue('images', data.fileList);
  };

  const removeFile = (file) => {
    const index = files.indexOf(file);
    const newFiles = files.slice();
    newFiles.splice(index, 1);

    setFiles(newFiles);
  };

  return (
    <div>
      <Upload
        listType="picture-card"
        fileList={files}
        onChange={handleChange}
        onRemove={removeFile}
      >
        {files && (
          <>
            {files.length >= 3 ? null : (
              <span>
                <UploadOutlined /> Choose image
              </span>
            )}
          </>
        )}
      </Upload>
    </div>
  );
};

export default EditImagesList;
