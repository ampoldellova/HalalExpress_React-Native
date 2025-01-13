import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const UserRestaurantPage = () => {
    const router = useRoute()
    const item = router.params
    console.log(item)
    return (
        <View>
            <Text>UserRestaurant</Text>
        </View>
    )
}

export default UserRestaurantPage

const styles = StyleSheet.create({})