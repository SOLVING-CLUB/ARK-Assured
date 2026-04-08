import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { User, Briefcase, Eye, EyeOff, ChevronRight, CheckCircle } from "lucide-react-native";
import { useAuth } from "../lib/AuthContext";
import ArkLogo from "../components/ArkLogo";

const NAVY = "#061429";
const GOLD = "#D4AF37";

type Mode = "login" | "register";
type Role = "user" | "professional";

// All sub-components defined at module level — never recreated on re-render
type FieldProps = {
  label: string;
  value: string;
  onChange: (t: string) => void;
  placeholder: string;
  secure?: boolean;
  showPass?: boolean;
  onTogglePass?: () => void;
  showToggle?: boolean;
  keyboardType?: any;
  error?: string;
};

function Field({ label, value, onChange, placeholder, secure = false, showPass = false, onTogglePass, showToggle = false, keyboardType = "default", error }: FieldProps) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ color: NAVY, fontSize: 12, fontWeight: "700", marginBottom: 6 }}>{label}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1.5, borderColor: error ? "#ef4444" : "#e2e8f0", borderRadius: 12, backgroundColor: "#fff" }}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          secureTextEntry={secure && !showPass}
          keyboardType={keyboardType}
          autoCapitalize="none"
          style={{ flex: 1, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: NAVY }}
        />
        {showToggle && onTogglePass && (
          <TouchableOpacity onPress={onTogglePass} style={{ paddingRight: 14 }}>
            {showPass ? <EyeOff size={17} color="#9ca3af" /> : <Eye size={17} color="#9ca3af" />}
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>{error}</Text> : null}
    </View>
  );
}

export default function AuthScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [role, setRole] = useState<Role>("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [profession, setProfession] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === "register" && !name.trim()) e.name = "Name is required";
    if (!email.includes("@")) e.email = "Enter a valid email";
    if (password.length < 6) e.password = "Minimum 6 characters";
    if (mode === "register" && !/^[6-9]\d{9}$/.test(phone)) e.phone = "Enter valid 10-digit number";
    if (mode === "register" && role === "professional" && !profession.trim()) e.profession = "Enter your profession";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    login({ name: name || email.split("@")[0], email, phone, role });
    router.replace("/(tabs)/home" as any);
  };

  const togglePass = () => setShowPass((p) => !p);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: NAVY }}>
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#fff" }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

          {/* Header */}
          <View style={{ backgroundColor: NAVY, paddingTop: 40, paddingBottom: 32, alignItems: "center" }}>
            <ArkLogo size={64} showBg={false} />
            <Text style={{ color: "#fff", fontSize: 22, fontWeight: "900", marginTop: 12, letterSpacing: 1 }}>ARK ASSURED</Text>
            <Text style={{ color: GOLD, fontSize: 10, fontWeight: "700", letterSpacing: 2, marginTop: 2 }}>THE SEAL OF TRUST</Text>
          </View>

          <View style={{ padding: 24 }}>
            {/* Sign In / Sign Up toggle */}
            <View style={{ flexDirection: "row", backgroundColor: "#f1f5f9", borderRadius: 14, padding: 4, marginBottom: 24 }}>
              {(["login", "register"] as Mode[]).map((m) => (
                <TouchableOpacity key={m} onPress={() => { setMode(m); setErrors({}); }}
                  style={{ flex: 1, paddingVertical: 11, borderRadius: 11, backgroundColor: mode === m ? "#fff" : "transparent", alignItems: "center",
                    shadowColor: mode === m ? "#000" : "transparent", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: mode === m ? 2 : 0 }}>
                  <Text style={{ color: mode === m ? NAVY : "#9ca3af", fontSize: 14, fontWeight: "800" }}>
                    {m === "login" ? "Sign In" : "Sign Up"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Role selection */}
            {mode === "register" && (
              <View style={{ marginBottom: 20 }}>
                <Text style={{ color: NAVY, fontSize: 13, fontWeight: "800", marginBottom: 10 }}>I am a…</Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  {([
                    { key: "user", label: "Customer", sub: "Buy products & hire professionals", icon: User },
                    { key: "professional", label: "Professional", sub: "Offer services & grow your business", icon: Briefcase },
                  ] as const).map(({ key, label, sub, icon: Icon }) => (
                    <TouchableOpacity key={key} onPress={() => setRole(key)} activeOpacity={0.85}
                      style={{ flex: 1, borderRadius: 16, borderWidth: 2, borderColor: role === key ? NAVY : "#e2e8f0", padding: 14, backgroundColor: role === key ? "#f8f9fc" : "#fff" }}>
                      <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: role === key ? NAVY : "#f1f5f9", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                        <Icon size={18} color={role === key ? GOLD : "#9ca3af"} />
                      </View>
                      <Text style={{ color: NAVY, fontSize: 13, fontWeight: "800" }}>{label}</Text>
                      <Text style={{ color: "#9ca3af", fontSize: 10, marginTop: 3, lineHeight: 14 }}>{sub}</Text>
                      {role === key && (
                        <View style={{ position: "absolute", top: 10, right: 10 }}>
                          <CheckCircle size={16} color={NAVY} />
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Form */}
            {mode === "register" && (
              <Field label="Full Name" value={name} onChange={setName} placeholder="Enter your full name" error={errors.name} />
            )}
            <Field label="Email Address" value={email} onChange={setEmail} placeholder="you@example.com" keyboardType="email-address" error={errors.email} />
            {mode === "register" && (
              <Field label="Mobile Number" value={phone} onChange={setPhone} placeholder="10-digit mobile number" keyboardType="number-pad" error={errors.phone} />
            )}
            {mode === "register" && role === "professional" && (
              <Field label="Your Profession" value={profession} onChange={setProfession} placeholder="e.g. Interior Designer, Carpenter…" error={errors.profession} />
            )}
            <Field
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder={mode === "login" ? "Enter your password" : "Create a password (min. 6 chars)"}
              secure
              showPass={showPass}
              onTogglePass={togglePass}
              showToggle
              error={errors.password}
            />

            {mode === "login" && (
              <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: -6, marginBottom: 20 }}>
                <Text style={{ color: GOLD, fontSize: 13, fontWeight: "700" }}>Forgot password?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={handleSubmit} activeOpacity={0.88}
              style={{ backgroundColor: NAVY, borderRadius: 16, paddingVertical: 16, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8, marginTop: mode === "register" ? 8 : 0 }}>
              <Text style={{ color: GOLD, fontSize: 15, fontWeight: "900" }}>
                {mode === "login" ? "Sign In" : "Create Account"}
              </Text>
              <ChevronRight size={18} color={GOLD} />
            </TouchableOpacity>

            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
              <Text style={{ color: "#6b7280", fontSize: 13 }}>
                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              </Text>
              <TouchableOpacity onPress={() => { setMode(mode === "login" ? "register" : "login"); setErrors({}); }}>
                <Text style={{ color: NAVY, fontSize: 13, fontWeight: "800" }}>
                  {mode === "login" ? "Sign Up" : "Sign In"}
                </Text>
              </TouchableOpacity>
            </View>

            {mode === "register" && (
              <Text style={{ color: "#9ca3af", fontSize: 11, textAlign: "center", marginTop: 16, lineHeight: 17 }}>
                By creating an account, you agree to our{" "}
                <Text style={{ color: NAVY, fontWeight: "700" }}>Terms of Service</Text> and{" "}
                <Text style={{ color: NAVY, fontWeight: "700" }}>Privacy Policy</Text>
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
