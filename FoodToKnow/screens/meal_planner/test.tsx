import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Test = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const savedItems = await AsyncStorage.getItem('items');
      if (savedItems !== null) {
        setItems(JSON.parse(savedItems));
      }
    } catch (error) {
      console.error('Failed to load items:', error);
    }
  };

  const saveItems = async (items) => {
    try {
      await AsyncStorage.setItem('items', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save items:', error);
    }
  };

  const addItem = () => {
    if (newItem.trim() === '') {
      Alert.alert('Invalid input', 'Item cannot be empty');
      return;
    }
    const updatedItems = [...items, { id: Date.now().toString(), name: newItem }];
    setItems(updatedItems);
    saveItems(updatedItems);
    setNewItem('');
  };

  const deleteItem = async (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    await saveItems(updatedItems);
  };

//   const deleteItem = async (id) => {
//     try{
//         await AsyncStorage.removeItem(id);
//         return true
//     }catch(error){
//         console.log(error);
//     }
//   };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <Button onPress={() => deleteItem(item.id)}>Delete</Button>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Add an item"
          value={newItem}
          onChangeText={setNewItem}
        />
        <Button onPress={addItem}>Add</Button>
        
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Test;
