import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BackBtn } from '../../components'
import { useNavigation } from '@react-navigation/native';

const EditRestaurantPage = () => {
    const navigation = useNavigation();
    return (
        <ScrollView style={{ marginTop: 30 }}>
            <View style={{ marginHorizontal: 20 }}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.heading}>Edit Restaurant</Text>
                
            </View>
        </ScrollView>
    )
}

export default EditRestaurantPage

const styles = StyleSheet.create({
    heading: {
        fontFamily: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginTop: 10
    }
})