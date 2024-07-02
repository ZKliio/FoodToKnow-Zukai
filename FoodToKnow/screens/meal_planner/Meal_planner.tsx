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
import { SERVER_URL } from '../../environment';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../AuthContext'; //allows me to use email and password from auth 
import { useContext } from 'react';
import { FoodContext } from '../../FoodContext';
import DatePicker from './calendar';

const MealPlanner = ({mealTiming}) => { //
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('');
  const [mealDetails, setMealDetails] = useState('');
  const [healthCondition, setHealthCondition] = useState('');
  const [filterCondition, setFilterCondition] = useState('');
  const [editingMeal, setEditingMeal] = useState(null);

  const {email, setEmail} = useAuth();
  const userID = email.replace('@gmail.com','')

  const { selectedFoods, addFood, selectedLunches, addLunch, selectedDinners, addDinner, 
    saveMeals, fetchMeals, 
    deleteFood, deleteLunch, deleteDinner,
    breakfastCalories,
    lunchCalories,
    dinnerCalories,
    totalCalories,
    breakfastProteins,
    lunchProteins,
    dinnerProteins,
    totalProteins,
     } = useContext(FoodContext);  



  const navigation = useNavigation();
  // const {selectedItem} = route.params;

  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     try {
  //       console.log(userID)
  //       const response = await axios.get(`${SERVER_URL}/updateMeals/${userID}`);
  //       const { selectedFoods, selectedLunches, selectedDinners } = response.data;
  //       setSelectedFoods(selectedFoods || []);
  //       setSelectedLunches(selectedLunches || []);
  //       setSelectedDinners(selectedDinners || []);
  //     } catch (error) {
  //       console.error('Error fetching meals:', error);
  //     }
  //   };

  //   fetchMeals();
  // }, [userID]);
  
  // useEffect(() => {
  //   const updateMeals = async () => {
  //     try {
  //       console.log('wtf'+userID)
  //       await axios.put(`${SERVER_URL}/updateMeals/${userID}`, {
  //         userId: userID,
  //         selectedFoods,
  //         selectedLunches,
  //         selectedDinners,
  //       });
  //     } catch (error) {
  //       console.error('Error updating meals:', error);
  //     }
  //   };

  //   updateMeals();
  // }, [selectedFoods, selectedLunches, selectedDinners, userID]);

 const addDetails = () => {
    navigation.navigate('FoodInfo')
    console.log('Adding Details')
    return 
  }

  // const deleteMeal = async (id) => {
  //   try {
  //     await axios.delete(`${SERVER_URL}/meals/${userID}/${id}`);
  //     setMeals(meals.filter(meal => meal._id !== id));
  //   } catch (error) {
  //     console.error('Error deleting meal:', error);
  //   }
  // };

  // const startEditing = (meal) => {
  //   setMealName(meal.name);
  //   setMealDetails(meal.details);
  //   setHealthCondition(meal.healthCondition);
  //   setEditingMeal(meal);
  // };

  const editMeal = async () => {
  //   if (editingMeal && mealName.trim() && mealDetails.trim() && healthCondition.trim()) {
  //     try {
  //       const response = await axios.put(`${SERVER_URL}/meals/${userID}/${editingMeal._id}`, {
  //         userID: userID,
  //         name: mealName,
  //         details: mealDetails,
  //         healthCondition,
  //       });
  //       const updatedMeals = meals.map(meal =>
  //         meal._id === editingMeal._id ? response.data : meal
  //       );
  //       setMeals(updatedMeals);
  //       setMealName('');
  //       setMealDetails('');
  //       setHealthCondition('');
  //       setEditingMeal(null);
  //     } catch (error) {
  //       console.error('Error editing meal:', error);
  //     }
  //   }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>Calories: {item.calories}</Text>
      <Text style={styles.subtitle}>Protein: {item.protein}</Text>
      <Text style={styles.subtitle}>Count: {item.count}</Text>
      <View style={styles.actions}>
        <Button onPress={() => deleteFood(item._id)}>Delete</Button>
      </View>
    </View>
    
  );
  const renderLunchItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>Calories: {item.calories}</Text>
      <Text style={styles.subtitle}>Protein: {item.protein}</Text>
      <Text style={styles.subtitle}>Count: {item.count}</Text>
      <View style={styles.actions}>
        <Button onPress={() => deleteLunch(item._id)}>Delete</Button>
      </View>
    </View>
    
  );
  const renderDinnerItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>Calories: {item.calories}</Text>
      <Text style={styles.subtitle}>Protein: {item.protein}</Text>
      <Text style={styles.subtitle}>Count: {item.count}</Text>
      <View style={styles.actions}>
        <Button onPress={() => deleteDinner(item._id)}>Delete</Button>
      </View>
    </View>
    
  );
  
  return (
    <ScrollView>
      
      <View style={styles.breakfastcontainer}>
      <Text style={styles.breakfastHeader}>Select Date to Fetch Meals</Text>
      <DatePicker />
      <View style={styles.container}>
      <Text style={styles.counterTextTotal}>Total Calories: {totalCalories}</Text>
      {/* <Text style={styles.counterTextTotal}>Total Proteins: {totalProteins}</Text> */}
      <Text style={styles.counterText}>Calories: {breakfastCalories}</Text>
      {/* <Text style={styles.counterText}>Proteins: {breakfastProteins}</Text> */}
      <Button                 // Refresh query to meals dB
        onPress={fetchMeals}
        style={styles.button}>
          Refresh
      </Button>
      </View>
      <Text style={styles.breakfastHeader}>Breakfast</Text>
      <View style={styles.container}>
      {/* <TextInput
        label="Meal Name"
        value={mealName}
        onChangeText={setMealName}
        style={styles.input}
      /> */}
      {/* <TextInput                  //// Replace Meal details with a navigate to FoodInfo
        label="Meal Details"
        value={mealDetails}
        onChangeText={setMealDetails}
        style={styles.input}
      /> */}
      <Button onPress={saveMeals} style={styles.button}>Save Meals</Button>
      <Button             //// Add details from foodInfo
        onPress={addDetails}
        style={styles.button}>
          Add details
      </Button>

      {/* <TextInput
        label="Health Condition"
        value={healthCondition}
        onChangeText={setHealthCondition}
        style={styles.input}
      /> */}
      {/* <Button
        mode="contained"
        onPress={editingMeal ? editMeal : addMeal}
        style={styles.button}
      >
        {editingMeal ? 'Edit Meal' : 'Add Meal'}
      </Button> */}
      {/* <TextInput
        label="Filter by Health Condition"
        value={filterCondition}
        onChangeText={setFilterCondition}
        style={styles.input}
      /> */}
      {/* <Button mode="contained" onPress={fetchMeals} style={styles.button}>
        Filter Meals
      </Button> */}
      <FlatList
        data= {selectedFoods}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
    
      />
    </View>
    </View> 
    {/* end of breakfastcontainer */}

    <View style={styles.breakfastcontainer}>
      <Text style={styles.breakfastHeader}>Lunch</Text>
      <Text style={styles.counterText}>Calories: {lunchCalories}</Text>
      {/* <Text style={styles.counterText}>Proteins: {lunchProteins}</Text> */}

      <View style={styles.container}>
      
      {/* <TextInput                  //// Replace Meal details with a navigate to FoodInfo
        label="Meal Details"
        value={mealDetails}
        onChangeText={setMealDetails}
        style={styles.input}
      /> */}

      <Button             //// Add details from foodInfo
        onPress={addDetails}
        style={styles.button}>
          Add details
      </Button>

      {/* <TextInput
        label="Health Condition"
        value={healthCondition}
        onChangeText={setHealthCondition}
        style={styles.input}
      /> */}
 
      {/* <TextInput
        label="Filter by Health Condition"
        value={filterCondition}
        onChangeText={setFilterCondition}
        style={styles.input}
      /> */}
      {/* <Button mode="contained" onPress={fetchMeals} style={styles.button}>
        Filter Meals
      </Button> */}
      <FlatList
        data= {selectedLunches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderLunchItem}
    
      />
    </View>
    </View> 
    {/* end of lunchcontainer */}

    <View style={styles.breakfastcontainer}>
      <Text style={styles.breakfastHeader}>Dinner</Text>
      <Text style={styles.counterText}>Calories: {dinnerCalories}</Text>
      {/* <Text style={styles.counterText}>Proteins: {dinnerProteins}</Text> */}
      <View style={styles.container}>
      
      {/* <TextInput                  //// Replace Meal details with a navigate to FoodInfo
        label="Meal Details"
        value={mealDetails}
        onChangeText={setMealDetails}
        style={styles.input}
      /> */}

      <Button             //// Add details from foodInfo
        onPress={addDetails}
        style={styles.button}>
          Add details
      </Button>

      {/* <TextInput
        label="Health Condition"
        value={healthCondition}
        onChangeText={setHealthCondition}
        style={styles.input}
      /> */}

      {/* <TextInput
        label="Filter by Health Condition"
        value={filterCondition}
        onChangeText={setFilterCondition}
        style={styles.input}
      /> */}
      {/* <Button mode="contained" onPress={fetchMeals} style={styles.button}>
        Filter Meals
      </Button> */}
      <FlatList
        data= {selectedDinners}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderDinnerItem}
    
      />
    </View>
    </View> 
    {/* end of dinnercontainer */}
    </ScrollView>
  );
};

const MealsPlanner = () => {
  return(
    <ScrollView>
    <MealPlanner mealTiming={"Breakfast"}/> 
    {/* this is called passing props, in this case, props is mealTiming, and 'Breakfast' is being passed to MealPlanner JSX element */}
    <MealPlanner mealTiming={"Lunch"}/>
    <MealPlanner mealTiming={"Dinner"}/>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  breakfastcontainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  breakfastHeader: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  counterTextTotal:{
    fontSize: 20, // font size of the text
    color: 'black',
    fontWeight: 'bold',
  },
  counterText:{
    fontSize: 15, // font size of the text
    color: 'black',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    flex:1,
    alignItems: 'center',
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
    color: 'black',
  },
  subtitle:{
    fontSize: 14,
    color: 'black',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default MealPlanner;
