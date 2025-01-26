import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import IngredientComponent from './IngredientComponent';

const Ingredients = ({ ingredients }) => {
    const navigation = useNavigation();

    return (
        <View style={{ marginLeft: 12, marginBottom: 10 }}>
            <FlatList
                data={ingredients}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 5, rowGap: 10 }}
                scrollEnabled
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <IngredientComponent item={item} onPress={() => navigation.navigate('ingredient-nav', item)} />
                )}
            />
        </View>
    )
}

export default Ingredients

const styles = StyleSheet.create({})