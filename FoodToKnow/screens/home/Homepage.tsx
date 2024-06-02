/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { useState } from 'react';
import type {PropsWithChildren} from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import{
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
  
} from 'react-native';

import Searchbar from "../food_info/searchbar";
import ImageButton from "./HomepageButtons"
import { useNavigation } from '@react-navigation/native';


const Homepage = () => {
  const navigation = useNavigation()  
  const streakCount = 5;
    
    if (streakCount <= 3){
      
    return (
      
      <View style ={styles.background}>
        <View style = {styles.headerContainer}> 

          <Text style = {styles.headerText}>
            Day {streakCount}
          </Text>
          
          <Text style = {styles.subheaderText}>
            Good job! 🫡🫡
          </Text>
        </View>

        <View style = {styles.contentContainer}>
          <Text style = {styles.subheaderText}>
          What would you like to do today? 😇
          </Text>
        </View>
        <ImageButton/>

        <View>
        </View>

      </View>
      

    );}
    else{
      return (
        <View style={styles.background}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Day {streakCount}</Text>

            <Text style={styles.subheaderText}>You're on a streak!🔥🔥😤</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              What would you like to do today? 😇
            </Text>
          </View>
          <ImageButton />

          <View></View>
        </View>
      );
    }
  };



  export default Homepage 

  const styles = StyleSheet.create({
    background: {  //style for the main container
      flex: 1,
      flexDirection: 'column',
      padding: 0,
      // backgroundColor:'black',
      backgroundColor: 'rgb(245,234,206)',         //'blue',
      justifyContent: 'space-between',
      
    },

    headerContainer: {
      flex: 0.20,
      marginBottom: 5,
      padding: 30,
      backgroundColor: 'rgb(255, 230, 0)', // yellow
      // flexWrap: 'nowrap',
      // flexShrink: 1,
    },
    
    contentContainer:{
      flex: 0.15,
      marginTop: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgb(245,234,206)', // yellow
      // flexWrap: 'wrap'

    },

    headerText:{
      color: 'black',
      fontSize: 45,
      fontWeight: 'bold',
      padding: 0,
      marginBottom: 20,
      
    },

    subheaderText:{
      color: 'black',
      // fontSize: 30,
      fontWeight: 'bold',
      padding: 0,
      // flexShrink:1
      // fontSize:hp('3%')
      fontSize:RFValue(23),
    },
    contentText:{
      color: 'black',
      fontSize: 25,
      fontWeight: 'bold',
      padding: 0,
    }
      
    });





