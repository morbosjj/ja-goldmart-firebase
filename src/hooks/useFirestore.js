import { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  useEffect(() => {
    const unsub = firestore
      .collection(collection)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        let documents = [];

        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });

        setLoading(false);
        setDocs(documents);
      });

    return () => unsub();
  }, [collection]);

  return { docs, loading };
};

export default useFirestore;
