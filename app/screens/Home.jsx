import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import pages from '../styles/page.style'
import HomeHeader from "../components/HomeHeader";
import CategoryList from "../components/CategoryList";
import Heading from "../components/Heading";
import NearbyRestaurants from "../components/NearbyRestaurants";
import Divider from "../components/Divider";
import NewFoodList from "../components/NewFoodList";
import HomeCategories from "../components/HomeCategories";
import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import Loader from "../components/Loader/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Suppliers from "../components/Supplier/Suppliers";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsLoaded, setRestaurantsLoaded] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [suppliersLoaded, setSuppliersLoaded] = useState(false);
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [foodsLoaded, setFoodsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

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
      } else {
        console.log("Authentication token not found");
      }
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  };

  const getRestaurants = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/restaurant/list`);
      setRestaurants(response.data);
      setRestaurantsLoaded(true);
    } catch (error) {
      console.log("Error fetching restaurants:", error);
    }
  };

  const getSuppliers = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        };

        const response = await axios.get(`${baseUrl}/api/supplier/list`, config);
        setSuppliers(response.data);
        setSuppliersLoaded(true);
      } else {
        console.log("Authentication token not found");
      }
    } catch (error) {
      console.log("Error fetching suppliers:", error);
    }
  }

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
      console.log(error);
    }
  };


  useEffect(() => {
    if (restaurantsLoaded && foodsLoaded && suppliersLoaded) {
      setLoading(false);
    }
  }, [restaurantsLoaded, foodsLoaded, suppliersLoaded]);


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
      getProfile()

      Promise.all([getRestaurants(), getFoods(), getSuppliers()])
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
            <View>
              <HomeHeader />
              {user.userType === 'Supplier' || user.userType === 'Client' && (
                <View>
                  <CategoryList
                    setSelectedCategory={setSelectedCategory}
                    setSelectedSection={setSelectedSection}
                    setSelectedValue={setSelectedValue}
                  />
                </View>
              )}
              {selectedCategory ? (
                <View>
                  <Heading heading={`Foods in ${selectedValue}`} onPress={() => { }} />
                  <HomeCategories foods={filteredFoods} />
                </View>
              ) : (
                <View>
                  {user.userType === 'Vendor' && (
                    <View>
                      <Heading heading={'Supplier Stores'} onPress={() => { }} />
                      <Suppliers suppliers={suppliers} />
                    </View>
                  )}
                  {user.userType === 'Supplier' || user.userType === 'Client' && (
                    <View>
                      <Heading heading={'Restaurants'} onPress={() => { }} />
                      <NearbyRestaurants restaurants={restaurants} />
                      <Divider />
                      <Heading heading={'Our Food'} onPress={() => { }} />
                      <NewFoodList foods={filteredFoods} />
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;


const styles = StyleSheet.create({

});