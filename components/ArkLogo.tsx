import { Image, View } from "react-native";

const NAVY = "#061429";

type Props = {
  size?: number;
  showBg?: boolean;
};

export default function ArkLogo({ size = 40, showBg = true }: Props) {
  const s = size;

  return (
    <View
      style={{
        width: s,
        height: s,
        borderRadius: s * 0.18,
        backgroundColor: showBg ? NAVY : "transparent",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../assets/logo-showcase.png")}
        style={{ width: s, height: s }}
        resizeMode="contain"
      />
    </View>
  );
}
