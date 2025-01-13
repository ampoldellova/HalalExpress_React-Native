import { ActivityIndicator, Alert, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import BackBtn from '../../components/BackBtn'
import { COLORS, SIZES } from '../../constants/theme'
import { RestaurantContext } from '../../context/RestaurantContext'
import baseUrl from '../../../assets/common/baseUrl'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Divider from '../../components/Divider'

const UserRestaurantPage = () => {
    const navigation = useNavigation();
    const router = useRoute();
    const item = router.params;
    const { restaurantObj, setRestaurantObj } = useContext(RestaurantContext)
    const coords = restaurantObj.coords
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        setIsAvailable(item?.isAvailable);
    }, [item?.isAvailable]);

    console.log(isAvailable)
    // Toggle service availability
    const toggleAvailability = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                };
                const response = await axios.patch(`${baseUrl}/api/restaurant/${item._id}`, {}, config);
                setIsAvailable(response.data.isAvailable);
                Alert.alert('Success', response.data.message);
            } else {
                console.log("Authentication token not found");
            }
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Unable to toggle availability.');
        }
    };



    return (
        <View style={{ marginHorizontal: 20, marginTop: 30 }}>
            <BackBtn onPress={() => navigation.goBack()} />
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, width: SIZES.width - 38 }}>
                <Text style={styles.isAvailable}>Service Availability</Text>
                <Switch
                    // style={{ marginLeft: 100 }}
                    value={isAvailable}
                    onValueChange={toggleAvailability}
                    trackColor={{ false: COLORS.gray, true: COLORS.primary }}
                    thumbColor={isAvailable ? COLORS.primary : COLORS.gray}
                />
            </View>
            <Divider />
        </View >
    )
}

export default UserRestaurantPage

const styles = StyleSheet.create({
    imageContainer: {
        position: 'relative',
        marginTop: 10,
    },
    imageUrl: {
        height: SIZES.height / 5.8,
        width: SIZES.width - 38,
        marginTop: 50,
        borderRadius: 15,
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
    isAvailable: {
        fontSize: 16,
        fontFamily: "regular",
        marginTop: 15,
    }
})