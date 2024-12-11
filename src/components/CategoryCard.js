import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const CategoryCard = ({ name, image, isSelected }) => {
  return (
    <View style={[styles.card, isSelected && styles.selectedCard]}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
    marginTop: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 6,
    width: 110,
    height: 90,
    justifyContent: "center",
  },
  image: {
    height: 25,
    width: 45,
    marginBottom: 5,
  },
  selectedCard: {
    borderColor: "#333",
    borderWidth: 2,
  },
});
