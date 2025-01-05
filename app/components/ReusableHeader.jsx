import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants/theme";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AssetImage from "./AssetImage";

const ReusableHeader = ({ title, backbtn }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.outerStyle}>
      {backbtn === false ? (
        <View></View>

      ) : (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backbtn}
        >
          <Ionicons
            name='chevron-back-circle'
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      )}


      <Text style={styles.heading}>{title}</Text>
      <Image
        source={{ uri: 'https://res.cloudinary.com/dwkmutbz3/image/upload/v1736011952/HalalExpress/Profile/profile_nsvdbb.png' }}
        style={{
          width: 30,
          height: 30,
          borderRadius: 99
        }}
      />
    </View>
  );
};

export default ReusableHeader;

const styles = StyleSheet.create({
  outerStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerText: {
    marginLeft: 15,
    justifyContent: "center",
  },

  heading: {
    fontFamily: "medium",
    fontSize: SIZES.medium,
    color: COLORS.black,
  },

  location: {
    fontFamily: "regular",
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
  },
});