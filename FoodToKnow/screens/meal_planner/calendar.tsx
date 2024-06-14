import React, { useState } from 'react';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';


const MyCalendar = () => {
    
      
    return (
    <View
        style={{
            height: 1000,
        }}
    >
        <Agenda
            items={{
                '2024-06-14': [{ name: 'Meeting 1', data: 'Breakfast: Cereal \nLunch: Pizza\nDinner: Rice ' }],
                '2024-06-15': [{ name: 'Meeting 1', data: 'Breakfast: Pancakes \nLunch: Caifan\nDinner:Chicken Rice ' }],
                '2024-06-16': [{ name: 'Meeting 1', data: 'Breakfast: Scrambled Eggs \nLunch: Pizza\nDinner: Chicken ' }],
            }}
            renderItem={(item) => (
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text style={styles.itemText}>{item.data}</Text>
                </TouchableOpacity>

            )} />
        {/* <Calendar
            style={{
                borderWidth: 1,
                borderColor: 'gray',
                height: 350
            }}
            current={'2024-06-14'}
            onDayPress={day => {
                console.log('selected day', day);
            }}
            markedDates={{
                '2024-06-12': { selected: true, marked: true, selectedColor: 'blue' },
                '2024-06-13': { marked: true },
                '2024-06-14': { selected: true, marked: true, selectedColor: 'blue' }
            }} /> */}

    </View>
    
        )   
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    item: {
      backgroundColor: 'lightblue',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 25,
      paddingBottom:20
    },
    itemText: {
      color: 'black',
      fontSize: 16,
    }
  });

export default MyCalendar