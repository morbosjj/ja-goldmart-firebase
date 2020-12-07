import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth, firestore } from '../firebase/config';

const Context = createContext();

export const useDataContext = () => {
  return useContext(Context);
};

export const DataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [product, setProduct] = useState({});
  const [inquire, setInquire] = useState({});
  const [docs, setDocs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [desc, setDesc] = useState('');
  const [images, setImages] = useState();
  const [error, setError] = useState();

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const setValues = (values) => {
    setProduct((prevData) => ({
      ...prevData,
      ...values,
    }));
  };

  const getFirestoreCollection = (collection) => {
    firestore
      .collection(collection)
      .orderBy('createdAt', 'desc')

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

  const getInquiryProduct = (product) => {
    setInquire(product);
  };

  const getDesc = (value) => {
    setDesc(value);
  };

  const getImages = (value) => {
    setImages(value);
  };

  const data = {
    product,
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    setValues,
    docs,
    error,
    categories,
    desc,
    images,
    loading,
    inquire,
    getInquiryProduct,
    getFirestoreCollection,
    getFirestoreQuery,
    getDesc,
    getImages,
  };

  return (
    <Context.Provider value={data}>{!loading && children}</Context.Provider>
  );
};
