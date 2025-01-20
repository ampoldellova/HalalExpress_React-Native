import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BackBtn, Button } from '../../components'
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants/theme';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import AddressSuggestions from '../../components/AddressSuggestions';
import * as ImagePicker from 'expo-image-picker';
import RestaurantMapView from '../../components/Vendor/RestaurantMapView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../../../assets/common/baseUrl';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    title: Yup.string().required().label('Restaurant Name'),
    time: Yup.string().required().label('Preperation Time'),
    code: Yup.string().label('Restaurant Code'),
    coords: Yup.object().shape({
        address: Yup.string().required().label('Address'),
        latitude: Yup.string().required().label('Latitude'),
        longitude: Yup.string().required().label('Longitude'),
    })
});

const EditRestaurantPage = () => {
    const router = useRoute();
    const navigation = useNavigation();
    const item = router.params;
    const [logo, setLogo] = useState(item.logoUrl.url);
    const [coverPhoto, setCoverPhoto] = useState(item.imageUrl.url);
    const [address, setAddress] = useState(item.coords.address);
    const [suggestions, setSuggestions] = useState([]);
    const [loader, setLoader] = useState(false);
    const [region, setRegion] = useState({
        latitude: item.coords.latitude,
        longitude: item.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });

    console.log(item.coords.latitude, item.coords.longitude)

    const fetchSuggestions = async (text) => {
        const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&format=json&apiKey=7540990e27fa4d198afeb6d69d3c048e`);
        const data = await response.json();
        setSuggestions(data.results);
    };

    const handleAddressChange = async (text) => {
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

    const pickCoverPhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setCoverPhoto(result.assets[0].uri);
        }
    };

    const pickLogo = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setLogo(result.assets[0].uri);
        }
    };

    const editRestaurant = async (values) => {
        setLoader(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            }

            const formData = new FormData();
            if (coverPhoto.startsWith("file://")) {
                const filename = coverPhoto.split('/').pop();
                const fileType = filename.split('.').pop();
                formData.append('imageUrl', {
                    uri: coverPhoto,
                    name: filename,
                    type: `image/${fileType}`,
                });
            }
            if (logo.startsWith("file://")) {
                const filename = logo.split('/').pop();
                const fileType = filename.split('.').pop();
                formData.append('logoUrl', {
                    uri: logo,
                    name: filename,
                    type: `image/${fileType}`,
                });
            }
            formData.append('title', values.title);
            formData.append('time', values.time);
            formData.append('code', values.code);
            formData.append('coords[address]', values.coords.address);
            formData.append('coords[latitude]', values.coords.latitude);
            formData.append('coords[longitude]', values.coords.longitude);

            await axios.put(`${baseUrl}/api/restaurant/${item._id}`, formData, config);
            Alert.alert('Success ✅', 'Restaurant details updated successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
            setLoader(false);
        } catch (error) {
            console.error(error);
        }
    }

    const renderPage = () => (
        <View style={{ marginTop: 30 }}>
            <View style={{ marginHorizontal: 20 }}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.heading}>Edit Restaurant</Text>
                <Formik
                    initialValues={{
                        title: item.title || '',
                        time: item.time || '',
                        code: item.code || '',
                        coords: {
                            address: item.coords.address || '',
                            latitude: item.coords.latitude || '',
                            longitude: item.coords.longitude || '',
                        },
                    }}
                    onSubmit={(values) => editRestaurant(values)}
                    validationSchema={validationSchema}
                >
                    {({
                        handleChange,
                        touched,
                        handleSubmit,
                        values,
                        errors,
                        isValid,
                        setFieldTouched
                    }) => (
                        < View >
                            <Text style={styles.text}>Restaurant Logo</Text>
                            <View style={styles.imageWrapper}>
                                <Image
                                    source={logo ? { uri: logo } : require('../../../assets/images/profile.png')}
                                    style={styles.logoUrl}
                                />
                                <TouchableOpacity style={styles.uploadLogo} onPress={pickLogo}>
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
                                <TouchableOpacity style={styles.uploadCoverPhoto} onPress={pickCoverPhoto}>
                                    <Entypo
                                        color='white'
                                        name="camera"
                                        size={24}
                                    />
                                    <Text style={styles.editText}>Edit Cover Photo</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.text}>Restaurant Details</Text>
                            <View style={{ marginBottom: 20, borderWidth: 0.5, borderColor: COLORS.primary, borderRadius: 15, padding: 8 }}>
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
                                        value={values.coords.address}
                                        onChangeText={handleChange('coords.address')}
                                        onFocus={() => { setFieldTouched('coords.address', '') }}
                                        onBlur={() => { setFieldTouched('coords.address') }}
                                    />
                                </View>
                                {touched.coords?.address && errors.coords?.address && (
                                    <Text style={styles.errorMessage}>{errors.coords?.address}</Text>
                                )}
                                <AddressSuggestions suggestions={suggestions} onSuggestionPress={handleSuggestionPress} />
                                <RestaurantMapView region={region} />
                            </View>

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
                                        value={values.title}
                                        onChangeText={handleChange('title')}
                                        onFocus={() => { setFieldTouched('title', '') }}
                                        onBlur={() => { setFieldTouched('title') }}
                                    />
                                </View>
                                {touched.title && errors.title && (
                                    <Text style={styles.errorMessage}>{errors.title}</Text>
                                )}
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ marginBottom: 20, width: '61%' }}>
                                    <Text style={styles.label}>Restaurant Code</Text>
                                    <View style={styles.inputWrapper(COLORS.offwhite)}>
                                        <Entypo
                                            style={styles.iconStyle}
                                            color={COLORS.gray}
                                            name="code"
                                            size={20}
                                        />
                                        <TextInput
                                            style={[styles.textInput]}
                                            placeholderTextColor={COLORS.gray}
                                            value={values.code}
                                            onChangeText={handleChange('code')}
                                            onFocus={() => { setFieldTouched('code', '') }}
                                            onBlur={() => { setFieldTouched('code') }}
                                        />
                                    </View>
                                    {touched.code && errors.code && (
                                        <Text style={styles.errorMessage}>{errors.code}</Text>
                                    )}
                                </View>
                                <View style={{ marginBottom: 20, width: '35%' }}>
                                    <Text style={styles.label}>Preperation Time</Text>
                                    <View style={styles.inputWrapper(COLORS.offwhite)}>
                                        <AntDesign
                                            style={styles.iconStyle}
                                            color={COLORS.gray}
                                            name="clockcircle"
                                            size={20}
                                        />
                                        <TextInput
                                            style={styles.textInput}
                                            placeholderTextColor={COLORS.gray}
                                            value={values.time}
                                            onChangeText={handleChange('time')}
                                            onFocus={() => { setFieldTouched('time', '') }}
                                            onBlur={() => { setFieldTouched('time') }}
                                        />
                                    </View>
                                    {touched.time && errors.time && (
                                        <Text style={styles.errorMessage}>{errors.time}</Text>
                                    )}
                                </View>
                            </View>

                            <Button
                                onPress={handleSubmit}
                                isValid={isValid}
                                loader={loader}
                                title="U P D A T E"
                            />
                        </View>
                    )}
                </Formik>

            </View >
        </View >
    );

    return (
        <FlatList
            data={[]}
            ListHeaderComponent={renderPage}
            keyExtractor={(item, index) => index.toString()}
            renderItem={null}
        />
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
    },
    errorMessage: {
        color: COLORS.red,
        fontFamily: "regular",
        marginTop: 5,
        marginLeft: 5,
        fontSize: SIZES.xSmall
    },
})