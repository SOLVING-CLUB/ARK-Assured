import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Star, Heart } from "lucide-react-native";
import { PRODUCTS, CATEGORIES } from "../../lib/data";
import { useWishlist } from "../../lib/WishlistContext";

const NAVY = "#061429";
const GOLD = "#D4AF37";

export default function CategoryPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { toggle, isWishlisted } = useWishlist();
  const cat = CATEGORIES.find((c) => c.id === id);
  const products = cat ? PRODUCTS.filter((p) => p.category === cat.name) : PRODUCTS;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#f1f5f9" }}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: "#f8fafc", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
          <ChevronLeft size={20} color={NAVY} />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, marginRight: 8 }}>{cat?.icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ color: NAVY, fontSize: 16, fontWeight: "900" }}>{cat?.name ?? "All Products"}</Text>
          <Text style={{ color: "#9ca3af", fontSize: 12, marginTop: 1 }}>{products.length} product{products.length !== 1 ? "s" : ""}</Text>
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 12, paddingBottom: 28 }}
        columnWrapperStyle={{ gap: 10, marginBottom: 10 }}
        ListEmptyComponent={
          <View style={{ alignItems: "center", paddingVertical: 60 }}>
            <Text style={{ color: "#9ca3af", fontSize: 15 }}>No products in this category</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: "#fff", borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "#f1f5f9", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 }}
            onPress={() => router.push(`/product/${item.id}` as any)}
            activeOpacity={0.88}
          >
            <View style={{ height: 130, backgroundColor: "#f8fafc" }}>
              <Image source={{ uri: item.images[0] }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
              {!item.inStock && (
                <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.38)", alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "#fff", fontSize: 11, fontWeight: "700" }}>Out of Stock</Text>
                </View>
              )}
              <View style={{ position: "absolute", top: 8, left: 8, backgroundColor: "#fff", borderRadius: 8, paddingHorizontal: 6, paddingVertical: 3 }}>
                <Text style={{ color: "#16a34a", fontSize: 10, fontWeight: "800" }}>
                  {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                </Text>
              </View>
              <TouchableOpacity
                onPress={(e) => { e.stopPropagation(); toggle({ id: item.id, name: item.name, price: item.price, originalPrice: item.originalPrice, unit: item.unit, image: item.images[0], category: item.category }); }}
                style={{ position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: 14, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}
              >
                <Heart size={14} color={isWishlisted(item.id) ? "#ef4444" : "#9ca3af"} fill={isWishlisted(item.id) ? "#ef4444" : "transparent"} />
              </TouchableOpacity>
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: NAVY, fontSize: 12, fontWeight: "700", lineHeight: 17 }} numberOfLines={2}>{item.name}</Text>
              <Text style={{ color: "#9ca3af", fontSize: 10, marginTop: 2 }}>{item.unit}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                <Star size={10} color={GOLD} fill={GOLD} />
                <Text style={{ color: "#6b7280", fontSize: 11, marginLeft: 3 }}>{item.rating} ({item.reviews})</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 4 }}>
                <Text style={{ color: NAVY, fontSize: 14, fontWeight: "900" }}>₹{item.price.toLocaleString()}</Text>
                <Text style={{ color: "#9ca3af", fontSize: 11, marginLeft: 5, textDecorationLine: "line-through" }}>₹{item.originalPrice.toLocaleString()}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
