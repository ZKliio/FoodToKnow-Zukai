import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Adjust import based on your project structure
import { SERVER_URL } from './environment';

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedLunches, setSelectedLunches] = useState([]);
  const [selectedDinners, setSelectedDinners] = useState([]);
  const { email } = useAuth();
  const userID = email ? email.replace('@gmail.com', '') : null;
  const { loginCheck, setLoginCheck } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchMeals = async (date) => {
    const formattedDate = new Date(selectedDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
  
    if (!loginCheck) return;
    if (!userID) return;
  
    try {
      console.log('Fetching meals for user:', userID, 'on date:', formattedDate);
      const response = await axios.get(`${SERVER_URL}/meals/${userID}/${formattedDate}`);
      
      if (response.data) {
        const { selectedFoods, selectedLunches, selectedDinners } = response.data;
        setSelectedFoods(selectedFoods || []);
        setSelectedLunches(selectedLunches || []);
        setSelectedDinners(selectedDinners || []);
      } else {
        console.log('No meals found for this date, creating a new entry...');
        await axios.post(`${SERVER_URL}/meals/${userID}/${formattedDate}`, {
          date: formattedDate,
          selectedFoods: [],
          selectedLunches: [],
          selectedDinners: []
        });
        setSelectedFoods([]);
        setSelectedLunches([]);
        setSelectedDinners([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('No meals found for this date, creating a new entry...');
        await axios.post(`${SERVER_URL}/meals/${userID}`, {
          date: formattedDate,
          selectedFoods: [],
          selectedLunches: [],
          selectedDinners: []
        });
        setSelectedFoods([]);
        setSelectedLunches([]);
        setSelectedDinners([]);
      } else {
        console.error('Error fetching meals:', error);
      }
    }
  };
  
  useEffect(() => {
    fetchMeals(selectedDate);
  }, [userID, selectedDate]);
  

  // const saveMeals = async () => {
  //   if (!userID) return;

  //   try {
  //     console.log('Saving meals for user:', userID);
  //     await axios.put(`${SERVER_URL}/meals/${userID}`, {
  //       userId: userID,
  //       selectedFoods,
  //       selectedLunches,
  //       selectedDinners,
  //     });
  //     alert('Meals saved successfully!');
  //   } catch (error) {
  //     console.error('Error saving meals:', error);
  //   }
  // };
const saveMeals = async () => {
  const formattedDate = new Date(selectedDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-');

  if (!userID) return;

  try {
    console.log('Saving meals for user:', userID);

    let existingMeals = null;
    try {
      const response = await axios.get(`${SERVER_URL}/meals/${userID}/${formattedDate}`);
      existingMeals = response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Meals not found for user:', userID);
      } else {
        throw error;
      }
    }

    // const currentDate = new Date(); // Example: current date
    const mealData = {
      userId: userID,
      selectedFoods,
      selectedLunches,
      selectedDinners,
      date: formattedDate, // Include the Date field with a valid date
    };

    if (!existingMeals) {
      
      console.log('Creating new meals document for user:', userID, mealData);
      await axios.post(`${SERVER_URL}/meals/${userID}/${formattedDate}`, {
        date: formattedDate,
        selectedFoods: [],
        selectedLunches: [],
        selectedDinners: []
      });
      setSelectedFoods([]);
      setSelectedLunches([]);
      setSelectedDinners([]);
    } else {
      // console.log(existingMeals)
      // console.log(`meal data: ${JSON.stringify(mealData)}`)
      console.log('Updating meals document for user:', userID);
      await axios.put(`${SERVER_URL}/meals/${userID}/${formattedDate}`, mealData, formattedDate);
    }

    alert('Meals saved successfully!');
  } 
  catch (error) {
    console.error('Error saving meals:', error);
    alert('Failed to save meals. Please try again later.');
  }
};

  
  

  const addFood = (food) => {
    setSelectedFoods(prev => {
      const existingFood = prev.find(item => item._id === food._id);
      if (existingFood) {
        return prev.map(item => item._id === food._id ? { ...item, count: item.count + 1 } : item);
      } else {
        return [...prev, { ...food, count: 1 }];
      }
    });
  };

  const addLunch = (lunch) => {
    setSelectedLunches(prev => {
      const existingLunch = prev.find(item => item._id === lunch._id);
      if (existingLunch) {
        return prev.map(item => item._id === lunch._id ? { ...item, count: item.count + 1 } : item);
      } else {
        return [...prev, { ...lunch, count: 1 }];
      }
    });
  };

  const addDinner = (dinner) => {
    setSelectedDinners(prev => {
      const existingDinner = prev.find(item => item._id === dinner._id);
      if (existingDinner) {
        return prev.map(item => item._id === dinner._id ? { ...item, count: item.count + 1 } : item);
      } else {
        return [...prev, { ...dinner, count: 1 }];
      }
    });
  };

  const deleteFood = async (itemId) => {
    try {
      const foodItem = selectedFoods.find(item => item._id === itemId);
      
      if (foodItem.count === 1) {
        // Make API call to delete item from backend
        await fetch(`${SERVER_URL}/meals/${userID}/${itemId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        // Update local state after successful deletion
        setSelectedFoods(selectedFoods.filter(item => item._id !== itemId));
      } else {
        // Decrement the count
        setSelectedFoods(selectedFoods.map(item =>
          item._id === itemId ? { ...item, count: item.count - 1 } : item
        ));
      }
    } catch (error) {
      console.error('Error deleting food:', error);
      // Handle error as needed
    }
  };
  
  const deleteLunch = async (itemId) => {
    try {
      const lunchItem = selectedLunches.find(item => item._id === itemId);
  
      if (lunchItem.count === 1) {
        // Make API call to delete item from backend
        await fetch(`${SERVER_URL}/meals/${userID}/${itemId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        // Update local state after successful deletion
        setSelectedLunches(selectedLunches.filter(item => item._id !== itemId));
      } else {
        // Decrement the count
        setSelectedLunches(selectedLunches.map(item =>
          item._id === itemId ? { ...item, count: item.count - 1 } : item
        ));
      }
    } catch (error) {
      console.error('Error deleting lunch:', error);
      // Handle error as needed
    }
  };
  
  const deleteDinner = async (itemId) => {
    try {
      const dinnerItem = selectedDinners.find(item => item._id === itemId);
  
      if (dinnerItem.count === 1) {
        // Make API call to delete item from backend
        await fetch(`${SERVER_URL}/meals/${userID}/${itemId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        // Update local state after successful deletion
        setSelectedDinners(selectedDinners.filter(item => item._id !== itemId));
      } else {
        // Decrement the count
        setSelectedDinners(selectedDinners.map(item =>
          item._id === itemId ? { ...item, count: item.count - 1 } : item
        ));
      }
    } catch (error) {
      console.error('Error deleting dinner:', error);
      // Handle error as needed
    }
  };
  const calculateTotalCalories = (items) => {
    return items.reduce((total, item) => total + (item.calories * item.count), 0);
  };

  const breakfastCalories = calculateTotalCalories(selectedFoods);
  const lunchCalories = calculateTotalCalories(selectedLunches);
  const dinnerCalories = calculateTotalCalories(selectedDinners);
  const totalCalories = breakfastCalories + lunchCalories + dinnerCalories;

  const calculateTotalProteins = (items) => {
    return items.reduce((total, item) => total + (item.protein * item.count), 0);
  };
  const breakfastProteins = calculateTotalProteins(selectedFoods);
  const lunchProteins = calculateTotalProteins(selectedLunches);
  const dinnerProteins = calculateTotalProteins(selectedDinners);
  const totalProteins = breakfastProteins + lunchProteins + dinnerProteins;
  // console.log(`Breakfast Proteins: ${breakfastProteins}`);
  // console.log(`Lunch Proteins: ${lunchProteins}`);
  // console.log(`Dinner Proteins: ${dinnerProteins}`);
  // console.log(`Total Proteins: ${totalProteins}`);

  const value = {
    selectedDate,
    setSelectedDate,
    fetchMeals,
    saveMeals,
    addFood,
    selectedFoods,
    setSelectedFoods,
    deleteFood,
    addLunch,
    selectedLunches,
    setSelectedLunches,
    deleteLunch,
    addDinner,
    selectedDinners,
    setSelectedDinners,
    deleteDinner,
    breakfastCalories,
    lunchCalories,
    dinnerCalories,
    totalCalories,
    breakfastProteins,
    lunchProteins,
    dinnerProteins,
    totalProteins,
  };

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
};
