import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import * as Location from 'expo-location';
import BottomTab from './app/navigation/BottomTab';
import { UserLocationContext } from './app/context/UserLocationContext';
import { UserReversedGeoCode } from './app/context/UserReversedGeoCode';
import FoodNavigator from './app/navigation/FoodNavigator';
import RestaurantPage from './app/navigation/RestaurantPage';
import Restaurant from './app/screens/Restaurant/Restaurant';
import AddRating from './app/screens/AddRating';
import { RestaurantContext } from './app/context/RestaurantContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginContext } from './app/context/LoginContext';
import { CartCountContext } from './app/context/CartCountContext';
import { Provider } from 'react-redux';
import store from './redux/store';
import ChatList from './app/screens/ChatBox/ChatList';
import ChatRoom from './app/screens/ChatBox/ChatRoom';
import EditProfile from './app/screens/User/EditProfile';
import LoginPage from './app/screens/User/LoginPage';
import SignUp from './app/screens/User/SignUp';
import UserRestaurantPage from './app/screens/Vendor/UserRestaurantPage';
import ManageFoodPage from './app/screens/Vendor/ManageFoodPage';
import VendorFoodPage from './app/screens/Vendor/VendorFoodPage';
import AddFoodPage from './app/screens/Vendor/AddFoodPage';
import EditRestaurantPage from './app/screens/Vendor/EditRestaurantPage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [login, setLogin] = useState(null)
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [restaurantObj, setRestaurantObj] = useState(null);
  const [error, setErrorMsg] = useState(null);

  const defaultAddresss = { "city": "Shanghai", "country": "China", "district": "Pudong", "isoCountryCode": "CN", "name": "33 East Nanjing Rd", "postalCode": "94108", "region": "SH", "street": "Stockton St", "streetNumber": "1", "subregion": "San Francisco County", "timezone": "America/Los_Angeles" }
  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    light: require('./assets/fonts/Poppins-Light.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    extrabold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
    semibold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    (async () => {
      setAddress(defaultAddresss)

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location as denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      loginStatus();
    })();
  }, [])

  if (!fontsLoaded) {
    // Return a loading indicator or splash screen while fonts are loading or app is initializing
    return;
  }

  const loginStatus = async () => {
    const userToken = await AsyncStorage.getItem('token')
    if (userToken !== null) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  };

  return (
    <Provider store={store}>
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <UserReversedGeoCode.Provider value={{ address, setAddress }}>
          <RestaurantContext.Provider value={{ restaurantObj, setRestaurantObj }}>
            <LoginContext.Provider value={{ login, setLogin }}>
              <CartCountContext.Provider value={{ cartCount, setCartCount }}>
                <NavigationContainer>
                  <Stack.Navigator>
                    <Stack.Screen
                      name='bottom-navigation'
                      component={BottomTab}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name='food-nav'
                      component={FoodNavigator}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name='restaurant-page'
                      component={RestaurantPage}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name='restaurant'
                      component={Restaurant}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name='login'
                      component={LoginPage}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name='signUp'
                      component={SignUp}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name='rating'
                      component={AddRating}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name='chat-list'
                      component={ChatList}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name='chat-page'
                      component={ChatRoom}
                      options={{ headerTitle: "" }}
                    />
                    <Stack.Screen
                      name='edit-profile-page'
                      component={EditProfile}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name='user-restaurant-page'
                      component={UserRestaurantPage}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name='manage-food-page'
                      component={ManageFoodPage}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name='vendor-food-page'
                      component={VendorFoodPage}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name='add-food-page'
                      component={AddFoodPage}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name='edit-restaurant-page'
                      component={EditRestaurantPage}
                      options={{ headerShown: false }}
                    />
                  </Stack.Navigator>
                </NavigationContainer>
              </CartCountContext.Provider>
            </LoginContext.Provider>
          </RestaurantContext.Provider>
        </UserReversedGeoCode.Provider>
      </UserLocationContext.Provider>
    </Provider>
  );
}
