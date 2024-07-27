import React, { useContext, useState } from 'react';
import { View, Button, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FoodContext } from '../../FoodContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const DatePicker = () => {
  const { selectedDate, setSelectedDate } = useContext(FoodContext);
  const [show, setShow] = useState(false);

  const onChange = (event, date) => {
    setShow(Platform.OS === 'ios');
    if (date !== undefined) {
      setSelectedDate(date);
    }
  };

  // Format the date to display it
  const formattedDate = new Date(selectedDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Date: {formattedDate}</Text>
      {/* <Button onPress={() => setShow(true)} title="Select Date" /> */}
      <TouchableOpacity onPress={() => setShow(true)} style={styles.addButton}>
            <Icon name="calendar" size={20} color="white" />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
        
      )}
      
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
  flex: 1,
  flexDirection: 'row',
  padding: 15,
  backgroundColor: 'rgb(90, 100, 205)',
  justifyContent: 'space-between',
  alignItems: 'center',
},
  text: {
    fontSize: 15,
    color: 'rgb(220, 220, 220)',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'rgb(100, 170, 255)',
    borderRadius: 10,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
})