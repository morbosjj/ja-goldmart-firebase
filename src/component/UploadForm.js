import React from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadImages = ({
  files,
  setFiles,
  setValue,
  defaultValue,
  multiple,
}) => {
  const validateUpload = (file) => {
    const typePNGorJPG =
      file.type === 'image/jpeg ' || file.type === 'image/png';

    if (!typePNGorJPG) {
      message.error('You can only upload JPG/PNG file.');
    }

    setFiles((files) => [...files, file]);
    return typePNGorJPG;
  };

  const removeFile = (file) => {
    const index = files.indexOf(file);
    const newFiles = files.slice();
    newFiles.splice(index, 1);

    setFiles(newFiles);
  };

  const handleUpload = (info) => {
    // if (info.file.status !== 'uploading') {
    //   console.log(info.file, info.fileList);
    // }

    if (info.file.status === 'done') {
      setValue('images', info.fileList);
      // console.log('You can now proceed to description');
      // message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  return (
    <Upload
      onRemove={removeFile}
      beforeUpload={validateUpload}
      onChange={handleUpload}
      customRequest={dummyRequest}
      multiple={multiple}
      defaultFileList={defaultValue}
    >
      <Button>
        <UploadOutlined /> Choose image
      </Button>
    </Upload>
  );
};

export default UploadImages;
