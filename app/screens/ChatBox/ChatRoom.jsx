import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../../../config/firebase';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../../../assets/common/baseUrl';
import { StatusBar } from 'expo-status-bar';
import MessageList from './MessageList';
import Feather from '@expo/vector-icons/Feather';

const ChatRoom = ({ route }) => {
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();
    const [user, setUser] = useState({});
    const receiver = route.params;
    // console.log(receiver)

    const getProfile = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                };

                const response = await axios.get(`${baseUrl}/api/users/profile`, config);
                setUser(response.data)
            } else {
                console.log("Authentication token not found");
            }
        } catch (error) {
            console.log("Error fetching profile:", error);
        }
    };


    useFocusEffect(
        React.useCallback(() => {
            getProfile();
        }, [])
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.wrapper}>
                    <Image
                        source={{
                            uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                        }}
                        style={styles.receiverAvatar}
                    />
                    <View>
                        <Text style={styles.receiverName}>{receiver.username}</Text>
                        <Text style={styles.receiverEmail}>{receiver.email}</Text>
                    </View>
                </View>
            )
        })
    })

    useLayoutEffect(() => {
        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, snapshot => {
            setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt?.toDate() || new Date(),
                    text: doc.data().text,
                    user: doc.data().user,
                }))
            );
        });

        return unsubscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(database, 'chats'), {
            _id,
            createdAt,
            text,
            user
        });
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: user._id,
                name: user.username,
                avatar: user.profile
            }}
            messagesContainerStyle={{
                backgroundColor: '#fff'
            }}
        />
    )
}

export default ChatRoom

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: '-20'
    },
    receiverAvatar: {
        width: 40,
        height: 40,
        borderRadius: 9999,
        marginRight: 12,
    },
    receiverName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#292929',
    },
    receiverEmail: {
        fontSize: 16,
        fontWeight: '400',
        color: '#858585',
    },
    
})