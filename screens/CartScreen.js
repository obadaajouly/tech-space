import { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import { useNavigation } from "@react-navigation/native";
import { useCartsContext } from "../hooks/useCartContext";
import CartItem from "../components/CartItem";
import { useFocusEffect } from "@react-navigation/native";

const CartScreen = () => {
  const { cards, dispatch } = useCartsContext();
  const [os, setOs] = useState(Platform.OS);
  const navigation = useNavigation();
  const [total, setTotal] = useState(0);

  useFocusEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("#f8c353");
  });

  useEffect(() => {
    let totalll = 0;
    cards.map((card) => {
      totalll += card.price;
    });
    setTotal(totalll);
  }, [cards]);
  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "90%",
              marginLeft: 15,
            }}
          >
            <Text style={{ color: "#8B8B8B" }}>
              {cards.length} items in your cart
            </Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={{ color: "#006AE6" }}>+ Add more</Text>
            </Pressable>
          </View>
        </View>
        {cards.map((card, index) => (
          <CartItem
            key={index}
            card={card}
            onDelete={() => dispatch({ type: "DELETE_CARD", payload: card })}
          />
        ))}
        <View>
          <View style={{ marginTop: 25 }}>
            <Text style={{ marginLeft: 10, fontWeight: 700, fontSize: 18 }}>
              Payment summery
            </Text>
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "92%",
                  marginLeft: 15,
                  marginTop: 20,
                }}
              >
                <Text style={{ color: "#838383", fontSize: 14 }}>
                  Order Total
                </Text>
                <Text>{total} JD</Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "92%",
                  marginLeft: 15,
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "#838383", fontSize: 14 }}>
                  Items Discount
                </Text>
                <Text>0.00 JD</Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "92%",
                  marginLeft: 15,
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "#838383", fontSize: 14 }}>
                  Coupon Discount
                </Text>
                <Text>0.00 JD</Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "92%",
                  marginLeft: 15,
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "#838383", fontSize: 14 }}>Shipping</Text>
                <Text>Free</Text>
              </View>
            </View>
          </View>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 7,
              gap: 10,
              backgroundColor: "white",
              borderRadius: 5,
              borderColor: "#D8D9DA",
              borderWidth: 1,
              borderStyle: "solid",
              height: 38,
              flex: 1,
              marginTop: 25,
              marginLeft: 15,
              width: "92%",
            }}
          >
            <Entypo
              name="price-tag"
              size={22}
              color="gray"
              style={{ marginLeft: 15, marginRight: 5 }}
            />
            <TextInput placeholder="Add coupon" />
            <Ionicons
              name="add-circle-outline"
              size={24}
              color="gray"
              style={{ marginLeft: 160 }}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              if (cards.length > 0) {
                navigation.navigate("Checkout");
              } else {
                Alert.alert("Cart is empty");
              }
            }}
            style={{
              width: 220,
              backgroundColor: "#f8c353",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 10,
              marginTop: 35,
              marginBottom: 35,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#222629",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Checkout
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};

export default CartScreen;
