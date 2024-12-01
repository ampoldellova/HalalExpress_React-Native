import { View, Text, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'
import uidata from '../constants/uidata'
import FoodComponent from './FoodComponent'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import baseUrl from '../../assets/common/baseUrl'
import axios from 'axios'
import { FoodContext } from '../context/FoodContext'
import StoreComponent from './StoreComponent'

const NewFoodList = () => {
    const navigation = useNavigation();
    const [foods, setFoods] = useState([]);
    // const renderItem = ({ item }) => (
    //     <FoodComponent item={item} onPress={() => navigation.navigate('food-nav', item)} />
    // )

    const getFoods = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/foods/list`);
            setFoods(response.data);
            // console.log(response.data)
        } catch (error) {
            console.log("Error fetching foods:", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getFoods();
        }, [])
    );

    return (
        <View style={{ marginLeft: 12, marginBottom: 10 }}>
            <FlatList
                data={foods}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 5, rowGap: 10 }}
                scrollEnabled
                renderItem={({ item }) => (
                    <FoodComponent item={item} onPress={() => navigation.navigate('food-nav', item)} />
                )}
            />
        </View>
    )
}

export default NewFoodList