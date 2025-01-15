import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import ManageFoodCard from '../../components/Vendor/ManageFoodCard'
import { BackBtn } from '../../components'

const ManageFoodPage = () => {
    const route = useRoute();
    const item = route.params;
    const navigation = useNavigation();

    return (
        <View style={{ marginLeft: 12, marginTop: 30 }}>
            <BackBtn onPress={() => navigation.goBack()} />
            <Text style={styles.heading}>Manage Foods</Text>
            <FlatList
                data={item}
                showsHorizontalScrollIndicator={false}
                scrollEnabled
                style={{ marginBottom: 60 }}
                renderItem={({ item }) => (
                    <ManageFoodCard item={item} onPress={() => { navigation.navigate('vendor-food-page', item) }} />
                )} />
        </View>
    )
}

export default ManageFoodPage

const styles = StyleSheet.create({
    heading: {
        fontFamily: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginTop: 10
    }
})