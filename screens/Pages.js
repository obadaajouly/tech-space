import React from "react";
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Pages = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            register
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Login
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.replace("Main")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Home
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Cart")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Cart
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Categories")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
          Categories
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Category")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
          Category
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
          Profile
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Trending")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
          Trending
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("ProductInfo")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
          ProductInfo
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Checkout")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
          Checkout
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default Pages;
