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
import { CalculatorContext } from '../../CalculatorContext';
import DatePicker from './calendar';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';

const MealPlanner = ({mealTiming}) => { //
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('');
  const [mealDetails, setMealDetails] = useState('');
  const [healthCondition, setHealthCondition] = useState('');
  const [filterCondition, setFilterCondition] = useState('');
  const [editingMeal, setEditingMeal] = useState(null);

  const {email, setEmail, loginCheck} = useAuth();
  const userID = email.replace('@gmail.com','')

  const { selectedDate, selectedFoods, addFood, selectedLunches, addLunch, selectedDinners, addDinner, 
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

  const {caloriesValue, proteinsValue} = useContext(CalculatorContext);

  const navigation = useNavigation();

  useEffect(() => {
    console.log('Fetching meals for user:', userID);
    fetchMeals();
  }, [loginCheck]);

 const addDetails = () => {
    navigation.navigate('FoodInfo')
    console.log('Adding Details')
    return 
  }


  const ProgressBarExample = ({ name, part, whole }) => {
      // Calculate percentage
    const percentage = ((part / whole) * 100).toFixed(2);
    if (!whole) {
      return null;
    }
    const progress = part / whole;
  
    return (
      <View style={{  margin: 10 }}>
        <Text style={{ color: 'blue', marginBottom: 10 }}>{name}</Text>
          <View style={styles.refreshSaveContainer}>
            <Progress.Bar progress={progress} width={200} borderWidth={2} color='rgb(50, 120, 205)' />
            <Text style={{ color: 'rgb(50, 50, 100)', fontWeight: 'bold', marginLeft: 20, }}>{`${percentage}% `}</Text>
          </View>

          <Text style={{ color: 'blue', marginTop: 10 }}>{`${part} / ${whole}`}</Text>
      </View>
    );
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
      
      {/* <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, }} />    */}
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
       <DatePicker />
      {/* <View style={styles.breakfastcontainer}> */}
      

      <View style={styles.goalsContainer}>
        <Text style={styles.goalsHeaderText}>Your Goal Today: </Text>
        
        <Text style={styles.goalsText}>Caloric Goal: {caloriesValue}</Text>
        <Text style={styles.goalsText}>Protein Goal: {proteinsValue}</Text>

        <ProgressBarExample name="Calories needed:" part={totalCalories.toFixed(2)} whole={caloriesValue} />
        <ProgressBarExample name="Protein" part={totalProteins.toFixed(2)} whole={proteinsValue} />

        <TouchableOpacity onPress={() =>navigation.navigate('BMR Calculator')} style={styles.goalsButton}>  
            <Icon name="calculator" size={25} color="rgb(100, 170, 255)" />
        </TouchableOpacity>
      </View>
      {/* container begins */}
      <View style={styles.container}>
        <Text style={styles.counterTextTotal}>Total Calories: {totalCalories.toFixed(2)}</Text>
        <Text style={styles.counterTextTotal}>Total Proteins: {totalProteins.toFixed(2)}</Text>
      </View>
    {/* breakfast container begins */}
      <View style={styles.container}>

      <Text style={styles.breakfastHeader}>Breakfast</Text>
        <View style={styles.refreshSaveContainer}>

          <TouchableOpacity                // Refresh query to meals dB
            onPress={fetchMeals}
            style={styles.button}>
            <Icon name="refresh" size={20} color="rgb(100, 170, 255)" />
          </TouchableOpacity>

          <TouchableOpacity onPress={saveMeals} style={styles.button}>
            <Icon name="save" size={20} color="rgb(100, 170, 255)" />
          </TouchableOpacity>

          <TouchableOpacity onPress={addDetails} style={styles.button}>
              <Icon name="plus" size={20} color="rgb(100, 170, 255)" />
          </TouchableOpacity>
        </View>

      
      </View>
      <Text style={styles.counterText}>Calories: {breakfastCalories}</Text>
      <Text style={styles.counterText}>Proteins: {breakfastProteins}</Text>
      
      <View style={styles.container}>

      <FlatList
        data= {selectedFoods}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
    
      />
    </View>
    <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, }} />   
    {/* </View>  */}
    {/* end of breakfastcontainer */}


    <View style={styles.container}>
      <Text style={styles.breakfastHeader}>Lunch</Text>

        <View style={styles.refreshSaveContainer}>

          <TouchableOpacity                // Refresh query to meals dB
            onPress={fetchMeals}
            style={styles.button}>
            <Icon name="refresh" size={20} color="rgb(100, 170, 255)" />
          </TouchableOpacity>

          <TouchableOpacity onPress={saveMeals} style={styles.button}>
            <Icon name="save" size={20} color="rgb(100, 170, 255)" />
          </TouchableOpacity>

          <TouchableOpacity onPress={addDetails} style={styles.button}>
              <Icon name="plus" size={20} color="rgb(100, 170, 255)" />
          </TouchableOpacity>
        </View>

      </View>
      <Text style={styles.counterText}>Calories: {lunchCalories}</Text>
      <Text style={styles.counterText}>Proteins: {lunchProteins}</Text>

      <View style={styles.container}>
      
      {/* <TextInput                  //// Replace Meal details with a navigate to FoodInfo
        label="Meal Details"
        value={mealDetails}
        onChangeText={setMealDetails}
        style={styles.input}
      /> */}

      {/* <Button             //// Add details from foodInfo
        onPress={addDetails}
        style={styles.button}>
          Add details
      </Button> */}

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
    {/* end of lunchcontainer */}

   
      <View style={styles.container}>
      <Text style={styles.breakfastHeader}>Dinner</Text>
        <View style={styles.refreshSaveContainer}>

          <TouchableOpacity                // Refresh query to meals dB
            onPress={fetchMeals}
            style={styles.button}>
            <Icon name="refresh" size={20} color="rgb(100, 170, 255)" />
          </TouchableOpacity>

          <TouchableOpacity onPress={saveMeals} style={styles.button}>
            <Icon name="save" size={20} color="rgb(100, 170, 255)" />
          </TouchableOpacity>

          <TouchableOpacity onPress={addDetails} style={styles.button}>
              <Icon name="plus" size={20} color="rgb(100, 170, 255)" />
          </TouchableOpacity>
        </View>

      </View>
      <Text style={styles.counterText}>Calories: {dinnerCalories}</Text>
      <Text style={styles.counterText}>Proteins: {dinnerProteins}</Text>
      <View style={styles.container}>
      
  

      {/* <Button             //// Add details from foodInfo
        onPress={addDetails}
        style={styles.button}>
          Add details
      </Button> */}

      <FlatList
        data= {selectedDinners}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderDinnerItem}
    
      />
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
    flexDirection: 'row',
    padding: 10,
    // backgroundColor: 'red',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  refreshSaveContainer:{
    width: 250,
    flexDirection: 'row',
    padding: 0,
    // backgroundColor: 'blue',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'rgb(255, 230, 0)',
    backgroundColor: '#fff',
  },
  breakfastcontainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  breakfastHeader: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
  goalsContainer:{
    flex: 1,
    padding: 10,
    backgroundColor: 'rgb(180, 180, 180)',
    justifyContent: 'space-between',
  },
  goalsHeaderText:{
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginBottom: 10,
  },
  goalsText:{
    color: 'rgb(90, 100, 205)',
    fontSize: 14,
    fontWeight: 'bold',
  },
  goalsButton:{
    padding: 5,
  },
  counterTextTotal:{
    fontSize: 15, // font size of the text
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
    margin: 2,
  },
  addButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
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
