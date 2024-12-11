import React, { useContext } from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import FoodCard from "./FoodCard";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantMenuItems } from "../api/restaurants";
import CartContext from "../context/CartContext";

const FoodList = ({ route }) => {
  const { restaurantId } = route.params;
  const { addItemToCart } = useContext(CartContext);

  const {
    data: menuItems,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchMenuItems", restaurantId],
    queryFn: () => getRestaurantMenuItems(restaurantId),
  });

  if (isLoading) {
    return <Text>Loading menu items...</Text>;
  }

  if (isError) {
    return <Text>Error fetching menu items.</Text>;
  }

  const renderItem = ({ item }) => (
    <FoodCard menuItem={item} onAddToCart={addItemToCart} />
  );

  return (
    <FlatList
      data={menuItems}
      keyExtractor={(item) => item._id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default FoodList;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#F6F6F6",
    padding: 16,
  },
});
