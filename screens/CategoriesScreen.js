import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const cards = [
  {
    title: "mobile",
    copy: "Mobiles",
    button: "View Product ",
    imageId:
      "https://english.onlinekhabar.com/wp-content/uploads/2021/09/A03s-e1631442371496-300x165.jpg",
  },
  {
    title: "Laptop",
    copy: "Laptops",
    button: "View Product",
    imageId:
      "https://www.zdnet.com/a/img/resize/bd45ee12d626e1a79d05e6c8abbc4a263d125cc3/2022/02/25/c9d0c484-4a1d-48aa-97ca-534adb533d09/huawei-matebook-x-pro-mwc.jpg?auto=webp&width=1280",
  },
  {
    title: "accessories",
    copy: "Accessory ",
    button: "View Product ",
    imageId:
      "https://consumer.huawei.com/content/dam/huawei-cbg-site/weu/be/mkt/pdp/audio/freebuds-studio/audio.jpeg",
  },
  {
    title: "tablets",
    copy: "Tablets",
    button: "View Product",
    imageId:
    "https://smartbuy-me.com/smartbuystore/medias/SMT0701ST0228.jpg?context=c21hcnRidXliMmN8aW1hZ2VzfDc3MDF8aW1hZ2UvanBlZ3xpbWFnZXMvaGJkL2g4OC84ODU3MTczMDAwMjIyL1NNVDA3MDFTVDAyMjguanBnfGJlYmE5YjY3NzI1N2I4N2E5NzY5Njk4OTU1MGIwNTlkMTVkY2I1MmE1ZWVjOTI1NTFiM2ZjZmIzOTNmM2JjYTI",
  },
  {
    title: "Smartwatch",
    copy: "Smart Watches",
    button: "View Product",
    imageId:
      "https://consumer.huawei.com/content/dam/huawei-cbg-site/weu/common/mkt/plp/wearables/watch-fit2.jpg",
  },
];

const CategoriesScreen = () => {
  const navigation = useNavigation();

  useFocusEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("#f8c353");
  });

  const handleCardPress = (title) => {
    navigation.navigate("Category", { categoryTitle: title });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pageContent}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handleCardPress(card.title)}
          >
            <Image source={{ uri: card.imageId }} style={styles.cardBackground} />
            <View style={styles.overlay} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{card.title}</Text>
              <Text style={styles.copy}>{card.copy}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  pageContent: {
    padding: 20,
  },
  card: {
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  cardBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    opacity: 0.3,
  },
  cardContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  copy: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
});

export default CategoriesScreen;