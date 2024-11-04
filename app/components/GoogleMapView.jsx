import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserLocationContext } from '../context/UserLocationContext';
import { COLORS, SIZES } from '../constants/theme';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import PlaceMarker from './PlaceMarker';
import axios from 'axios';

const GoogleMapView = ({ placeList }) => {
    const [directions, setDirections] = useState([]);
    const [coordinates, setCoordinates] = useState([]);
    const { location, setLocation } = useContext(UserLocationContext)

    const [mapRegion, setMapRegion] = useState({
        latitude: 14.50970849,
        longitude: 121.0359409655718,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0221,
    });

    // const handleRegionChangeComplete = (region) => {
    //     // Update map region to the new region
    //     setMapRegion(region);

    //     // Optionally fetch new directions here
    //     fetchDirections(
    //         placeList[0].latitude,
    //         placeList[0].longitude,
    //         region.latitude,
    //         region.longitude
    //     );
    // };

    useEffect(() => {
        if (location) {
            setMapRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            });

            fetchDirections(
                placeList[0].latitude,
                placeList[0].longitude,
                location.coords.latitude,
                location.coords.longitude,
            )
        }
    }, [location, coordinates])


    const fetchDirections = async (startLat, startLng, destinationLat, destinationLng) => {
        try {
            const response = await fetch(`https://api.geoapify.com/v1/routing?waypoints=${startLat},${startLng}|${destinationLat},${destinationLng}&mode=bicycle&apiKey=7540990e27fa4d198afeb6d69d3c048e`);
            const data = await response.json();

            const coordinates = data.features[0].geometry.coordinates.flatMap(segment => segment.map(point => ({
                latitude: point[1],
                longitude: point[0],
            })));

            setCoordinates(coordinates); 
        } catch (error) {
            console.error("Error fetching directions:", error);
        }
    };



    return (
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                region={mapRegion}
            >
                <Marker title='My location' coordinate={mapRegion} />

                {placeList.map(
                    (item, index) => index <= 1 && <PlaceMarker coordinates={item} />
                )}

                <Polyline coordinates={coordinates} strokeColor={COLORS.primary} strokeWidth={5} />
            </MapView>
        </View>
    )
}

export default GoogleMapView

const styles = StyleSheet.create({
    mapContainer: {
        width: SIZES.width,
        height: SIZES.height / 2.25,
        borderColor: COLORS.gray2,
        borderWidth: 1
    },
    map: {
        width: "100%",
        height: "100%",
        borderRadius: 12
    }
})

// const config = {
//     method: 'get',
//     url: `https://api.geoapify.com/v1/routing?waypoints=50.96209827745463%2C4.414458883409225%7C50.429137079078345%2C5.00088081232559&mode=bicycle&apiKey=7540990e27fa4d198afeb6d69d3c048e`,
//     headers: {}
// };

// axios(config)
//     .then(function (response) {
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
// try {
//     const config = {
//         method: 'get',
//         url: `https://api.geoapify.com/v1/routing?waypoints=${startLat},${startLng}|${destinationLat},${destinationLng}&mode=bicycle&apiKey=7540990e27fa4d198afeb6d69d3c048e`,
//         headers: {}
//     }

//     axios(config)
//         .then(function (response) {
//             console.log(response.data.properties);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// } catch (error) {
//     console.error(error);
// }