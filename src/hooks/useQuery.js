import { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';

const useQuery = (collection, column, value) => {
  const [result, setResult] = useState();

  useEffect(() => {
    let productRef = firestore.collection(collection);

    const query = productRef.where(column, '==', value);

    query.get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        setResult(doc.data());
      });
    });
  }, [collection, column, value]);

  return { result };
};

export default useQuery;
