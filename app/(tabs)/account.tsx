import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, useRouter } from "expo-router";
import { User, ShoppingBag, Heart, MapPin, Bell, HelpCircle, LogOut, ChevronRight, Shield } from "lucide-react-native";
import { useMemo, useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import { useWishlist } from "../../lib/WishlistContext";

const NAVY = "#061429";
const GOLD = "#D4AF37";

export default function AccountScreen() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [notifications, setNotifications] = useState(true);

  const MENU = useMemo(() => [
    { icon: ShoppingBag, label: "My Orders", sub: "Track your orders", onPress: () => {} },
    { icon: Heart, label: "Wishlist", sub: `${wishlistItems.length} saved items`, onPress: () => router.push("/wishlist" as any) },
    { icon: MapPin, label: "Saved Addresses", sub: "Manage delivery addresses", onPress: () => {} },
    { icon: Bell, label: "Notifications", sub: null, toggle: true },
    { icon: Shield, label: "Privacy & Security", sub: null, onPress: () => {} },
    { icon: HelpCircle, label: "Help & Support", sub: null, onPress: () => {} },
  ], [router, wishlistItems.length]);

  if (!isLoggedIn) {
    return <Redirect href="/auth" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: NAVY }}>
      <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Profile Card */}
      <View style={{ backgroundColor: NAVY, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
          <View style={{ width: 60, height: 60, borderRadius: 18, backgroundColor: GOLD, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: NAVY, fontSize: 22, fontWeight: "900" }}>
              {user?.name?.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "900" }}>{user?.name}</Text>
            <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 }}>{user?.email}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 5 }}>
              <View style={{ backgroundColor: user?.role === "professional" ? GOLD : "#25D366", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
                <Text style={{ color: NAVY, fontSize: 10, fontWeight: "900" }}>
                  {user?.role === "professional" ? "PROFESSIONAL" : "CUSTOMER"}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={{ borderWidth: 1, borderColor: "rgba(255,255,255,0.25)", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 }}>
            <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={{ flexDirection: "row", backgroundColor: "#fff", marginHorizontal: 16, marginTop: -1, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "#f1f5f9", marginBottom: 14 }}>
        {[
          { label: "Orders", value: "12" },
          { label: "Wishlist", value: String(wishlistItems.length) },
          { label: "Reviews", value: "4" },
        ].map((stat, i) => (
          <View key={stat.label} style={{ flex: 1, alignItems: "center", paddingVertical: 14, borderRightWidth: i < 2 ? 1 : 0, borderRightColor: "#f1f5f9" }}>
            <Text style={{ color: NAVY, fontSize: 20, fontWeight: "900" }}>{stat.value}</Text>
            <Text style={{ color: "#9ca3af", fontSize: 11, marginTop: 2 }}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 16, backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, borderColor: "#f1f5f9", overflow: "hidden", marginBottom: 12 }}>
          {MENU.map((item, i) => (
            <TouchableOpacity key={item.label} onPress={item.onPress}
              style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: i < MENU.length - 1 ? 1 : 0, borderBottomColor: "#f9fafb" }}
              activeOpacity={0.7}>
              <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: "#f8fafc", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                <item.icon size={16} color={NAVY} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: NAVY, fontSize: 14, fontWeight: "700" }}>{item.label}</Text>
                {item.sub && <Text style={{ color: "#9ca3af", fontSize: 11, marginTop: 1 }}>{item.sub}</Text>}
              </View>
              {item.toggle ? (
                <Switch value={notifications} onValueChange={setNotifications} trackColor={{ false: "#e5e7eb", true: NAVY }} thumbColor={notifications ? GOLD : "#f9fafb"} />
              ) : (
                <ChevronRight size={16} color="#d1d5db" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={logout}
          style={{ marginHorizontal: 16, marginBottom: 32, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 14, paddingVertical: 14, borderWidth: 1.5, borderColor: "#fee2e2" }}
          activeOpacity={0.85}>
          <LogOut size={16} color="#ef4444" />
          <Text style={{ color: "#ef4444", fontSize: 14, fontWeight: "800" }}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}
