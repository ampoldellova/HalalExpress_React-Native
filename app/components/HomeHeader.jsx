import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AssetImage from './AssetImage'
import { UserReversedGeoCode } from '../context/UserReversedGeoCode'
import { COLORS, SIZES } from '../constants/theme'
import { UserLocationContext } from '../context/UserLocationContext'
import * as Location from 'expo-location';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import baseUrl from '../../assets/common/baseUrl'
import axios from 'axios'

const HomeHeader = () => {
    const [time, setTime] = useState(null);
    const { address, setAddress } = useContext(UserReversedGeoCode);
    const { location, setLocation } = useContext(UserLocationContext);
    const navigation = useNavigation();
    const [user, setUser] = useState("");

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const token = await AsyncStorage.getItem("token");
    //         setUser(token)
    //     }
    //     fetchUser();
    // }, []);
    // console.log(user)

    const getProfile = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            console.log(token)
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                };

                const response = await axios.get(`${baseUrl}/api/users/profile`, config);
                setUser(response.data)
                // console.log(response.data)

                // setUser(response.data);
            } else {
                console.log("Authentication token not found");
            }
        } catch (error) {
            console.log("Error fetching profile:", error);
        }
    };


    useFocusEffect(
        React.useCallback(() => {
            getProfile();
        }, [])
    )


    useEffect(() => {
        if (location !== null) {
            reverseGeoCode(location.coords.latitude, location.coords.longitude)
        }
    }, [location]);

    const reverseGeoCode = async (latitude, longitude) => {
        const reverseGeoCodedAddress = await Location.reverseGeocodeAsync({
            longitude: longitude,
            latitude: latitude
        });
        setAddress(reverseGeoCodedAddress[0]);
        const greetings = getTimeOfDay();
        setTime(greetings)
    };

    // const getTimeOfDay = () => {
    //     const now = new Date();
    //     const hour = now.getHours();

    //     if (hour >= 0 && hour < 12) {
    //         return "☀️ "
    //     } else if (hour >= 12 < 17) {
    //         return "🌤️ "
    //     } else {
    //         return "🌙 "
    //     }
    // }

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <View style={styles.outerStyle}>
                <AssetImage data={user === null ? require('../../assets/images/profile.png') : user?.profile}
                    width={50}
                    height={50}
                    mode={'cover'}
                    radius={99}
                />
                <View style={styles.headerStyle}>
                    <Text style={styles.heading}>Delivering to:</Text>
                    <Text style={styles.location}>{`${address?.city} ${address?.name}`}</Text>
                </View>
            </View>

            {user && (
                <View style={styles.message}>
                    <TouchableOpacity onPress={() => navigation.navigate('chat-list')}>
                        <MaterialCommunityIcons name='message-reply-text' size={24} color={COLORS.secondary} />
                    </TouchableOpacity>
                </View>
            )}


            {/* <Text style={{ fontSize: 36 }}>{time}</Text> */}
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    outerStyle: {
        marginBottom: 10,
        marginHorizontal: 20,
        flexDirection: 'row'
    },
    headerStyle: {
        marginLeft: 15,
        justifyContent: "center"
    },
    heading: {
        fontFamily: 'medium',
        fontSize: SIZES.medium,
        color: COLORS.secondary
    },
    location: {
        fontFamily: 'regular',
        fontSize: SIZES.small + 2,
        color: COLORS.gray
    },
    message: {
        marginTop: 15,
        marginRight: 15
    }
})