import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import RestaurantPage from '../../navigation/RestaurantPage'
import NetworkImage from '../../components/NetworkImage'
import { SIZES, COLORS } from '../../constants/theme'
import { useRoute } from '@react-navigation/native'
import { Ionicons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons"

const Restaurant = ({ navigation }) => {
    const route = useRoute();
    const item = route.params;
    // console.log(item);
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbtn}>
                <Ionicons name='chevron-back-circle' size={30} color={COLORS.primary} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { }} style={styles.sharebtn}>
                <MaterialCommunityIcons name='share-circle' size={30} color={COLORS.primary} />
            </TouchableOpacity>
            
            <NetworkImage
                data={item.imageUrl}
                height={SIZES.height / 3.4}
                width={SIZES.width}
                radius={20}
            />
            <View style={{ height: 200 }}></View>
            <View style={{ height: 400 }}>
                <RestaurantPage />
            </View>
        </View>
    )
}

export default Restaurant

const styles = StyleSheet.create({
    backbtn: {
        marginLeft: 12,
        alignItems: "center",
        zIndex: 999,
        position: 'absolute',
        top: SIZES.xxLarge,
    },
    title: {
        fontSize: 22,
        fontFamily: 'medium',
        color: COLORS.black
    },
    sharebtn: {
        marginRight: 12,
        alignItems: "center",
        zIndex: 999,
        right: 0,
        position: 'absolute',
        top: SIZES.xxLarge,
    },
})