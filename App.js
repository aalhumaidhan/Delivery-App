import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/navigation/MainNav/MainNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getToken } from "./src/api/storage";
import UserContext from "./src/context/UserContext";
import AuthNavigation from "./src/navigation/AuthNav/AuthNavigation";
import { CartProvider } from "./src/context/CartContext";

export default function App() {
  const queryClient = new QueryClient();
  const [authenticated, setAuthenticated] = useState(false);

  const checkToken = async () => {
    const token = await getToken();
    if (token) setAuthenticated(true);
  };

  useEffect(() => {
    checkToken();
  });
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <UserContext.Provider value={[authenticated, setAuthenticated]}>
            {authenticated ? <MainNavigation /> : <AuthNavigation />}
          </UserContext.Provider>
        </CartProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
});
