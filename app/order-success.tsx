import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle, MessageCircle, Home, Package } from "lucide-react-native";

const NAVY = "#061429";
const GOLD = "#D4AF37";

export default function OrderSuccess() {
  const router = useRouter();
  const { phone, name } = useLocalSearchParams<{ phone: string; name: string }>();
  const orderId = `ARK-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 32 }}>
        {/* Success icon */}
        <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: "#f0fdf4", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <CheckCircle size={52} color="#16a34a" />
        </View>

        <Text style={{ color: NAVY, fontSize: 26, fontWeight: "900", textAlign: "center" }}>Order Placed!</Text>
        <Text style={{ color: "#6b7280", fontSize: 14, textAlign: "center", marginTop: 8, lineHeight: 22 }}>
          Thank you{name ? `, ${name}` : ""}. Your order has been confirmed and is being processed.
        </Text>

        {/* Order ID */}
        <View style={{ backgroundColor: "#f8fafc", borderRadius: 14, paddingVertical: 14, paddingHorizontal: 24, marginTop: 20, borderWidth: 1, borderColor: "#f1f5f9", alignItems: "center" }}>
          <Text style={{ color: "#9ca3af", fontSize: 11, fontWeight: "600", letterSpacing: 1 }}>ORDER ID</Text>
          <Text style={{ color: NAVY, fontSize: 18, fontWeight: "900", marginTop: 4, letterSpacing: 1 }}>{orderId}</Text>
        </View>

        {/* WhatsApp notice */}
        <View style={{ flexDirection: "row", alignItems: "flex-start", backgroundColor: "#f0fdf4", borderRadius: 14, padding: 14, marginTop: 20, gap: 10, borderWidth: 1, borderColor: "#d1fae5" }}>
          <MessageCircle size={18} color="#25D366" style={{ marginTop: 1 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: NAVY, fontSize: 13, fontWeight: "800" }}>WhatsApp Updates Activated</Text>
            <Text style={{ color: "#4b5563", fontSize: 12, marginTop: 3, lineHeight: 18 }}>
              Shipping & delivery updates will be sent to{"\n"}
              <Text style={{ fontWeight: "800" }}>+91 {phone}</Text> on WhatsApp.
            </Text>
          </View>
        </View>

        {/* Timeline */}
        <View style={{ width: "100%", marginTop: 24 }}>
          <Text style={{ color: NAVY, fontSize: 13, fontWeight: "800", marginBottom: 12 }}>What happens next?</Text>
          {[
            { label: "Order Confirmed", sub: "Just now", done: true },
            { label: "Processing & Packing", sub: "1–2 business days", done: false },
            { label: "Shipped", sub: "2–3 business days", done: false },
            { label: "Out for Delivery", sub: "3–5 business days", done: false },
          ].map((step, i) => (
            <View key={step.label} style={{ flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
              <View style={{ alignItems: "center" }}>
                <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: step.done ? "#16a34a" : "#e2e8f0", alignItems: "center", justifyContent: "center" }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: step.done ? "#fff" : "#9ca3af" }} />
                </View>
                {i < 3 && <View style={{ width: 2, height: 20, backgroundColor: "#e2e8f0", marginTop: 3 }} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: step.done ? "#16a34a" : NAVY, fontSize: 13, fontWeight: "700" }}>{step.label}</Text>
                <Text style={{ color: "#9ca3af", fontSize: 11, marginTop: 1 }}>{step.sub}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Bottom CTAs */}
      <View style={{ padding: 16, paddingBottom: 24, gap: 10, borderTopWidth: 1, borderTopColor: "#f1f5f9" }}>
        <TouchableOpacity onPress={() => router.replace("/(tabs)/home" as any)} activeOpacity={0.88}
          style={{ backgroundColor: NAVY, borderRadius: 14, paddingVertical: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Home size={16} color={GOLD} />
          <Text style={{ color: GOLD, fontSize: 14, fontWeight: "900" }}>Back to Home</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.88}
          style={{ borderWidth: 1.5, borderColor: "#e2e8f0", borderRadius: 14, paddingVertical: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Package size={16} color={NAVY} />
          <Text style={{ color: NAVY, fontSize: 14, fontWeight: "700" }}>Track Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
