import React, { createContext, useState, useContext, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import 
{ 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  sendPasswordResetEmail 
} 
from 'firebase/auth';
import { my_firebase_API_key } from './environment';
const AuthContext = createContext();

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
export const AuthProvider = ({ children }) => {

  const auth = getAuth(app);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');
  // const [isLogin, setIsLogin] = useState(true);
  const [loginCheck, setLoginCheck] = useState(false);
  const [userId, setUserId] = useState();
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      // userId,
      // setUserId, 
      app, 
      auth, 
      user, 
      email, setEmail, 
      password, setPassword, 
      loginCheck, setLoginCheck }}  >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);