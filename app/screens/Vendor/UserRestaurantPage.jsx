import { ActivityIndicator, Alert, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import BackBtn from '../../components/BackBtn'
import { COLORS, SIZES } from '../../constants/theme'
import { RestaurantContext } from '../../context/RestaurantContext'
import ServiceAvailability from '../../components/Vendor/ServiceAvailability'
import ManageFood from '../../components/Vendor/ManageFood'
import Feather from '@expo/vector-icons/Feather';
import AddFood from '../../components/Vendor/AddFood'
import EditRestaurantButton from '../../components/Vendor/EditRestaurantButton'

const UserRestaurantPage = () => {
    const navigation = useNavigation();
    const router = useRoute();
    const item = router.params;
    const { restaurantObj, setRestaurantObj } = useContext(RestaurantContext)
    const coords = restaurantObj.coords

    return (
        <View style={{ marginHorizontal: 20, marginTop: 30 }}>
            <BackBtn onPress={() => navigation.goBack()} />
            <Text style={styles.heading}>Restaurant Page</Text>
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: item.imageUrl.url
                    }}
                    style={styles.imageUrl}
                />
                <Image
                    source={{
                        uri: item.logoUrl.url
                    }}
                    style={styles.logoUrl}
                />
                <View style={styles.wrapper}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.address}>{coords.address}</Text>
                </View>
            </View>
            {/* <TouchableOpacity style={styles.editBtn} onPress={() => { }}>
                <Feather name="edit" size={14} color="white" style={{ marginTop: 1 }} />
                <Text style={styles.editTxt}>Edit Details</Text>
            </TouchableOpacity> */}
            <Text style={styles.options}>Options</Text>
            <ServiceAvailability availability={item.isAvailable} id={item._id} />
            <ManageFood restaurantId={item._id} />
            <AddFood restaurantId={item._id} />
            <EditRestaurantButton />
        </View >
    )
}

export default UserRestaurantPage

const styles = StyleSheet.create({
    heading: {
        fontFamily: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginTop: 10
    },
    imageContainer: {
        position: 'relative',
        marginTop: 10
    },
    imageUrl: {
        height: SIZES.height / 5.8,
        width: SIZES.width - 38,
        borderRadius: 15,
    },
    editBtn: {
        position: 'absolute',
        backgroundColor: COLORS.primary,
        bottom: 260,
        right: 5,
        borderRadius: 10,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editTxt: {
        textAlign: 'center',
        fontFamily: 'medium',
        color: 'white',
        fontSize: 14,
        marginLeft: 5
    },
    logoUrl: {
        position: 'absolute',
        height: 100,
        width: 100,
        borderRadius: 99,
        marginLeft: 10,
        bottom: -10,
        backgroundColor: COLORS.offwhite,
        borderColor: COLORS.offwhite,
        borderWidth: 3,
    },
    wrapper: {
        width: SIZES.width - 38 - 120
    },
    title: {
        fontFamily: 'medium',
        fontSize: 16,
        left: 120,
        marginTop: 5,
    },
    address: {
        fontSize: 13,
        fontFamily: "regular",
        color: COLORS.gray,
        left: 120,
    },
    options: {
        fontFamily: "bold",
        fontSize: 18,
        marginTop: 35
    }
})