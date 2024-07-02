import React, { useContext, useState } from 'react';
import { View, Button, Text, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FoodContext } from '../../FoodContext';

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
      <Button onPress={() => setShow(true)} title="Select Date" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <Text style={styles.text}>Selected Date: {formattedDate}</Text>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
  text: {
    fontSize: 15,
    color: 'black'
  }
})