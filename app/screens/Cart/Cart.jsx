import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import pages from '../../styles/page.style'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'
import baseUrl from '../../../assets/common/baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Cart = () => {
  const [cart, setCart] = useState([]);

  const getUserCart = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        };

        const response = await axios.get(`${baseUrl}/api/cart`, config);
        setCart(response.data)
        console.log(cart)
      } else {
        console.log("Authentication token not found");
      }
    } catch (error) {
      console.log("Error fetching restaurants:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserCart();
    }, [])
  );

  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>

        </View>
      </View>
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({})