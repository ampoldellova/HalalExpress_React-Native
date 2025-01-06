import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert, Modal, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
// import fetchProfile from "../hooks/fetchProfile";
import { LoginContext } from "../context/LoginContext";

import { AntDesign } from "@expo/vector-icons";
import baseUrl from "../../assets/common/baseUrl";
import NetworkImage from "../components/NetworkImage";
import ProfileTile from "../components/ProfileTile";
import RegistrationTile from "../components/RegistrationTile";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LoginPage from "./LoginPage";
import { cleanUser } from "../../redux/UserReducer";
import * as ImagePicker from "expo-image-picker"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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
        setImage(response.data.profile.url)
        setName(response.data.name)
        setEmail(response.data.email)
        console.log(response.data)
      } else {
        console.log("Authentication token not found");
      }
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  };

  const setImageUpload = async (image) => {
    const newImageUri = image.startsWith("file://")
      ? image
      : "file:///" + image.split("file:/").join("");
    const formattedImage = {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    };
    console.log(formattedImage);
    return formattedImage;
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

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
    }, [])
  )

  const handleLogout = async () => {
    await AsyncStorage.removeItem("id");
    await AsyncStorage.removeItem("token");
    Alert.alert("Logout", "You have been logged out");
    dispatch(cleanUser());
  };

  return (
    // <ScrollView>
    <View style={{ backgroundColor: COLORS.primary, height: SIZES.height }}>
      <View
        style={{
          backgroundColor: COLORS.offwhite,
          height: SIZES.height - 19,
          borderBottomEndRadius: 30,
          borderBottomStartRadius: 30,
        }}
      >
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.profile}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                height: 45,
                width: 45,
                borderRadius: 99,
              }}
            />
            <View style={{ marginLeft: 10, marginTop: 3 }}>
              <Text style={styles.text}>
                {user === null ? "username" : user?.username}
              </Text>
              <Text style={styles.email}>
                {user === null ? "email" : user?.email}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleLogout}>
            <AntDesign name="logout" size={24} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.modalBackground}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <AntDesign name="close" size={18} color={COLORS.gray2} />
                </Pressable>
                <TouchableOpacity onPress={pickImage}>
                  <Image
                    source={image && image !== ""
                      ? { uri: image } : require("../../assets/images/profile.png")}
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 99,
                      borderWidth: 1,
                      borderColor: COLORS.gray2,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>


        <RegistrationTile
          heading={"Register a restaurant"}
          desc={
            "Join our community and showcase your culinary delights to a wider audience."
          }
        />

        <View
          style={{
            height: 92,
            backgroundColor: COLORS.lightWhite,
            margin: 10,
            borderRadius: 12,
          }}
        >
          <ProfileTile title={"Orders"} icon={"fast-food-outline"} font={1} />
          <ProfileTile title={"Payment History"} icon={"creditcard"} />
        </View>

      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    fontFamily: "medium",
    color: COLORS.black,
  },
  email: {
    marginLeft: 10,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 50,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    height: '60%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    position: 'absolute',
    top: 10,
    right: 10,
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
});