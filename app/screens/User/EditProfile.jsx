import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"

const EditProfile = ({ navigation, route }) => {
    const { user } = route.params;
    const [image, setImage] = useState(user.profile.url);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbtn}>
                <Ionicons name='chevron-back-circle' size={30} color={COLORS.primary} />
            </TouchableOpacity>
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={{ uri: image }}
                        style={{
                            height: 150,
                            width: 150,
                            borderRadius: 99,
                            borderWidth: 1,
                            borderColor: COLORS.gray2
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backbtn: {
        marginLeft: 12,
        alignItems: "center",
        zIndex: 999,
        position: 'absolute',
        top: SIZES.xxLarge,
    },
    wrapper: {
        flex: 1, // Makes this View take up the remaining height
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center', // Centers content horizontally
    }
})