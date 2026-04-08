import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronLeft, Heart, ShoppingCart, Trash2 } from "lucide-react-native";
import { useWishlist } from "../lib/WishlistContext";
import { useCart } from "../lib/CartContext";

const NAVY = "#061429";
const GOLD = "#D4AF37";

export default function WishlistScreen() {
  const router = useRouter();
  const { items, toggle } = useWishlist();
  const { addItem } = useCart();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#f1f5f9" }}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: "#f8fafc", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
          <ChevronLeft size={20} color={NAVY} />
        </TouchableOpacity>
        <Text style={{ color: NAVY, fontSize: 16, fontWeight: "900", flex: 1 }}>Wishlist</Text>
        {items.length > 0 && <Text style={{ color: "#9ca3af", fontSize: 13 }}>{items.length} saved</Text>}
      </View>

      {items.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Heart size={64} color="#e2e8f0" />
          <Text style={{ color: "#9ca3af", fontSize: 16, fontWeight: "600", marginTop: 16 }}>No saved items</Text>
          <Text style={{ color: "#d1d5db", fontSize: 13, marginTop: 4 }}>Tap the heart icon on any product to save it</Text>
          <TouchableOpacity onPress={() => router.replace("/(tabs)/home" as any)}
            style={{ marginTop: 20, backgroundColor: NAVY, borderRadius: 14, paddingHorizontal: 28, paddingVertical: 12 }}>
            <Text style={{ color: GOLD, fontSize: 14, fontWeight: "800" }}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: "#fff", borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "#f1f5f9", flexDirection: "row" }}>
              <TouchableOpacity onPress={() => router.push(`/product/${item.id}` as any)} style={{ width: 100, height: 100, backgroundColor: "#f8fafc" }}>
                <Image source={{ uri: item.image }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
              </TouchableOpacity>
              <View style={{ flex: 1, padding: 12, justifyContent: "space-between" }}>
                <View>
                  <Text style={{ color: "#6b7280", fontSize: 10 }}>{item.category}</Text>
                  <Text style={{ color: NAVY, fontSize: 13, fontWeight: "700", lineHeight: 18, marginTop: 2 }} numberOfLines={2}>{item.name}</Text>
                  <Text style={{ color: "#9ca3af", fontSize: 11, marginTop: 2 }}>{item.unit}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                  <View>
                    <Text style={{ color: NAVY, fontSize: 15, fontWeight: "900" }}>₹{item.price.toLocaleString()}</Text>
                    <Text style={{ color: "#9ca3af", fontSize: 10, textDecorationLine: "line-through" }}>₹{item.originalPrice.toLocaleString()}</Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <TouchableOpacity
                      onPress={() => { addItem({ id: item.id, name: item.name, price: item.price, unit: item.unit, image: item.image }); }}
                      style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: NAVY, alignItems: "center", justifyContent: "center" }}>
                      <ShoppingCart size={15} color={GOLD} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggle(item)}
                      style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: "#fef2f2", alignItems: "center", justifyContent: "center" }}>
                      <Trash2 size={15} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
