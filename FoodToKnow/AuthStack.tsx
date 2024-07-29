import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import SignInScreen from './screens/login/SignInScreen';
import SignUpScreen from './screens/login/SignUpScreen';
import ConfirmEmailScreen from "./screens/login/ConfirmEmailScreen";
import ForgotPasswordScreen from './screens/login/ForgotPasswordScreen';
import NewPasswordScreen from './screens/login/NewPasswordScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
    <NavigationContainer independent={true}>    
        <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            {/* Other auth screens */}
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AuthStack;