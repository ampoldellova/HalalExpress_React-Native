import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import uidata from '../constants/uidata'
import StoreComponent from './StoreComponent'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { RestaurantContext } from '../context/RestaurantContext'
import axios from 'axios'
import baseUrl from '../../assets/common/baseUrl'

const NearbyRestaurants = () => {
    const navigation = useNavigation();
    const [restaurants, setRestaurants] = useState([]);
    const { restaurantObj, setRestaurantObj } = useContext(RestaurantContext);

    const getRestaurants = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/restaurant/list`);
            setRestaurants(response.data);
            // console.log(restaurants)
        } catch (error) {
            console.log("Error fetching restaurants:", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getRestaurants();
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
                    <StoreComponent item={item} onPress={() => { navigation.navigate('restaurant', item), setRestaurantObj(item) }} />
                )} />
        </View>
    )
}

export default NearbyRestaurants

const styles = StyleSheet.create({})