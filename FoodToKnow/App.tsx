/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();


import { useState, useEffect } from 'react';
import {Profiles} from './schemas/Profiles';
import { FoodProvider } from './FoodContext.js';
import { AuthProvider, useAuth } from './AuthContext';
import { ProfileProvider } from './ProfileContext.js';
import { CalculatorProvider } from './CalculatorContext';
import UserStack from './screens/login/UserStack.tsx';

import AuthStack from './AuthStack.tsx';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};
const AppNavigator = () => {
  const { user } = useAuth();

  if (user === undefined) {
    // Show loading screen while the user state is being determined
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <UserStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
function App() {
  type Stack = {
    Screen: {
      name: string,
      component: object;
    }
  }
 
  return (
    <AuthProvider>
      <FoodProvider>
        <CalculatorProvider>
        <ProfileProvider>

          <AppNavigator />

        </ProfileProvider>
        </CalculatorProvider>
      </FoodProvider>
    </AuthProvider>

  );
}



export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});