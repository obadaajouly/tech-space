import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { initDatabase, insertUser } from "../database/Database";
const RegisterScreen = () => {
  // State variables to store user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailColor, setEmailColor] = useState("black");
  const [passwordColor, setPasswordColor] = useState("black");

  // Navigation instance for navigating between screens
  const navigation = useNavigation();

  // Function to handle registration
  const handleRegister = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!name || !email || !password) {
      setErrorMessage("All fields are required");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format");
      setEmailColor("red");
      return;
    }

    if (password.length < 8 || password.length > 16) {
      setErrorMessage("Password must be 8-16 characters long");
      setPasswordColor("red");
      return;
    }

    if (!passwordRegex.test(password)) {
      let errorMessages = [];
      setPasswordColor("red");

      if (!/(?=.*[a-z])/.test(password)) {
        errorMessages.push(
          "one lowercase letter"
        );
      }

      if (!/(?=.*[A-Z])/.test(password)) {
        errorMessages.push(
          "one uppercase letter"
        );
      }

      if (!/(?=.*\d)/.test(password)) {
        errorMessages.push("one digit");
      }

      if (!/(?=.*[@$!%*?&])/.test(password)) {
        errorMessages.push(
          "one special character (@$!%*?&)"
        );
      }

      setErrorMessage("Password must contain at least "+errorMessages.join(", "));
      return;
    }
    const imageUri = "no img"
    // If all validation checks pass, proceed with registration
    insertUser(name, email, password,imageUri);
    navigation.navigate("Login"); // Navigate after registration
  };

  useEffect(() => {
    initDatabase(); // Initialize the database when the component mounts
  }, []);

  useEffect(() => {
    setErrorMessage();
    setEmailColor("black");
    setPasswordColor("black");
  }, [name, email, password]);

  return (
    <>
      {/* Set status bar style */}
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />

      {/* Main content */}
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

        {/* Form for registration */}
        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            {/* Title */}
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 12,
                color: "#041E42",
              }}
            >
              Register to your Account
            </Text>
          </View>

          <View style={{ marginTop: 30 }}>
            {/* Input field for name */}
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
              <Ionicons
                name="ios-person"
                size={24}
                color="gray"
                style={{ marginLeft: 8 }}
              />
              <TextInput
                value={name}
                onChangeText={setName}
                style={{
                  color: "black",
                  marginVertical: 10,
                  width: 300,
                  fontSize: name ? 16 : 16,
                }}
                placeholder="enter your name"
              />
            </View>

            {/* Input field for email */}
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
                  fontSize: password ? 16 : 16,
                }}
                placeholder="enter your Email"
              />
            </View>
          </View>

          {/* Input field for password */}
          <View>
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
                  fontSize: email ? 16 : 16,
                }}
                placeholder="enter your Password"
              />
            </View>
          </View>
          <View style={{maxWidth:"80%"}}>
          <Text style={{color:"red", fontWeight:"bold"}}>{errorMessage}</Text>
          </View>
          {/* Register button */}
          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          ></View>

          <View style={{ marginTop: 60 }} />

          <Pressable
            onPress={handleRegister}
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
              Register
            </Text>
          </Pressable>

          {/* Link to Sign In */}
          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Already have an account? Sign In
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default RegisterScreen;
