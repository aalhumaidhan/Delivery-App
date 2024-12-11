import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../api/restaurants";

const CategoriesList = ({ setSelectedCategory, selectedCategory }) => {
  const { data: categories } = useQuery({
    queryKey: ["fetchCategories"],
    queryFn: getAllCategories,
  });

  const handleCategoryPress = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      return;
    } else {
      setSelectedCategory(categoryName);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item?.name)}>
      <CategoryCard
        name={item?.name}
        image={item?.image}
        isSelected={selectedCategory === item?.name}
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item?._id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
    // <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    //   {restaurantCategories.map((category) => (
    //     <TouchableOpacity
    //       key={category.id}
    //       onPress={() => {
    //         handleCategoryPress(category.categoryName);
    //       }}
    //     >
    //       <CategoryCard
    //         name={category.categoryName}
    //         image={category.categoryImage}
    //         isSelected={selectedCategory === category.categoryName}
    //       />
    //     </TouchableOpacity>
    //   ))}
    // </ScrollView>
  );
};

export default CategoriesList;

const styles = StyleSheet.create({});
