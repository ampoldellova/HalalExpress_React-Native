import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RestaurantContext } from '../../context/RestaurantContext'
import uidata from '../../constants/uidata'
import FoodTile from '../../components/FoodTile'
import CategoryFoodComp from '../../components/CategoryFoodComp'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import baseUrl from '../../../assets/common/baseUrl'

const Menu = () => {
    const navigation = useNavigation();
    const { restaurantObj, setRestaurantObj } = useContext(RestaurantContext)
    // console.log(uidata.foods.title)

    const getRestaurantFood = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            console.log(token)
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                };

                const response = await axios.get(`${baseUrl}/api/restaurant/byId`, config);
                setUser(response.data)
            } else {
                console.log("Authentication token not found");
            }
        } catch (error) {
            console.log("Error fetching profile:", error);
        }
    };

    return (
        <View style={{ marginTop: 5, marginBottom: 50 }}>
            <FlatList
                data={uidata.foods}
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