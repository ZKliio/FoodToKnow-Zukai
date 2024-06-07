import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

interface FoodItem {
  _id: string; // Assuming a unique identifier for each food item
  name: string; // Name of the food item
  calories: number; // Calories of the food item
  protein: number; // Proteins of the food item (added property)
}

const Searchbar = () => {
  const [filterCondition, setFilterCondition] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [foodData, setFoodData] = useState<FoodItem[]>([]);
  const [filteredData, setFilteredData] = useState<FoodItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://10.0.2.2:3000/foodInfo`);
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
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtext}>Calories: {item.calories}</Text>
      <Text style={styles.subtext}>Proteins: {item.protein}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={filterCondition}
        onChangeText={setFilterCondition}
        placeholder="Search for food..."
        style={styles.searchBar}
      />
      {isLoading && <ActivityIndicator size="large" style={styles.loadingIndicator} />}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
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
    backgroundColor: '#f8f9fa',
  },
  searchBar: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
  },
  loadingIndicator: {
    marginTop: 10,
  },
  item: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
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
