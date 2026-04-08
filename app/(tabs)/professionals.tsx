import { View, Text, FlatList, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, Phone, MapPin, Star, PlusCircle, Briefcase, ChevronRight, MessageCircle } from "lucide-react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Linking } from "react-native";
import { PROFESSIONALS } from "../../lib/data";

const NAVY = "#061429";
const GOLD = "#D4AF37";

const PROFESSIONS = ["All", "Interior Designer", "Carpenter & Modular Kitchen", "Civil Contractor", "Tile & Flooring Specialist", "Electrician"];

function ProfessionalCard({ prof }: { prof: typeof PROFESSIONALS[0] }) {
  const router = useRouter();
  const handleCall = () => Linking.openURL(`tel:${prof.contact.replace(/\s/g, "")}`);

  return (
    <View style={{ backgroundColor: "#fff", borderRadius: 18, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "#f1f5f9", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <View style={{ width: 54, height: 54, borderRadius: 15, backgroundColor: NAVY, alignItems: "center", justifyContent: "center", marginRight: 12 }}>
          <Text style={{ color: GOLD, fontSize: 17, fontWeight: "900" }}>{prof.avatar}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: NAVY, fontSize: 15, fontWeight: "900" }}>{prof.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}>
            <Briefcase size={12} color="#6b7280" />
            <Text style={{ color: "#6b7280", fontSize: 12, marginLeft: 4 }}>{prof.profession}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6, gap: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Star size={11} color={GOLD} fill={GOLD} />
              <Text style={{ color: NAVY, fontSize: 12, fontWeight: "800", marginLeft: 3 }}>{prof.rating}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MapPin size={11} color="#9ca3af" />
              <Text style={{ color: "#9ca3af", fontSize: 12, marginLeft: 3 }}>{prof.location}</Text>
            </View>
            <Text style={{ color: "#9ca3af", fontSize: 12 }}>{prof.experience}</Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#f0fdf4", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 }}>
          <Text style={{ color: "#16a34a", fontSize: 10, fontWeight: "800" }}>Verified</Text>
        </View>
      </View>

      <View style={{ height: 1, backgroundColor: "#f1f5f9", marginVertical: 12 }} />

      <View style={{ flexDirection: "row", gap: 8 }}>
        <TouchableOpacity onPress={handleCall} activeOpacity={0.85}
          style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: NAVY, borderRadius: 12, paddingVertical: 11 }}>
          <Phone size={14} color="#fff" />
          <Text style={{ color: "#fff", fontSize: 13, fontWeight: "800" }}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/professional/${prof.id}` as any)} activeOpacity={0.85}
          style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4, borderRadius: 12, paddingVertical: 11, borderWidth: 1.5, borderColor: "#e2e8f0" }}>
          <Text style={{ color: NAVY, fontSize: 13, fontWeight: "700" }}>View Profile</Text>
          <ChevronRight size={13} color={NAVY} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ProfessionalsScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = PROFESSIONALS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.profession.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || p.profession === filter;
    return matchSearch && matchFilter;
  });

  const ListHeader = (
    <View>
      <View style={{ padding: 16, paddingBottom: 12 }}>
        <Text style={{ color: NAVY, fontSize: 22, fontWeight: "900", lineHeight: 28 }}>Find professionals{"\n"}near you</Text>
        <Text style={{ color: "#6b7280", fontSize: 13, marginTop: 4 }}>Verified, experienced & trusted</Text>
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#f8fafc", borderRadius: 14, paddingHorizontal: 12, marginTop: 14, borderWidth: 1, borderColor: "#e2e8f0" }}>
          <Search size={15} color="#9ca3af" />
          <TextInput
            placeholder="Search by name or profession…"
            placeholderTextColor="#9ca3af"
            value={search}
            onChangeText={setSearch}
            style={{ flex: 1, paddingVertical: 12, paddingLeft: 8, fontSize: 14, color: NAVY }}
          />
        </View>
      </View>

      <FlatList
        data={PROFESSIONS}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 14 }}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setFilter(item)}
            style={{ backgroundColor: filter === item ? NAVY : "#f1f5f9", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8 }}>
            <Text style={{ color: filter === item ? GOLD : "#4b5563", fontSize: 12, fontWeight: "700" }}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity activeOpacity={0.85}
        style={{ marginHorizontal: 16, marginBottom: 16, backgroundColor: "#FDF8E7", borderRadius: 16, padding: 14, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: `${GOLD}33` }}>
        <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: NAVY, alignItems: "center", justifyContent: "center", marginRight: 12 }}>
          <PlusCircle size={20} color={GOLD} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: NAVY, fontSize: 14, fontWeight: "900" }}>Are you a professional?</Text>
          <Text style={{ color: "#6b7280", fontSize: 12, marginTop: 2 }}>Create your profile and get leads</Text>
        </View>
        <ChevronRight size={16} color={NAVY} />
      </TouchableOpacity>

      <Text style={{ color: NAVY, fontSize: 13, fontWeight: "700", paddingHorizontal: 16, marginBottom: 12 }}>
        {filtered.length} Professional{filtered.length !== 1 ? "s" : ""} available
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => <ProfessionalCard prof={item} />}
        ListEmptyComponent={
          <View style={{ alignItems: "center", paddingVertical: 40 }}>
            <Text style={{ color: "#9ca3af", fontSize: 15 }}>No professionals found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
