import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CartProvider } from "../lib/CartContext";
import { WishlistProvider } from "../lib/WishlistContext";
import { AuthProvider } from "../lib/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <StatusBar style="light" backgroundColor="#061429" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#061429" },
            }}
          />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
