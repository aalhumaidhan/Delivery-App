import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Clock2, Star } from "lucide-react-native";

const RestaurantCard = ({ image, name, rating, delivery }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textCard}>
        <Text style={styles.name}>{name}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            gap: 5,
          }}
        >
          <Star color="darkslategrey" size="16" fill="darkslategrey" />
          <Text style={styles.rating}>{rating}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            gap: 5,
          }}
        >
          <Clock2 color="darkslategrey" size="16" />
          <Text style={styles.rating}>{delivery}</Text>
        </View>
      </View>
    </View>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    //alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 8,
    width: "95%",
    height: 150,
    alignSelf: "center",
    flexDirection: "row",
  },
  textCard: {
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 15,
  },
  image: {
    width: "40%",
    height: "120",
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  name: {
    fontSize: 18,
    color: "black",
    fontWeight: "600",
    alignSelf: "flex-start",
  },
  details: {
    marginTop: 10,
    fontSize: 18,
    color: "gray",
    fontWeight: "400",
    //alignSelf: "center",
    //alignItems: "flex-start",
  },
  rating: {
    fontSize: 16,
    fontWeight: "400",
  },
});
