// Constants
import { Colors } from "@/constants/theme";

// Styles
import { styles } from "./styles";

export function getScrollContentStyle(bottomInset: number) {
  return [styles.scrollContent, { paddingBottom: 24 + bottomInset }];
}

export function getVegDotStyle(isVeg: boolean) {
  return [styles.vegDot, { borderColor: isVeg ? Colors.veg : Colors.nonVeg }];
}

export function getVegDotInnerStyle(isVeg: boolean) {
  return [
    styles.vegDotInner,
    { backgroundColor: isVeg ? Colors.veg : Colors.nonVeg },
  ];
}
