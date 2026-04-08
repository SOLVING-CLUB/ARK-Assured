import Svg, { Path, G, Polygon, Line } from "react-native-svg";
import { View } from "react-native";

const NAVY = "#061429";
const GOLD = "#D4AF37";

type Props = {
  size?: number;
  showBg?: boolean;
};

// Geometric octagon + A mark matching the ARK Assured logo
export default function ArkLogo({ size = 40, showBg = true }: Props) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const r = s * 0.42; // outer octagon radius
  const r2 = s * 0.34; // inner star radius

  // 8-point octagon vertices
  const octagon = Array.from({ length: 8 }, (_, i) => {
    const angle = (Math.PI / 4) * i - Math.PI / 2;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");

  // Inner rotated square (diamond)
  const star = Array.from({ length: 4 }, (_, i) => {
    const angle = (Math.PI / 2) * i - Math.PI / 4;
    return `${cx + r2 * Math.cos(angle)},${cy + r2 * Math.sin(angle)}`;
  }).join(" ");

  // A shape points
  const aLeft = cx - s * 0.2;
  const aRight = cx + s * 0.2;
  const aTop = cy - s * 0.22;
  const aBottom = cy + s * 0.26;
  const aMidY = cy + s * 0.02;
  const aMidLeftX = cx - s * 0.11;
  const aMidRightX = cx + s * 0.11;

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
      <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        {/* Background */}
        {showBg && <Path d={`M0 0 H${s} V${s} H0 Z`} fill={NAVY} />}

        {/* Outer octagon outline */}
        <Polygon
          points={octagon}
          fill="none"
          stroke={GOLD}
          strokeWidth={s * 0.025}
        />

        {/* Inner rotated square */}
        <Polygon
          points={star}
          fill="none"
          stroke={GOLD}
          strokeWidth={s * 0.022}
        />

        {/* A left leg */}
        <Path
          d={`M${cx} ${aTop} L${aLeft} ${aBottom}`}
          stroke={GOLD}
          strokeWidth={s * 0.055}
          strokeLinecap="round"
          fill="none"
        />
        {/* A right leg */}
        <Path
          d={`M${cx} ${aTop} L${aRight} ${aBottom}`}
          stroke={GOLD}
          strokeWidth={s * 0.055}
          strokeLinecap="round"
          fill="none"
        />
        {/* A crossbar */}
        <Path
          d={`M${aMidLeftX} ${aMidY} L${aMidRightX} ${aMidY}`}
          stroke={GOLD}
          strokeWidth={s * 0.04}
          strokeLinecap="round"
          fill="none"
        />
        {/* Vertical stem through A */}
        <Path
          d={`M${cx} ${aTop} L${cx} ${aBottom + s * 0.02}`}
          stroke={GOLD}
          strokeWidth={s * 0.028}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    </View>
  );
}
