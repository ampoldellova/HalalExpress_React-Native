import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import { COLORS } from '../../constants/theme'

const RestaurantMapView = ({ region }) => {
    return (
        <View style={{ borderWidth: 1, marginTop: 10, borderColor: COLORS.gray2, marginBottom: 20 }}>
            <MapView
                style={{ height: 200 }}
                region={region}
            >
                <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
            </MapView>
        </View>
    )
}

export default RestaurantMapView

const styles = StyleSheet.create({})