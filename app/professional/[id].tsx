import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Phone, MapPin, Star, Briefcase, Clock, CheckCircle, MessageCircle, Award } from "lucide-react-native";
import { PROFESSIONALS } from "../../lib/data";

const NAVY = "#061429";
const GOLD = "#D4AF37";

const REVIEWS: Record<string, { id: string; name: string; text: string; rating: number; date: string }[]> = {
  "1": [
    { id: "1", name: "Rahul S.", text: "Amazing interior design work. Transformed our living room completely.", rating: 5, date: "Mar 2026" },
    { id: "2", name: "Priya K.", text: "Very professional, delivered on time and within budget.", rating: 5, date: "Feb 2026" },
    { id: "3", name: "Anil M.", text: "Good quality work. Would recommend for residential projects.", rating: 4, date: "Jan 2026" },
  ],
  "2": [
    { id: "1", name: "Vikram R.", text: "Excellent modular kitchen work. Very clean finishing.", rating: 5, date: "Mar 2026" },
    { id: "2", name: "Sunitha P.", text: "Fast and reliable. Fixed our wardrobe issues quickly.", rating: 4, date: "Feb 2026" },
  ],
};

const SERVICES: Record<string, string[]> = {
  "Interior Designer": ["Space Planning", "3D Visualization", "False Ceiling", "Modular Furniture", "Colour Consultation"],
  "Carpenter & Modular Kitchen": ["Modular Kitchen", "Wardrobes", "TV Units", "Wooden Flooring", "Custom Furniture"],
  "Civil Contractor": ["Renovation", "Tiling", "Plastering", "Waterproofing", "Structural Work"],
  "Tile & Flooring Specialist": ["Floor Tiles", "Wall Tiles", "Vitrified Tiles", "Marble Polishing", "Grouting"],
  "Electrician": ["Wiring", "Panel Installation", "Light Fixtures", "CCTV", "Home Automation"],
};

export default function ProfessionalProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const prof = PROFESSIONALS.find((p) => p.id === id) ?? PROFESSIONALS[0];
  const reviews = REVIEWS[id] ?? REVIEWS["1"];
  const services = SERVICES[prof.profession] ?? ["Consultation", "Installation", "Maintenance", "Repair", "Emergency"];

  const handleCall = () => Linking.openURL(`tel:${prof.contact.replace(/\s/g, "")}`);
  const handleWhatsApp = () => {
    const num = prof.contact.replace(/\D/g, "").slice(-10);
    Linking.openURL(`https://wa.me/91${num}?text=Hi, I found your profile on ARK Assured. I would like to enquire about your services.`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: NAVY }}>
      <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#f1f5f9" }}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: "#f8fafc", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
          <ChevronLeft size={20} color={NAVY} />
        </TouchableOpacity>
        <Text style={{ color: NAVY, fontSize: 16, fontWeight: "800", flex: 1 }}>Professional Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Hero */}
        <View style={{ backgroundColor: NAVY, padding: 24, alignItems: "center" }}>
          <View style={{ width: 80, height: 80, borderRadius: 22, backgroundColor: GOLD, alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
            <Text style={{ color: NAVY, fontSize: 26, fontWeight: "900" }}>{prof.avatar}</Text>
          </View>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "900" }}>{prof.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
            <Briefcase size={13} color={GOLD} />
            <Text style={{ color: GOLD, fontSize: 13, marginLeft: 5, fontWeight: "700" }}>{prof.profession}</Text>
          </View>

          {/* Stats */}
          <View style={{ flexDirection: "row", marginTop: 20, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
            {[
              { label: "Rating", value: `${prof.rating}★` },
              { label: "Experience", value: prof.experience },
              { label: "Jobs Done", value: "120+" },
            ].map((s, i) => (
              <View key={s.label} style={{ flex: 1, alignItems: "center", paddingVertical: 14, borderRightWidth: i < 2 ? 1 : 0, borderRightColor: "rgba(255,255,255,0.12)" }}>
                <Text style={{ color: GOLD, fontSize: 16, fontWeight: "900" }}>{s.value}</Text>
                <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 2 }}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Details card */}
        <View style={{ margin: 16, backgroundColor: "#fff", borderRadius: 18, padding: 16, borderWidth: 1, borderColor: "#f1f5f9" }}>
          {[
            { icon: MapPin, label: "Location", value: prof.location },
            { icon: Phone, label: "Contact", value: prof.contact },
            { icon: Clock, label: "Availability", value: "Mon – Sat, 8 AM – 7 PM" },
            { icon: CheckCircle, label: "Verification", value: "Identity Verified ✓" },
            { icon: Award, label: "ARK Assured", value: "Certified Professional" },
          ].map(({ icon: Icon, label, value }, i, arr) => (
            <View key={label} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 11, borderBottomWidth: i < arr.length - 1 ? 1 : 0, borderBottomColor: "#f1f5f9" }}>
              <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: "#f8fafc", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                <Icon size={15} color={NAVY} />
              </View>
              <View>
                <Text style={{ color: "#9ca3af", fontSize: 10, fontWeight: "600", marginBottom: 2 }}>{label}</Text>
                <Text style={{ color: NAVY, fontSize: 13, fontWeight: "700" }}>{value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Services */}
        <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
          <Text style={{ color: NAVY, fontSize: 15, fontWeight: "800", marginBottom: 10 }}>Services Offered</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {services.map((s) => (
              <View key={s} style={{ backgroundColor: "#FDF8E7", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7, borderWidth: 1, borderColor: `${GOLD}33` }}>
                <Text style={{ color: NAVY, fontSize: 12, fontWeight: "700" }}>{s}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews */}
        <View style={{ marginHorizontal: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <Text style={{ color: NAVY, fontSize: 15, fontWeight: "800" }}>Reviews ({reviews.length})</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Star size={13} color={GOLD} fill={GOLD} />
              <Text style={{ color: NAVY, fontSize: 13, fontWeight: "800", marginLeft: 4 }}>{prof.rating}</Text>
            </View>
          </View>
          {reviews.map((r) => (
            <View key={r.id} style={{ backgroundColor: "#fff", borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: "#f1f5f9" }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <Text style={{ color: NAVY, fontSize: 13, fontWeight: "700" }}>{r.name}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} color={GOLD} fill={i < r.rating ? GOLD : "transparent"} />
                  ))}
                  <Text style={{ color: "#9ca3af", fontSize: 11, marginLeft: 6 }}>{r.date}</Text>
                </View>
              </View>
              <Text style={{ color: "#4b5563", fontSize: 13, lineHeight: 20 }}>{r.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", paddingHorizontal: 16, paddingVertical: 12, paddingBottom: 24, borderTopWidth: 1, borderTopColor: "#f1f5f9", flexDirection: "row", gap: 10 }}>
        <TouchableOpacity onPress={handleWhatsApp} activeOpacity={0.85}
          style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, backgroundColor: "#25D366", borderRadius: 14, paddingVertical: 14 }}>
          <MessageCircle size={16} color="#fff" />
          <Text style={{ color: "#fff", fontSize: 14, fontWeight: "800" }}>WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCall} activeOpacity={0.85}
          style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, backgroundColor: NAVY, borderRadius: 14, paddingVertical: 14 }}>
          <Phone size={16} color={GOLD} />
          <Text style={{ color: GOLD, fontSize: 14, fontWeight: "800" }}>Call Now</Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
}
