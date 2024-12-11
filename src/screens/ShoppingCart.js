import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Cart from "../components/Cart";
import { SafeAreaView } from "react-native-safe-area-context";

const ShoppingCart = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Cart />
    </SafeAreaView>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({});
