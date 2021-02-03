import { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';

const useGetOrdersStatus = (value) => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    firestore
      .collection('orders')
      // .orderBy('orderAt', 'desc')
      .where('status', '==', value)
      .get()
      .then((querySnapshot) => {
        let documents = [];

        querySnapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });

        setOrders(documents);
      });
  }, [value]);

  return { orders };
};

export default useGetOrdersStatus;
