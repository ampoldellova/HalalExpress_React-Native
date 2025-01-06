import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { COLORS, SIZES } from '../constants/theme'
import NetworkImage from './NetworkImage'
import { RatingInput } from 'react-native-stock-star-rating'

const StoreComponent = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.wrapper} onPress={onPress}>
            <Image
                source={{ uri: item.imageUrl.url }}
                style={{
                    width: SIZES.width - 80,
                    height: SIZES.height / 5.8,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: COLORS.gray2
                }}
            />
            <Text style={styles.heading}>{item.title}</Text>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <Text style={styles.small}>Delivery under:</Text>
                <Text style={styles.small}>{item.time}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <RatingInput
                    rating={item.rating}
                    size={14}
                    maxStars={5}
                    setRating={item.rating}
                    bordered={false}
                    color={COLORS.primary}
                />
                <Text style={styles.small}>{item.ratingCount} + ratings</Text>
            </View>
        </TouchableOpacity>
    )
}

export default StoreComponent

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