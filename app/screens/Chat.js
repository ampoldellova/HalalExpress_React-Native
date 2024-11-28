import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../../config/firebase';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    const onSignOut = () => {
        signOut(auth).catch(error => console.log(error));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 10
                    }}
                    onPress={onSignOut}
                >
                    <AntDesign name="logout" size={24} color={COLORS.secondary} />
                </TouchableOpacity>
            )
        })
    }, [navigation]);

    useLayoutEffect(() => {
        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, snapshot => {
            console.log('snapshot');
            setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt,
                    text: doc.data().text,
                    user: doc.data().user
                }))
            )
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
                _id: 'guest', // Fallback to 'guest' if auth.currentUser is null
                name: 'Guest User', // Optional name
                avatar: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'
            }}
            messagesContainerStyle={{
                backgroundColor: '#fff'
            }}
        />
    )
}

export default Chat

const styles = StyleSheet.create({})