import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react-native";
import { useCart } from "../lib/CartContext";

const NAVY = "#061429";
const GOLD = "#D4AF37";

export default function CartScreen() {
  const router = useRouter();
  const { items, removeItem, updateQty, total } = useCart();
  const delivery = total >= 10000 ? 0 : 299;
  const grandTotal = total + delivery;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#f1f5f9" }}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: "#f8fafc", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
          <ChevronLeft size={20} color={NAVY} />
        </TouchableOpacity>
        <Text style={{ color: NAVY, fontSize: 16, fontWeight: "900", flex: 1 }}>My Cart</Text>
        {items.length > 0 && <Text style={{ color: "#9ca3af", fontSize: 13 }}>{items.length} item{items.length > 1 ? "s" : ""}</Text>}
      </View>

      {items.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ShoppingBag size={64} color="#e2e8f0" />
          <Text style={{ color: "#9ca3af", fontSize: 16, fontWeight: "600", marginTop: 16 }}>Your cart is empty</Text>
          <Text style={{ color: "#d1d5db", fontSize: 13, marginTop: 4 }}>Add products to get started</Text>
          <TouchableOpacity onPress={() => router.replace("/(tabs)/home" as any)}
            style={{ marginTop: 20, backgroundColor: NAVY, borderRadius: 14, paddingHorizontal: 28, paddingVertical: 12 }}>
            <Text style={{ color: GOLD, fontSize: 14, fontWeight: "800" }}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 200 }}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: "#fff", borderRadius: 16, padding: 14, flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderColor: "#f1f5f9" }}>
                <View style={{ width: 72, height: 72, borderRadius: 12, overflow: "hidden", backgroundColor: "#f8fafc" }}>
                  <Image source={{ uri: item.image }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: NAVY, fontSize: 13, fontWeight: "700", lineHeight: 18 }} numberOfLines={2}>{item.name}</Text>
                  <Text style={{ color: "#9ca3af", fontSize: 11, marginTop: 2 }}>{item.unit}</Text>
                  <Text style={{ color: NAVY, fontSize: 15, fontWeight: "900", marginTop: 6 }}>₹{(item.price * item.qty).toLocaleString()}</Text>
                </View>
                <View style={{ alignItems: "center", gap: 10 }}>
                  <TouchableOpacity onPress={() => removeItem(item.id)} style={{ width: 30, height: 30, borderRadius: 10, backgroundColor: "#fef2f2", alignItems: "center", justifyContent: "center" }}>
                    <Trash2 size={14} color="#ef4444" />
                  </TouchableOpacity>
                  <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#f8fafc", borderRadius: 10, overflow: "hidden" }}>
                    <TouchableOpacity onPress={() => updateQty(item.id, item.qty - 1)} style={{ width: 28, height: 28, alignItems: "center", justifyContent: "center" }}>
                      <Minus size={13} color={NAVY} />
                    </TouchableOpacity>
                    <Text style={{ width: 28, textAlign: "center", color: NAVY, fontSize: 14, fontWeight: "800" }}>{item.qty}</Text>
                    <TouchableOpacity onPress={() => updateQty(item.id, item.qty + 1)} style={{ width: 28, height: 28, alignItems: "center", justifyContent: "center" }}>
                      <Plus size={13} color={NAVY} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />

          {/* Order Summary */}
          <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#f1f5f9", padding: 16, paddingBottom: 24 }}>
            {delivery === 0 ? (
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#f0fdf4", borderRadius: 10, paddingVertical: 7, marginBottom: 12 }}>
                <Text style={{ color: "#16a34a", fontSize: 12, fontWeight: "700" }}>🚚  You've unlocked free delivery!</Text>
              </View>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#fdf8e7", borderRadius: 10, paddingVertical: 7, marginBottom: 12 }}>
                <Text style={{ color: NAVY, fontSize: 12, fontWeight: "600" }}>Add ₹{(10000 - total).toLocaleString()} more for free delivery</Text>
              </View>
            )}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
              <Text style={{ color: "#6b7280", fontSize: 13 }}>Subtotal</Text>
              <Text style={{ color: NAVY, fontSize: 13, fontWeight: "700" }}>₹{total.toLocaleString()}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
              <Text style={{ color: "#6b7280", fontSize: 13 }}>Delivery</Text>
              <Text style={{ color: delivery === 0 ? "#16a34a" : NAVY, fontSize: 13, fontWeight: "700" }}>{delivery === 0 ? "FREE" : `₹${delivery}`}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 14, borderTopWidth: 1, borderTopColor: "#f1f5f9", paddingTop: 12 }}>
              <Text style={{ color: NAVY, fontSize: 15, fontWeight: "900" }}>Total</Text>
              <Text style={{ color: NAVY, fontSize: 17, fontWeight: "900" }}>₹{grandTotal.toLocaleString()}</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/checkout" as any)} activeOpacity={0.88}
              style={{ backgroundColor: NAVY, borderRadius: 16, paddingVertical: 15, alignItems: "center" }}>
              <Text style={{ color: GOLD, fontSize: 15, fontWeight: "900" }}>Proceed to Checkout →</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
