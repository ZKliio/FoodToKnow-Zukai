import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MealPlanner from '../screens/meal_planner/Meal_planner';
// import FoodInfo from '../screens/food_info/Food_info';
import Searchbar from '../screens/food_info/searchbar';
import BMICalculator from '../screens/home/BMICalculator';
import FoodFinder from '../screens/food_finder/Food_Finder';
import Profile from '../screens/settings/Profile';
import SettingsCustomisation from '../screens/Profile/SettingsCustomisation';
import UserStack from '../screens/login/UserStack';
import ProfileStack from '../screens/Profile/Profile_Stack';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer independent = {true}>
      <Tab.Navigator 
        screenOptions={ ({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'MealPlanner':
                iconName = 'cutlery';
                break;
              case 'FoodInfo':
                iconName = 'book';
                break;
              case 'BMR Calculator':
                iconName = 'calculator';
                break;
              case 'FoodFinder':
                iconName = 'search';
                break;
              case 'Profile':
                iconName = 'user';
                break;
              default:
                iconName = 'circle';
                break;
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          headerShown: false
        })}
      >
        <Tab.Screen name="MealPlanner" component={MealPlanner}  />
        <Tab.Screen name="FoodInfo" component={Searchbar} />
        <Tab.Screen name="BMR Calculator" component={BMICalculator} />
        <Tab.Screen name="FoodFinder" component={FoodFinder} />
        {/* <Tab.Screen name="Profile" component={SettingsCustomisation} /> */}
        <Tab.Screen name="Profile" component={ProfileStack} />
        {/* <Tab.Screen name="UserStack" component={UserStack} /> */}
      </Tab.Navigator>
     </NavigationContainer>
  );
};

export default AppNavigation;