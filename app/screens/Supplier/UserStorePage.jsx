import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const UserStorePage = () => {
    const route = useRoute();
    const item = route.params;
    console.log(item)
    return (
        <View>
            <Text>UserStorePage</Text>
        </View>
    )
}

export default UserStorePage

const styles = StyleSheet.create({})