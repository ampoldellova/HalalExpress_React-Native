import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import StoreComponent from './StoreComponent'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

const UserRestaurants = ({ restaurants }) => {
    const navigation = useNavigation();

    return (
        <View style={{ marginLeft: 12 }}>
            <FlatList
                data={restaurants}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 5, rowGap: 10 }}
                scrollEnabled
                renderItem={({ item }) => (
                    <StoreComponent item={item} onPress={() => { navigation.navigate('restaurant', item) }} />
                )} />
        </View>
    )
}

export default UserRestaurants

const styles = StyleSheet.create({})