import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
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
    "https://d326fntlu7tb1e.cloudfront.net/uploads/ab6356de-429c-45a1-b403-d16f7c20a0bc-bkImg-min.png";
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
        <Image
          source={{ uri: bkImg }}
          style={[
            StyleSheet.absoluteFillObject,
            {
              opacity: 0.7,
            },

          ]}
        />
        <View style={styles.profile}>
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

        </View>

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
          {/* <ProfileTile title={"Places"} icon={"heart"} font={2} /> */}
          <ProfileTile title={"Payment History"} icon={"creditcard"} />
        </View>

        {/* <View
            style={{
              height: 140,
              backgroundColor: COLORS.lightWhite,
              margin: 10,
              borderRadius: 12,
            }}
          >
            <ProfileTile title={"Coupons"} icon={"tago"} />
            <ProfileTile title={"My Store"} icon={"bag"} font={2} />
            <ProfileTile title={"History"} icon={"globe-outline"} font={1} />
          </View> */}

      </View>
    </View>
    // </ScrollView>
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
});