import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../AuthContext';
import { useProfile } from '../../ProfileContext';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
  const { email, setEmail } = useAuth();
  const navigation = useNavigation();
  const { name, setName } = useProfile();
  const [localName, setLocalName] = useState(name);
  const [dietaryPreferences, setDietaryPreferences] = useState('Vegetarian');
  const [healthGoals, setHealthGoals] = useState('Maintain Weight');

  const handleSave = () => {
    // Implement save logic here
    console.log('Profile saved');
    console.log('email', email);
    console.log('name', localName);
    setName(localName);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={localName}
        onChangeText={setLocalName}
      />

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
    fontSize: 25,
    marginBottom: 8,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default EditProfile;
