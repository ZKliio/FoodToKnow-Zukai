import React from 'react';
import { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
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
    KeyboardAvoidingView,
    Platform,
    Image,
    Alert,
    useWindowDimensions,

} from 'react-native';

import { firebase } from '../authentication';

import ConfirmEmailScreen from "./ConfirmEmailScreen";
import ForgotPasswordScreen from './ForgotPasswordScreen';
import NewPasswordScreen from './NewPasswordScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from '../home/Homepage';
import HomepageButtons from '../home/HomepageButtons';
import MealPlanner from '../meal_planner/Meal_planner';
import SearchBar from '../food_info/searchbar';
import FoodInfo from '../food_info/Food_info';
import FoodFinder from '../food_finder/Food_Finder';
import Profile from '../settings/Profile';
import { AuthProvider } from '../../AuthContext';
import { FoodProvider } from '../../FoodContext';
// import { SearchBar } from 'react-native-screens';
import AppNavigation from '../../components/NavigationTab';
import { useAuth } from '../../AuthContext';
import ProfileNavigator from '../Profile/Profile_Stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    ConfirmEmail: undefined;
    ForgotPassword: undefined;
    NewPassword: undefined;
  };
type Props = {
  route: {
    params: any;
  };
};

const UserStack = () => { //{ route }: Props
    const {loginCheck, setLoginCheck} = useAuth();
    // console.log('hi',loginCheck)
    return (  //the independent = {true} helps to account for nested navigation\
        
      
        <NavigationContainer independent={true}>    
            <Stack.Navigator  initialRouteName="SignIn" >
                <Stack.Screen name="SignIn" component={SignInScreen} options = {{headerShown: false}}/>
                {/* <Stack.Screen name="Homepage" component = {Homepage} options = {{headerShown: false}}/> */}
              

                <Stack.Screen name="App" component={AppNavigation} options={{ headerShown: false}}/>

                {/* <Stack.Screen name="MealPlanner" component={MealPlanner}  /> 
                <Stack.Screen name="FoodInfo" component={SearchBar} />
                <Stack.Screen name="FoodFinder" component={FoodFinder} />
                <Stack.Screen name="Profile" component={Profile} /> 
               */}
                {/* <Stack.Screen name="ProfileStack" component={ProfileNavigator} /> */}
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            </Stack.Navigator>
        </NavigationContainer>

        
    )
};
export default UserStack;