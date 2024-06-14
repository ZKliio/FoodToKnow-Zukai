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
  View,
  Button,
  TextInput,
  Image,
  
} from 'react-native';

import MyCalendar from '../meal_planner/calendar';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';

const Profile = () => {
  
    return (
       <View > 
        {/* <Text style = {styles.text}>Account Settings</Text> */}
      <MyCalendar/>
    </View>
    
)};


export default Profile

const styles = StyleSheet.create({
  background: {  //style for the main container
    flex: 1,
    padding: 0,
    backgroundColor: 'rgb(245,234,206)',         //'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
      color: 'black',
      fontSize: 40,
      fontWeight: 'bold',
  }
})