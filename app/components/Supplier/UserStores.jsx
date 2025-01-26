import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import axios from 'axios';
import baseUrl from '../../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserStoreComponent from '../UserStoreComponent';
import Loader from '../Loader/Loader';

const UserStores = ({ user }) => {
    const navigation = useNavigation();
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);

    const getSupplierStoresByOwner = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                };

                const response = await axios(`${baseUrl}/api/supplier/owner/${user?._id}`, config);
                setStores(response.data.data);
                setLoading(false);
            } else {
                console.log("Authentication token not found");
            }
        } catch (err) {
            console.error("Error fetching user supplier stores:", err);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getSupplierStoresByOwner()
        }, [])
    );

    return (
        <View style={{ marginLeft: 12 }}>
            {loading ? (
                <Loader />
            ) : (
                <FlatList
                    data={stores}
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 5, rowGap: 10 }}
                    scrollEnabled
                    renderItem={({ item }) => (
                        <UserStoreComponent item={item} onPress={() => { navigation.navigate('user-supplier-store-page', item) }} />
                    )} />
            )}
        </View>
    )
}

export default UserStores

const styles = StyleSheet.create({})