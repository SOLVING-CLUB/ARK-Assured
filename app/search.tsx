import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Search, ChevronLeft, Star, X, Heart, SlidersHorizontal } from "lucide-react-native";
import { useState } from "react";
import { PRODUCTS, CATEGORIES } from "../lib/data";
import { useWishlist } from "../lib/WishlistContext";
import { useCart } from "../lib/CartContext";

const NAVY = "#061429";
const GOLD = "#D4AF37";

const SORTS = ["Relevance", "Price: Low-High", "Price: High-Low", "Rating"];

export default function SearchScreen() {
  const router = useRouter();
  const { toggle, isWishlisted } = useWishlist();
  const { addItem } = useCart();
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [sort, setSort] = useState("Relevance");
  const [showSort, setShowSort] = useState(false);

  let results = PRODUCTS.filter((p) => {
    const matchQ = query === "" || p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase());
    const matchCat = selectedCat === "All" || p.category === selectedCat;
    return matchQ && matchCat;
  });

  if (sort === "Price: Low-High") results = [...results].sort((a, b) => a.price - b.price);
  if (sort === "Price: High-Low") results = [...results].sort((a, b) => b.price - a.price);
  if (sort === "Rating") results = [...results].sort((a, b) => b.rating - a.rating);

  const cats = ["All", ...CATEGORIES.map((c) => c.name)];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Search bar */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 10, gap: 10, borderBottomWidth: 1, borderBottomColor: "#f1f5f9" }}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: "#f8fafc", alignItems: "center", justifyContent: "center" }}>
          <ChevronLeft size={20} color={NAVY} />
        </TouchableOpacity>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: "#f8fafc", borderRadius: 14, paddingHorizontal: 12, borderWidth: 1, borderColor: "#e2e8f0" }}>
          <Search size={15} color="#9ca3af" />
          <TextInput
            autoFocus
            placeholder="Search hardware, tiles, flooring…"
            placeholderTextColor="#9ca3af"
            value={query}
            onChangeText={setQuery}
            style={{ flex: 1, paddingVertical: 11, paddingLeft: 8, fontSize: 14, color: NAVY }}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <X size={15} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category pills */}
      <FlatList
        data={cats}
        keyExtractor={(i) => i}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, borderBottomWidth: 1, borderBottomColor: "#f8fafc" }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCat(item)}
            style={{ backgroundColor: selectedCat === item ? NAVY : "#f1f5f9", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7 }}
          >
            <Text style={{ color: selectedCat === item ? GOLD : "#4b5563", fontSize: 12, fontWeight: "700" }}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Results bar */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 10 }}>
        <Text style={{ color: "#6b7280", fontSize: 13 }}>
          <Text style={{ color: NAVY, fontWeight: "800" }}>{results.length}</Text> results{query ? ` for "${query}"` : ""}
        </Text>
        <TouchableOpacity onPress={() => setShowSort(!showSort)} style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#f8fafc", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: "#e2e8f0" }}>
          <SlidersHorizontal size={13} color={NAVY} />
          <Text style={{ color: NAVY, fontSize: 12, fontWeight: "700" }}>Sort: {sort.split(":")[0]}</Text>
        </TouchableOpacity>
      </View>

      {/* Sort dropdown */}
      {showSort && (
        <View style={{ marginHorizontal: 16, marginBottom: 8, backgroundColor: "#fff", borderRadius: 14, borderWidth: 1, borderColor: "#e2e8f0", overflow: "hidden", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 5 }}>
          {SORTS.map((s, i) => (
            <TouchableOpacity key={s} onPress={() => { setSort(s); setShowSort(false); }}
              style={{ paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: i < SORTS.length - 1 ? 1 : 0, borderBottomColor: "#f8fafc", backgroundColor: sort === s ? "#FDF8E7" : "#fff", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: NAVY, fontSize: 13, fontWeight: sort === s ? "800" : "500" }}>{s}</Text>
              {sort === s && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: GOLD }} />}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Grid */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
        columnWrapperStyle={{ gap: 10, marginBottom: 10 }}
        ListEmptyComponent={
          <View style={{ alignItems: "center", paddingVertical: 60 }}>
            <Search size={48} color="#e2e8f0" />
            <Text style={{ color: "#9ca3af", fontSize: 16, marginTop: 14, fontWeight: "600" }}>No products found</Text>
            <Text style={{ color: "#d1d5db", fontSize: 13, marginTop: 4 }}>Try a different search or category</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: "#fff", borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: "#f1f5f9", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 }}
            onPress={() => router.push(`/product/${item.id}` as any)}
            activeOpacity={0.88}
          >
            <View style={{ height: 120, backgroundColor: "#f8fafc" }}>
              <Image source={{ uri: item.images[0] }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
              {!item.inStock && (
                <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.38)", alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "#fff", fontSize: 11, fontWeight: "700" }}>Out of Stock</Text>
                </View>
              )}
              <TouchableOpacity
                onPress={(e) => { e.stopPropagation(); toggle({ id: item.id, name: item.name, price: item.price, originalPrice: item.originalPrice, unit: item.unit, image: item.images[0], category: item.category }); }}
                style={{ position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: 14, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}
              >
                <Heart size={14} color={isWishlisted(item.id) ? "#ef4444" : "#9ca3af"} fill={isWishlisted(item.id) ? "#ef4444" : "transparent"} />
              </TouchableOpacity>
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: "#6b7280", fontSize: 10, marginBottom: 2 }}>{item.category}</Text>
              <Text style={{ color: NAVY, fontSize: 12, fontWeight: "700", lineHeight: 17 }} numberOfLines={2}>{item.name}</Text>
              <Text style={{ color: "#9ca3af", fontSize: 10, marginTop: 2 }}>{item.unit}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                <Star size={10} color={GOLD} fill={GOLD} />
                <Text style={{ color: "#6b7280", fontSize: 11, marginLeft: 3 }}>{item.rating}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 3 }}>
                <Text style={{ color: NAVY, fontSize: 14, fontWeight: "900" }}>₹{item.price.toLocaleString()}</Text>
                <Text style={{ color: "#9ca3af", fontSize: 10, marginLeft: 5, textDecorationLine: "line-through" }}>₹{item.originalPrice.toLocaleString()}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
