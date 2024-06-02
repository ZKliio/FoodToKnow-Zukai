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

const Profile = () => {
  
    return (
    <View style = {styles.background}>
        <Text style = {styles.text}>Account Settings</Text>
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