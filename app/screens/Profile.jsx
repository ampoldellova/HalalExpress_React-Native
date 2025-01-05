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

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const [user, setUser] = useState({});
  const [user, setUser] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const getProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      // console.log(token)
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        };

        const response = await axios.get(`${baseUrl}/api/users/profile`, config);
        setUser(response.data)
        console.log(user?.profile)
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

  // const editProfile = async () => {
  //   <EditProfile />
  // }

  const handleLogout = async () => {
    await AsyncStorage.removeItem("id");
    await AsyncStorage.removeItem("token");
    Alert.alert("Logout", "You have been logged out");
    dispatch(cleanUser());
  };

  // const { user, isProfileLoading, error, refetch } = fetchProfile();
  const profile =
    "https://d326fntlu7tb1e.cloudfront.net/uploads/b5065bb8-4c6b-4eac-a0ce-86ab0f597b1e-vinci_04.jpg";
  const bkImg =
    "https://res.cloudinary.com/dwkmutbz3/image/upload/v1736086255/HalalExpress/rating_bk_ecbwkb.jpg";
  // if (isProfileLoading) {
  //   return <LoadingScreen />;
  // }

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
        {/* <Image
          source={{ uri: bkImg }}
          style={[
            StyleSheet.absoluteFillObject,
            {
              opacity: 0.7,
            },

          ]}
        /> */}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.profile}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              source={{ uri: user?.profile }}
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
                <Image
                  source={{ uri: user?.profile }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 99,
                    borderWidth: 1,
                    borderColor: COLORS.gray2
                  }}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black with 50% opacity
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    // flex: 1,
    // justifyContent: 'space-between',
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,

  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: COLORS.primary,
  },
  textStyle: {
    color: 'white',
    fontFamily: 'medium',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});