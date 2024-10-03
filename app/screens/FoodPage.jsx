import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { CartCountContext } from '../context/CartCountContext';
import { COLORS, SIZES } from "../constants/theme";
import { Ionicons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import Counter from '../components/Counter';

const FoodPage = ({ route, navigation }) => {
  const item = route.params.item;
  const [isChecked, setIsChecked] = useState(false);
  const [additives, setAdditives] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [restaurant, setRestaurant] = useState(1);
  const [count, setCount] = useState(1);
  const [preference, setPreference] = useState('');
  // const { cartCount, setCartCount } = useContext(CartCountContext);

  return (
    <View style={{ backgroundColor: COLORS.lightWhite, height: SIZES.height }}>
      <View>
        <Image source={{ uri: item.imageUrl[0] }}
          style={{
            width: SIZES.width,
            height: SIZES.height / 4,
            borderBottomRightRadius: 40
          }} />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbtn}>
          <Ionicons name='chevron-back-circle' size={30} color={COLORS.primary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} style={styles.sharebtn}>
          <MaterialCommunityIcons name='share-circle' size={30} color={COLORS.primary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} style={{ position: 'absolute', bottom: 20, right: 0 }}>
          <View style={styles.restbtn}>
            <Text style={{ color: COLORS.lightWhite, fontFamily: 'bold' }}>Open the Store</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.title}>${(item.price + totalPrice) * count}</Text>
        </View>

        <Text style={styles.small}>{item.description}</Text>

        <FlatList
          data={item.foodTags}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item}
          style={{ marginTop: 10 }}
          horizontal
          scrollEnabled
          renderItem={({ item }) => (
            <View style={styles.tags}>
              <Text style={{ paddingHorizontal: 4, color: COLORS.lightWhite }}>{item}</Text>
            </View>
          )} />

        <Text style={[styles.title, { marginBottom: 10, marginTop: 20 }]}> Additives and Toppings</Text>

        <FlatList
          data={item.additives}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 10 }}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>

              <BouncyCheckbox
                size={20}
                unfillColor="#FFFFFF"
                fillColor={COLORS.primary}
                innerIconStyle={{ borderWidth: 1 }}
              // text={item.title}
              />
              <Text style={styles.small}>{item.title}</Text>
              <Text style={styles.small}>$ {item.price}</Text>
            </View>
          )} />

        <Text style={[styles.title, { marginBottom: 10, marginTop: 20 }]}> Preferences</Text>

        <View style={styles.input}>
          <TextInput
            placeholder='Add specific instructions'
            value={preference} onChangeText={(value) => setPreference(value)}
            autoCapitalize={false}
            autoCorrect={false}
            style={{ flex: 1 }} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 20 }}>
          <Text style={[styles.title, { marginBottom: 10 }]}>Quantity</Text>
          <Counter count={count} setCount={setCount} />
        </View>
      </View>

      <View style={{ top: 110 }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={styles.suspended}>
            <View style={styles.cart}>
              <View style={styles.cartRow}>
                <TouchableOpacity onPress={() => { }} style={styles.cartBtn}>
                  <AntDesign name='pluscircleo' size={24} color={COLORS.lightWhite} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('order-page')} style={{ backgroundColor: COLORS.primary, paddingHorizontal: 80, borderRadius: 30 }}>
                  <Text style={[styles.title, { color: COLORS.lightWhite, marginTop: 5, alignItems: "center" }]}>Order</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }} style={styles.cartBtn}>
                  <Text style={[styles.title, { color: COLORS.lightWhite, marginTop: 5, alignItems: "center" }]}>{0}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View >
  )
}

export default FoodPage

const styles = StyleSheet.create({
  backbtn: {
    marginLeft: 12,
    alignItems: "center",
    zIndex: 999,
    position: 'absolute',
    top: SIZES.xxLarge,
  },
  sharebtn: {
    marginRight: 12,
    alignItems: "center",
    zIndex: 999,
    right: 0,
    position: 'absolute',
    top: SIZES.xxLarge,
  },
  restbtn: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  container: {
    marginHorizontal: 12,
    marginTop: 10
  },
  title: {
    fontSize: 22,
    fontFamily: 'medium',
    color: COLORS.black
  },
  small: {
    fontSize: 13,
    fontFamily: 'regular',
    color: COLORS.gray,
    textAlign: "justify"
  },
  tags: {
    right: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    padding: 5
  },
  input: {
    borderColor: COLORS.primary1,
    borderWidth: 1,
    backgroundColor: COLORS.offwhite,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    flexDirection: 'row'
  },
  suspended: {
    position: 'absolute',
    zIndex: 999,
    bottom: 50,
    width: "100%",
    alignItems: "center"
  },
  cart: {
    width: SIZES.width - 24,
    height: 60,
    justifyContent: "center",
    backgroundColor: COLORS.primary1,
    borderRadius: 30
  },
  cartRow: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginHorizontal: 12
  },
  cartBtn: {
    width: 40,
    height: 40,
    borderRadius: 99,
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    alignItems: "center"
  }
})