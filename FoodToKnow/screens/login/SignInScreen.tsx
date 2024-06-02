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

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {useForm, Controller } from "react-hook-form";
import { firebase } from '../authentication.tsx';
import { Auth } from 'firebase/auth';
import auth from '@react-native-firebase/auth';

import logo from './imagef2know1.png';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton.tsx';
import Homepage from '../home/Homepage.tsx';
const SignInScreen = () => {
     
    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const {control,handleSubmit, formState: {errors}} = useForm();

    // const loginUser = async (username: string, password: string) => {
    //     try {
    //         const response = await firebase.auth().signInWithEmailAndPassword(username, password);
    //         console.log(response);
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }


    const LoginUser2 = (username: string, password: string) => {
        auth().createUserWithEmailAndPassword("Email", "Password").then(() => {
            Alert.alert('User created successfully!');
        })
        .catch((err) => {
            console.log(err)
        })
    }

    console.log(errors);
    const onSignInPressed = (data: any) => {
        //validate user
        console.log(data);
        navigation.navigate("Homepage");
    };

    const onForgotPasswordPressed = () => {
       navigation.navigate('ForgotPassword');         // navigate to forgot password screen
    }

    const onSignInFacebook = () => {
        console.warn('Sign In with Facebook');
    }
    const onSignInGoogle = () => {
        console.warn('Sign In with Google');
    }
    const onSignInApple = () => {
        console.warn('Sign In with Apple');
    }
    
    const onSignupPressed = () => {
        navigation.navigate('SignUp');           //navigate to Sign up screen
    }
  return (
    <ScrollView>
    <View style = {styles.root}>
      <Text style = {styles.title}>Welcome to F2K</Text>
      <Image source={logo} style={[styles.logo, {height: height * 0.3}]} resizeMode='contain' />
      <Text style = {styles.welcome}> Ready to start your day?</Text>
      <CustomInput 
        name = "username"
        placeholder="Username"
        control = {control}
        rules = {{required: 'Username is required'}}
        />

      <CustomInput 
        name = "password"
        placeholder="Password" 
        control =  {control}
        secureTextEntry= {true}
        rules = {{required: 'Password is required', minLength : {value: 3, message: 'Password should be at least 6 characters'}}}
      />

    
      

      <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed) } />

      <CustomButton 
      text="Forgot Password?" 
      onPress={onForgotPasswordPressed}
      type = "TERTIARY"
      />

<CustomButton text="Sign In with Facebook" 
onPress={onSignInFacebook}
bgColor="#E7EAF4"
fgColor={"#4765A9"}
/>
<CustomButton 
text="Sign In with Google" 
onPress={onSignInGoogle}
bgColor={"#FAE9EA"}
fgColor={"#DD4B39"}
/>
<CustomButton 
text="Sign In with Apple" 
onPress={onSignInApple}
bgColor={"#e3e3e3"}
fgColor={"#363636"}
/>
<CustomButton 
text="Dont't have an account? Create one!" 
onPress={onSignupPressed}
type = "TERTIARY"
/>

    </View>
    </ScrollView>
  );
};

export default SignInScreen;


const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        
    },
    logo: {
        width:'100%',
        maxWidth :400,
        maxHeight: 200,
        backgroundColor: 'peachpuff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    welcome:{
        color: 'black',
        fontSize: 35,
        fontWeight: 'bold',
    }
});