import { Image, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BackBtn } from '../../components'
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants/theme';
import { Entypo } from '@expo/vector-icons';

const EditRestaurantPage = () => {
    const router = useRoute();
    const navigation = useNavigation();
    const item = router.params;
    const [logo, setLogo] = useState(item.logoUrl.url);
    const [coverPhoto, setCoverPhoto] = useState(item.imageUrl.url);

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
        fontSize: 24,
        marginTop: 20
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
})