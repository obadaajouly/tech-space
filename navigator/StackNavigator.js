import {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, AntDesign, Ionicons,MaterialIcons } from "@expo/vector-icons";
import {StatusBar} from 'react-native'

//Screens
import Pages from "../screens/Pages";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TrendingScreen from "../screens/TrendingScreen";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import OrderScreen from "../screens/OrderScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [os, setOs] = useState(Platform.OS);
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            backgroundColor: "black",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={30} color="#f8c353" />
              ) : (
                <AntDesign name="home" size={30} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            tabBarLabel: "Categories",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcons name="category" size={30} color="#f8c353" />
              ) : (
                <MaterialIcons name="category" size={30} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Trending"
          component={TrendingScreen}
          options={{
            tabBarLabel: "Trending",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcons name="whatshot" size={30} color="#f8c353" />
              ) : (
                <MaterialIcons name="whatshot" size={30} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: "Cart",
            tabBarLabelStyle: { color: "black" },
            headerShown: true,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="shoppingcart" size={30} color="#f8c353" />
              ) : (
                <AntDesign name="shoppingcart" size={30} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={30} color="#f8c353" />
              ) : (
                <Ionicons name="person-outline" size={30} color="black" />
              ),
          }}
        />
        {/* <Tab.Screen
          name="Main"
          component={Pages}
          options={{
            tabBarLabel: "Pages",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="menu" size={30} color="#f8c353" />
              ) : (
                <Entypo name="menu" size={30} color="black" />
              ),
          }}
        /> */}
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {os === "android" && (
        <StatusBar barStyle={"dark-content"} backgroundColor={"#f8c353"} />
      )}
      {os === "ios" && <View style={{ marginTop: 50 }}></View>}
      <Stack.Navigator>

      <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Trending"
          component={TrendingScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ProductInfo"
          component={ProductInfoScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pages"
          component={Pages}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
