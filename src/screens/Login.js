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
import { useNavigation } from "@react-navigation/native";
import { login } from "../api/auth";
import { useMutation } from "@tanstack/react-query";
import UserContext from "../context/UserContext";

const Login = () => {
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { mutate } = useMutation({
    mutationFn: () => login(userInfo),
    onSuccess: () => {
      setAuthenticated(true);
    },
  });

  const handleLogin = () => {
    mutate();
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.heading}>Welcome Back!</Text>
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          value={userInfo.password}
          onChangeText={(text) => setUserInfo({ ...userInfo, password: text })}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.button}>
        <TouchableOpacity onPress={handleLogin}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 16,
              fontWeight: "700",
              marginTop: 4,
              color: "black",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={{ marginTop: 20, alignItems: "center" }}>
        <Text style={{ color: "black", fontSize: 16 }}>
          Don't have an account?{" "}
          <Text
            style={{ color: "black", fontWeight: "bold" }}
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;

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
    marginTop: 225,
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
