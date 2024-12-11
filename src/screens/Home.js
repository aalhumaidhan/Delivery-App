import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CategoriesList from "../components/CategoriesList";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryCard from "../components/CategoryCard";
import RestaurantList from "../components/RestaurantList";
import { SlidersHorizontal } from "lucide-react-native";

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F6F6F6",
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TextInput
          onChangeText={setSearch}
          value={search}
          autoCapitalize="none"
          placeholder="Search for restaurants"
          style={styles.searchBar}
        />
        <TouchableOpacity
          onPress={() => {
            console.log("Filter button pressed");
          }}
          style={styles.filter}
        >
          <SlidersHorizontal color="black" style={styles.filterButton} />
        </TouchableOpacity>
      </View>
      <View>
        <CategoriesList
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <RestaurantList
          selectedCategory={selectedCategory}
          searchQuery={search}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  searchBar: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    borderColor: "lightgray",
    marginBottom: 20,
    alignSelf: "flex-start",
    backgroundColor: "white",
    marginTop: 10,
    marginLeft: 10,
  },
  filter: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "lightgray",
    width: "50",
    height: "50",
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: "white",
  },
  filterButton: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
