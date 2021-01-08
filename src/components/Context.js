import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth, googleProvider, firestore } from '../firebase/config';

const Context = createContext();

export const useDataContext = () => {
  return useContext(Context);
};

export const DataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [addData, setAddData] = useState({});
  const [addModal, setAddModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [item, setItem] = useState({});
  const [docs, setDocs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [desc, setDesc] = useState('');
  const [images, setImages] = useState();
  const [error, setError] = useState();

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

  const loginGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const updateUserProfile = (fullname) => {
    return currentUser.updateProfile({
      displayName: fullname,
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

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

  const inquiryOnly = (id) => {
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
    addData,
    setAddData,
    addModal,
    editData,
    setEditData,
    editModal,
    setValueAddModal,
    setValueEditModal,
    currentUser,
    loginGoogle,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateUserProfile,
    docs,
    error,
    categories,
    desc,
    images,
    loading,
    item,
    addtoInquire,
    getFirestoreCollection,
    getFirestoreQuery,
    getDesc,
    getImages,
    inquiryOnly,
  };

  return (
    <Context.Provider value={data}>{!loading && children}</Context.Provider>
  );
};
