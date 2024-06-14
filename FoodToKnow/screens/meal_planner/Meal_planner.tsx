// import React from 'react';
// import { useState } from 'react';
// import type {PropsWithChildren} from 'react';

// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
//   Button,
//   TextInput,
//   Image,
//   FlatList
  
// } from 'react-native';


// // MealPlanner.js

// const MealPlanner = () => {
//   const [meals, setMeals] = useState([]);
//   const [mealName, setMealName] = useState('');
//   const [mealDetails, setMealDetails] = useState('');

//   const addMeal = () => {
//     if (mealName.trim() && mealDetails.trim()) {
//       setMeals([
//         ...meals,
//         { id: Date.now().toString(), name: mealName, details: mealDetails },
//       ]);
//       setMealName('');
//       setMealDetails('');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         label="Meal Name"
//         value={mealName}
//         onChangeText={setMealName}
//         style={styles.input}
//       />
//       <TextInput
//         label="Meal Details"
//         value={mealDetails}
//         onChangeText={setMealDetails}
//         style={styles.input}
//       />
//       <Button mode="contained" onPress={addMeal} style={styles.button}>
//         Add Meal
//       </Button>
//       <FlatList
//         data={meals}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text style={styles.title}>{item.name}</Text>
//             <Text>{item.details}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   input: {
//     marginBottom: 10,
//   },
//   button: {
//     marginBottom: 20,
//   },
//   item: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

// export default MealPlanner;



// Meal_planner.tsx

//import { MealType } from '../../Context';

// const MealPlanner = () => {
//   const [meals, setMeals] = useState([]);
//   const [mealName, setMealName] = useState('');
//   const [mealDetails, setMealDetails] = useState('');

//   useEffect(() => {
//     fetchMeals();
//   }, []);

//   const fetchMeals = async () => {
//     try {
//       const response = await axios.get('http://10.0.2.2:5000/meals');
//       setMeals(response.data);
//     } catch (error) {
//       console.error('Error fetching meals:', error);
//     }
//   };

//   const addMeal = async () => {
//     if (mealName.trim() && mealDetails.trim()) {
//       try {
//         const response = await axios.post('http://10.0.2.2:5000/meals', {
//           name: mealName,
//           details: mealDetails,
//         });
//         setMeals([...meals, response.data]);
//         setMealName('');
//         setMealDetails('');
//       } catch (error) {
//         console.error('Error adding meal:', error);
//       }
//     }
//   };

  

//   return (
//     <View style={styles.container}>
//       <TextInput
//         label="Meal Name"
//         value={mealName}
//         onChangeText={setMealName}
//         style={styles.input}
//       />
//       <TextInput
//         label="Meal Details"
//         value={mealDetails}
//         onChangeText={setMealDetails}
//         style={styles.input}
//       />
//       <Button mode="contained" onPress={addMeal} style={styles.button}>
//         Add Meal
//       </Button>
//       <FlatList
//         data={meals}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text style={styles.title}>{item.name}</Text>
//             <Text>{item.details}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   input: {
//     marginBottom: 10,
//   },
//   button: {
//     marginBottom: 20,
//   },
//   item: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

// export default MealPlanner;
// Meal_planner.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  Image,
  KeyboardAvoidingView
  } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { SERVER_URL } from '../../enviroment';
// //version 3 30th May 2024 1900hrs
// const MealPlanner = () => {
//   const [meals, setMeals] = useState([]);
//   const [mealName, setMealName] = useState('');
//   const [mealDetails, setMealDetails] = useState('');
//   const [editingMeal, setEditingMeal] = useState(null);

//   useEffect(() => {
//     fetchMeals();
//   }, []);

//   const fetchMeals = async () => {
//     try {
//       const response = await axios.get('http://10.0.2.2:5000/meals');
//       setMeals(response.data);
//     } catch (error) {
//       console.error('Error fetching meals:', error);
//     }
//   };

//   const addMeal = async () => {
//     if (mealName.trim() && mealDetails.trim()) {
//       try {
//         const response = await axios.post('http://10.0.2.2:5000/meals', {
//           name: mealName,
//           details: mealDetails,
//         });
//         setMeals([...meals, response.data]);
//         setMealName('');
//         setMealDetails('');
//       } catch (error) {
//         console.error('Error adding meal:', error);
//       }
//     }
//   };

//   const deleteMeal = async (id) => {
//     try {
//       await axios.delete(`http://10.0.2.2:5000/meals/${id}`);
//       setMeals(meals.filter(meal => meal._id !== id));
//     } catch (error) {
//       console.error('Error deleting meal:', error);
//     }
//   };

//   const startEditing = (meal) => {
//     setMealName(meal.name);
//     setMealDetails(meal.details);
//     setEditingMeal(meal);
//   };

