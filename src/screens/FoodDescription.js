// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import FoodItem from "../components/FoodItem";
// import restaurants from "../data/restaurants";

// const FoodDescription = () => {
//   const foodId =
//   return (
//     <View>
//       <FoodItem restaurant={restaurant} />
//     </View>
//   );
// };

// export default FoodDescription;

// const styles = StyleSheet.create({});

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import FoodItem from "../components/FoodItem"; // Assuming FoodItem is a component for each food item.
import { getMenuItems } from "../api/restaurants"; // A helper to fetch menu items (API call)

const FoodDescription = ({ route }) => {
  const { restaurantId } = route.params; // Assume we get the restaurantId from navigation params
  const [filteredItems, setFilteredItems] = useState([]);

  // Fetch all menu items from the API
  const { data, isLoading, isError } = useQuery({
    queryKey: ["menuItems"],
    queryFn: getMenuItems,
  });

  // Filter menu items based on the restaurantId
  useEffect(() => {
    if (data) {
      const itemsForRestaurant = data.filter(
        (item) => item.restaurantId === restaurantId // Filter by restaurantId
      );
      setFilteredItems(itemsForRestaurant);
    }
  }, [data, restaurantId]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return <Text>Error fetching menu items.</Text>;
  }

  if (filteredItems.length === 0) {
    return <Text>No items available for this restaurant.</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => <FoodItem foodId={item._id} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default FoodDescription;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F1F0E8",
    flex: 1,
  },
});
