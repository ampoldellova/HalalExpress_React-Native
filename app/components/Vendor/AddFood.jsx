import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS } from '../../constants/theme';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const AddFood = ({ restaurantId }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }} onPress={() => navigation.navigate('add-food-page', restaurantId)}>
            <AntDesign name="pluscircle" size={20} color={COLORS.gray} style={styles.icon} />
            <Text style={styles.text}>Add a food</Text>
            <Entypo name="chevron-thin-right" size={20} color={COLORS.gray} style={styles.icon} />
        </TouchableOpacity>
    )
}

export default AddFood

const styles = StyleSheet.create({
    icon: {
        marginTop: 15
    },
    text: {
        fontSize: 16,
        fontFamily: "regular",
        marginTop: 15,
        left: -88
    }
})