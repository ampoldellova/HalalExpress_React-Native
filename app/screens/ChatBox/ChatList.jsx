import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES } from '../../constants/theme'
import { Feather, AntDesign } from '@expo/vector-icons';

const ChatList = () => {
    return (
        <SafeAreaView>
            <View style={styles.searchContainer}>

                <View style={styles.searchWrapper}>

                    <TextInput
                        style={styles.input}
                        placeholder='Search...'
                    />
                    
                </View>

                <TouchableOpacity style={styles.searchBtn}>
                    <Feather name='search' size={24} color={COLORS.secondary} />
                </TouchableOpacity>
            </View>
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