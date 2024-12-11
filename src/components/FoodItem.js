import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMenuItemById } from "../api/restaurants";

const FoodItem = ({ foodId }) => {
  const {
    data: menuItem,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchMenuItem", foodId],
    queryFn: () => getMenuItemById(foodId),
  });

  if (isLoading) {
    return <Text>Loading menu item...</Text>;
  }

  if (isError) {
    return <Text>Error fetching menu item.</Text>;
  }

  if (!menuItem) {
    return <Text>No menu item details available</Text>;
  }

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: menuItem.image }} style={styles.image} />
      <Text style={styles.name}>{menuItem.name}</Text>
      <Text style={styles.price}>${menuItem.price}</Text>
      <Text style={styles.description}>{menuItem.description}</Text>
    </View>
  );
};
