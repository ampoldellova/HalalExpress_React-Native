import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'
import { COLORS } from '../constants/theme'

const PlaceMarker = ({ coordinates }) => {
    return (
        <Marker
            style={{ height: 30, width: 30 }}
            title={coordinates.title}
            coordinate={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.01,
                // pinColor:COLORS.primary

            }}
            icon={require('../../assets/images/restaurant.png')}
        // style={{ height: 3, width: 3 }}
        />
    )
}

export default PlaceMarker

const styles = StyleSheet.create({
    customMarker: {
        height: 'auto',
        width: 'auto'
    },
    markerText: {
        fontSize: 30,
    },
})