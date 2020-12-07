import { useState, useEffect } from 'react';
import { storage } from '../firebase/config';

const useStorage = (files, name) => {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [upload, setUpload] = useState([]);

  useEffect(() => {
    if (files) {
      if (files.length > 0) {
        files.forEach((file) => {
          const storageRef = storage.ref();
          const fileRef = storageRef.child(`images/${name}/${file.name}`);

          fileRef.put(file.originFileObj).on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(progress);
              // if (progress === 100) {
              //   setDisable(false);
              // }
            },
            (err) => {
              setError(err);
            },
            async () => {
              const urlFile = await fileRef.getDownloadURL();
              setUrl(urlFile);
              setUpload((prevState) => [
                ...prevState,
                {
                  uid: file.uid,
                  status: file.status,
                  name: file.name,
                  url: urlFile,
                  original: urlFile,
                  thumbnail: urlFile,
                },
              ]);
            }
          );
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, name]);
  return { upload, error };
};

export default useStorage;
