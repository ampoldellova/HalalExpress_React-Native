import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';
import Entypo from '@expo/vector-icons/Entypo';

const ManageFood = () => {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Ionicons name="fast-food" size={20} color={COLORS.gray} />
            <Text style={styles.text}>Manage Foods</Text>
            <Entypo name="chevron-thin-right" size={20} color={COLORS.gray} />
        </TouchableOpacity>
    )
}

export default ManageFood

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontFamily: "regular",
        // marginLeft: 13
        // marginTop: 15,
        left: -77
    }
})