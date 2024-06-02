import React from 'react';
import { TextInput, View, Text,StyleSheet, Pressable,    SafeAreaView,
    ScrollView,
    StatusBar,
    useColorScheme,  
    Button,
    KeyboardAvoidingView,
    Platform,
    Image,
    Alert,
    useWindowDimensions, } from 'react-native';

const CustomButton = ({onPress,text,type = "PRIMARY", bgColor, fgColor}) => {
        return (
            <Pressable onPress={onPress}
             style = {[styles.container, 
             styles[`container_${type}`],
             bgColor ? {backgroundColor:bgColor} : {}
             ]}>
                <Text 
                style = {[styles.text, 
                styles [`text_${type}`],
                fgColor ? {color:fgColor} : {}
                ]}>
                    {text}
                    </Text>
            </Pressable>
        );
    };
    

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'blue',
            
            width: '100%',
            
            padding: 15,
            marginVertical: 5,

            alignItems: 'center',
            borderRadius: 5,
        },
        text:{
            fontWeight: 'bold',
            color: 'white',
        },

        container_PRIMARY : {
            backgroundColor: '#3B71F3',
        },
       container_SECONDARY : {
           borderColor: '#3B71F3',
           backgroundColor: 'transparent',
           borderWidth: 2,
       },
       text_SECONDARY : {
           color: '#3B71F3',
       },
        container_TERTIARY : {
            backgroundColor: 'white',
          
        },
        text_TERTIARY:{
            fontWeight:'bold',
            color: 'grey',
        }
    });


    export default CustomButton
