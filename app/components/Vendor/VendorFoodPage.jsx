import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import BackBtn from '../BackBtn';
import { COLORS, SIZES } from '../../constants/theme';

const VendorFoodPage = () => {
    const route = useRoute();
    const item = route.params
    const navigation = useNavigation();

    return (
        <View style={{ marginLeft: 12, marginTop: 30 }}>
            <BackBtn onPress={() => navigation.goBack()} />
            <Text style={styles.heading}>Food Details</Text>
            <Image
                source={{ uri: item.imageUrl.url }}
                style={styles.imageUrl}
            />
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
            <Text style={styles.small}>{item.description}</Text>
        </View>
    )
}

export default VendorFoodPage

const styles = StyleSheet.create({
    heading: {
        fontFamily: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginTop: 10
    },
    imageUrl: {
        height: SIZES.height / 5.8,
        width: SIZES.width - 24,
        borderRadius: 15,
        marginTop: 10
    },
    title: {
        fontFamily: 'medium',
        fontSize: 22,
        marginTop: 10
    },
    small: {
        fontSize: 13,
        fontFamily: 'regular',
        color: COLORS.gray,
        textAlign: "left",
    },
})