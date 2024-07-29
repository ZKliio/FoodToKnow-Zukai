import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from './environment';
import { useAuth } from './AuthContext';

export const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
  const [caloriesValue, setCaloriesValue] = useState('');
  const [proteinsValue, setProteinsValue] = useState('');

  const { email, loginCheck } = useAuth();
  const userId = email ? email.replace('@gmail.com', '') : null;

  useEffect(() => {
    fetchUserInfo(userId);
  }, [userId, loginCheck]);

  const fetchUserInfo = async (userId) => {
    if (!loginCheck) return;

    try {
      console.log('Querying DB', userId);
      const response = await axios.get(`${SERVER_URL}/userInfo/${userId}`);
      const data = response.data;
      if (data) {
        setCaloriesValue(data.caloriesreq);
        setProteinsValue(data.proteinsreq);
      } else {
        console.log("Creating new profile for user");
        await createUserInfo(userId);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Creating new profile for user");
        await createUserInfo(userId);
      } else {
        console.error('An error occurred while fetching user info', error);
      }
    }
  };

  const createUserInfo = async (userId) => {
    try {
      const response = await axios.post(`${SERVER_URL}/userInfo/${userId}`, {
        userId,
        caloriesreq: caloriesValue,
        proteinsreq: proteinsValue,
      });
      const data = response.data;
      setCaloriesValue(data.caloriesreq);
      setProteinsValue(data.proteinsreq);
    } catch (error) {
      console.error('An error occurred while creating user info', error);
    }
  };

  const updateUserInfo = async (userId) => {
    if (!userId) return;

    try {
      
      await axios.put(`${SERVER_URL}/userInfo/${userId}`, {
        caloriesreq: caloriesValue,
        proteinsreq: proteinsValue,
      });
      console.log('Updating user info for user:', userId, caloriesValue, proteinsValue);
    } catch (error) {
      console.error('An error occurred while updating user info', error);
    }
  };

  return (
    <CalculatorContext.Provider value={{ 
      caloriesValue, setCaloriesValue, proteinsValue, setProteinsValue, 
      fetchUserInfo, updateUserInfo }}>
      {children}
    </CalculatorContext.Provider>
  );
};
