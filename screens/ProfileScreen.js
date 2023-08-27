import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { updateImageUri } from "../database/Database";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from '@react-navigation/native';

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [os, setOs] = useState(Platform.OS);
  const [imageUri, setImageUri] = useState(
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );
  const navigation = useNavigation();
  console.log(user);
  console.log(user.email);
  useFocusEffect(() => {
    StatusBar.setBarStyle("light-content");
    StatusBar.setBackgroundColor("black");
  });

  // const handlePickImage = async () => {
  //   console.log(user);
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 4],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     setImageUri(result.uri);
  //     // Save the image URI to the database here
  //     updateImageUri(user.id,result.uri);
  //   }
  // };

  const handleLogout = () => {
    console.log("first");
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Replace 'Login' with the correct name of your login screen
    }));
  };
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      if (result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        setImageUri(selectedAsset.uri);

        // Save the image URI to the database here
        updateImageUri(user.id, selectedAsset.uri);
      }
    }
  };

  useEffect(() => {
    if (user.imageUri === "no img") {
    } else setImageUri(user.imageUri);
  }, [user]);
  return (
    <>
      {os === "android" && (
        <StatusBar barStyle={"light-content"} backgroundColor={"black"} />
      )}
      {os === "ios" && <View style={{ marginTop: 50 }}></View>}

      {/* profile picture and name */}
      <ScrollView>
        <View>
          <View
            style={{
              backgroundColor: "black",
              width: "100%",
              height: "60px",
              position: "relative",
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              paddingTop: 60,
            }}
          >
            <TouchableOpacity onPress={handleLogout}>
              <View>
                <Ionicons
                  name="exit-outline"
                  size={30}
                  color="white"
                  style={{ marginLeft: 320, }}
                />
              </View>
            </TouchableOpacity>
            <Pressable onPress={handlePickImage}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    position: "absolute",
                    left: "auto",
                    right: "auto",
                  }}
                  source={{
                    uri: imageUri,
                  }}
                />
              </View>
            </Pressable>
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 60,
            }}
          >
            {user.name}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "thin",
              textAlign: "center",
              marginTop: 3,
            }}
          >
            @{user.name.toLowerCase()}
          </Text>
          <Text
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              width: "85%",
              marginLeft: 25,
            }}
          ></Text>
          {/* <Pressable
          style={{
            width: 100,
            backgroundColor: "#FEBE10",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 5,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Edit Profile
          </Text>
        </Pressable> */}
          {/*End of profile picture and name section*/}
          {/* Orders Section */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 25,
            }}
          >
            <Text style={{ fontWeight: 500 }}>No.Orders</Text>
            <Text style={{ fontWeight: 500 }}>Last order</Text>
            <Text style={{ fontWeight: 500 }}>Recent Order</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 8,
              gap: 10,
            }}
          >
            <Text style={{ fontSize: 10 }}>12</Text>
            <Text style={{ fontSize: 10, marginLeft: 15 }}>Deliverd</Text>
            <Text style={{ fontSize: 10 }}>on process</Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              marginTop: 40,
              marginLeft: 20,
            }}
          >
            My Orders
          </Text>
          <View style={{ flexDirection: "row" }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Pressable
                style={{
                  marginHorizontal: 10,
                  marginVertical: 10,
                  width: "20%",
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
                      width: 100,
                      height: 100,
                      resizeMode: "contain",
                      alignSelf: "center",
                      marginTop: 5,
                    }}
                    source={{
                      uri: "https://m.media-amazon.com/images/I/519KZO0oXaL._AC_.jpg",
                    }}
                  />

                  <Text numberOfLines={1} style={{ width: 130, marginTop: 10 }}>
                    {"Samsung Galaxy"}
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
                      {"1299"} JD
                    </Text>
                    <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
                      {"4.9"}
                    </Text>
                  </View>
                </View>
              </Pressable>
              <Pressable
                style={{
                  marginHorizontal: 10,
                  marginVertical: 10,
                  width: "20%",
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
                      width: 100,
                      height: 100,
                      resizeMode: "contain",
                      alignSelf: "center",
                      marginTop: 5,
                    }}
                    source={{
                      uri: "https://m.media-amazon.com/images/I/916acEhBkcL._AC_SL1500_.jpg",
                    }}
                  />

                  <Text numberOfLines={1} style={{ width: 130, marginTop: 10 }}>
                    {"Apple Watch Ultra"}
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
                      {"900"} JD
                    </Text>
                    <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
                      {"4.5"}
                    </Text>
                  </View>
                </View>
              </Pressable>
              <Pressable
                style={{
                  marginHorizontal: 10,
                  marginVertical: 10,
                  width: "20%",
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
                      width: 100,
                      height: 100,
                      resizeMode: "contain",
                      alignSelf: "center",
                      marginTop: 5,
                    }}
                    source={{
                      uri: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-6a-0.jpg",
                    }}
                  />

                  <Text numberOfLines={1} style={{ width: 130, marginTop: 10 }}>
                    {"Pixel 6a"}
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
                      {"300"} JD
                    </Text>
                    <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
                      {"4.1"}
                    </Text>
                  </View>
                </View>
              </Pressable>
              <Pressable
                style={{
                  marginHorizontal: 10,
                  marginVertical: 10,
                  width: "20%",
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
                      width: 100,
                      height: 100,
                      resizeMode: "contain",
                      alignSelf: "center",
                      marginTop: 5,
                    }}
                    source={{
                      uri: "https://m.media-amazon.com/images/I/817HZoT0brL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
                    }}
                  />

                  <Text numberOfLines={1} style={{ width: 130, marginTop: 10 }}>
                    {"CL750 Wired"}
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
                      {"32"} JD
                    </Text>
                    <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
                      {"4.4"}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </ScrollView>
          </View>
          {/* End of Orders Section */}
          {/* WishList Section */}
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
                marginTop: 40,
                marginLeft: 20,
              }}
            >
              My WishList <AntDesign name="heart" size={14} color="red" />
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Pressable
                style={{
                  marginHorizontal: 10,
                  marginVertical: 10,
                  width: "20%",
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
                      width: 100,
                      height: 100,
                      resizeMode: "contain",
                      alignSelf: "center",
                      marginTop: 5,
                    }}
                    source={{
                      uri: "https://m.media-amazon.com/images/I/71CxZ653JNL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
                    }}
                  />

                  <Text numberOfLines={1} style={{ width: 130, marginTop: 10 }}>
                    {"Wireless Earbuds"}
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
                      {"18"} JD
                    </Text>
                    <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
                      {"4.8"}
                    </Text>
                  </View>
                </View>
              </Pressable>
              <Pressable
                style={{
                  marginHorizontal: 10,
                  marginVertical: 10,
                  width: "20%",
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
                      width: 100,
                      height: 100,
                      resizeMode: "contain",
                      alignSelf: "center",
                      marginTop: 5,
                    }}
                    source={{
                      uri: "https://m.media-amazon.com/images/I/71s9NDno3FL._AC_SX679_.jpg",
                    }}
                  />

                  <Text numberOfLines={1} style={{ width: 130, marginTop: 10 }}>
                    {"Anker Portable Charger"}
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
                      {"24.3"} JD
                    </Text>
                    <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
                      {"4.9"}
                    </Text>
                  </View>
                </View>
              </Pressable>
              <Pressable
                style={{
                  marginHorizontal: 10,
                  marginVertical: 10,
                  width: "20%",
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
                      width: 100,
                      height: 100,
                      resizeMode: "contain",
                      alignSelf: "center",
                      marginTop: 5,
                    }}
                    source={{
                      uri: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
                    }}
                  />

                  <Text numberOfLines={1} style={{ width: 130, marginTop: 10 }}>
                    {"iPhone 14 Pro Max"}
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
                      {"1000"} JD
                    </Text>
                    <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
                      {"4.7"}
                    </Text>
                  </View>
                </View>
              </Pressable>
              <Pressable
                style={{
                  marginHorizontal: 10,
                  marginVertical: 10,
                  width: "20%",
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
                      width: 100,
                      height: 100,
                      resizeMode: "contain",
                      alignSelf: "center",
                      marginTop: 5,
                    }}
                    source={{
                      uri: "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-mini-4-0.jpg",
                    }}
                  />

                  <Text numberOfLines={1} style={{ width: 130, marginTop: 10 }}>
                    {"Apple iPad mini 4"}
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
                      {"300"} JD
                    </Text>
                    <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
                      {"4.4"}
                    </Text>
                  </View>
                </View>
              </Pressable>

              {/* End Of WishList Section */}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ProfileScreen;
