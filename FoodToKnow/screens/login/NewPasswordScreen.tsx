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
import logo from './imagef2know1.png';
import CustomInput from './CustomInput.tsx';
import CustomButton from './CustomButton.tsx';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
const NewPasswordScreen = () => {
    const {control, handleSubmit, watch} = useForm();

    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    
    const onSubmitPressed = (data) => {
        console.warn(data)
        console.warn('Submit');
    }

    const onResendPressed = () => {
        console.warn('Resend Code');
    }
  return (
    <ScrollView>
    <View style = {styles.root}>
      <Text style = {styles.title}>Reset your password</Text>
      
      <CustomInput 
      name = "code"
      control = {control}
        placeholder="Code"
  rules = {{
      
      required: 'Code is required',
  }}
   />

        <CustomInput
        name = "password"
        control = {control}
        placeholder = "Enter your new password"
        rules = {{
            required: 'Password is required',
            minLength: {
                value: 6,
                message: 'Password should be at least 6 characters long',

            },
        secureTextEntry: true
        }}
        />

      <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />


<CustomButton 
text="Back to Sign In" 
onPress={onSignInPressed}
type = "TERTIARY"
/>

    </View>
    </ScrollView>
  );
};

export default NewPasswordScreen;


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