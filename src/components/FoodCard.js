import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const FoodCard = ({ menuItem, onAddToCart }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: menuItem.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{menuItem.name}</Text>
        <Text style={styles.details}>${menuItem.price.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onAddToCart(menuItem)}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    flexDirection: "row", // Align image and text in a row
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  image: {
    width: 80, // Consistent image size
    height: 80,
    borderRadius: 8,
    marginRight: 12, // Space between image and text
  },
  content: {
    flex: 1, // Takes up the remaining space
  },
  name: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 20,
    width: "50%",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
  },
});
