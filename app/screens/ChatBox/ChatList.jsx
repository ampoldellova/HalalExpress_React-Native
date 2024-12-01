import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES } from '../../constants/theme'
import { Feather, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import baseUrl from '../../../assets/common/baseUrl';
import { router } from 'expo-router';
import ChatUser from './ChatUser';

const ChatList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const navigation = useNavigation()

    const getUsers = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                };

                const response = await axios.get(`${baseUrl}/api/users/list`, config);
                setUsers(response.data);
                setFilteredUsers(response.data);
            } else {
                console.log("Authentication token not found");
            }
        } catch (error) {
            console.log("Error fetching users:", error);
        }
    };

    const handleSearch = (keyword) => {
        const regex = new RegExp(keyword, "i");
        const filteredItems = users.filter((user) => regex.test(user.username) || regex.test(user.email));
        setFilteredUsers(filteredItems);
    };

    useFocusEffect(
        React.useCallback(() => {
            getUsers();
        }, [])
    )

    const renderItem = ({ item }) => (
        <ChatUser
            user={item}
            onPress={() => navigation.navigate('chat-page', item)}
        />
    );

    return (
        <SafeAreaView>
            <View style={styles.searchContainer}>

                <View style={styles.searchWrapper}>

                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => handleSearch(value)}
                        placeholder='Search...'
                    />

                </View>

                <TouchableOpacity style={styles.searchBtn}>
                    <Feather name='search' size={24} color={COLORS.secondary} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredUsers}
                // keyExtractor={(item) => item._id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            {/* <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {filteredUsers.map((user, i) => (
                    // <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => navigation.navigate('chat-page', user)}>
                    //     <ChatUser key={i} user={user} onPress={() => navigation.navigate('chat-page', user)} />
                    // </TouchableOpacity>
                    <FlatList data={user}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: 5, rowGap: 10 }}
                        scrollEnabled
                        renderUsers={renderUsers} />
                ))}
            </ScrollView> */}
        </SafeAreaView>
    )
}

export default ChatList

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        marginHorizontal: SIZES.small,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: SIZES.medium,
        marginVertical: SIZES.medium,
        height: 50,
    },
    searchWrapper: {
        flex: 1,
        // marginRight: SIZES.small,
        borderRadius: SIZES.small,
    },
    input: {
        fontFamily: 'regular',
        width: "100%",
        height: "100%",
        paddingHorizontal: 10,
    },
    searchBtn: {
        width: 50,
        height: "100%",
        borderRadius: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.lightBlue
    },

})