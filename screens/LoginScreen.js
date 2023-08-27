import { useState, useEffect,useContext } from "react";
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  StatusBar,
  Platform,
  BackHandler,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { initDatabase, insertUser, db } from "../database/Database";
import { UserContext } from '../context/AuthContext';

const LoginScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  const [emailColor, setEmailColor] = useState("black")
  const [passwordColor, setPasswordColor] = useState("black")
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'Exit', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleLogin = () => {
    
    if (email && password) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM userss WHERE email = ?",
          [email],
          (_, result) => {
            if (result.rows.length > 0) {
              const user = result.rows.item(0);
              if (user.password === password) {
                setUser(user);
                navigation.replace("Main"); // Navigate after successful login
              } else {
                setErrorMessage("Incorrect password"); // Incorrect password
                setPasswordColor("red");
              }
            } else {
              setErrorMessage("ًIncorrect Email"); // Email not found
              setEmailColor("red");
            }
          },
          (error) => {
            console.error("Error during login validation:", error);
            setErrorMessage(error)
          }
        );
      });
    } else {
      setErrorMessage("Please enter email and password");
    }
  };

  useEffect(() => {
    setErrorMessage();
    setEmailColor("black");
    setPasswordColor("black");
  }, [email, password]);

  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ marginBottom: 40 }}>
          <Image
            style={{ width: 250, height: 100 }}
            source={require("../assets/logo/logo-no-background.png")}
          />
        </View>

        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 12,
                color: "#041E42",
              }}
            >
              Login In to your Account
            </Text>
          </View>

          <View style={{ marginTop: 30 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="gray"
              />

              <TextInput
                value={email}
                onChangeText={setEmail}
                style={{
                  color: emailColor,
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 16 : 16,
                  borderColor: "red",
                }}
                placeholder="enter your Email"
              />
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <AntDesign
                name="lock1"
                size={24}
                color="gray"
                style={{ marginLeft: 8 }}
              />

              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={{
                  color: passwordColor,
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 16 : 16,
                }}
                placeholder="enter your Password"
              />
            </View>
            <Text style={{color:"red",fontWeight:"bold"}}>{errorMessage}</Text>
          </View>

          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me logged in</Text>

            <Text style={{ color: "#007FFF", fontWeight: "500" }}>
              Forgot Password
            </Text>
          </View>

          <View style={{ marginTop: 80 }} />

          <Pressable
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#FEBE10",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
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
              Login
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default LoginScreen;
