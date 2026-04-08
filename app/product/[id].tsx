import {
  View, Text, ScrollView, TouchableOpacity, Image, FlatList, Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, ShoppingCart, Star, Minus, Plus, Share2, Heart } from "lucide-react-native";
import { useState } from "react";
import { PRODUCTS } from "../../lib/data";
import { useCart } from "../../lib/CartContext";
import { useWishlist } from "../../lib/WishlistContext";

const { width } = Dimensions.get("window");
const NAVY = "#061429";
const GOLD = "#D4AF37";

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const product = PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];
  const similar = PRODUCTS.filter((p) => p.id !== id && p.category === product.category).slice(0, 4);

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
        {/* Product Image */}
        <View style={{ height: 260, backgroundColor: "#f8fafc" }}>
          <Image source={{ uri: product.images[0] }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
          {!product.inStock && (
            <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.42)", alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "900" }}>Out of Stock</Text>
            </View>
          )}
          <View style={{ position: "absolute", bottom: 12, right: 12, backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, flexDirection: "row", alignItems: "center" }}>
            <Star size={12} color={GOLD} fill={GOLD} />
            <Text style={{ color: NAVY, fontSize: 12, fontWeight: "800", marginLeft: 4 }}>{product.rating}</Text>
            <Text style={{ color: "#9ca3af", fontSize: 11, marginLeft: 3 }}>({product.reviews})</Text>
          </View>
          <View style={{ position: "absolute", top: 12, left: 12, backgroundColor: "#16a34a", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 }}>
            <Text style={{ color: "#fff", fontSize: 11, fontWeight: "800" }}>{discount}% OFF</Text>
          </View>
        </View>

        <View style={{ padding: 16 }}>
          {/* Category tag */}
          <View style={{ alignSelf: "flex-start", backgroundColor: "#FDF8E7", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, marginBottom: 10, borderWidth: 1, borderColor: `${GOLD}33` }}>
            <Text style={{ color: NAVY, fontSize: 11, fontWeight: "700" }}>{product.category}</Text>
          </View>

          <Text style={{ color: NAVY, fontSize: 20, fontWeight: "900", lineHeight: 26 }}>{product.name}</Text>
          <Text style={{ color: "#6b7280", fontSize: 13, marginTop: 4 }}>{product.unit}</Text>

          {/* Price row */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 14 }}>
            <Text style={{ color: NAVY, fontSize: 28, fontWeight: "900" }}>₹{product.price.toLocaleString()}</Text>
            <View>
              <Text style={{ color: "#9ca3af", fontSize: 13, textDecorationLine: "line-through" }}>₹{product.originalPrice.toLocaleString()}</Text>
              <Text style={{ color: "#16a34a", fontSize: 12, fontWeight: "800" }}>Save ₹{(product.originalPrice - product.price).toLocaleString()}</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={{ color: "#4b5563", fontSize: 13, lineHeight: 22, marginTop: 14 }}>{product.description}</Text>

          {/* Quantity */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 18 }}>
            <Text style={{ color: NAVY, fontSize: 14, fontWeight: "800" }}>Quantity</Text>
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#f8fafc", borderRadius: 12, borderWidth: 1, borderColor: "#e2e8f0", overflow: "hidden" }}>
              <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))} style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}>
                <Minus size={15} color={NAVY} />
              </TouchableOpacity>
              <Text style={{ width: 36, textAlign: "center", color: NAVY, fontSize: 16, fontWeight: "900" }}>{qty}</Text>
              <TouchableOpacity onPress={() => setQty(qty + 1)} style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}>
                <Plus size={15} color={NAVY} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bulk Pricing */}
          <View style={{ backgroundColor: "#f8fafc", borderRadius: 16, padding: 14, marginTop: 16, borderWidth: 1, borderColor: "#f1f5f9" }}>
            <Text style={{ color: NAVY, fontSize: 13, fontWeight: "800", marginBottom: 10 }}>Bulk Pricing</Text>
            {[
              { qty: "1–10 units", price: product.price },
              { qty: "11–50 units", price: Math.round(product.price * 0.93) },
              { qty: "50+ units", price: Math.round(product.price * 0.85) },
            ].map((tier, i, arr) => (
              <View key={tier.qty} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: i < arr.length - 1 ? 1 : 0, borderBottomColor: "#e2e8f0" }}>
                <Text style={{ color: "#6b7280", fontSize: 13 }}>{tier.qty}</Text>
                <Text style={{ color: NAVY, fontSize: 13, fontWeight: "800" }}>₹{tier.price.toLocaleString()}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Similar Products */}
        {similar.length > 0 && (
          <View style={{ paddingBottom: 120 }}>
            <Text style={{ color: NAVY, fontSize: 15, fontWeight: "800", paddingHorizontal: 16, marginBottom: 12 }}>Similar Products</Text>
            <FlatList
              data={similar}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ width: 130, backgroundColor: "#fff", borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: "#f1f5f9" }}
                  onPress={() => router.replace(`/product/${item.id}` as any)}
                  activeOpacity={0.85}
                >
                  <Image source={{ uri: item.images[0] }} style={{ width: 130, height: 96 }} resizeMode="cover" />
                  <View style={{ padding: 8 }}>
                    <Text style={{ color: NAVY, fontSize: 11, fontWeight: "700" }} numberOfLines={2}>{item.name}</Text>
                    <Text style={{ color: NAVY, fontSize: 13, fontWeight: "900", marginTop: 4 }}>₹{item.price.toLocaleString()}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </ScrollView>

      {/* Bottom CTA */}
      {product.inStock && (
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", paddingHorizontal: 16, paddingVertical: 12, paddingBottom: 24, borderTopWidth: 1, borderTopColor: "#f1f5f9", flexDirection: "row", gap: 10 }}>
          <TouchableOpacity onPress={handleAddToCart} activeOpacity={0.88}
            style={{ flex: 1, borderWidth: 2, borderColor: NAVY, borderRadius: 14, paddingVertical: 14, alignItems: "center" }}>
            <Text style={{ color: NAVY, fontSize: 14, fontWeight: "800" }}>
              {addedFeedback ? "Added ✓" : "Add to Cart"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { handleAddToCart(); router.push("/cart" as any); }}
            activeOpacity={0.88}
            style={{ flex: 1, backgroundColor: NAVY, borderRadius: 14, paddingVertical: 14, alignItems: "center" }}>
            <Text style={{ color: GOLD, fontSize: 14, fontWeight: "900" }}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
