import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  barColor,
  Image,
  StatusBar,
  Platform
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import ProductCard from "../components/ProductCard";
import { useNavigation, useRoute } from "@react-navigation/native";
const { productsList } = require("../ProductData");

const CategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryTitle } = route.params;
  const [os, setOs] = useState(Platform.OS);
  console.log(categoryTitle)

  return (
    <>
      {os === "android" &&(
          <StatusBar barStyle={"dark-content"} backgroundColor={barColor} />
        )}
      {os === "ios"&& (<View style={{ marginTop: 50 }}></View>)}

      <ScrollView style={{ paddingTop: 0, flex: 1, }}>
        <View>
          <Text
            style={{
              color: "black",
              width: "60%",
              fontWeight: "700",
              fontSize: 18,
              marginTop: 15,
              marginLeft: 15,
              fontFamily: "Righteous",
            }}
          >
            Discover our hight quality products
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
              width: "96%",
            }}
          >
            <Pressable
              style={{
                width: 100,
                backgroundColor: "#f8c353",
                borderRadius: 15,
                marginLeft: 15,
                padding: 8,
                marginBottom: 35,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#222629",
                  fontSize: 14,
                  fontWeight: 400,
                }}
              >
                Top rated
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: 100,
                backgroundColor: "#fff",
                borderRadius: 15,
                marginLeft: 15,

                padding: 8,
                marginBottom: 35,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#222629",
                  fontSize: 14,
                  fontWeight: 400,
                }}
              >
                {" "}
                New
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: 100,
                backgroundColor: "#fff",
                borderRadius: 15,
                marginLeft: 15,

                padding: 8,
                marginBottom: 35,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#222629",
                  fontSize: 14,
                  fontWeight: 400,
                }}
              >
                Popular
              </Text>
            </Pressable>
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {productsList
            ?.filter((item) => item.category === categoryTitle)
            .map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
        </View>
      </ScrollView>
    </>
  );
};

export default CategoryScreen;
