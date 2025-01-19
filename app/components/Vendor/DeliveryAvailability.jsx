import { StyleSheet, Switch, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import { MaterialIcons } from '@expo/vector-icons';

const DeliveryAvailability = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: SIZES.width - 38 }}>
            <View style={{ flexDirection: 'column' }}>
                <MaterialIcons name="delivery-dining" size={20} color={COLORS.gray} style={styles.icon} />
            </View>
            <Text style={styles.isAvailable}>Delivery Availability</Text>
            <Switch
            // value={isAvailable}
            // onValueChange={toggleAvailability}
            // trackColor={{ false: COLORS.red, true: COLORS.primary }}
            // thumbColor={isAvailable ? COLORS.primary : COLORS.red}
            />
        </View>
    )
}

export default DeliveryAvailability

const styles = StyleSheet.create({
    icon: {
        marginTop: 15
    },
    isAvailable: {
        fontSize: 16,
        fontFamily: "regular",
        marginTop: 15,
        left: -50
    }
})