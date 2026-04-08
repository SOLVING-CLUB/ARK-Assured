import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronLeft, MapPin, MessageCircle, CheckCircle } from "lucide-react-native";
import { useState } from "react";
import { useCart } from "../lib/CartContext";

const NAVY = "#061429";
const GOLD = "#D4AF37";

// Defined outside component so its identity is stable across re-renders
type FieldProps = {
  label: string;
  value: string;
  onChange: (t: string) => void;
  placeholder: string;
  keyboardType?: any;
  error?: string;
};

function Field({ label, value, onChange, placeholder, keyboardType = "default", error }: FieldProps) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ color: NAVY, fontSize: 12, fontWeight: "700", marginBottom: 6 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        keyboardType={keyboardType}
        style={{
          borderWidth: 1.5,
          borderColor: error ? "#ef4444" : "#e2e8f0",
          borderRadius: 12,
          paddingHorizontal: 14,
          paddingVertical: 12,
          fontSize: 14,
          color: NAVY,
          backgroundColor: "#fff",
        }}
      />
      {error ? <Text style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>{error}</Text> : null}
    </View>
  );
}

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const delivery = total >= 10000 ? 0 : 299;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "upi" | "bank">("cod");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(phone)) e.phone = "Enter a valid 10-digit mobile number";
    if (!address.trim()) e.address = "Address is required";
    if (!city.trim()) e.city = "City is required";
    if (!/^\d{6}$/.test(pincode)) e.pincode = "Enter a valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    clearCart();
    router.replace({ pathname: "/order-success", params: { phone, name } });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#f1f5f9" }}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: "#f8fafc", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
          <ChevronLeft size={20} color={NAVY} />
        </TouchableOpacity>
        <Text style={{ color: NAVY, fontSize: 16, fontWeight: "900" }}>Checkout</Text>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 180 }} keyboardShouldPersistTaps="handled">

          {/* Delivery Details */}
          <View style={{ backgroundColor: "#fff", borderRadius: 18, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: "#f1f5f9" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <MapPin size={17} color={NAVY} />
              <Text style={{ color: NAVY, fontSize: 15, fontWeight: "900" }}>Delivery Details</Text>
            </View>
            <Field label="Full Name" value={name} onChange={setName} placeholder="Enter your full name" error={errors.name} />
            <Field label="Address" value={address} onChange={setAddress} placeholder="Flat / House no., Street, Area" error={errors.address} />
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Field label="City" value={city} onChange={setCity} placeholder="City" error={errors.city} />
              </View>
              <View style={{ flex: 1 }}>
                <Field label="Pincode" value={pincode} onChange={setPincode} placeholder="6-digit PIN" keyboardType="number-pad" error={errors.pincode} />
              </View>
            </View>
          </View>

          {/* WhatsApp Phone */}
          <View style={{ backgroundColor: "#fff", borderRadius: 18, padding: 16, marginBottom: 14, borderWidth: 1.5, borderColor: `${GOLD}44` }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <MessageCircle size={17} color="#25D366" />
              <Text style={{ color: NAVY, fontSize: 15, fontWeight: "900" }}>WhatsApp Updates</Text>
            </View>
            <Text style={{ color: "#6b7280", fontSize: 12, marginBottom: 14, lineHeight: 18 }}>
              We'll send your order confirmation, shipping updates, and delivery alerts on WhatsApp to this number.
            </Text>
            <Text style={{ color: NAVY, fontSize: 12, fontWeight: "700", marginBottom: 6 }}>Mobile Number *</Text>
            <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1.5, borderColor: errors.phone ? "#ef4444" : "#25D366", borderRadius: 12, overflow: "hidden" }}>
              <View style={{ paddingHorizontal: 12, paddingVertical: 12, backgroundColor: "#f0fdf4", borderRightWidth: 1, borderRightColor: "#d1fae5" }}>
                <Text style={{ color: NAVY, fontSize: 14, fontWeight: "800" }}>+91</Text>
              </View>
              <TextInput
                value={phone}
                onChangeText={(t) => setPhone(t.replace(/\D/g, "").slice(0, 10))}
                placeholder="10-digit mobile number"
                placeholderTextColor="#9ca3af"
                keyboardType="number-pad"
                maxLength={10}
                style={{ flex: 1, paddingHorizontal: 12, paddingVertical: 12, fontSize: 15, color: NAVY, fontWeight: "600" }}
              />
              {phone.length === 10 && (
                <View style={{ paddingRight: 12 }}>
                  <CheckCircle size={18} color="#16a34a" />
                </View>
              )}
            </View>
            {errors.phone ? <Text style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>{errors.phone}</Text> : null}
          </View>

          {/* Payment Method */}
          <View style={{ backgroundColor: "#fff", borderRadius: 18, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: "#f1f5f9" }}>
            <Text style={{ color: NAVY, fontSize: 15, fontWeight: "900", marginBottom: 14 }}>Payment Method</Text>
            {([
              { key: "cod", label: "Cash on Delivery", sub: "Pay when your order arrives" },
              { key: "upi", label: "UPI / QR Code", sub: "GPay, PhonePe, Paytm" },
              { key: "bank", label: "Bank Transfer / NEFT", sub: "For large bulk orders" },
            ] as const).map((m, i, arr) => (
              <TouchableOpacity key={m.key} onPress={() => setPaymentMethod(m.key)}
                style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 13, borderBottomWidth: i < arr.length - 1 ? 1 : 0, borderBottomColor: "#f8fafc" }}>
                <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: paymentMethod === m.key ? NAVY : "#d1d5db", alignItems: "center", justifyContent: "center" }}>
                  {paymentMethod === m.key && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: NAVY }} />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: NAVY, fontSize: 13, fontWeight: "700" }}>{m.label}</Text>
                  <Text style={{ color: "#9ca3af", fontSize: 11, marginTop: 1 }}>{m.sub}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Order Summary */}
          <View style={{ backgroundColor: "#fff", borderRadius: 18, padding: 16, borderWidth: 1, borderColor: "#f1f5f9" }}>
            <Text style={{ color: NAVY, fontSize: 15, fontWeight: "900", marginBottom: 12 }}>Order Summary</Text>
            {items.map((item) => (
              <View key={item.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                <Text style={{ color: "#4b5563", fontSize: 13, flex: 1 }} numberOfLines={1}>{item.name} × {item.qty}</Text>
                <Text style={{ color: NAVY, fontSize: 13, fontWeight: "700", marginLeft: 8 }}>₹{(item.price * item.qty).toLocaleString()}</Text>
              </View>
            ))}
            <View style={{ height: 1, backgroundColor: "#f1f5f9", marginVertical: 10 }} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
              <Text style={{ color: "#6b7280", fontSize: 13 }}>Subtotal</Text>
              <Text style={{ color: NAVY, fontSize: 13, fontWeight: "700" }}>₹{total.toLocaleString()}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: "#6b7280", fontSize: 13 }}>Delivery</Text>
              <Text style={{ color: delivery === 0 ? "#16a34a" : NAVY, fontSize: 13, fontWeight: "700" }}>{delivery === 0 ? "FREE" : `₹${delivery}`}</Text>
            </View>
            <View style={{ height: 1, backgroundColor: "#f1f5f9", marginVertical: 10 }} />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: NAVY, fontSize: 15, fontWeight: "900" }}>Grand Total</Text>
              <Text style={{ color: NAVY, fontSize: 17, fontWeight: "900" }}>₹{(total + delivery).toLocaleString()}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Place Order CTA */}
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", padding: 16, paddingBottom: 24, borderTopWidth: 1, borderTopColor: "#f1f5f9" }}>
          <TouchableOpacity onPress={handlePlaceOrder} activeOpacity={0.88}
            style={{ backgroundColor: NAVY, borderRadius: 16, paddingVertical: 16, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }}>
            <MessageCircle size={17} color={GOLD} />
            <Text style={{ color: GOLD, fontSize: 15, fontWeight: "900" }}>Place Order · ₹{(total + delivery).toLocaleString()}</Text>
          </TouchableOpacity>
          <Text style={{ color: "#9ca3af", fontSize: 11, textAlign: "center", marginTop: 8 }}>
            Order updates sent via WhatsApp to +91 {phone || "XXXXXXXXXX"}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
