import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ChatUser = ({ user, onPress }) => {

    return (
        <TouchableOpacity style={styles.profile} onPress={onPress}>
            <Image
                alt=""
                source={{
                    uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                }}
                style={styles.profileAvatar}
            />
            <View>
                <Text style={styles.profileName}>{user.username}</Text>
                <Text style={styles.profileHandle}>{user.email}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatUser

const styles = StyleSheet.create({
    profile: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 5,
        marginHorizontal: 15
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 9999,
        marginRight: 12,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#292929',
    },
    profileHandle: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: '400',
        color: '#858585',
    },
})