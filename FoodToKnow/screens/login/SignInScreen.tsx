import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { useAuth } from '../../AuthContext';
import logo from './imagef2know1.png';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton.tsx';
import Homepage from '../home/Homepage.tsx';
import AppNavigation from '../../components/NavigationTab.tsx';
import login from './index.js';
import LinearGradient from 'react-native-linear-gradient';


const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication, handlePasswordReset }) => {
  return (
    <View style={styles.authContainer}>
      <Image source = {logo} style = {styles.logo} />
      <Text style={styles.title}>{isLogin ? 'Welcome to FoodToKnow!' : 'Sign up for an account now!'}</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
      </View>
      {isLogin && (
        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText} onPress={handlePasswordReset}>
            Forgot Password? (Key in your Email in the text field above)
          </Text>
        </View>
      )}
      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
};

const AuthenticatedScreen = ({ user, handleAuthentication, auth }) => {
  const navigation = useNavigation();
  const homepage_handlePress = () => {
    navigation.navigate('App'); // Navigate to 'App');
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      Alert.alert('Password Reset', 'An email has been sent to reset your password.');
    } catch (error) {
      console.error('Password reset error:', error.message);
      Alert.alert('Error', error.message);
    }
  };

    // Extract username from email {NEW}
    const getUsernameFromEmail = (email) => {
      return email ? email.split('@')[0] : 'Guest';
    };
  
    const username = getUsernameFromEmail(user?.email);

  return (
      <ScrollView>
        <View style = {styles.headerContainer}> 
            <Text style = {styles.subheaderText}>
              Ready to start the day healthy?
            </Text>
            <Text style = {styles.subheaderText}>
              💪🍅🥕😊
            </Text>
        </View>
      <Text style={styles.emailText}>Welcome back, {username}!</Text>
      <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
      <Button title="Homepage" onPress={homepage_handlePress} color="rgb(50, 180, 130)" />
      <Button title="Change Password" onPress={handlePasswordReset} color="#3498db" />
    </ScrollView>
  );
};

const App = () => {
  const { auth, email, setEmail, password, setPassword, setLoginCheck,  } = useAuth();
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthentication = async () => {
    try {
      if (user) {
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
          setLoginCheck(true);
          console.log(email);

        } else {
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Password Reset', 'An email has been sent to reset your password.');
    } catch (error) {
      console.error('Password reset error:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <LinearGradient colors={['#ffafbd', '#ffc3a0']} style={styles.container}>
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} auth={auth} />
      ) : (
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
          handlePasswordReset={handlePasswordReset}
        />
      )}
    </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    height: '100%',
    backgroundColor: 'black',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,   //this is the ULTIMATE PARENT THAT WILL ENCLOSE THE SIGNINSCREEN & AUTHENTICATED SCREEN
    backgroundColor: 'transparent',
  },
  authContainer: {
    width: '100%',
    maxWidth: 400,
    height: '100%',
    maxHeight: 700,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 8,
    shadowColor: 'green',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginBottom: 16,
    textAlign: 'center',
    color: 'green',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
    color: 'black',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  emailText: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  forgotPasswordText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
  },
  authenticatedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  homepageButton: {
    backgroundColor: 'rgb(50, 180, 130)',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  changePasswordButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 1,
  },

//additional stuff for the UI part as of 28th July (Adapted from previous iterations of the UI code)

    
headerContainer: {
  flex: 0.4,
  backgroundColor: 'rgb(245,234,206)', // yellow
  // flexWrap: 'nowrap',
  // flexShrink: 1,
},

contentContainer:{
  flex: 0,
  marginTop: 0,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgb(245,234,206)', // yellow
  // flexWrap: 'wrap'

},

headerText:{
  color: 'black',
  fontSize: 30,
  fontWeight: 'bold',
  padding: 0,
  marginBottom: 10,
  
},

subheaderText:{
  color: 'black',
  // fontSize: 30,
  fontWeight: 'bold',
  padding: 0,
  fontSize: 50,
  textAlign: 'center',
  // flexShrink:1
  // fontSize:hp('3%')
  // fontSize:RFValue(18),
},
contentText:{
  color: 'black',
  fontSize: 20,
  fontWeight: 'bold',
  padding: 0,
},
});

export default App;