import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import StoreComponent from '../StoreComponent'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import baseUrl from '../../../assets/common/baseUrl'
import axios from 'axios'
import UserStoreComponent from './UserStoreComponent'

const UserRestaurants = ({ user }) => {
    const route = useRoute();
    const navigation = useNavigation();
    const [restaurants, setRestaurants] = useState([]);

    const getRestaurantsByOwner = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                };

                const response = await axios.get(`${baseUrl}/api/restaurant/owner/${user?._id}`, config);
                setRestaurants(response.data.data);
                console.log(restaurants)
            } else {
                console.log("Authentication token not found");
            }
        } catch (err) {
            console.error("Error fetching user restaurants:", err);
            setError(err.message || "Failed to fetch restaurants.");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getRestaurantsByOwner()
        }, [])
    );

    return (
        <View style={{ marginLeft: 12 }}>
            <FlatList
                data={restaurants}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 5, rowGap: 10 }}
                scrollEnabled
                renderItem={({ item }) => (
                    <UserStoreComponent item={item} onPress={() => { navigation.navigate('user-restaurant-page', item) }} />
                )} />
        </View>
    )
}

export default UserRestaurants

const styles = StyleSheet.create({})