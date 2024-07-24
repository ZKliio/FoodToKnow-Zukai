// EditProfile.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../AuthContext';
import { useProfile } from '../../ProfileContext';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
  const { email, setEmail } = useAuth();
  const navigation = useNavigation();
  const { name, setName } = useProfile();
  const [dietaryPreferences, setDietaryPreferences] = useState('Vegetarian');
  const [healthGoals, setHealthGoals] = useState('Maintain Weight');

  const handleSave = () => {
    // Implement save logic here
    console.log('Profile saved');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} editable={false} />

      <Text style={styles.label}>Dietary Preferences</Text>
      <TextInput style={styles.input} value={dietaryPreferences} onChangeText={setDietaryPreferences} />

      <Text style={styles.label}>Health Goals</Text>
      <TextInput style={styles.input} value={healthGoals} onChangeText={setHealthGoals} />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default EditProfile;
