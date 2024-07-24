// SettingsCustomisation.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../../AuthContext';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  sendPasswordResetEmail } from 'firebase/auth';
import { useNavigation, CommonActions, StackActions } from '@react-navigation/native';
import EditProfile from './EditProfile';


const SettingsCustomisation = () => {
    const navigation = useNavigation();
    const {auth, email, setEmail} = useAuth();

    const handleLogout = async () => {
        try {
        await signOut(auth);
        // navigation.navigate('ProfileStack', { screen: 'SignInScreen' });
        // navigation.navigate('UserStack', { screen: 'SignIn' });
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
            })
        );
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: 'App' }],
        //   })
        // );
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: 'Stack' }],
        //   })
        // );
        } catch (error) {
        console.error('Error signing out: ', error);
        }
    };

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://i.pravatar.cc/' }} style={styles.profileImage} />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>{email}</Text>

      <Text style={styles.sectionTitle}>Dietary Preferences</Text>
      <Text style={styles.sectionContent}>Vegetarian</Text>

      <Text style={styles.sectionTitle}>Health Goals</Text>
      <Text style={styles.sectionContent}>Maintain Weight</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileStack', {
        screen: 'EditProfile',
        })
        }>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
  sectionContent: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SettingsCustomisation;