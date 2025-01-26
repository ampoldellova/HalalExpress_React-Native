import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useRoute } from '@react-navigation/native'
import OrderPage from '../screens/OrderPage';
import 'react-native-gesture-handler';
import IngredientPage from '../screens/IngredientPage'

const Stack = createNativeStackNavigator();
const IngredientNavigator = () => {
    const route = useRoute();
    const item = route.params;
    return (
        <Stack.Navigator initialRouteName='ingredient-page'>
            <Stack.Screen
                name='ingredient-page'
                component={IngredientPage}
                options={{ headerShown: false }}
                initialParams={{ item: item }}
            />
            <Stack.Screen
                name='order-page'
                component={OrderPage}
                options={{ headerShown: false, presentation: 'modal' }}
            />
        </Stack.Navigator>
    )
}

export default IngredientNavigator

const styles = StyleSheet.create({})