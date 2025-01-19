import { FlatList, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import StoreComponent from './StoreComponent'
import { useNavigation } from '@react-navigation/native'
import { RestaurantContext } from '../context/RestaurantContext'

const NearbyRestaurants = ({ restaurants }) => {
    const navigation = useNavigation();
    const { restaurantObj, setRestaurantObj } = useContext(RestaurantContext);

    return (
        <View style={{ marginLeft: 12 }}>
            <FlatList
                data={restaurants}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 5, rowGap: 10 }}
                scrollEnabled
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <StoreComponent item={item} onPress={() => { navigation.navigate('restaurant', item), setRestaurantObj(item) }} />
                )}
            />
        </View>
    )
}

export default NearbyRestaurants

const styles = StyleSheet.create({})