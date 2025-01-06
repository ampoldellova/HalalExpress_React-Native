import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import { BackBtn, Button } from '../../components'
import * as Yup from "yup";
// import styles from '../login.style'

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Password must be at least 8 character")
        .required("Required"),
    email: Yup.string()
        .email("Provide a valid email address")
        .required("Required"),
    username: Yup.string()
        .min(3, "Provide a valid username")
        .required("Required"),
    phone: Yup.string()
        .matches(
            /^(09\d{9}|639\d{9}|\+639\d{9})$/,
            "Provide a valid Philippine phone number"
        )
        .required("Required"),
});

const EditProfile = ({ navigation, route }) => {
    const { user } = route.params;
    const [obsecureText, setObsecureText] = useState(false);
    const [image, setImage] = useState(user.profile.url);
    const [loader, setLoader] = useState(false);

    const inValidForm = () => {
        Alert.alert("Invalid Form", "Please provide all required fields", [
            {
                text: "Cancel",
                onPress: () => { },
            },
            {
                text: "Continue",
                onPress: () => { },
            },
            { defaultIndex: 1 },
        ]);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={{ marginHorizontal: 20, marginTop: 50 }}>
            <BackBtn onPress={() => navigation.goBack()} />
            <View style={styles.profile}>
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={{ uri: image }}
                        style={{
                            height: 150,
                            width: 150,
                            borderRadius: 99,
                            borderWidth: 1,
                            borderColor: COLORS.gray2
                        }}
                    />
                </TouchableOpacity>
            </View>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    username: "",
                    phone: ""
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => registerUser(values)}
            >
                {({
                    handleChange,
                    handleBlur,
                    touched,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                    setFieldTouched,
                }) => (
                    <View>
                        <View style={styles.wrapper}>
                            <Text style={styles.label}>Username</Text>
                            <View
                                style={styles.inputWrapper(
                                    touched.username ? COLORS.secondary : COLORS.offwhite
                                )}
                            >
                                <MaterialCommunityIcons
                                    name="face-man-profile"
                                    size={20}
                                    color={COLORS.gray}
                                    style={styles.iconStyle}
                                />

                                <TextInput
                                    placeholder="Username"
                                    onFocus={() => {
                                        setFieldTouched("username");
                                    }}
                                    onBlur={() => {
                                        setFieldTouched("username", "");
                                    }}
                                    value={values.username}
                                    onChangeText={handleChange("username")}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={{ flex: 1 }}
                                />
                            </View>
                            {touched.username && errors.username && (
                                <Text style={styles.errorMessage}>{errors.username}</Text>
                            )}
                        </View>

                        <View style={styles.wrapper}>
                            <Text style={styles.label}>Email</Text>
                            <View
                                style={styles.inputWrapper(
                                    touched.email ? COLORS.secondary : COLORS.offwhite
                                )}
                            >
                                <MaterialCommunityIcons
                                    name="email-outline"
                                    size={20}
                                    color={COLORS.gray}
                                    style={styles.iconStyle}
                                />

                                <TextInput
                                    placeholder="Enter email"
                                    onFocus={() => {
                                        setFieldTouched("email");
                                    }}
                                    onBlur={() => {
                                        setFieldTouched("email", "");
                                    }}
                                    value={values.email}
                                    onChangeText={handleChange("email")}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={{ flex: 1 }}
                                />
                            </View>
                            {touched.email && errors.email && (
                                <Text style={styles.errorMessage}>{errors.email}</Text>
                            )}
                        </View>

                        <View style={styles.wrapper}>
                            <Text style={styles.label}>Phone</Text>
                            <View
                                style={styles.inputWrapper(
                                    touched.phone ? COLORS.secondary : COLORS.offwhite
                                )}
                            >
                                <AntDesign
                                    name="phone"
                                    size={20}
                                    color={COLORS.gray}
                                    style={styles.iconStyle}
                                />

                                <TextInput
                                    placeholder="Enter phone number"
                                    onFocus={() => {
                                        setFieldTouched("phone");
                                    }}
                                    onBlur={() => {
                                        setFieldTouched("phone", "");
                                    }}
                                    value={values.phone}
                                    onChangeText={handleChange("phone")}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={{ flex: 1 }}
                                />
                            </View>
                            {touched.phone && errors.phone && (
                                <Text style={styles.errorMessage}>{errors.phone}</Text>
                            )}
                        </View>

                        <View style={styles.wrapper}>
                            <Text style={styles.label}>Password</Text>
                            <View
                                style={styles.inputWrapper(
                                    touched.password ? COLORS.secondary : COLORS.offwhite
                                )}
                            >
                                <MaterialCommunityIcons
                                    name="lock-outline"
                                    size={20}
                                    color={COLORS.gray}
                                    style={styles.iconStyle}
                                />

                                <TextInput
                                    secureTextEntry={obsecureText}
                                    placeholder="Password"
                                    onFocus={() => {
                                        setFieldTouched("password");
                                    }}
                                    onBlur={() => {
                                        setFieldTouched("password", "");
                                    }}
                                    value={values.password}
                                    onChangeText={handleChange("password")}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={{ flex: 1 }}
                                />

                                <TouchableOpacity
                                    onPress={() => {
                                        setObsecureText(!obsecureText);
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name={obsecureText ? "eye-outline" : "eye-off-outline"}
                                        size={18}
                                    />
                                </TouchableOpacity>
                            </View>
                            {touched.password && errors.password && (
                                <Text style={styles.errorMessage}>{errors.password}</Text>
                            )}
                        </View>

                        <Button
                            title={"S I G N U P"}
                            onPress={isValid ? handleSubmit : inValidForm}
                            loader={loader}
                            isValid={isValid}
                        />
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    cover: {
        height: SIZES.height / 2.4,
        width: SIZES.width,
        marginBottom: SIZES.xxLarge

    },

    titleLogin: {
        marginVertical: 20,
        marginHorizontal: 60,
        fontFamily: "bold",
        fontSize: 35,
        color: COLORS.primary,
    },
    profile: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    wrapper: {
        marginBottom: 20,
    },
    label: {
        fontFamily: "regular",
        fontSize: SIZES.xSmall,
        marginBottom: 5,
        marginEnd: 5,
        textAlign: "right"
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
    iconStyle: {
        marginRight: 10
    },
    errorMessage: {
        color: COLORS.red,
        fontFamily: "regular",
        marginTop: 5,
        marginLeft: 5,
        fontSize: SIZES.xSmall
    },
})