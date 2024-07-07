import React from 'react';
import {useState, useEffect,} from 'react';
import { 
    StyleSheet, 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    } 
from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import GooglePlacesSDK from 'react-native-google-places-sdk';
import { GOOGLE_API_KEY } from './environment';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';

// add your Places API key
GooglePlacesSDK.initialize(GOOGLE_API_KEY);



const Map = () => {
    const INITIAL_LAT = 1.2789;
    const INITIAL_LONG = 103.8536;

    const [searchText, setSearchText] = useState("");

    const searchPlaces = async () => {
        if (!searchText.trim().length) //if search empty return nothing
     return; 

     const googleApisURL = 
     "https://maps.googleapis.com/maps/api/place/textsearch/json";
    const input = searchText.trim()
    const location= `${INITIAL_LAT},${INITIAL_LONG}&radius=100}`
    const url = `${googleApisURL}?query=${input}&location=${location}&key=${GOOGLE_API_KEY}`
    try{
        const response= await fetch(url)
        const json = await response.json()
        
        console.log(json)
        
    }
    catch(error){
        
        console.log(error)
        
    }
    };

   
   
    const initialRegion = {
    latitude: INITIAL_LAT,
    longitude: INITIAL_LONG,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <KeyboardAvoidingView>
    <View style={styles.container}>

      <MapView
        provider={PROVIDER_GOOGLE} // Add this line to use Google Maps
        style={styles.map}
        initialRegion={initialRegion}
    >
        <Marker
          coordinate={{
            latitude: 1.3938,
            longitude: 103.9127,
          }}
          title={"Marker Title"}
          description={"Marker Description"}
        />
      </MapView>
      <View style={styles.searchBox}>
        <TextInput 
            value = {searchText}
            style={styles.searchField}
            placeholder="Search here"
            onChangeText={setSearchText}
          />
        <TouchableOpacity
            onPress={searchPlaces}
        >
            <Text style={styles.text}>Search place</Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    width: 0.95*ScreenWidth,
    height: 0.4*ScreenHeight,
  },
  searchBox:{
    flex: 0.5,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
  },
  text:{
    color: 'black',
  },
  searchField:{
    backgroundColor: 'white',
    borderWidth:1,
    borderRadius:10,
    color: 'black',
  }
});

export default Map;