import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BMICalculator = () => {
  const [gender, setGender] = useState('man');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [activityLevel, setActivityLevel] = useState('1.2');
  const [bmr, setBmr] = useState(null);
  const [calories, setCalories] = useState(null);

  const calculateBMR = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    if (isNaN(w) || isNaN(h) || isNaN(a)) {
      alert('Please enter valid values for weight, height, and age.');
      return;
    }

    let bmrValue = 0;
    if (gender === 'man') {
      bmrValue = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmrValue = 10 * w + 6.25 * h - 5 * a - 161;
    }

    setBmr(bmrValue);
    setCalories(bmrValue * parseFloat(activityLevel));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Basic Metabolic Rate Calculator</Text>

      <Text style={styles.label}>Gender:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Man" value="man" />
          <Picker.Item label="Woman" value="woman" />
        </Picker>
      </View>

      <Text style={styles.label}>Weight (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        placeholder="Enter weight"
      />

      <Text style={styles.label}>Height (cm):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        placeholder="Enter height"
      />

      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        placeholder="Enter age"
      />

      <Text style={styles.label}>Activity Level:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={activityLevel}
          style={styles.picker}
          onValueChange={(itemValue) => setActivityLevel(itemValue)}
        >
          <Picker.Item label="Sedentary (little or no exercise)" value="1.2" />
          <Picker.Item label="Lightly active (1-3 days/week)" value="1.375" />
          <Picker.Item label="Moderately active (3-5 days/week)" value="1.55" />
          <Picker.Item label="Very active (6-7 days/week)" value="1.725" />
          <Picker.Item label="Extra active (very hard exercise & physical job)" value="1.9" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={calculateBMR}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {bmr !== null && (
        <View style={styles.result}>
          <Text style={styles.resultText}>BMR: {bmr.toFixed(2)} kcal/day</Text>
          <Text style={styles.resultText}>Calories needed: {calories.toFixed(2)} kcal/day</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    // width: '100%',
    // backgroundColor: 'red',
    color: '#333',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 18,
    marginTop: 10,
    color: '#666',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    marginBottom: 10,
    color: 'black',
    backgroundColor: '#fff',
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    color: 'black',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default BMICalculator;