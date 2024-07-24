import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { GOOGLE_API_KEY } from './environment';

const ReviewDetails = ({ route }) => {
    const { placeId, placeName } = route.params;
    const [reviews, setReviews] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filteredReviews, setFilteredReviews] = useState([]);

    useEffect(() => {
        const getPlaceDetails = async () => {
            const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${GOOGLE_API_KEY}`;

            try {
                const response = await fetch(url);
                const json = await response.json();
                setReviews(json.result.reviews.slice(0, 10)); // Limit to 3 reviews
                setFilteredReviews(json.result.reviews.slice(0, 10));
            } catch (error) {
                console.error(error);
            }
        };

        getPlaceDetails();
    }, [placeId]);

    useEffect(() => {
        if (searchKeyword.trim() === "") {
            setFilteredReviews(reviews);
        } else {
            setFilteredReviews(
                reviews.filter(review =>
                    review.text.toLowerCase().includes(searchKeyword.toLowerCase())
                )
            );
        }
    }, [searchKeyword, reviews]);

    const renderReviewItem = ({ item }) => (
        <View style={styles.reviewItem}>
            <Text style={styles.reviewAuthor}>{item.author_name}</Text>
            <Text style={styles.reviewText}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{placeName}</Text>
            <TextInput
                value={searchKeyword}
                style={styles.searchField}
                placeholder="Search reviews"
                onChangeText={setSearchKeyword}
            />
            <FlatList
                data={filteredReviews}
                keyExtractor={(item, index) => `${item.author_name}-${index}`}
                renderItem={renderReviewItem}
                style={styles.reviewsList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchField: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        color: 'black',
        padding: 10,
        marginBottom: 10,
    },
    reviewsList: {
        flex: 1,
    },
    reviewItem: {
        backgroundColor: 'white',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    reviewAuthor: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    reviewText: {
        fontSize: 14,
        color: 'grey',
    },
});

export default ReviewDetails;
