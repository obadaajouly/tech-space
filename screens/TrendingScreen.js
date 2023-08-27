import { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  StatusBar,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import {
  Feather,
  Ionicons,
  MaterialIcons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
const { productsList } = require("../ProductData");
import ProductCard from "../components/ProductCard";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const TrendingScreen = () => {
  console.log("Platform.OS", Platform.OS);
  const [os, setOs] = useState(Platform.OS);
  const [barColor, setBarColor] = useState();

  useFocusEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("#f8c353");
  });

  return (
    <>
      {os === "android" && (
        <StatusBar barStyle={"dark-content"} backgroundColor={barColor} />
      )}
      {os === "ios" && <View style={{ marginTop: 50 }}></View>}
      <ScrollView>
        <View
          style={{
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              backgroundColor: "#f8c353",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 7,
                  gap: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                  borderColor: "#D8D9DA",
                  borderWidth: 1,
                  borderStyle: "solid",
                  height: 38,
                  flex: 1,
                  marginTop: 10,
                }}
              >
                <AntDesign
                  style={{ paddingLeft: 10 }}
                  name="search1"
                  size={22}
                  color="#393E46"
                />
                <TextInput style={{ flex: 1 }} placeholder="Search Trending" />
              </Pressable>

              <Feather
                name="mic"
                size={24}
                color="#393E46"
                style={{ marginTop: 10 }}
              />
            </View>
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 18, margin: 20 }}>
            Trending Deals For You!{"   "}
            <FontAwesome5 name="fire" size={24} color="#f8c353" />
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {productsList
            ?.filter((item) => item.type === "trending")
            .map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({});

export default TrendingScreen;
