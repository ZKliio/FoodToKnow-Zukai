import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  
} from 'react-native';

import Searchbar from "./searchbar";
import axios from "axios";
import React, { useCallback, useEffect, useState, useContext} from "react";

// import {RealmContext, Profiles } from '../../schemas/Profiles.tsx';
// import { BSON } from 'realm';


// const { useQuery, useRealm } = RealmContext
import { useFocusEffect } from "@react-navigation/native";
import {FoodType} from "../../Context.js";
const FoodInfo = () => {
  
   // const fetchFood = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:3000/foodInfo');
    //     console.log(response.data);
    //     setFoods(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
  // const searchText = searchText;
  const { foodId, setFoodId } = useContext(FoodType);
  const [filterCondition, setFilterCondition] = useState('');
  interface Food {
    _id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }
  
  const [foods, setFoods] = useState<Food[]>([]);
    useEffect(() => {
      fetchFood();
    }, [filterCondition]);
    
    useFocusEffect(
      useCallback(() => {
        fetchFood();
      }, [])
    );
    
  useEffect(() => {
    fetchFood();
  }, [filterCondition]);
   
    const fetchFood = async () => {

        axios
        .get('http://10.0.2.2:3000/foodInfo', {
          params: { foodSearched: filterCondition },
        })
        .then(  response => {
        //console.log(response.data)

        console.log("Food info fetched successfully");
        //const foods = response.data
        setFoods(response.data);
   
        }).catch(error => {
        if (error.response) {
          // The server responded with a status code outside the 2xx range
          console.log('Error response:', error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Error request:', error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.log('Error message:', error.message);
        }
      });
      
    };
  
  return (
    <View style={styles.background}>
      
      
      <Text style={styles.text}>Food Info</Text>
      
      <Searchbar />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.searchButton} onPress={fetchFood}>
          <Text style={styles.searchText}>Refresh</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.searchButton} onPress={fetchFood}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.listContainer}>
        <FlatList
          data={foods}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style = {styles.subtext}>Calories: {item.calories}</Text>
              <Text style = {styles.subtext}>Protein: {item.protein}</Text>
            </View>
          )}
        />
      </View> */}
    </View>
  );
};


export default FoodInfo

const styles = StyleSheet.create({
    background: {
      flex: 1,
      padding: 0,
      backgroundColor: 'rgb(245,234,206)',
      alignItems: 'center',
    },

    text: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      backgroundColor: 'transparent',
      margin: 90,
      justifyContent: 'flex-start',
    },

    buttonRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
      width: '100%',
    },

    searchBarContainer: {
      backgroundColor: 'transparent',
      padding: 0,
      flex: 1,
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },

    searchButton: {
      backgroundColor: 'rgb(90, 100, 255)',
      borderRadius: 8,
      padding: 10,
      marginHorizontal: 10,
      marginVertical: 5,
    },

    searchText: {
      color: 'white',
      fontWeight: 'bold',
    },

    listContainer: {
      flex: 1,
      width: '100%',
      backgroundColor: 'white',
    },

    item: {
      padding: 16,
      marginTop: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      
    },

    title: {
      backgroundColor:'transparent',
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
    subtext: {
      backgroundColor:'transparent',
      fontWeight: 'bold',
      color: 'rgb(90, 100, 255)',
    },
});

