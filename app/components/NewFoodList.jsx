import { View, Text, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'
import FoodComponent from './FoodComponent'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

const NewFoodList = ({ foods }) => {
    const navigation = useNavigation();

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
                initialNumToRender={6}
            />
        </View>
    )
}

export default NewFoodList