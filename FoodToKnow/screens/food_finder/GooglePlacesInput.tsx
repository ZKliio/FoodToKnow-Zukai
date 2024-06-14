import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from './environment';
import { SafeAreaView } from 'react-native-safe-area-context';
const GooglePlacesInput = () => {
  return (
    <SafeAreaView>
    <GooglePlacesAutocomplete
      // fetchDetails={true}
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: GOOGLE_API_KEY,
        language: 'en',
      }}
      
    />
    </SafeAreaView>
  );
};

export default GooglePlacesInput;