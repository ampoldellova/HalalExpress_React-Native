import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BackBtn } from '../../components'
import { useNavigation } from '@react-navigation/native';

const AddFoodPage = () => {
    const navigation = useNavigation();
    return (
        <View style={{ marginHorizontal: 20, marginTop: 30 }}>
            <BackBtn onPress={() => navigation.goBack()} />
            <Text style={styles.heading}>Add a Food</Text>
        </View>
    )
}

export default AddFoodPage

const styles = StyleSheet.create({
    heading: {
        fontFamily: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginTop: 10
    },
})