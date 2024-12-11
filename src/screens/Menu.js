import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FoodList from "../components/FoodList";
import { SafeAreaView } from "react-native-safe-area-context";

const Menu = () => {
  return (
    <View>
      <FoodList />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({});
