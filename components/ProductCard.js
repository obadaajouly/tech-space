import { useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCartsContext } from "../hooks/useCartContext";

const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const navigation = useNavigation();
  const { dispatch } = useCartsContext();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch({ type: "ADD_CARD", payload: item });
  };

  return (
    <Pressable
      onPress={() => navigation.navigate('ProductInfo', { id: item.id })}
      style={{
        marginHorizontal: 10,
        marginVertical: 10,
        width: "40%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        gap: 5,
        backgroundColor: "white",
        borderRadius: 10,
      }}
    >
      <View style={{ padding: 10 }}>
        <Image
          style={{
            width: 120,
            height: 120,
            resizeMode: "contain",
            alignSelf: "center",
            marginTop: 5,
          }}
          source={{ uri: item?.img }}
        />

        <Text numberOfLines={1} style={{ width: 130, marginTop: 10 }}>
          {item?.title}
        </Text>

        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            {item?.price} JD
          </Text>
          <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
            {item?.rating} ratings
          </Text>
        </View>

        <Pressable
          onPress={() => addItemToCart(item)}
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginTop: 10,
            height: 40,
          }}
        >
          {addedToCart ? (
            <View>
              <Text>Added to Cart</Text>
            </View>
          ) : (
            <Text>Add to Cart</Text>
          )}
        </Pressable>
      </View>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
