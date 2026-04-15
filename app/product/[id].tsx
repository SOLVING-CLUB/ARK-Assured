import {
  View, Text, ScrollView, TouchableOpacity, Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, ShoppingCart, Star, Minus, Plus, Heart } from "lucide-react-native";
import { useState } from "react";
import { PRODUCTS } from "../../lib/data";
import { useCart } from "../../lib/CartContext";
import { useWishlist } from "../../lib/WishlistContext";

const NAVY = "#061429";
const GOLD = "#D4AF37";

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const product = PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];

  const { addItem, count } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const [qty, setQty] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, unit: product.unit, image: product.images[0] }, qty);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  const handleWishlist = () => {
    toggle({ id: product.id, name: product.name, price: product.price, originalPrice: product.originalPrice, unit: product.unit, image: product.images[0], category: product.category });
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#f1f5f9" }}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: "#f8fafc", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
          <ChevronLeft size={20} color={NAVY} />
        </TouchableOpacity>
        <Text style={{ color: NAVY, fontSize: 15, fontWeight: "800", flex: 1 }} numberOfLines={1}>{product.name}</Text>
        <TouchableOpacity onPress={handleWishlist} style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: "#f8fafc", alignItems: "center", justifyContent: "center", marginLeft: 8 }}>
          <Heart size={18} color={wishlisted ? "#ef4444" : NAVY} fill={wishlisted ? "#ef4444" : "transparent"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/cart" as any)} style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: "#f8fafc", alignItems: "center", justifyContent: "center", marginLeft: 8 }}>
          <ShoppingCart size={18} color={NAVY} />
          {count > 0 && (
            <View style={{ position: "absolute", top: 4, right: 4, width: 14, height: 14, borderRadius: 7, backgroundColor: GOLD, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: NAVY, fontSize: 8, fontWeight: "900" }}>{count}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16, paddingBottom: 30 }}>
          <View style={{ borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 18, padding: 12, backgroundColor: "#fff" }}>
            <View style={{ height: 230, borderRadius: 14, overflow: "hidden", backgroundColor: "#f8fafc" }}>
              <Image source={{ uri: product.images[0] }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
              {!product.inStock && (
                <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.42)", alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "#fff", fontSize: 18, fontWeight: "900" }}>Out of Stock</Text>
                </View>
              )}
              <View style={{ position: "absolute", top: 10, left: 10, backgroundColor: "#16a34a", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 }}>
                <Text style={{ color: "#fff", fontSize: 11, fontWeight: "800" }}>{discount}% OFF</Text>
              </View>
            </View>

            <Text style={{ color: NAVY, fontSize: 20, fontWeight: "900", marginTop: 12 }}>{product.name}</Text>
            <Text style={{ color: "#6b7280", fontSize: 13, marginTop: 5, lineHeight: 20 }}>{product.description}</Text>

            <View style={{ marginTop: 12, borderWidth: 1, borderColor: "#dbeafe", borderRadius: 14, overflow: "hidden", flexDirection: "row", backgroundColor: "#eff6ff" }}>
              {[
                { label: "<10", price: product.price },
                { label: "10 - 50", price: Math.round(product.price * 0.93) },
                { label: ">50", price: Math.round(product.price * 0.85) },
              ].map((tier, idx) => (
                <View key={tier.label} style={{ flex: 1, paddingVertical: 10, alignItems: "center", borderLeftWidth: idx === 0 ? 0 : 1, borderLeftColor: "#bfdbfe" }}>
                  <Text style={{ color: NAVY, fontSize: 19, fontWeight: "900" }}>₹{tier.price.toLocaleString()}</Text>
                  <Text style={{ color: "#334155", fontSize: 11, fontWeight: "700", marginTop: 2 }}>{tier.label}</Text>
                </View>
              ))}
            </View>

            <View style={{ marginTop: 14, borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 12, flexDirection: "row", alignItems: "center", overflow: "hidden", height: 46 }}>
              <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))} style={{ width: 54, height: "100%", alignItems: "center", justifyContent: "center", borderRightWidth: 1, borderRightColor: "#cbd5e1" }}>
                <Minus size={18} color={NAVY} />
              </TouchableOpacity>
              <Text style={{ flex: 1, textAlign: "center", color: NAVY, fontSize: 17, fontWeight: "800" }}>Quantity {qty}</Text>
              <TouchableOpacity onPress={() => setQty(qty + 1)} style={{ width: 54, height: "100%", alignItems: "center", justifyContent: "center", borderLeftWidth: 1, borderLeftColor: "#cbd5e1" }}>
                <Plus size={18} color={NAVY} />
              </TouchableOpacity>
            </View>

            {product.inStock && (
              <View style={{ flexDirection: "row", marginTop: 14, gap: 10 }}>
                <TouchableOpacity
                  onPress={handleAddToCart}
                  activeOpacity={0.88}
                  style={{ flex: 1, borderWidth: 1.8, borderColor: NAVY, borderRadius: 12, paddingVertical: 12, alignItems: "center" }}
                >
                  <Text style={{ color: NAVY, fontSize: 14, fontWeight: "800" }}>{addedFeedback ? "Added ✓" : "Add to Cart"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleAddToCart();
                    router.push("/cart" as any);
                  }}
                  activeOpacity={0.88}
                  style={{ flex: 1, backgroundColor: NAVY, borderRadius: 12, paddingVertical: 12, alignItems: "center" }}
                >
                  <Text style={{ color: GOLD, fontSize: 14, fontWeight: "900" }}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={{ marginTop: 18 }}>
              <Text style={{ color: NAVY, fontSize: 15, fontWeight: "900" }}>Additional Details</Text>
              <View style={{ marginTop: 8, gap: 6 }}>
                <Text style={{ color: "#475569", fontSize: 13 }}>• Category: {product.category}</Text>
                <Text style={{ color: "#475569", fontSize: 13 }}>• Unit: {product.unit}</Text>
                <Text style={{ color: "#475569", fontSize: 13 }}>• Availability: {product.inStock ? "In Stock" : "Out of Stock"}</Text>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={{ color: NAVY, fontSize: 15, fontWeight: "900" }}>Reviews</Text>
              <View style={{ marginTop: 8, flexDirection: "row", alignItems: "center" }}>
                <Star size={14} color={GOLD} fill={GOLD} />
                <Text style={{ color: NAVY, fontSize: 14, fontWeight: "800", marginLeft: 6 }}>
                  {product.rating} ({product.reviews} reviews)
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
