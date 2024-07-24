import React, { createContext, useState, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { my_firebase_API_key } from './environment';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
const firebaseConfig = {
  apiKey: my_firebase_API_key,
  authDomain: "testing-180c7.firebaseapp.com",
  projectId: "testing-180c7",
  storageBucket: "testing-180c7.appspot.com",
  messagingSenderId: "575659151576",
  appId: "1:575659151576:web:94df5c532d9622ed2687ad",
  measurementId: "G-78CKP7GKXL"
};

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isLogin, setIsLogin] = useState(true);
  const [loginCheck, setLoginCheck] = useState(false);
  return (
    <AuthContext.Provider value={{ auth, email, setEmail, password, setPassword, loginCheck, setLoginCheck }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);