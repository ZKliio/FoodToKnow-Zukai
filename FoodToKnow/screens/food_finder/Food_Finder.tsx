// import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from './maps';
import ReviewDetails from './ReviewDetails';
import FoodFinder from './Food_Finder';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Map">
                <Stack.Screen name="Map" component={Map} />
                <Stack.Screen name="ReviewDetails" component={ReviewDetails} options={{ headerShown: false }} />
                <Stack.Screen name="FoodFinder" component={FoodFinder}  />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;