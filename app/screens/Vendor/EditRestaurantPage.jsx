import { Image, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BackBtn } from '../../components'
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants/theme';
import { Entypo, Ionicons } from '@expo/vector-icons';
import AddressSuggestions from '../../components/AddressSuggestions';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import RestaurantMapView from '../../components/Vendor/RestaurantMapView';

const EditRestaurantPage = () => {
    const router = useRoute();
    const navigation = useNavigation();
    const item = router.params;
    const [logo, setLogo] = useState(item.logoUrl.url);
    const [coverPhoto, setCoverPhoto] = useState(item.imageUrl.url);
    const [address, setAddress] = useState(item.coords.address);
    const [suggestions, setSuggestions] = useState([]);
    const [region, setRegion] = useState({
        latitude: item.coords.latitude,
        longitude: item.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });

    const fetchSuggestions = async (text) => {
        const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&format=json&apiKey=7540990e27fa4d198afeb6d69d3c048e`);
        const data = await response.json();
        setSuggestions(data.results);
    };

    console.log(address);
    const handleAddressChange = (text) => {
        setAddress(text);
        fetchSuggestions(text);
    };

    const handleSuggestionPress = (suggestion) => {
        setAddress(suggestion.formatted);
        setSuggestions([]);
        setRegion({
            latitude: suggestion.lat,
            longitude: suggestion.lon,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        });
        console.log(`Selected address coordinates: Latitude ${suggestion.lat}, Longitude ${suggestion.lon}`);
    };

    return (
        <ScrollView style={{ marginTop: 30 }}>
            <View style={{ marginHorizontal: 20 }}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.heading}>Edit Restaurant</Text>
                <Text style={styles.text}>Restaurant Logo</Text>
                <View style={styles.imageWrapper}>
                    <Image
                        source={logo ? { uri: logo } : require('../../../assets/images/profile.png')}
                        style={styles.logoUrl}
                    />
                    <TouchableOpacity style={styles.uploadLogo}>
                        <Entypo
                            color='white'
                            name="camera"
                            size={24}
                        />
                        <Text style={styles.editText}>Edit logo</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>Cover Photo</Text>
                <View style={styles.imageWrapper}>
                    <Image
                        source={coverPhoto ? { uri: coverPhoto } : require('../../../assets/images/profile.png')}
                        style={styles.imageUrl}
                    />
                    <TouchableOpacity style={styles.uploadCoverPhoto}>
                        <Entypo
                            color='white'
                            name="camera"
                            size={24}
                        />
                        <Text style={styles.editText}>Edit Cover Photo</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>Restaurant Details</Text>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.label}>Restaurant Name</Text>
                    <View style={styles.inputWrapper(COLORS.offwhite)}>
                        <Ionicons
                            style={styles.iconStyle}
                            color={COLORS.gray}
                            name="restaurant"
                            size={20}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor={COLORS.gray}
                            value={item.title}
                        />
                    </View>
                </View>
                <Text style={styles.label}>Address</Text>
                <View style={styles.inputWrapper(COLORS.offwhite)}>
                    <Entypo
                        style={styles.iconStyle}
                        color={COLORS.gray}
                        name="location"
                        size={20}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLORS.gray}
                        value={address}
                        onChangeText={handleAddressChange}
                    />
                </View>
                <AddressSuggestions suggestions={suggestions} onSuggestionPress={handleSuggestionPress} />
                <RestaurantMapView region={region} />
            </View>
        </ScrollView>
    )
}

export default EditRestaurantPage

const styles = StyleSheet.create({
    heading: {
        fontFamily: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginTop: 10
    },
    text: {
        fontFamily: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    textInput: {
        flex: 1,
        fontFamily: 'regular',
        marginTop: 2
    },
    imageWrapper: {
        alignItems: 'center',
        position: 'relative',
        marginVertical: 10
    },
    editText: {
        color: 'white',
        fontFamily: 'regular'
    },
    logoUrl: {
        height: 150,
        width: 150,
        borderRadius: 15,
    },
    uploadLogo: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: 75,
        width: 150,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageUrl: {
        height: SIZES.height / 5,
        width: SIZES.width - 38,
        borderRadius: 15,
    },
    uploadCoverPhoto: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: SIZES.height / 10,
        width: SIZES.width - 38,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontFamily: "regular",
        fontSize: SIZES.xSmall,
        textAlign: 'right',
    },
    inputWrapper: (borderColor) => ({
        borderColor: borderColor,
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        height: 50,
        borderRadius: 12,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: "center",
    }),
    iconStyle: {
        width: 20,
        height: 20,
        marginRight: 5
    }
})