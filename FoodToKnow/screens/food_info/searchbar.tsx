import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  // TextInput,
  FlatList,
  ActivityIndicator,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import { TextInput, Button } from 'react-native-paper';
import {SERVER_URL} from '../../environment';
import { useNavigation } from '@react-navigation/native';
import { FoodContext } from '../../FoodContext';
interface FoodItem {
  _id: string; // Assuming a unique identifier for each food item
  name: string; // Name of the food item
  calories: number; // Calories of the food item
  protein: number; // Proteins of the food item (added property)
  carbs: number;
  fat: number;
  count: number;
  customerId: string;
  date: string; 
}

const Searchbar = ({navigation}) => {
  

  const [filterCondition, setFilterCondition] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [foodData, setFoodData] = useState<FoodItem[]>([]);
  const [filteredData, setFilteredData] = useState<FoodItem[]>([]);

  const { addFood, addLunch, addDinner } = useContext(FoodContext);
  // const [foodName, setFoodName] = useState('');

  const handleAddBreakfastFood = (item: FoodItem) => { 
    addFood(item); // Directly adding the food item to the context
  };

  const handleAddLunchFood = (item: FoodItem) => {
    addLunch(item); // Directly adding the food item to the context
  };
  
  const handleAddDinnerFood = (item: FoodItem) => {
    addDinner(item); // Directly adding the food item to the context
  };

  useEffect(() => {
    console.log(SERVER_URL)
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${SERVER_URL}/foodInfo`);
        setFoodData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (filterCondition) {
      const filtered = foodData.filter(item =>
        item.name.toLowerCase().includes(filterCondition.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(foodData);
    }
  }, [filterCondition, foodData]);

  


  const renderItem = ({ item }: { item: FoodItem }) => (
   
    <View style={styles.itemContainer}>
      
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtext}>Calories: {item.calories}</Text>
      <Text style={styles.subtext}>Proteins: {item.protein}</Text>
      <TouchableOpacity onPress= {()=>handleAddBreakfastFood(item)}>
        <Text style={styles.buttontext}>Add to breakfast</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress= {()=>handleAddLunchFood(item)}>
        <Text style={styles.buttontext}>Add to Lunch</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress= {()=>handleAddDinnerFood(item)}>
        <Text style={styles.buttontext}>Add to Dinner</Text>  
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style = {styles.searchBarContainer}>
      <TextInput
        label="Search"
        value={filterCondition}
        onChangeText={setFilterCondition}
        style={styles.searchBar}
      />
      <Button onPress={() => setFilterCondition('')}>Refresh</Button>
      </View>
      {isLoading && <ActivityIndicator size="large" style={styles.loadingIndicator} />}
      <FlatList
      style={styles.List}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            {filterCondition ? 'No results found.' : 'Search for food items.'}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginHorizontal: 0,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
  },
  searchBarContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttontext:{
    color: 'black',
  },
  searchBar: {
    flex: 0.98,
    height: 60,
    padding: 0,
    backgroundColor: 'white',
    borderRadius: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
  },
  loadingIndicator: {
    marginTop: 10,
  },
  List:{
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    width: 0.9*ScreenWidth,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});

export default Searchbar;
