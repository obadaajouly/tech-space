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
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import { useNavigation } from "@react-navigation/native";
import { useCartsContext } from "../hooks/useCartContext";

const CartItem = ({ card, onDelete }) => {
  const [quantity, setQuantity] = useState(1);


  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };


  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: "#E9E9E9",
        borderBottomStyle: "solid",
        paddingBottom: 25,
        paddingTop: 25,
        backgroundColor: "white",
        shadowColor: "#393E46",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 25,
        width: "95%",
        marginLeft: 8,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 25,
        }}
      >
        <View>
          <Image
            style={{
              width: 55,
              height: 50,
              resizeMode: "contain",
              marginLeft: 15,
            }}
            source={{
              uri: card.img,
            }}
          ></Image>
        </View>
        <View>
          <Text style={{ fontWeight: 600 }}>{card.title}</Text>
          <Text style={{ color: "#8B8B8B", marginTop: 10, fontSize: 12 }}>
            {card.price*quantity} JD
          </Text>
        </View>
      </View>
      <View style={{ display: "flex", gap: 10 }}>
        <Pressable onPress={onDelete}>
          <MaterialIcons
            name="delete-outline"
            size={24}
            color="black"
            style={{ marginLeft: 65 }}
          />
        </Pressable>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FFF0D1",
            width: 90,
            height: 25,
            marginRight: 10,
            borderRadius: 25,
          }}
        >
          <Pressable onPress={decreaseQuantity}>
            <AntDesign name="minuscircle" size={25} color="#222629" />
          </Pressable>
          <Text style={{ marginLeft: 16 }}>{quantity}</Text>
          <Pressable onPress={increaseQuantity}>
            <AntDesign
              name="pluscircle"
              size={25}
              color="#222629"
              style={{ marginLeft: 15 }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
