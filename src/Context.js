import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth, googleProvider, firestore } from './firebase/config';

const Context = createContext();

export const useDataContext = () => {
  return useContext(Context);
};

export const DataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [orderError, setOrderError] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [placeOrder, setPlaceOrder] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [addData, setAddData] = useState({});
  const [addModal, setAddModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [item, setItem] = useState({});
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [desc, setDesc] = useState('');
  const [images, setImages] = useState();
  const [error, setError] = useState();
  const [inquiry, setInquiry] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const setValueAddModal = (values) => {
    setAddData((prevData) => ({
      ...prevData,
      ...values,
    }));
  };

  const setValueEditModal = (values) => {
    setEditData((prevData) => ({
      ...prevData,
      ...values,
    }));
  };

  const setValueOrderForm = (values) => {
    setOrderData((prevData) => ({
      ...prevData,
      ...values,
    }));
  };

  const loginGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        // let credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        // let token = credential.accessToken;
        // The signed-in user info.
        // let user = result.user;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    return auth.signOut();
  };

  const getFirestoreCollection = (collection, date) => {
    firestore
      .collection(collection)
      .orderBy(date, 'desc')

      .onSnapshot((snap) => {
        let documents = [];

        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });

        if (collection === 'categories') {
          setCategories(documents);
        } else {
          setLoading(false);
          setDocs(documents);
        }
      });
  };

  const getProducts = () => {
    firestore
      .collection('products')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        let result = [];
        snap.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        setLoading(false);
        setProducts(result);
      });
  };

  const getInquiries = () => {
    firestore
      .collection('inquiries')
      .orderBy('inquiryAt', 'desc')
      .onSnapshot((snap) => {
        let result = [];
        snap.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        setLoading(false);
        setInquiries(result);
      });
  };

  const getCategories = () => {
    firestore
      .collection('categories')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        let result = [];
        snap.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        setLoading(false);
        setCategories(result);
      });
  };

  const getOrders = () => {
    firestore
      .collection('orders')
      .orderBy('orderAt', 'desc')
      .onSnapshot((snap) => {
        let result = [];
        snap.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });

        setLoading(false);
        setOrders(result);
      });
  };

  const getOrderIfExist = (inquiryId) => {
    firestore
      .collection('orders')
      .where('inquiryID', '==', inquiryId)
      .get()
      .then((querySnapshot) => {
        let result = [];

        querySnapshot.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });

        if (result.length === 0) {
          return setOrderError(true);
        }

        result.map((data) => {
          return setOrder(data);
        });
        // setOrder(result);
      });
  };

  const checkIfInquiryIsPlaceOrder = (inquiryId) => {
    firestore
      .collection('orders')
      .where('inquiryID', '==', inquiryId)
      .get()
      .then((querySnapshot) => {
        let result = [];

        querySnapshot.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });

        if (result.length === 0) {
          return setPlaceOrder(false);
        }

        result.map((data) => {
          setPlaceOrder(true);
          return setOrder(data);
        });
      });
  };

  const getFirestoreQuery = (collection, column, value) => {
    firestore
      .collection(collection)
      .where(column, '==', value)
      .get()
      .then((querySnapshot) => {
        let documents = [];

        querySnapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });

        if (documents.length === 0) {
          return setError('Products not found');
        }
        setDocs(documents);
        setLoading(false);
        setError('');
      });
  };

  const getInquiryDetails = (value) => {
    firestore
      .collection('inquiries')
      .where('inquiryID', '==', value)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setInquiry({ ...doc.data(), id: doc.id });
        });

        setLoading(false);
        setError('');
      });
  };

  const getOrderDetails = (value) => {
    firestore
      .collection('orders')
      .where('orderID', '==', value)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setOrder({ ...doc.data(), id: doc.id });
        });

        setLoading(false);
        setError('');
      });
  };

  const updateInquiryToInquiryOnly = (id) => {
    firestore
      .collection('inquiries')
      .doc(id)
      .update({
        isInquiryOnly: true,
      })
      .then(() => {
        console.log('Document successfully update');
      });
  };

  const updateOrderToDelivered = async (id, date) => {
    try {
      setLoading(true);

      await firestore.collection('orders').doc(id).update({
        isDelivered: true,
        deliveredAt: date,
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const updateOrderToPaid = async (id, date, method) => {
    try {
      setLoading(true);

      await firestore.collection('orders').doc(id).update({
        isPaid: true,
        paidAt: date,
        paymentMethod: method,
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const addtoInquire = (product, qty) => {
    setItem({
      product,
      qty,
    });
  };

  const getDesc = (value) => {
    setDesc(value);
  };

  const getImages = (value) => {
    setImages(value);
  };

  const data = {
    products,
    inquiries,
    categories,
    orders,
    order,
    getProducts,
    getInquiries,
    getCategories,
    getOrders,
    getOrderDetails,
    inquiry,
    addData,
    setAddData,
    addModal,
    editData,
    setEditData,
    orderData,
    setOrderData,
    editModal,
    setValueAddModal,
    setValueEditModal,
    setValueOrderForm,
    currentUser,
    loginGoogle,
    logout,
    docs,
    error,
    desc,
    images,
    loading,
    item,
    addtoInquire,
    getFirestoreCollection,
    getFirestoreQuery,
    getDesc,
    getImages,
    updateInquiryToInquiryOnly,
    updateOrderToDelivered,
    updateOrderToPaid,
    getInquiryDetails,
    getOrderIfExist,
    orderError,
    orderSuccess,
    setOrderSuccess,
    orderNumber,
    setOrderNumber,
    placeOrder,
    checkIfInquiryIsPlaceOrder,
  };

  return (
    <Context.Provider value={data}>{!loading && children}</Context.Provider>
  );
};
