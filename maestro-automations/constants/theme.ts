// React / Built-in
import { Platform } from "react-native";

// ─── Swiggy-inspired Design Tokens ──────────────────────────────────

export const Colors = {
  primary: "#FC8019",
  primaryDark: "#E06B00",
  primaryLight: "#FFF3E8",
  white: "#FFFFFF",
  background: "#F5F5F5",
  surface: "#FFFFFF",
  text: "#1C1C1C",
  textSecondary: "#686B78",
  textLight: "#93959F",
  border: "#E8E8E8",
  divider: "#F1F1F6",
  success: "#60B246",
  error: "#E23744",
  star: "#FFB800",
  veg: "#0F8A65",
  nonVeg: "#E43B4F",
  overlay: "rgba(0, 0, 0, 0.5)",
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  hero: 28,
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
});
