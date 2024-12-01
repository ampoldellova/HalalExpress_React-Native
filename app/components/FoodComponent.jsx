import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import NetworkImage from './NetworkImage'
import { COLORS, SIZES } from '../constants/theme'

const FoodComponent = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.wrapper} onPress={onPress}>
            <NetworkImage
                data={item.imageUrl}
                width={SIZES.width - 230}
                height={SIZES.height / 5.8}
                radius={16}
                mode={'cover'}
            />
            <Text style={styles.heading}>{item.title}</Text>
            <Text style={styles.small}>{item.restaurant.title}</Text>
            <Text style={styles.small}>₱ {item.price}</Text>
        </TouchableOpacity>
    )
}

export default FoodComponent

const styles = StyleSheet.create({
    wrapper: {
        marginRight: 15,
        borderColor: COLORS.lightWhite,
        padding: 8,
        borderRadius: 16
    },
    heading: {
        fontSize: 14,
        fontFamily: "regular",
        color: COLORS.black,
        marginTop: 5
    },
    small: {
        fontSize: 12,
        fontFamily: "regular",
        color: COLORS.gray
    }
})