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
  BackHandler,
  Alert,
} from "react-native";
import {
  Feather,
  Ionicons,
  MaterialIcons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
const { list, images, offers } = require("../List");
const { productsList, bestSeller } = require("../ProductData");
import { SliderBox } from "react-native-image-slider-box";
import ProductCard from "../components/ProductCard";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  useFocusEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("#f8c353");
  });

  console.log("Platform.OS", Platform.OS);
  const [os, setOs] = useState(Platform.OS);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("mobile");
  const [products, setProducts] = useState(productsList);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [barColor, setBarColor] = useState();
  const [items, setItems] = useState([
    { label: "Laptops", value: "Laptop" },
    { label: "Tablet", value: "tablets" },
    { label: "Mobiles", value: "mobile" },
    { label: "Smart watches", value: "Smartwatch" },
    { label: "Accessories", value: "accessories" },
  ]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  });

  useEffect(() => {
    setBarColor("#f8c353");
    setProducts(productsList);
  }, [category]);

  useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit the app?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Exit',
              onPress: () => {
                BackHandler.exitApp();
              },
            },
          ],
          { cancelable: false }
        );
        return true; // Prevent default back button behavior
      } else {
        return false; // Allow default back button behavior
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Cleanup the event listener on unmount
  }, [isFocused]);

  return (
    <>
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
              <TextInput placeholder="Search netronics" />
            </Pressable>

            <Feather
              name="mic"
              size={24}
              color="#393E46"
              style={{ marginTop: 10 }}
            />
          </View>
          <SliderBox
            images={images}
            autoplay={true}
            circleLoop={true}
            autoplayInterval={3000}
            dotColor={"red"}
            ImageComponentStyle={{
              width: "96%",
              borderRadius: 15,
              marginTop: 10,
            }}
            dotStyle={{
              height: 2,
            }}
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 25,
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 15,
                }}
              >
                <Image
                  style={{ width: 55, height: 50, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 5,
                  }}
                >
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <Text
            style={{
              padding: 10,
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Top seller
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              backgroundColor: "white",
            }}
          >
            {productsList
              ?.filter((item) => item.type === "topseller")
              .map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    navigation.navigate("ProductInfo", { id: item.id })
                  }
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    marginLeft: 35,
                    width: "35%",
                    height: "30%",
                    borderRadius: 10,
                    shadowColor: "#393E46",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 5,
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginTop: 20,
                  }}
                >
                  <Image
                    style={{ width: 110, height: 150, resizeMode: "contain" }}
                    source={{ uri: item?.img }}
                  />
                  <Image
                    source={{ uri: bestSeller }}
                    style={{
                      width: 100,
                      height: 100,
                      position: "absolute",
                      zIndex: 5,
                      top: "-1%",
                      left: "-0.5%",
                    }}
                  ></Image>
                </Pressable>
              ))}
          </View>
          <Text
            style={{
              padding: 10,
              paddingBottom: 0,
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 35,
            }}
          >
            Special Offers
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {productsList
            ?.filter((item) => item.type === "offers")
            .map((item) => (
              <Pressable
                key={item.id}
                onPress={() =>
                  navigation.navigate('ProductInfo', { id: item.id })
                }
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  gap: 15,
                  paddingVertical: 10,
                }}
              >
                <Image
                  style={{
                    width: 120,
                    height: 90,
                    resizeMode: "contain",
                    marginTop: 10,
                  }}
                  source={{ uri: item?.img }}
                />

                <View
                  style={{
                    backgroundColor: "#E31837",
                    paddingVertical: 5,
                    width: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    save  {item?.oldprice - item.price} JD
                  </Text>
                </View>
              </Pressable>
            ))}
        </ScrollView>
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 15,
            width: "45%",
            marginBottom: open ? 50 : 15,
          }}
        >
          <DropDownPicker
            style={{
              borderColor: "#B7B7B7",
              height: 30,
              marginBottom: open ? 120 : 15,
              width: "100%",
            }}
            open={open}
            value={category} //genderValue
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="choose category"
            placeholderStyle={styles.placeholderStyles}
            onOpen={onGenderOpen}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {products
            ?.filter((item) => item.category === category)
            .map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({});

export default HomeScreen;
