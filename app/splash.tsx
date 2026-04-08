import { useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../lib/AuthContext";
import ArkLogo from "../components/ArkLogo";

const NAVY = "#061429";
const GOLD = "#D4AF37";

export default function SplashScreen() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(isLoggedIn ? "/(tabs)/home" : "/auth");
    }, 1400);

    return () => clearTimeout(timer);
  }, [isLoggedIn, router]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: NAVY }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 }}>
        <ArkLogo size={112} showBg={false} />
        <Text style={{ color: "#fff", fontSize: 28, fontWeight: "900", marginTop: 18, letterSpacing: 1 }}>
          ARK ASSURED
        </Text>
        <Text style={{ color: GOLD, fontSize: 11, fontWeight: "700", marginTop: 6, letterSpacing: 2 }}>
          THE SEAL OF TRUST
        </Text>
      </View>
    </SafeAreaView>
  );
}
