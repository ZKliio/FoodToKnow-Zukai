import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  } 
from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import GooglePlacesSDK from 'react-native-google-places-sdk';
import { GOOGLE_API_KEY } from './environment';

import Map from './maps'
import GooglePlacesInput from './GooglePlacesInput';

// add your Places API key
GooglePlacesSDK.initialize(GOOGLE_API_KEY);
const App = () => {
  

  return (
    <View style={styles.container}>
      <Map/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;








// /*ORIGINAL VERSION AS OF 30TH MAY 2024 2234hrs*/
// // App.js

// /*VERSION 2, TRYING OUT THE OPENSTREETMAPS API, BUT UNSURE OF HOW TO GET THE DATA AS 
// AS OF 30TH MAY 2024, 2301hrs*/

// // import MapView, { Marker } from 'react-native-maps';
// // import Geolocation from 'react-native-geolocation-service';
// // import { useEffect } from 'react';
// // import axios from 'axios';

// // const App = () => {
// //   const [region, setRegion] = useState(null);
// //   const [restaurants, setRestaurants] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');

// //   useEffect(() => {
// //     const requestLocationPermission = async () => {
// //       if (Platform.OS === 'android') {
// //         const granted = await PermissionsAndroid.request(
// //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// //         );
// //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
// //           getCurrentLocation();
// //         }
// //       } else {
// //         getCurrentLocation();
// //       }
// //     };

// //     requestLocationPermission();
// //   }, []);

// //   const getCurrentLocation = () => {
// //     Geolocation.getCurrentPosition(
// //       (position) => {
// //         setRegion({
// //           latitude: position.coords.latitude,
// //           longitude: position.coords.longitude,
// //           latitudeDelta: 0.01,
// //           longitudeDelta: 0.01,
// //         });
// //       },
// //       (error) => {
// //         console.log(error);
// //       },
// //       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
// //     );
// //   };

// //   const findRestaurants = async () => {
// //     if (!region) return;
// //     const { latitude, longitude } = region;
// //     const overpassApiUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=restaurant](around:1500,${latitude},${longitude});out;`;
// //     const response = await axios.get(overpassApiUrl);
// //     setRestaurants(response.data.elements);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {region && (
// //         <MapView
// //           style={styles.map}
// //           region={region}
// //           showsUserLocation={true}
// //         >
// //           {restaurants.map((restaurant) => (
// //             <Marker
// //               key={restaurant.id}
// //               coordinate={{
// //                 latitude: restaurant.lat,
// //                 longitude: restaurant.lon,
// //               }}
// //               title={restaurant.tags.name || 'Unnamed Restaurant'}
// //               description={restaurant.tags.cuisine || 'Cuisine not specified'}
// //             />
// //           ))}
// //         </MapView>
// //       )}
// //       <View style={styles.searchContainer}>
// //         <TextInput
// //           label="Search for food"
// //           value={searchTerm}
// //           onChangeText={setSearchTerm}
// //           style={styles.input}
// //         />
// //         <Button mode="contained" onPress={findRestaurants}>
// //           Find Restaurants
// //         </Button>
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   map: {
// //     flex: 1,
// //   },
// //   searchContainer: {
// //     position: 'absolute',
// //     top: 10,
// //     left: 10,
// //     right: 10,
// //     backgroundColor: 'white',
// //     padding: 10,
// //     borderRadius: 10,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.8,
// //     shadowRadius: 2,
// //     elevation: 5,
// //   },
// //   input: {
// //     marginBottom: 10,
// //   },
// // });

// // export default App;

// // import React, { useEffect, useState, } from 'react';
// // import { View, StyleSheet, Platform, PermissionsAndroid, } from 'react-native';
// // import MapView, { Marker } from 'react-native-maps';
// // import Geolocation from 'react-native-geolocation-service';
// // import { TextInput, Button } from 'react-native-paper';
// // import RNFS from 'react-native-fs';
// // import osmRead from 'osm-read';
// // import { parseString } from 'xml2js';

// // const App = () => {
// //   const [region, setRegion] = useState(null);
// //   const [markers, setMarkers] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');

// //   useEffect(() => {
// //     const requestLocationPermission = async () => {
// //       if (Platform.OS === 'android') {
// //         const granted = await PermissionsAndroid.request(
// //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// //         );
// //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
// //           getCurrentLocation();
// //         }
// //       } else {
// //         getCurrentLocation();
// //       }
// //     };

// //     requestLocationPermission();
// //     loadOSMData();
// //   }, []);

// //   const getCurrentLocation = () => {
// //     Geolocation.getCurrentPosition(
// //       (position) => {
// //         setRegion({
// //           latitude: position.coords.latitude,
// //           longitude: position.coords.longitude,
// //           latitudeDelta: 0.01,
// //           longitudeDelta: 0.01,
// //         });
// //       },
// //       (error) => {
// //         console.log(error);
// //       },
// //       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
// //     );
// //   };

// //   const loadOSMData = async () => {
// //     try {
// //       const path = `${RNFS.DocumentDirectoryPath}./map.osm`; // Ensure the .osm file is placed here
// //       const osmData = await RNFS.readFile(path, 'utf8');
// //       parseString(osmData, (err, result) => {
// //         if (err) {
// //           console.error('Failed to parse OSM file:', err);
// //           return;
// //         }
// //         const nodes = result.osm.node;
// //         const parsedMarkers = nodes.map(node => ({
// //           id: node.$.id,
// //           latitude: parseFloat(node.$.lat),
// //           longitude: parseFloat(node.$.lon),
// //           name: node.tag?.find(tag => tag.$.k === 'name')?.$.v || 'Unnamed',
// //         }));
// //         setMarkers(parsedMarkers);
// //       });
// //     } catch (error) {
// //       console.error('Failed to load OSM data:', error);
// //     }
// //   };

// //   const findRestaurants = () => {
// //     // Implement search functionality based on searchTerm and markers
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {region && (
// //         <MapView
// //           style={styles.map}
// //           region={region}
// //           showsUserLocation={true}
// //         >
// //           {markers.map((marker) => (
// //             <Marker
// //               key={marker.id}
// //               coordinate={{
// //                 latitude: marker.latitude,
// //                 longitude: marker.longitude,
// //               }}
// //               title={marker.name}
// //             />
// //           ))}
// //         </MapView>
// //       )}
// //       <View style={styles.searchContainer}>
// //         <TextInput
// //           label="Search for food"
// //           value={searchTerm}
// //           onChangeText={setSearchTerm}
// //           style={styles.input}
// //         />
// //         <Button mode="contained" onPress={findRestaurants}>
// //           Find Restaurants
// //         </Button>
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   map: {
// //     flex: 1,
// //   },
// //   searchContainer: {
// //     position: 'absolute',
// //     top: 10,
// //     left: 10,
// //     right: 10,
// //     backgroundColor: 'white',
// //     padding: 10,
// //     borderRadius: 10,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.8,
// //     shadowRadius: 2,
// //     elevation: 5,
// //   },
// //   input: {
// //     marginBottom: 10,
// //   },
// // });

// // export default App;

