import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, ShoppingCart, ChevronRight, Star, Heart } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { PRODUCTS, CATEGORIES } from "../../lib/data";
import { useCart } from "../../lib/CartContext";
import ArkLogo from "../../components/ArkLogo";

const { width } = Dimensions.get("window");
const NAVY = "#061429";
const GOLD = "#D4AF37";

const ADS = [
  { id: "1", title: "Bulk Hardware Orders", subtitle: "Save up to 30% on orders above ₹50,000", bg: "#FDF8E7" },
  { id: "2", title: "New: Modular Kitchen Range", subtitle: "Premium fittings now in stock", bg: "#EFF6FF" },
  { id: "3", title: "Free Delivery", subtitle: "On all orders above ₹10,000", bg: "#F0FDF4" },
];

export default function HomeScreen() {
  const router = useRouter();
  const { count } = useCart();
  const [adIndex, setAdIndex] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={{
        flexDirection: "row", alignItems: "center",
        paddingHorizontal: 16, paddingVertical: 10,
        backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#f1f5f9",
      }}>
        <ArkLogo size={38} showBg />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: NAVY, fontSize: 16, fontWeight: "900", letterSpacing: 1 }}>ARK ASSURED</Text>
          <Text style={{ color: GOLD, fontSize: 9, fontWeight: "700", letterSpacing: 1.5, marginTop: -1 }}>THE SEAL OF TRUST</Text>
        </View>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => router.push("/search" as any)} style={{ padding: 8, marginRight: 2 }}>
          <Search size={22} color={NAVY} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/cart" as any)} style={{ padding: 8 }}>
          <ShoppingCart size={22} color={NAVY} />
          {count > 0 && (
            <View style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16, borderRadius: 8, backgroundColor: GOLD, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: NAVY, fontSize: 9, fontWeight: "900" }}>{count}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={{ backgroundColor: NAVY, paddingVertical: 7 }}>
        <Text style={{ color: GOLD, textAlign: "center", fontSize: 11, fontWeight: "700", letterSpacing: 0.5 }}>
          🚚  Free delivery on orders above ₹10,000
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero greeting */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 8 }}>
          <Text style={{ color: NAVY, fontSize: 24, fontWeight: "900", lineHeight: 30 }}>
            Your Interior & Hardware Store
          </Text>
          <Text style={{ color: "#6b7280", fontSize: 13, marginTop: 6, lineHeight: 18 }}>
            Doors • Flooring • Tiles • Fittings • More
          </Text>
        </View>

        {/* Featured Products */}
        <View style={{ paddingTop: 16, paddingBottom: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, marginBottom: 14 }}>
            <Text style={{ color: NAVY, fontSize: 15, fontWeight: "800" }}>Featured Products</Text>
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => router.push("/search" as any)}>
              <Text style={{ color: GOLD, fontSize: 13, fontWeight: "700" }}>View all</Text>
              <ChevronRight size={14} color={GOLD} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={PRODUCTS}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ width: 172, backgroundColor: "#fff", borderRadius: 18, overflow: "hidden", borderWidth: 1, borderColor: "#e2e8f0", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 }}
                onPress={() => router.push(`/product/${item.id}` as any)}
                activeOpacity={0.88}
              >
                <View style={{ height: 136, backgroundColor: "#f8fafc" }}>
                  <Image source={{ uri: item.images[0] }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
                  {!item.inStock && (
                    <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center" }}>
                      <Text style={{ color: "#fff", fontSize: 11, fontWeight: "700" }}>Out of Stock</Text>
                    </View>
                  )}
                  <View style={{ position: "absolute", top: 8, right: 8, backgroundColor: "#fff", borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2 }}>
                    <Text style={{ color: "#16a34a", fontSize: 10, fontWeight: "800" }}>
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </Text>
                  </View>
                </View>
                <View style={{ padding: 12 }}>
                  <Text style={{ color: "#6b7280", fontSize: 10, marginBottom: 2 }}>{item.category}</Text>
                  <Text style={{ color: NAVY, fontSize: 12, fontWeight: "700", lineHeight: 18 }} numberOfLines={2}>{item.name}</Text>
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
        </View>

        {/* Ad Banner */}
        <View style={{ marginHorizontal: 16, marginVertical: 14, borderRadius: 16, overflow: "hidden" }}>
          <FlatList
            data={ADS}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => setAdIndex(Math.round(e.nativeEvent.contentOffset.x / (width - 32)))}
            renderItem={({ item }) => (
              <View style={{ width: width - 32, backgroundColor: item.bg, borderRadius: 16, padding: 20, height: 108, justifyContent: "center" }}>
                <Text style={{ color: NAVY, fontSize: 16, fontWeight: "900" }}>{item.title}</Text>
                <Text style={{ color: "#4b5563", fontSize: 13, marginTop: 5 }}>{item.subtitle}</Text>
                <View style={{ marginTop: 10, backgroundColor: NAVY, alignSelf: "flex-start", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5 }}>
                  <Text style={{ color: GOLD, fontSize: 11, fontWeight: "700" }}>Shop Now →</Text>
                </View>
              </View>
            )}
          />
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 8, gap: 6 }}>
            {ADS.map((_, i) => (
              <View key={i} style={{ width: i === adIndex ? 18 : 6, height: 6, borderRadius: 3, backgroundColor: i === adIndex ? NAVY : "#d1d5db" }} />
            ))}
          </View>
        </View>

        {/* Shop by Category */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 28, marginTop: 6 }}>
          <Text style={{ color: NAVY, fontSize: 15, fontWeight: "900", marginBottom: 14 }}>Shop by Category</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => router.push(`/category/${cat.id}` as any)}
                activeOpacity={0.82}
                style={{ width: (width - 56) / 3, backgroundColor: "#f8fafc", borderRadius: 16, paddingVertical: 16, paddingHorizontal: 10, alignItems: "center", borderWidth: 1, borderColor: "#e2e8f0" }}
              >
                <Text style={{ fontSize: 24, marginBottom: 8 }}>{cat.icon}</Text>
                <Text style={{ color: NAVY, fontSize: 10, fontWeight: "800", textAlign: "center", lineHeight: 14 }} numberOfLines={2}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
