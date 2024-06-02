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
import CustomInput from './CustomInput';
import CustomButton from './CustomButton.tsx';
import { useNavigation } from '@react-navigation/native';
import {useForm} from "react-hook-form";

const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const SignUpScreen = () => {
 const {control, handleSubmit, watch} = useForm({defaultValues
     : {
        // Username: 'Default username',     //take note that it is case sensitive

     },
 });
 const pwd = watch('password');

    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
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
    
    const onRegisterPressed = () => {
        navigation.navigate ('ConfirmEmail');
    }

    const onTermsOfUsedPressed = () => {
        console.warn('Terms of Use');
    }
    const onPrivacyPolicyPressed = () => {
        console.warn('Privacy Policy');
    }
  return (
    <ScrollView>
    <View style = {styles.root}>
      <Text style = {styles.title}>Create Account</Text>
      
      <CustomInput 
        name = "Username"
        control = {control}
        placeholder="Username"
        rules = {{required: 'Username is required', 
        minLength: {value: 3, message: 'Username should be at least 3 characters'},
        maxLength: {value: 24, message: 'Username should be at most 24 characters'}}}
        />

<CustomInput 
        name = "Email"
        control = {control}
        placeholder="Email"
        rules = {{required: 'Email is required', pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}}}
        />

      <CustomInput 
      name = "Password"
      control = {control}
        placeholder="Password" 
        secureTextEntry= {true}
        rules = {{required: 'Password is required', 
        minLength: {value: 6, message: 'Password should be at least 6 characters'},
        }}
      />

<CustomInput 
        name = "Confirm Password"
        control={control}
        placeholder="Confirm Password"
        secureTextEntry={true}
        rules ={{
            validate: value => value == pwd || 'Password do not match',
        }}
        />


      <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />

<Text style = {styles.text}>By registering, you confirm that you accept our {''}
<Text style = {styles.link} onPress = {onTermsOfUsedPressed}> Terms of Use</Text> and {''}
<Text style = {styles.link} onPress = {onPrivacyPolicyPressed}> Privacy Policy </Text>
 </Text>

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
text="Have an account? Sign In" 
onPress={onSignInPressed}
type = "TERTIARY"
/>

    </View>
    </ScrollView>
  );
};

export default SignUpScreen;


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