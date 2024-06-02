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
import App from '../../App.tsx';
const ConfirmEmailScreen = () => {
const {control, handleSubmit, watch} = useForm();

    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    const onConfirmPressed = (data) => {
        console.warn(data);
        // navigation.navigate('Homepage');
        navigation.navigate('Homepage', { screen: 'Homepage' });
    }

    const onResendPressed = () => {
        console.warn('Resend Code');
    }
  return (
    <ScrollView>
    <View style = {styles.root}>
      <Text style = {styles.title}>Confirm your email</Text>
      
      <CustomInput 
      name = "code"
      control = {control}
        placeholder="Enter your confirmation code"
        rules = {{
            required: 'Confirmation code is required',
        }}
        />

      <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />


<CustomButton
text = "Resend Code"
onPress={onResendPressed}
type = "SECONDARY"
/>

<CustomButton 
text="Back to Sign In" 
onPress={onSignInPressed}
type = "TERTIARY"
/>

    </View>
    </ScrollView>
  );
};

export default ConfirmEmailScreen;


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