import { Alert, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../../../assets/common/baseUrl';
import axios from 'axios';


const ServiceAvailability = ({ item }) => {
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        setIsAvailable(item?.isAvailable);
    }, [item?.isAvailable]);


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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, width: SIZES.width - 38 }}>
            <Text style={styles.isAvailable}>Service Availability</Text>
            <Switch
                value={isAvailable}
                onValueChange={toggleAvailability}
                trackColor={{ false: COLORS.gray, true: COLORS.primary }}
                thumbColor={isAvailable ? COLORS.primary : COLORS.gray}
            />
        </View>
    )
}

export default ServiceAvailability

const styles = StyleSheet.create({
    isAvailable: {
        fontSize: 16,
        fontFamily: "regular",
        marginTop: 15,
    }
})