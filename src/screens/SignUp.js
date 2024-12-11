import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserContext from "../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { register } from "../api/auth";

const SignUp = () => {
  const navigation = useNavigation();
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const [image, setImage] = useState(null);

  const { mutate } = useMutation({
    mutationFn: () => register(userInfo, image),
    onSuccess: () => {
      setAuthenticated(true);
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRegister = () => {
    mutate();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Text style={styles.heading}>Hi there! please register below</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="USERNAME"
          autoCapitalize="none"
          value={userInfo.username}
          onChangeText={(text) => setUserInfo({ ...userInfo, username: text })}
        />
      </View>
      {/* Password Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          autoCapitalize="none"
          value={userInfo.password}
          onChangeText={(text) => setUserInfo({ ...userInfo, password: text })}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            borderWidth: 1,
            height: 40,
            borderRadius: 10,
            width: "95%",
            justifyContent: "center",
            paddingLeft: 10,
          }}
        >
          <Text style={{ color: "black", fontSize: 16 }}>
            Upload Profile Image
          </Text>
        </TouchableOpacity>
      </View>
      {/* Username Section */}
      <View style={styles.button}>
        <TouchableOpacity onPress={handleRegister}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 16,
              fontWeight: "700",
              marginTop: 4,
              color: "black",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={{ marginTop: 20, alignItems: "center" }}>
        <Text style={{ color: "black", fontSize: 16 }}>
          Already have an account?{" "}
          <Text
            style={{ color: "black", fontWeight: "bold" }}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 5,
    marginTop: 20,
  },
  inputContainer: {
    width: "95%",
    marginBottom: 16,
  },
  input: {
    width: "95%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 11,
    borderColor: "gray",
    backgroundColor: "white",
  },
  button: {
    marginTop: 200,
    width: "50%",
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    borderColor: "lightgray",
    backgroundColor: "lightblue",
  },
  heading: {
    marginBottom: 150,
    fontSize: 24,
    fontWeight: "700",
    color: "black",
  },
});
