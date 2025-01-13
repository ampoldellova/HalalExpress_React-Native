import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { RestaurantContext } from '../../context/RestaurantContext'
import uidata from '../../constants/uidata'
import FoodTile from '../../components/FoodTile'
import CategoryFoodComp from '../../components/CategoryFoodComp'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import baseUrl from '../../../assets/common/baseUrl'

const Menu = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { restaurantObj, setRestaurantObj } = useContext(RestaurantContext)
    const [restaurantFood, setRestaurantFood] = useState([]);
    const item = route.params;
    console.log(item)
    return (
        <View style={{ marginTop: 5, marginBottom: 50 }}>
            <FlatList
                data={item.foods}
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 5 }}
                scrollEnabled
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={{ left: 12 }}>
                        <CategoryFoodComp item={item} onPress={() => navigation.navigate('food-nav', item)} />
                    </View>
                )}
            />
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({})