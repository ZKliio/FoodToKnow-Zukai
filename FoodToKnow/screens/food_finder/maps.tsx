import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    KeyboardAvoidingView,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import GooglePlacesSDK from 'react-native-google-places-sdk';
import { GOOGLE_API_KEY } from './environment';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';

// Initialize Google Places SDK
GooglePlacesSDK.initialize(GOOGLE_API_KEY);

const Map = () => {
    const INITIAL_LAT = 1.2789;
    const INITIAL_LONG = 103.8536;
    const RADIUS = 100;
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigation = useNavigation();

    const searchPlaces = async () => {
        if (!searchText.trim().length) return;

        const googleApisURL = "https://maps.googleapis.com/maps/api/place/textsearch/json";
        const input = searchText.trim();
        const location = `${INITIAL_LAT},${INITIAL_LONG}&radius=${RADIUS}}`;
        const url = `${googleApisURL}?query=${input}&location=${location}&key=${GOOGLE_API_KEY}`;

        try {
            const response = await fetch(url);
            const json = await response.json();
            setSearchResults(json.results); // Update state with search results
        } catch (error) {
            console.log(error);
        }
    };

    const initialRegion = {
        latitude: INITIAL_LAT,
        longitude: INITIAL_LONG,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const renderItem = ({ item }) => (
        <View style={styles.resultItem}>
            {item.photos && item.photos.length > 0 && (
                <Image
                    style={styles.resultImage}
                    source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${GOOGLE_API_KEY}` }}
                />
            )}
            <Text style={styles.resultText}>{item.name}</Text>
            <Text style={styles.resultAddress}>{item.formatted_address}</Text>
            <Text style={[styles.resultStatus, { color: item.business_status === "OPERATIONAL" ? 'green' : 'red' }]}>
                {item.business_status === "OPERATIONAL" ? "Open" : "Closed"}
            </Text>
            <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('ReviewDetails', { placeId: item.place_id, placeName: item.name })}
            >
                <Text style={styles.detailsButtonText}>View Reviews</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
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
                        value={searchText}
                        style={styles.searchField}
                        placeholder="Search here"
                        onChangeText={setSearchText}
                    />
                    <TouchableOpacity onPress={searchPlaces} style={styles.searchButton}>
                        <Text style={styles.text}>Search place</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.place_id}
                    renderItem={renderItem}
                    style={styles.resultsList}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: ScreenWidth,
        height: 0.2 * ScreenHeight,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'lightgreen',
    },
    text: {
        color: 'black',
        paddingHorizontal: 10,
    },
    searchField: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        color: 'black',
        padding: 10,
        flex: 1,
    },
    searchButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
    },
    resultsList: {
        flex: 1,
        marginTop: 10,
    },
    resultItem: {
        backgroundColor: 'white',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    resultImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    resultText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultAddress: {
        fontSize: 14,
        color: 'grey',
    },
    resultStatus: {
        fontSize: 14,
    },
    detailsButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    detailsButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default Map;
