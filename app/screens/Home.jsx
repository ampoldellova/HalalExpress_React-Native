import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import pages from './page.style'
import uidata from "../constants/uidata";
import HomeHeader from "../components/HomeHeader";
import CategoryList from "../components/CategoryList";
import ChoicesList from "../components/ChoicesList";
import Heading from "../components/Heading";
import NearbyRestaurants from "../components/NearbyRestaurants";
import Divider from "../components/Divider";
import NewFoodList from "../components/NewFoodList";
import FastestNearYou from "../components/FastestNearYou";
import HomeCategories from "../components/HomeCategories";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import Loader from "../components/Loader/Loader";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsLoaded, setRestaurantsLoaded] = useState(false);
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [foodsLoaded, setFoodsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const getRestaurants = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/restaurant/list`);
      setRestaurants(response.data);
      setRestaurantsLoaded(true);
    } catch (error) {
      console.log("Error fetching restaurants:", error);
    }
  };

  const getFoods = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/foods/list`,
        selectedCategory ? { params: { category: selectedCategory } } : {}
      );
      setFoods(response.data);
      setFilteredFoods(response.data);
      setFoodsLoaded(true);
    } catch (error) {
      console.log("Error fetching foods:", error);
    }
  };


  useEffect(() => {
    if (restaurantsLoaded && foodsLoaded) {
      setLoading(false);
    }
  }, [restaurantsLoaded, foodsLoaded]);


  useEffect(() => {
    if (selectedCategory) {
      const filtered = foods.filter(food => food.category._id === selectedCategory);
      setFilteredFoods(filtered);
    } else {
      setFilteredFoods(foods);
    }
  }, [selectedCategory, foods]);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setRestaurantsLoaded(false);
      setFoodsLoaded(false);

      Promise.all([getRestaurants(), getFoods()])
        .then(() => setLoading(false))
        .catch((err) => console.error(err));
    }, [])
  );


  return (
    <SafeAreaView>
      {loading ? (
        <Loader />
      ) : (
        <View style={pages.viewOne}>
          <View style={pages.viewTwo}>
            <ScrollView>
              <HomeHeader />
              <CategoryList
                setSelectedCategory={setSelectedCategory}
                setSelectedSection={setSelectedSection}
                setSelectedValue={setSelectedValue}
              />
              {selectedCategory ? (
                <View>
                  <Heading heading={`Foods in ${selectedValue}`} onPress={() => { }} />
                  <HomeCategories foods={filteredFoods} />
                </View>
              ) : (
                <View>
                  <Heading heading={'Restaurants'} onPress={() => { }} />
                  <NearbyRestaurants restaurants={restaurants} />
                  <Divider />
                  <Heading heading={'Our Food'} onPress={() => { }} />
                  <NewFoodList foods={filteredFoods} />
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;


const styles = StyleSheet.create({

});