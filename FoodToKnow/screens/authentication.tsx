import React from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import auth from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

//your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDH9x0MVqChBLsWHaqqqk-WMlUBSyG2uqQ",
    authDomain: "testing-180c7.firebaseapp.com",
    projectId: "testing-180c7",
    storageBucket: "testing-180c7.appspot.com",
    messagingSenderId: "575659151576",
    appId: "1:575659151576:web:94df5c532d9622ed2687ad",
    measurementId: "G-78CKP7GKXL"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);

  }

  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export {firebase};