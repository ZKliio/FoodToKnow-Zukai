import { useNavigation } from '@react-navigation/native';
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
const logo = require('../../imagef2know1.png');

const Login = () => {
        const {height} = useWindowDimensions();
        const [email, setEmail] = useState('');
        const[password, setPassword] = useState('');

        const handleLogin = () => {
            //implement login logic here (eg API call)
            console.log('Logging in with email:');
        };

        const navigation = useNavigation();

        return (
          <View style={styles.background}>
            <KeyboardAvoidingView
              style={styles.headerContainer}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <Image source={logo} style={[styles.logo, {height: height * 0.3, resizeMode: 'contain'}]}  />
              <Text style={styles.welcome}>Ready to start your day?</Text>

            </KeyboardAvoidingView>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
              />

              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button color="gray" title="Login" onPress={handleLogin} />
            </View>

            <View>
              <Button
                color="gray"
                title="Home"
                onPress={() => navigation.navigate('Home')}
              />
            </View>
            {/* This Home button is for testing, will not be implemented in final  */}
          </View>
        );
};


const styles = StyleSheet.create({
    background: {  //style for the main container
      flex: 1,
      padding: 0,
      backgroundColor: 'rgb(245,234,206)',         //'blue',
    },

    headerContainer: {
      flex: 0.4,
      margin: 0,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor:'transparent', //'red', 
    },

    headerText:{
      color: 'black',
      fontSize: 40,
      fontWeight: 'bold',
      padding: 10,
    },

    subheaderText:{
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      padding: 10,
    },

    logo: {
      flex: 0.8,
      width: '70%',
      maxWidth: 500,
      height: '100%', 
      maxHeight: 100,
      marginBottom: 30,
    },
    welcome:{
      color: 'black',
      fontSize: 35,
      fontWeight: 'bold',
      // backgroundColor: 
    },
    inputContainer:{
      flex: 0.15,
      alignItems: 'center',
      padding: 20,
      marginHorizontal:50,
      marginBottom: 0,
      marginTop: 20,

      backgroundColor: 'pink',//'rgb(160, 255, 180)'
    },
    input:{
      borderWidth: 1,
      backgroundColor: 'white',
      borderColor: '#ccc',
      padding: 10,
      marginBottom:10,
      width: '100%',
    },
    buttonContainer:{
      flex: 0.1,
      paddingHorizontal: 50,
    }
    
    
  });

export default Login;