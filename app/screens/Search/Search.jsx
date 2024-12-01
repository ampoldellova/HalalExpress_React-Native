import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants/theme";
import { Feather } from '@expo/vector-icons';
import styles from "../search.style";
import LottieView from "lottie-react-native";
import baseUrl from "../../../assets/common/baseUrl";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import SearchedFood from "./SearchedFood";

const Search = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [searchKey, setSearchKey] = useState(""); // Tracks the search text
  const animation = useRef(null);

  const getFoods = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/foods/list`);
      setFoods(response.data);
      setFilteredFoods(response.data);
    } catch (error) {
      console.log("Error fetching foods:", error);
    }
  };

  const handleSearch = (keyword) => {
    setSearchKey(keyword); // Update the search key
    if (keyword.trim() === "") {
      setFilteredFoods([]); // Reset filteredFoods when search is empty
    } else {
      const regex = new RegExp(keyword, "i");
      const filteredItems = foods.filter((food) => regex.test(food.title) || regex.test(food.code));
      setFilteredFoods(filteredItems);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getFoods();
    }, [])
  );

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: COLORS.primary, height: SIZES.height }}>
        <View
          style={{
            backgroundColor: COLORS.offwhite,
            height: SIZES.height - 55,
            borderBottomEndRadius: 30,
            borderBottomStartRadius: 30,
          }}
        >
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.input}
                value={searchKey}
                onChangeText={handleSearch}
                placeholder="What do you want to eat?"
              />
            </View>

            <TouchableOpacity style={styles.searchBtn}>
              <Feather name="search" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>

          {/* Show animation if search bar is empty */}
          {searchKey.trim() === "" ? (
            <View
              style={{
                width: SIZES.width,
                height: SIZES.height / 1.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LottieView
                autoPlay
                ref={animation}
                style={{ width: '100%', height: '100%' }}
                source={require("../../../assets/anime/cook.json")}
              />
            </View>
          ) : filteredFoods.length === 0 ? (
            // Display "No results found" if there are no matches
            <View style={{ justifyContent: "center", alignItems: "center", height: SIZES.height / 1.5 }}>
              <Text style={{ fontSize: 18, color: COLORS.gray }}>No results found</Text>
            </View>
          ) : (
            // Display the searched items
            <ScrollView style={{ paddingBottom: 20 }}>
              {filteredFoods.map((item, i) => (
                <SearchedFood key={i} item={item} />
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
