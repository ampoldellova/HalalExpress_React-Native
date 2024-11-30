import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();
    const [user, setUser] = useState({});

    // const onSignOut = () => {
    //     signOut(auth).catch(error => console.log(error));
    // };
    const getProfile = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            console.log(token)
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                };

                const response = await axios.get(`${baseUrl}/api/users/profile`, config);
                setUser(response.data)
                // console.log(response.data)

                // setUser(response.data);
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

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => (
    //             <TouchableOpacity
    //                 style={{
    //                     marginRight: 10
    //                 }}
    //                 onPress={onSignOut}
    //             >
    //                 <AntDesign name="logout" size={24} color={COLORS.secondary} />
    //             </TouchableOpacity>
    //         )
    //     })
    // }, [navigation]);

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

export default Chat

const styles = StyleSheet.create({})