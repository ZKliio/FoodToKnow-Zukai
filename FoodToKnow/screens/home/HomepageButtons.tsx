import React from 'react';
import { useState } from 'react';
import type {PropsWithChildren} from 'react';
import { 
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    Image,
    View,
    Button,
    TouchableOpacity,  
    Alert,
}
from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ImageButton = () => {
  const icon_mealplanner = require('./homepage_icons/mealplanner.png');
  const food_finder = require('./homepage_icons/food_finder.png');
  const food_info = require('./homepage_icons/food_info.png');
  const account_settings = require('./homepage_icons/account_settings.png');
  
  const navigation = useNavigation();
  // Define the handler for the button press
  // Link pages according to buttons
  

  const meal_planner_handlePress = () => {
    navigation.navigate('MealPlanner');
  };
  const food_finder_handlePress = () => {
    navigation.navigate('FoodFinder');
  };
  const food_info_handlePress = () => {
    navigation.navigate('FoodInfo');
  };
  const account_settings_handlePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.homepage}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={meal_planner_handlePress}
          style={styles.buttonArea}>
          <Image
            source={icon_mealplanner} // Replace with your image URL
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={food_finder_handlePress}
          style={styles.buttonArea}>
          <Image
            source={food_finder} // Replace with your image URL
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={food_info_handlePress}
          style={styles.buttonArea}>
          <Image
            source={food_info} // Replace with your image URL
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={account_settings_handlePress}
          style={styles.buttonArea}>
          <Image
            source={account_settings} // Replace with your image URL
            style={styles.image}
          />
        </TouchableOpacity>
      </View>

      {/* <Button color = 'gray' title ="login" 
        onPress={ () => navigation.navigate("Profile")} /> */}
    </View>
  );

};

const styles = StyleSheet.create({

  homepage:{
    flex: 0.5,
    alignItems: 'center',
    marginBottom: 150,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    

  },  
  buttonArea: {
    // You can add styles for your button container here
    // flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    // width: "50%",
    // height: "100%",
    marginHorizontal: "0%",
    marginVertical: "0%",
    
  },
  image: {
    width: '100%', // Set your desired width
    height: '100%', // Set your desired height
    resizeMode: 'contain', // Ensure the image scales properly
  },
  
});

export default ImageButton;
