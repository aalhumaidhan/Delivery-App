import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import RestaurantCard from "./RestaurantCard";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getAllRestaurants } from "../api/restaurants";

const RestaurantList = ({ selectedCategory, searchQuery }) => {
  const {
    data: restaurants,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["fetchRestaurants"],
    queryFn: getAllRestaurants,
  });
  const navigation = useNavigation();

  if (isLoading) {
    return <Text>Loading restaurants...</Text>;
  }

  // Handle the error state
  if (isError) {
    return <Text>Error fetching restaurants: {error.message}</Text>;
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Menu", {
          restaurantId: item._id,
        })
      }
    >
      <RestaurantCard
        name={item?.name}
        image={item?.image}
        rating={item?.rating}
        delivery={item?.deliveryTime}
      />
    </TouchableOpacity>
  );

  const restaurantsList = (restaurants || []).filter((restaurant) => {
    const matchesCategory =
      !selectedCategory || restaurant.category.name === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <FlatList
      data={restaurantsList}
      keyExtractor={(item) => item?._id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  );
};

export default RestaurantList;

const styles = StyleSheet.create({});