//   const editMeal = async () => {
//     if (editingMeal && mealName.trim() && mealDetails.trim()) {
//       try {
//         const response = await axios.put(`http://10.0.2.2:5000/meals/${editingMeal._id}`, {
//           name: mealName,
//           details: mealDetails,
//         });
//         const updatedMeals = meals.map(meal =>
//           meal._id === editingMeal._id ? response.data : meal
//         );
//         setMeals(updatedMeals);
//         setMealName('');
//         setMealDetails('');
//         setEditingMeal(null);
//       } catch (error) {
//         console.error('Error editing meal:', error);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         label="Meal Name"
//         value={mealName}
//         onChangeText={setMealName}
//         style={styles.input}
//       />
//       <TextInput
//         label="Meal Details"
//         value={mealDetails}
//         onChangeText={setMealDetails}
//         style={styles.input}
//       />
//       <Button
//         mode="contained"
//         onPress={editingMeal ? editMeal : addMeal}
//         style={styles.button}
//       >
//         {editingMeal ? 'Edit Meal' : 'Add Meal'}
//       </Button>
//       <FlatList
//         data={meals}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text style={styles.title}>{item.name}</Text>
//             <Text>{item.details}</Text>
//             <View style={styles.actions}>
//               <Button onPress={() => startEditing(item)}>Edit</Button>
//               <Button onPress={() => deleteMeal(item._id)}>Delete</Button>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   input: {
//     marginBottom: 10,
//   },
//   button: {
//     marginBottom: 20,
//   },
//   item: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
// });

// export default MealPlanner;

// Meal_planner.tsx
// Meal_planner.tsx

const MealPlanner = () => {
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('');
  const [mealDetails, setMealDetails] = useState('');
  const [healthCondition, setHealthCondition] = useState('');
  const [filterCondition, setFilterCondition] = useState('');
  const [editingMeal, setEditingMeal] = useState(null);
  ;
  
  useEffect(() => {
    fetchMeals();
  }, [filterCondition]);

  const fetchMeals = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/meals`, { // 'http://10.0.2.2:3000/meals'
        params: { healthCondition: filterCondition }, 
      });
      setMeals(response.data);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const addMeal = async () => {
    if (mealName.trim() && mealDetails.trim() && healthCondition.trim()) {
      try {
        const response = await axios.post(`${SERVER_URL}/meals`, {
          name: mealName,
          details: mealDetails,
          healthCondition,
        });
        setMeals([...meals, response.data]);
        setMealName('');
        setMealDetails('');
        setHealthCondition('');
      } catch (error) {
        console.error('Error adding meal:', error);
      }
    }
  };

  const deleteMeal = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/meals/${id}`);
      setMeals(meals.filter(meal => meal._id !== id));
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  const startEditing = (meal) => {
    setMealName(meal.name);
    setMealDetails(meal.details);
    setHealthCondition(meal.healthCondition);
    setEditingMeal(meal);
  };

  const editMeal = async () => {
    if (editingMeal && mealName.trim() && mealDetails.trim() && healthCondition.trim()) {
      try {
        const response = await axios.put(`${SERVER_URL}/meals/${editingMeal._id}`, {
          name: mealName,
          details: mealDetails,
          healthCondition,
        });
        const updatedMeals = meals.map(meal =>
          meal._id === editingMeal._id ? response.data : meal
        );
        setMeals(updatedMeals);
        setMealName('');
        setMealDetails('');
        setHealthCondition('');
        setEditingMeal(null);
      } catch (error) {
        console.error('Error editing meal:', error);
      }
    }
  };
  
  return (
    <ScrollView>
    <View style={styles.container}>
      <TextInput
        label="Meal Name"
        value={mealName}
        onChangeText={setMealName}
        style={styles.input}
      />
      <TextInput
        label="Meal Details"
        value={mealDetails}
        onChangeText={setMealDetails}
        style={styles.input}
      />
      <TextInput
        label="Health Condition"
        value={healthCondition}
        onChangeText={setHealthCondition}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={editingMeal ? editMeal : addMeal}
        style={styles.button}
      >
        {editingMeal ? 'Edit Meal' : 'Add Meal'}
      </Button>
      <TextInput
        label="Filter by Health Condition"
        value={filterCondition}
        onChangeText={setFilterCondition}
        style={styles.input}
      />
      <Button mode="contained" onPress={fetchMeals} style={styles.button}>
        Filter Meals
      </Button>
      <FlatList
        data={meals}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.details}</Text>
            <Text>Condition: {item.healthCondition}</Text>
            <View style={styles.actions}>
              <Button onPress={() => startEditing(item)}>Edit</Button>
              <Button onPress={() => deleteMeal(item._id)}>Delete</Button>
            </View>
          </View>
        )}
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default MealPlanner;
