import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  StatusBar,
  ImageBackground,
  Dimensions,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ProductCard from "../components/ProductCard";
import { productsList } from "../ProductData";
import { useCartsContext } from "../hooks/useCartContext";

const ProductInfoScreen = () => {
  const { dispatch } = useCartsContext();
  const route = useRoute();
  const [id, setId] = useState(route.params.id);
  const [product, setProduct] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);


  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    const currentProduct = productsList.find((item) => item.id === id);
    setProduct(currentProduct);
  }, [id]);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };
  const [os, setOs] = useState(Platform.OS);
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const addItemToCart = (item) => {
    dispatch({ type: "ADD_CARD", payload: product });
    setAddedToCart(true);
  };
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;
  console.log(product);
  return (
    <>
      {os === "android" && (
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      )}
      {os === "ios" && <View style={{ marginTop: 50 }}></View>}
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {product?.carouselImages.map((item, index) => (
            <ImageBackground
              style={{ width, height, resizeMode: "contain" }}
              source={{ uri: item }}
              key={index}
            >
              <View
                style={{
                  padding: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#C60C30",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: 12,
                    }}
                  >
                    20% off
                  </Text>
                </View>

                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#E0E0E0",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={24}
                    color="black"
                  />
                </View>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: "auto",
                  marginLeft: 20,
                  marginBottom: 20,
                }}
              >
                <AntDesign name="hearto" size={24} color="black" />
              </View>
            </ImageBackground>
          ))}
        </ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "90%",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: 15,
            marginTop: 20,
          }}
        >
          <View>
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              {product?.title}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 7,
                marginTop: 10,
              }}
            >
              <AntDesign name="star" size={24} color="#EDB900" />
              <Text
                style={{
                  color: "#505050",
                  borderRightColor: "#CFCFCF",
                  borderRightWidth: 1,
                  paddingRight: 10,
                }}
              >
                {product?.rating}
              </Text>
              <Text
                style={{
                  color: "#f8c353",
                  fontSize: 10,
                }}
              >
                150 Reviews
              </Text>
            </View>
          </View>
          <Pressable onPress={toggleLike}>
            <AntDesign
              name={isLiked ? "heart" : "hearto"}
              size={24}
              color={isLiked ? "red" : "black"}
            />
          </Pressable>
        </View>
        <Text
          style={{
            color: "#4B4B4B",
            fontSize: 12,
            width: "90%",
            marginLeft: 15,
            marginTop: 10,
          }}
        >
          {product?.desc}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 25,
            width: "95%",
            marginLeft: 15,
          }}
        >
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontWeight: "600",
              fontSize: 20,
            }}
          >
            {product?.price} JD{" "}
            <Text
              style={{
                fontSize: 14,
                textDecorationLine: "line-through",
                color: "red",
              }}
            >
              {product?.oldprice} JD
            </Text>
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#FFF0D1",
              width: 100,
              height: 30,
              marginRight: 15,
              borderRadius: 25,
            }}
          >
            <Pressable>
              <AntDesign onPress={decreaseQuantity} name="minuscircle" size={29} color="#222629" />
            </Pressable>
            <Text style={{ marginLeft: 17 }}>{quantity}</Text>
            <Pressable>
              <AntDesign
              onPress={increaseQuantity}
                name="pluscircle"
                size={29}
                color="#222629"
                style={{ marginLeft: 16 }}
              />
            </Pressable>
          </View>
        </View>

        <Pressable
          onPress={() => addItemToCart(product)}
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
          {addedToCart ? (
            <View>
              <Text
                style={{
                  textAlign: "center",
                  color: "#222629",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                Added to Cart
              </Text>
            </View>
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: "#222629",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Add to Cart
            </Text>
          )}
        </Pressable>
      </ScrollView>
    </>
  );
};

export default ProductInfoScreen;
