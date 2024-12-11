import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { me } from "../api/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { deleteToken } from "../api/storage";

const Profile = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchProfile"],
    queryFn: me,
  });

  if (isLoading) {
    return <Text>Loading profile...</Text>;
  }

  if (isError) {
    return <Text>Error fetching profile data.</Text>;
  }

  const imageURL =
    "https://react-native-food-delivery-be.eapi.joincoded.com/media/image-1733815629767-920077457-image.jpg";
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView style={styles.container}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Image source={{ uri: imageURL }} style={styles.profileImage} />
          <Text style={styles.username}>{data.username}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Orders Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Orders</Text>
          <View style={styles.ordersContainer}>
            <Text style={styles.ordersText}>
              Total Orders: <Text style={styles.ordersCount}>12</Text>{" "}
              {/* Replace with real data */}
            </Text>
            <TouchableOpacity style={styles.viewOrdersButton}>
              <Text style={styles.viewOrdersText}>View Orders</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <TouchableOpacity style={styles.settingsOption}>
            <Text style={styles.settingsText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsOption}
            onPress={async () => {
              await deleteToken();
              setAuthenticated(false);
            }}
          >
            <Text style={styles.settingsText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  header: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  username: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: "lightblue",
    padding: 8,
    borderRadius: 20,
    width: "40%",
    alignItems: "center",
  },
  editButtonText: {
    color: "black",
    fontWeight: "600",
  },
  section: {
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  ordersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ordersText: {
    fontSize: 16,
    color: "#666",
  },
  ordersCount: {
    fontWeight: "700",
    color: "#4caf50",
  },
  viewOrdersButton: {
    backgroundColor: "lightblue",
    padding: 8,
    borderRadius: 20,
  },
  viewOrdersText: {
    color: "black",
    fontWeight: "600",
  },
  settingsOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  settingsText: {
    fontSize: 16,
    color: "#333",
  },
});
