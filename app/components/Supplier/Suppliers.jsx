import { FlatList, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import StoreComponent from '../StoreComponent'
import { useNavigation } from '@react-navigation/native'

const Suppliers = ({ suppliers }) => {
    const navigation = useNavigation();

    return (
        <View style={{ marginLeft: 12 }}>
            <FlatList
                data={suppliers}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 5, rowGap: 10 }}
                scrollEnabled
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <StoreComponent item={item} onPress={() => { }} />
                )}
            />
        </View>
    )
}

export default Suppliers

const styles = StyleSheet.create({})