import { useNavigation } from '@react-navigation/native'
import { View, FlatList, StyleSheet } from 'react-native'
import CategoryIngredientComp from './CategoryIngredientComp';


const HomeIngredientCategories = ({ ingredients }) => {
    const navigation = useNavigation();

    const renderIngredientCategoryItem = ({ item }) => (
        <CategoryIngredientComp item={item} onPress={() => { }} />
    );

    return (
        <View style={{ marginLeft: 12, marginBottom: 12 }}>
            <FlatList
                data={ingredients}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item._id.toString()}
                style={{ marginTop: 10 }}
                scrollEnabled
                renderItem={renderIngredientCategoryItem}
            />
        </View>
    )
}

export default HomeIngredientCategories

const styles = StyleSheet.create({})