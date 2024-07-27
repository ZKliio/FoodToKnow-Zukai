import React, { createContext, useState, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [name, setName] = useState('');

  return (
    <ProfileContext.Provider value={{ name, setName }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);