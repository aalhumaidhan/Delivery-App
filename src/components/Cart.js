import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CartContext from "../context/CartContext";

const Cart = () => {
  const { cartItems, updateItemQuantity, removeItemFromCart } =
    useContext(CartContext);

  const calculateTotal = () =>
    cartItems
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);

  const incrementQuantity = (id) => {
    const item = cartItems.find((cartItem) => cartItem.id === id);
    if (item) {
      updateItemQuantity(id, item.quantity + 1);
    }
  };

  const decrementQuantity = (id) => {
    const item = cartItems.find((cartItem) => cartItem.id === id);
    if (item) {
      const newQuantity = Math.max(item.quantity - 1, 1);
      updateItemQuantity(id, newQuantity);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => decrementQuantity(item.id)}
            style={styles.minusButton}
          >
            <Text style={styles.minusText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => incrementQuantity(item.id)}
            style={styles.plusButton}
          >
            <Text style={styles.plusText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.details}>
          ${(item.quantity * item.price).toFixed(2)}
        </Text>
        <TouchableOpacity
          onPress={() => removeItemFromCart(item.id)}
          style={styles.removeButton}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F6F6F6",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Shopping Cart</Text>

        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.cartList}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalAmount}>${calculateTotal()}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => alert("Proceeding to Checkout")}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  cartList: {
    flexGrow: 1,
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  details: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4caf50",
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  minusText: {
    color: "#f44336",
    fontWeight: "bold",
    fontSize: 24,
  },
  plusText: {
    color: "#4caf50",
    fontWeight: "bold",
    fontSize: 24,
  },
  quantityText: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  removeButton: {
    marginTop: 8,
  },
  removeText: {
    color: "#f44336",
    fontWeight: "600",
    fontSize: 14,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4caf50",
  },
  checkoutButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "lightblue",
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
});
