import { View, Text, FlatList } from 'react-native'
import React from 'react'
import uidata from '../constants/uidata'
import FoodComponent from './FoodComponent'

const NewFoodList = () => {

    const renderItem = ({ item }) => (
        <View>
            <FoodComponent item={item} onPress={() => { }} />
        </View>
    )

    return (
        <View style={{ marginLeft: 12, marginBottom: 10 }}>
            <FlatList data={uidata.restaurants}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 5, rowGap: 10 }}
                scrollEnabled
                renderItem={renderItem} />
        </View>
    )
}

export default NewFoodList