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
    KeyboardAvoidingView,
    Platform,
    Image,
    Alert,
    useWindowDimensions,

} from 'react-native';
import CustomInput from './CustomInput.tsx';
import CustomButton from './CustomButton.tsx';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {useForm} from "react-hook-form";
const ForgotPasswordScreen = () => {
    const {control, handleSubmit, watch} = useForm();

    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    const onSendPressed = (data) => {
        console.warn(data);
        navigation.navigate('NewPassword');
    }

  return (
    <ScrollView>
    <View style = {styles.root}>
      <Text style = {styles.title}>Reset your password</Text>
      
      <CustomInput 
      name = "username"
      control = {control}
        placeholder="Username"
        rules = {{
            required: 'Username is required',
        }}
        />

      <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />


<CustomButton 
text="Back to Sign In" 
onPress={onSignInPressed}
type = "TERTIARY"
/>

    </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;


const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },

    text:{
        color: 'gray',
        marginVertical: 10,

    },

    link: {
        color: '#FDB075',
    },
});