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
    const [foods, setFoods] = useState([]);
    const item = route.params;

    const fetchRestaurantFoods = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                };
                const response = await axios.patch(`${baseUrl}/api/foods/restaurant/${item._id}`, {}, config);
                setFoods(response.data);
                setLoading(false)
            } else {
                console.log("Authentication token not found");
            }
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Unable to toggle availability.');
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchRestaurantFoods()
        }, [])
    );
    return (
        <View style={{ marginTop: 5, marginBottom: 50 }}>
            <FlatList
                data={foods}
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 5 }}
                scrollEnabled
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={{ alignItems: 'center' }}>
                        <CategoryFoodComp item={item} onPress={() => navigation.navigate('food-nav', item)} />
                    </View>
                )}
            />
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({})