import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BackBtn, Button } from '../../components'
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants/theme';
import { AntDesign, Entypo, Ionicons, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const foodTags = [
    { label: 'Chicken Shawarma', value: '1' },
    { label: 'Beef Kebab', value: '2' },
    { label: 'Lamb Biryani', value: '3' },
    { label: 'Falafel', value: '4' },
    { label: 'Hummus', value: '5' },
    { label: 'Tabbouleh', value: '6' },
    { label: 'Grilled Salmon', value: '7' },
    { label: 'Vegetable Samosa', value: '8' },
    { label: 'Chicken Tikka', value: '9' },
    { label: 'Dates', value: '10' },
    { label: 'Halal Pepperoni Pizza', value: '11' },
    { label: 'Mango Lassi', value: '12' },
    { label: 'Baklava', value: '13' },
    { label: 'Shish Tawook', value: '14' },
    { label: 'Halal Beef Burger', value: '15' },
    { label: 'Dessert', value: '16' },
    { label: 'Sweet', value: '17' },
    { label: 'Cold', value: '18' },
    { label: 'Ice Cream', value: '19' },
    { label: 'Fruity', value: '20' },
    { label: 'Burger', value: '21' },
    { label: 'Savory', value: '22' },
    { label: 'Beef', value: '23' },
    { label: 'Cheesy', value: '24' },
    { label: 'Pizza', value: '25' },
    { label: 'Italian', value: '26' },
    { label: 'Pasta', value: '27' },
    { label: 'Chicken', value: '28' },
    { label: 'Asian', value: '29' },
    { label: 'Rice', value: '30' },
    { label: 'Seafood', value: '31' },
    { label: 'Spanish', value: '32' },
    { label: 'Beverage', value: '33' },
    { label: 'Smoothie', value: '34' },
    { label: 'Curry', value: '35' },
    { label: 'Indian', value: '36' },
    { label: 'Spicy', value: '37' },
    { label: 'Chocolate', value: '38' },
    { label: 'Baked', value: '39' }
];


const AddFoodPage = () => {
    const navigation = useNavigation();
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [selected, setSelected] = useState([]);

    return (
        <ScrollView style={{ marginTop: 30 }}>
            <View style={{ marginHorizontal: 20 }}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.heading}>Add a Food</Text>
                <Text style={styles.text}>Food Picture</Text>
                <View style={{ position: 'relative' }}>
                    <Image source={require('../../../assets/images/rating_bk.jpg')} style={styles.image} />
                    <TouchableOpacity style={styles.imageUpload}>
                        <Entypo name="camera" size={24} color='white' />
                        <Text style={{ color: 'white', fontFamily: 'regular' }}>Upload a photo</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.text}>Food Details</Text>
                <View style={styles.wrapper}>
                    <Text style={styles.label}>Food Name</Text>
                    <View style={styles.inputWrapper(COLORS.primary)}>
                        <Ionicons name="restaurant" size={20} color={COLORS.gray} style={styles.iconStyle} />
                        <TextInput style={{ flex: 1 }} placeholder="Enter food name" placeholderTextColor={COLORS.gray}
                        // onChangeText={handleChange('phone')}
                        // onBlur={handleBlur('phone')}
                        // value={values.phone}
                        // keyboardType="phone-pad"
                        />
                    </View>
                    {/* {touched.phone && errors.phone && (
                    <Text style={styles.errorMessage}>{errors.phone}</Text>
                )} */}
                </View>

                <View style={styles.wrapper}>
                    <Text style={styles.label}>Food Description</Text>
                    <View style={[styles.inputWrapper(COLORS.primary), { height: 100, alignItems: 'flex-start' }]}>
                        <MaterialIcons name="description" size={20} color={COLORS.gray} style={[styles.iconStyle, { marginTop: 15 }]} />
                        <TextInput
                            style={{ flex: 1, marginVertical: 7 }}
                            multiline
                            numberOfLines={5}
                            placeholder="Enter food description"
                            placeholderTextColor={COLORS.gray}
                        // onChangeText={handleChange('phone')}
                        // onBlur={handleBlur('phone')}
                        // value={values.phone}
                        // keyboardType="phone-pad"
                        />
                    </View>

                    {/* {touched.phone && errors.phone && (
                    <Text style={styles.errorMessage}>{errors.phone}</Text>
                )} */}
                </View>

                <View style={styles.wrapper}>
                    <Text style={styles.label}>Select Food Tags</Text>
                    <MultiSelect
                        style={styles.inputWrapper(COLORS.primary)}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        searchPlaceholder='Search...'
                        search
                        data={foodTags}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Food tags"
                        value={selected}
                        onChange={item => {
                            setSelected(item);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.iconStyle}
                                color={COLORS.gray}
                                name="tags"
                                size={20}
                            />
                        )}
                        selectedStyle={styles.selectedStyle}
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={[styles.wrapper, { width: SIZES.width - 160 }]}>
                        <Text style={styles.label}>Additives</Text>
                        <View style={styles.inputWrapper(COLORS.primary)}>
                            <Ionicons name="restaurant" size={20} color={COLORS.gray} style={styles.iconStyle} />
                            <TextInput style={{ flex: 1 }} placeholder="Enter additive name" placeholderTextColor={COLORS.gray}
                            // onChangeText={handleChange('phone')}
                            // onBlur={handleBlur('phone')}
                            // value={values.phone}
                            // keyboardType="phone-pad"
                            />
                        </View>
                        {/* {touched.phone && errors.phone && (
                    <Text style={styles.errorMessage}>{errors.phone}</Text>
                )} */}
                    </View>
                    <View style={[styles.wrapper, { width: SIZES.width - 250 }]}>
                        <Text style={styles.label}>Price</Text>
                        <View style={styles.inputWrapper(COLORS.primary)}>
                            <FontAwesome6 name="peso-sign" size={20} color={COLORS.gray} style={styles.iconStyle} />
                            <TextInput style={{ flex: 1 }} placeholder="Price" placeholderTextColor={COLORS.gray}
                            // onChangeText={handleChange('phone')}
                            // onBlur={handleBlur('phone')}
                            // value={values.phone}
                            // keyboardType="phone-pad"
                            />
                        </View>
                        {/* {touched.phone && errors.phone && (
                    <Text style={styles.errorMessage}>{errors.phone}</Text>
                )} */}
                    </View>
                </View>

                <View style={styles.wrapper}>
                    <Text style={styles.label}>Food Category</Text>
                    <Dropdown
                        style={styles.inputWrapper(COLORS.primary)}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select Food Category'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <MaterialIcons
                                style={styles.iconStyle}
                                color={COLORS.gray}
                                name="category"
                                size={20}
                            />
                        )}
                    />
                    {/* </View> */}

                    {/* {touched.phone && errors.phone && (
                    <Text style={styles.errorMessage}>{errors.phone}</Text>
                )} */}
                </View>

                <View style={styles.wrapper}>
                    <Text style={styles.label}>Food Code</Text>
                    <View style={styles.inputWrapper(COLORS.primary)}>
                        <Entypo name="code" size={20} color={COLORS.gray} style={styles.iconStyle} />
                        <TextInput style={{ flex: 1 }} placeholder="Enter food code" placeholderTextColor={COLORS.gray}
                        // onChangeText={handleChange('phone')}
                        // onBlur={handleBlur('phone')}
                        // value={values.phone}
                        // keyboardType="phone-pad"
                        />
                    </View>
                    {/* {touched.phone && errors.phone && (
                    <Text style={styles.errorMessage}>{errors.phone}</Text>
                )} */}
                </View>

                <View style={styles.wrapper}>
                    <Text style={styles.label}>Food Price</Text>
                    <View style={styles.inputWrapper(COLORS.primary)}>
                        <FontAwesome6 name="peso-sign" size={20} color={COLORS.gray} style={styles.iconStyle} />
                        <TextInput style={{ flex: 1 }} placeholder="Enter food price" placeholderTextColor={COLORS.gray}
                        // onChangeText={handleChange('phone')}
                        // onBlur={handleBlur('phone')}
                        // value={values.phone}
                        // keyboardType="phone-pad"
                        />
                    </View>
                    {/* {touched.phone && errors.phone && (
                    <Text style={styles.errorMessage}>{errors.phone}</Text>
                )} */}
                </View>

                <Button
                    // loader={loader}
                    title={"S U B M I T"}
                // onPress={isValid ? handleSubmit : inValidForm}
                // isValid={isValid}
                />
            </View>
        </ScrollView >
    )
}

export default AddFoodPage

const styles = StyleSheet.create({
    heading: {
        fontFamily: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginTop: 10
    },
    text: {
        fontFamily: 'bold',
        fontSize: 24,
        marginTop: 20
    },
    image: {
        height: 150,
        width: SIZES.width - 38,
        borderRadius: 15
    },
    imageUpload: {
        position: 'absolute',
        bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: 75,
        width: SIZES.width - 38,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper: {
        marginBottom: 20,
    },
    label: {
        fontFamily: "regular",
        fontSize: SIZES.xSmall,
        marginBottom: 5,
        marginEnd: 5,
    },
    inputWrapper: (borderColor) => ({
        borderColor: borderColor,
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        height: 50,
        borderRadius: 12,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: "center"

    }),
    errorMessage: {
        color: COLORS.red,
        fontFamily: "regular",
        marginTop: 5,
        marginLeft: 5,
        fontSize: SIZES.xSmall
    },

    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 14,
        color: COLORS.gray,
        marginLeft: 5
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
        marginRight: 5
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 14,
    },
    selectedStyle: {
        borderRadius: 12,
        borderColor: COLORS.primary,
        borderWidth: 1
    }
})